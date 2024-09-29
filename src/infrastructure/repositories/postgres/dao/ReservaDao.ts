import { injectable } from 'inversify';
import 'reflect-metadata';
import { ReservasRepository } from "@domain/repository";
import { ReservaEntity, ResultadoConId } from "@domain/entities";
import { DEPENDENCY_CONTAINER, TYPES } from "@configuration";
import { IDatabase, IMain } from "pg-promise";

@injectable()
export class ReservasDao implements ReservasRepository {
    private db = DEPENDENCY_CONTAINER.get<IDatabase<IMain>>(TYPES.PostgresqlEventos);

    async actualizar(reserva: ReservaEntity): Promise<number | null | undefined> {
        try {
            const sql = `UPDATE reserva 
                         SET estado = $1, actualizado = NOW() 
                         WHERE id = $2 
                         RETURNING id`;

            const result = await this.db.oneOrNone<ResultadoConId>(sql, [
                reserva.estado,
                reserva.id
            ]);
            return result?.id;
        } catch (error) {
            console.error('Error al actualizar la reserva', error);
            return null;
        }
    }

    async consultarPorId(id: number): Promise<ReservaEntity | null> {
        try {
            const sql = `SELECT * FROM reserva WHERE id = $1`;
            return await this.db.oneOrNone<ReservaEntity>(sql, [id]);
        } catch (error) {
            console.error('Error al consultar la reserva', error);
            return null;
        }
    }

    async eliminar(id: number): Promise<number | null | undefined> {
        try {
            const sql = `DELETE FROM reserva WHERE id = $1 RETURNING id`;
            const result = await this.db.oneOrNone<ResultadoConId>(sql, [id]);
            return result?.id;
        } catch (error) {
            console.error('Error al eliminar la reserva', error);
            return null;
        }
    }

    async guardar(reserva: ReservaEntity): Promise<number> {
        try {
            const sql = `INSERT INTO reserva (asistente_id, evento_id, cantidad_boletos) 
                         VALUES ($1, $2, $3) 
                         RETURNING id`;

            const result = await this.db.one<ResultadoConId>(sql, [
                reserva.asistente_id,
                reserva.evento_id,
                reserva.cantidad_boletos
            ]);
            return result.id;
        } catch (error) {
            console.error('Error al guardar la reserva', error);
            return -1;
        }
    }
}
