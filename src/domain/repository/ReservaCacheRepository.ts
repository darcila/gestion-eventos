import {EventoAsistentes} from "@domain/entities";

export interface ReservaCacheRepository {
    setReservaCache(id: number, value: EventoAsistentes): Promise<void>;
    getReservaCache(id: number): Promise<EventoAsistentes | null>;
    deleteReservaCache(id: number): Promise<void>;
}
