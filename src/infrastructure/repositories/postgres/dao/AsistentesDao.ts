import { injectable } from 'inversify';
import 'reflect-metadata';
import { AsistentesRepository } from "@domain/repository";
import { AsistenteEntity, ResultadoConId } from "@domain/entities";
import { DEPENDENCY_CONTAINER, TYPES } from "@configuration";
import { IDatabase, IMain } from "pg-promise";

@injectable()
export class AsistentesDao implements AsistentesRepository {
    private db = DEPENDENCY_CONTAINER.get<IDatabase<IMain>>(TYPES.PostgresqlEventos); // Asegúrate de tener esta configuración

    async actualizar(asistente: AsistenteEntity): Promise<number | null | undefined> {
        try {
            const sql = `UPDATE asistente SET nombre = $1, direccion = $2, telefono = $3, correo = $4, categorias = $5, ubicacion = $6 WHERE identificacion = $7 RETURNING id`;
            let pointLatLong = null;
            if (asistente.ubicacion) {
                pointLatLong = `(${asistente.ubicacion[0]},${asistente.ubicacion[1]})`;
            }
            await this.db.oneOrNone<ResultadoConId>(sql, [asistente.nombre, asistente.direccion, asistente.telefono, asistente.correo, asistente.categorias, pointLatLong, asistente.identificacion]);
            return asistente?.id;
        } catch (error) {
            console.error('Error al actualizar el asistente', error);
            return null;
        }
    }

    async consultarPorIdentificacion(identificacion: string): Promise<AsistenteEntity | null> {
        try {
            const sql = `SELECT * FROM asistente WHERE identificacion = $1`;
            return await this.db.oneOrNone<AsistenteEntity>(sql, [identificacion]);
        } catch (error) {
            console.error('Error al consultar asistente', error);
            return null;
        }
    }

    async consultarPorId(id: number): Promise<AsistenteEntity | null> {
        try {
            const sql = `SELECT * FROM asistente WHERE id = $1`;
            return await this.db.oneOrNone<AsistenteEntity>(sql, [id]);
        } catch (error) {
            console.error('Error al consultar asistente', error);
            return null;
        }
    }

    async eliminar(identificacion: string): Promise<number | null | undefined> {
        try {
            const sql = `DELETE FROM asistente WHERE identificacion = $1 RETURNING id`;
            const result = await this.db.oneOrNone<ResultadoConId>(sql, [identificacion]);
            return result?.id;
        } catch (error) {
            console.error('Error al eliminar asistente', error);
            return null;
        }
    }

    async guardar(asistente: AsistenteEntity): Promise<number> {
        try {
            const sql = `INSERT INTO asistente (identificacion, nombre, direccion, telefono, correo, categorias, ubicacion, ciudad) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
            let pointLatLong = null;
            if (asistente.ubicacion) {
                pointLatLong = `(${asistente.ubicacion[0]},${asistente.ubicacion[1]})`;
            }
            const resultado = await this.db.one<ResultadoConId>(sql, [asistente.identificacion, asistente.nombre, asistente.direccion, asistente.telefono, asistente.correo, asistente.categorias, pointLatLong, asistente.ciudad]);
            return resultado.id;
        } catch (error) {
            console.error('Error al guardar asistente', error);
            return -1; // O lanza una excepción si prefieres manejar los errores de otra manera
        }
    }
}
