import { injectable } from 'inversify';
import 'reflect-metadata';
import {DEPENDENCY_CONTAINER, TYPES} from "@configuration";
import {EventosRepository} from "@domain/repository";
import {EventoEntity, EventoPatchParam} from "@domain/entities";
import {MapInfraService} from "@infrastructure/services/MapInfraService";

@injectable()
export class EventoInfraService {
    private eventosRepository = DEPENDENCY_CONTAINER.get<EventosRepository>(TYPES.EventosRepository);
    private mapService = DEPENDENCY_CONTAINER.get(MapInfraService);

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
}
