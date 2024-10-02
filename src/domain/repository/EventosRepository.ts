import {EventoEntity, EventoLugarCercano} from "@domain/entities";

export interface EventosRepository {
    guardar(evento: EventoEntity): Promise<number>;
    consultarPorId(id: number): Promise<EventoEntity | null>;
    actualizar(evento: EventoEntity): Promise<number | null | undefined>;
    eliminar(id: number): Promise<number | null | undefined>;
    eventosCercanos(lat: number, lng: number, distancia: number): Promise<EventoLugarCercano[]>;
}
