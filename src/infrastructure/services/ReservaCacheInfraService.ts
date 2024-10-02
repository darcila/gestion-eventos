import { injectable } from 'inversify';
import 'reflect-metadata';
import {DEPENDENCY_CONTAINER, TYPES} from "@configuration";
import {ReservaCacheRepository} from "@domain/repository";
import {EventoAsistentes} from "@domain/entities";

@injectable()
export class ReservaCacheInfraService {
    private reservaCacheRepository = DEPENDENCY_CONTAINER.get<ReservaCacheRepository>(TYPES.ReservaCacheRepository);

    async getCacheAsistentesCount(id: number): Promise<EventoAsistentes | null> {
        return this.reservaCacheRepository.getReservaCache(id);
    }

    async setCacheAasistentesCount(id: number, asistentes: EventoAsistentes): Promise<void> {
        return await this.reservaCacheRepository.setReservaCache(id, asistentes);
    }

    async invalidateCacheAsistentesCount(id: number): Promise<void> {
        return await this.reservaCacheRepository.deleteReservaCache(id);
    }
}
