import { injectable } from 'inversify';
import 'reflect-metadata';
import {UsuariosRepository} from "@domain/repository";
import { DEPENDENCY_CONTAINER, TYPES } from "@configuration";
import { IDatabase, IMain } from "pg-promise";
import {ResultadoReservaConId, UsuarioEntity} from "@domain/entities";

@injectable()
export class UsuariosDao implements UsuariosRepository {
    private db = DEPENDENCY_CONTAINER.get<IDatabase<IMain>>(TYPES.PostgresqlEventos);

    async guardar(usuario: UsuarioEntity): Promise<number> {
        try {
            const sql = `INSERT INTO usuarios (usuario, clave, correo) VALUES ($1, $2, $3) RETURNING id`;
            const resultado = await this.db.one<ResultadoReservaConId>(sql, [usuario.usuario, usuario.clave, usuario.correo]);
            return resultado.id;
        } catch (error) {
            console.error('Error al guardar', error);
            return -1;
        }
    }
    async consultar(usuario: string): Promise<UsuarioEntity | null> {
        try {
            const sql = `SELECT id, usuario, clave FROM usuarios WHERE usuario = $1`;
            const resultado = await this.db.oneOrNone<UsuarioEntity>(sql, usuario);
            return resultado;
        } catch (error) {
            console.error('Error al consultar', error);
            return null;
        }
    }
}
