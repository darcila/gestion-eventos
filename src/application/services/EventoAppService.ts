import { injectable } from 'inversify';
import 'reflect-metadata';
import { Result, Response } from '@domain/response';
import {EventoEntity} from "@domain/entities";

@injectable()
export class EventoAppService {
    async getEvento(id: number): Promise<Response<EventoEntity | null>> {
        const result = EventoEntity.create(id, 'Evento');
        return Result.ok(result);
    }
    async postEvento(): Promise<Response<EventoEntity | null>> {
        const result = EventoEntity.create(1, 'Evento');
        return Result.ok(result);
    }
    async putEvento(id: number): Promise<Response<EventoEntity | null>> {
        const result = EventoEntity.create(id, 'Evento');
        return Result.ok(result);
    }
    async deleteEvento(id: number): Promise<Response<EventoEntity | null>> {
        const result = EventoEntity.create(id, 'Evento');
        return Result.ok(result);
    }
}
