import { injectable } from 'inversify';
import 'reflect-metadata';
import {EventosRepository} from "@domain/repository";
import {EventoEntity, ResultadoConId} from "@domain/entities";
import {DEPENDENCY_CONTAINER, TYPES} from "@configuration";
import {IDatabase, IMain} from "pg-promise";

@injectable()
export class EventosDao implements EventosRepository {
    private db = DEPENDENCY_CONTAINER.get<IDatabase<IMain>>(TYPES.PostgresqlEventos);

    async actualizar(evento: EventoEntity): Promise<number | null | undefined> {
        try {
            const sql = `UPDATE evento SET nombre = $1, fecha = $2, hora = $3, capacidad = $4, valor = $5, actualizado = NOW() WHERE id = $6 RETURNING id`;
            await this.db.oneOrNone<ResultadoConId>(sql, [evento.nombre, evento.fecha, evento.hora, evento.capacidad, evento.valor, evento.id]);
            return evento?.id;
        } catch (error) {
            console.error('Error al actualizar el evento', error);
            return null;
        }
    }

    async consultarPorId(id: number): Promise<EventoEntity | null> {
        try {
            const sql = `SELECT * FROM evento WHERE id = $1`;
            return await this.db.oneOrNone<EventoEntity>(sql, [id]);
        } catch (error) {
            console.error('Error al consultar', error);
            return null;
        }
    }

    async eliminar(id: number): Promise<number | null | undefined> {
        try {
            const sql = `DELETE FROM evento WHERE id = $1 returning id`;
            const result = await this.db.oneOrNone<ResultadoConId>(sql, [id]);
            return result?.id;
        } catch (error) {
            console.error('Error al eliminar', error);
            return null;
        }
    }

    async guardar(evento: EventoEntity): Promise<number> {
        try {
            const sql = `INSERT INTO evento (nombre, descripcion, lugar, ciudad, fecha, hora, categoria, capacidad, valor, ubicacion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`;
            let pointLatLong = null;
            if (evento.ubicacion) {
                pointLatLong = `(${evento.ubicacion[0]},${evento.ubicacion[1]})`;
            }
            const resultado = await this.db.one<ResultadoConId>(sql, [evento.nombre, evento.descripcion, evento.lugar, evento.ciudad, evento.fecha, evento.hora, evento.categoria, evento.capacidad, evento.valor, pointLatLong]);
            return resultado.id;
        } catch (error) {
            console.error('Error al guardar', error);
            return -1;
        }
    }
}
