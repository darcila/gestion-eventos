import {UsuarioEntity} from "@domain/entities";

export interface UsuariosRepository {
    guardar(usuario: UsuarioEntity): Promise<number>;
    consultar(usuario: string): Promise<UsuarioEntity | null>;
}
