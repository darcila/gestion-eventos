import { injectable } from 'inversify';
import 'reflect-metadata';
import {DEPENDENCY_CONTAINER, TYPES} from "@configuration";
import {EventosRepository} from "@domain/repository";
import {EventoAsistentes, EventoEntity, EventoLugarCercano, EventoPatchParam} from "@domain/entities";
import {MapInfraService} from "@infrastructure/services/MapInfraService";
import {ReservaInfraService} from "@infrastructure/services/ReservaInfraService";

@injectable()
export class EventoInfraService {
    private eventosRepository = DEPENDENCY_CONTAINER.get<EventosRepository>(TYPES.EventosRepository);
    private mapService = DEPENDENCY_CONTAINER.get(MapInfraService);
    private reservaInfraService = DEPENDENCY_CONTAINER.get(ReservaInfraService);

    async actualizar(evento: EventoPatchParam):Promise<EventoEntity> {
        const eventoEntity = await this.eventosRepository.consultarPorId(evento.id);
        if (!eventoEntity) {
            throw new Error('Evento no encontrado');
        }
        if (evento.nombre) {
            eventoEntity.nombre = evento.nombre;
        }
        if (evento.fecha) {
            eventoEntity.fecha = evento.fecha;
        }
        if (evento.hora) {
            eventoEntity.hora = evento.hora;
        }
        if (evento.capacidad) {
            eventoEntity.capacidad = evento.capacidad;
        }
        if (evento.valor) {
            eventoEntity.valor = evento.valor;
        }
        const idEvento = await this.eventosRepository.actualizar(eventoEntity);
        if (idEvento) {
            return eventoEntity;
        }
        throw new Error('Error al actualizar el evento');
    }
    async consultar(id: number):Promise<EventoEntity> {
        const evento = await this.eventosRepository.consultarPorId(id);
        if (evento) {
            return evento;
        }
        throw new Error('Evento no encontrado');
    }
    async eliminar(id: number):Promise<boolean> {
        return !!(await this.eventosRepository.eliminar(id));
    }
    async guardar(evento: EventoEntity):Promise<number> {
        console.log('guardar', evento);
        evento.ubicacion = await this.mapService.consultarUbicacion(evento.lugar, evento.ciudad);
        const idEvento = await this.eventosRepository.guardar(evento);
        if (idEvento > 0) {
            return idEvento;
        }
        throw new Error('Error al guardar el evento');
    }
    async consultarEventosCercanos(lat: number, lng: number, distancia: number): Promise<EventoLugarCercano[]> {
        const response = await this.eventosRepository.eventosCercanos(lat, lng, distancia * 1000);
        if (response) {
            return response;
        }
        throw new Error('Ubicación no encontrada');
    }
    async consultarAsistentes(id: number): Promise<EventoAsistentes> {
        const evento = await this.eventosRepository.consultarPorId(id);
        if (!evento) {
            throw new Error('Evento no encontrado');
        }
        const total = await this.reservaInfraService.totalAsistentes(id);
        return {
            id: (evento.id ? evento.id : 0),
            nombre: evento.nombre,
            descripcion: evento.descripcion,
            lugar: evento.lugar,
            ciudad: evento.ciudad,
            fecha: evento.fecha,
            hora: evento.hora,
            totalAsistentes: total
        };
    }
}
