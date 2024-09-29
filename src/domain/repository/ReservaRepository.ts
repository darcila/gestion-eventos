import { ReservaEntity } from "@domain/entities";

export interface ReservasRepository {
    guardar(reserva: ReservaEntity): Promise<number>;
    consultarPorId(id: number): Promise<ReservaEntity | null>;
    actualizar(reserva: ReservaEntity): Promise<number | null | undefined>;
    eliminar(id: number): Promise<number | null | undefined>;
}
