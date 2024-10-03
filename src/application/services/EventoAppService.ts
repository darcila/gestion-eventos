import { injectable } from 'inversify';
import 'reflect-metadata';
import { Result, Response } from '@domain/response';
import {
    EventoAsistenteDia,
    EventoAsistentes,
    EventoEntity,
    EventoLugarCercano,
    EventoPatchParam,
    EventoPostParam,
    EventoRespuestaMensaje
} from "@domain/entities";
import {DEPENDENCY_CONTAINER} from "@configuration";
import {EventoInfraService, MapInfraService} from "@infrastructure/services";
import {Ubicacion} from "@domain/entities/MapEntity";
import {ReservaCacheInfraService} from "@infrastructure/services/ReservaCacheInfraService";

@injectable()
export class EventoAppService {
    private eventoInfraService = DEPENDENCY_CONTAINER.get(EventoInfraService);
    private mapInfraService = DEPENDENCY_CONTAINER.get(MapInfraService);
    private reservaCacheInfraService = DEPENDENCY_CONTAINER.get(ReservaCacheInfraService);

    async getEvento(id: number): Promise<Response<EventoEntity | null>> {
        const result = await this.eventoInfraService.consultar(id);
        return Result.ok(result);
    }
    async postEvento(evento: EventoPostParam): Promise<Response<EventoEntity | null>> {
        const eventoEntity = EventoEntity.create(evento.nombre, evento.descripcion, evento.lugar, evento.ciudad, evento.fecha, evento.hora, evento.categoria, evento.capacidad, evento.valor);
        eventoEntity.id = await this.eventoInfraService.guardar(eventoEntity);
        return Result.ok(eventoEntity);
    }
    async patchEvento(evento: EventoPatchParam): Promise<Response<EventoEntity | null>> {
        this.prevalidarCamposEvento(evento);
        const eventoEntity = await this.eventoInfraService.actualizar(evento);
        return Result.ok(eventoEntity);
    }
    async deleteEvento(id: number): Promise<Response<EventoRespuestaMensaje | null>> {
        const estado = await this.eventoInfraService.eliminar(id);
        if (estado) {
            return Result.ok({ mensaje: 'Evento eliminado', id });
        }
        return Result.ok({ mensaje: 'Evento no eliminado', id });
    }
    async listarLugaresCercanos(tipo: string, evento: number): Promise<Response<EventoLugarCercano[] | null>> {
        const eventoEntity = await this.eventoInfraService.consultar(evento);
        let lat: number;
        let lng: number;
        if (eventoEntity.ubicacion) {
            const ubicacion: Ubicacion = eventoEntity.ubicacion as unknown as Ubicacion;
            lat = ubicacion.x;
            lng = ubicacion.y;
        } else {
            throw new Error('Evento no tiene ubicación');
        }
        const eventos = await this.mapInfraService.consultarLugaresCercanos(lat, lng, tipo);
        return Result.ok(eventos);
    }
    async listarEventosCercanos(direccion: string, distancia: number, ciudad: string): Promise<Response<EventoLugarCercano[] | null>> {
        const ubicacion = await this.mapInfraService.consultarUbicacion(direccion, ciudad);
        const eventos = await this.eventoInfraService.consultarEventosCercanos(ubicacion[0], ubicacion[1], distancia);
        return Result.ok(eventos);
    }
    async asistentesEvento(id: number): Promise<Response<EventoAsistentes | null>> {
        const cache = await this.reservaCacheInfraService.getCacheAsistentesCount(id);
        if (cache) {
            return Result.ok(cache);
        }
        const asistentes = await this.eventoInfraService.consultarAsistentes(id);
        await this.reservaCacheInfraService.setCacheAasistentesCount(id, asistentes);
        return Result.ok(asistentes);
    }
    async asistentesEventos(): Promise<Response<EventoAsistenteDia[] | null>> {
        const asistentes = await this.eventoInfraService.consultarAsistentesEventos();
        return Result.ok(asistentes);
    }
    private prevalidarCamposEvento(evento: EventoPatchParam): void {
        if (!evento.nombre && !evento.fecha && !evento.hora && !evento.capacidad && !evento.valor) {
            throw new Error('Debes enviar al menos un campo a actualizar');
        }
    }
}
