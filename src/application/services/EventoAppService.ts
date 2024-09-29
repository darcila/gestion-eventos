import { injectable } from 'inversify';
import 'reflect-metadata';
import { Result, Response } from '@domain/response';
import {EventoEntity, EventoPatchParam, EventoPostParam, EventoRespuestaMensaje} from "@domain/entities";
import {DEPENDENCY_CONTAINER} from "@configuration";
import {EventoInfraService} from "@infrastructure/services";

@injectable()
export class EventoAppService {
    private eventoInfraService = DEPENDENCY_CONTAINER.get(EventoInfraService);

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
    private prevalidarCamposEvento(evento: EventoPatchParam): void {
        if (!evento.nombre && !evento.fecha && !evento.hora && !evento.capacidad && !evento.valor) {
            throw new Error('Debes enviar al menos un campo a actualizar');
        }
    }
}
