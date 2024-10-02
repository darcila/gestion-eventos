import { injectable } from 'inversify';
import 'reflect-metadata';
import {ReservaCacheRepository} from "@domain/repository";
import {DEPENDENCY_CONTAINER, TYPES} from "@configuration";
import {IoRedisAdapter} from '@type-cacheable/ioredis-adapter';
import {EventoAsistentes} from "@domain/entities";

@injectable()
export class ReservasCacheDao implements ReservaCacheRepository {
    private redis = DEPENDENCY_CONTAINER.get<IoRedisAdapter>(TYPES.RedisClient);

    async deleteReservaCache(id: number): Promise<void> {
        await this.redis.del(`evento:${id}:asistentes`);
    }

    async getReservaCache(id: number): Promise<EventoAsistentes | null> {
        const response: EventoAsistentes = await this.redis.get(`evento:${id}:asistentes`);
        return response ? response : null;
    }

    async setReservaCache(id: number, value: EventoAsistentes): Promise<void> {
        await this.redis.set(`evento:${id}:asistentes`, value);
    }
}
