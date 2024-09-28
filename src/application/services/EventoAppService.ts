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
}
