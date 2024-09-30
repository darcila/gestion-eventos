import { injectable } from 'inversify';
import 'reflect-metadata';
import {Response, Result} from "@domain/response";
import {AutenticacionEntity, UsuarioEntity} from "@domain/entities";
import {DEPENDENCY_CONTAINER, TYPES} from "@configuration";
import {UsuariosRepository} from "@domain/repository";
import {encryptPassword, generarToken, validatePassword} from "@domain/services";

@injectable()
export class AutenticacionAppService {
    private usuarioRepository = DEPENDENCY_CONTAINER.get<UsuariosRepository>(TYPES.UsuariosRepository);

    async autenticar(usuario: string, clave: string): Promise<Response<AutenticacionEntity | null>> {
        const usuarioEntity = await this.validarUsuario(usuario, clave);
        const autenticacionEntity: AutenticacionEntity = {
            usuario: usuarioEntity.usuario,
            token: generarToken(usuarioEntity),
        };
        return Result.ok(autenticacionEntity);
    }
    async crearUsuario(usuario: string, clave: string): Promise<Response<string | null>> {
        const claveCript = await encryptPassword(clave)
        const usuarioEntity = UsuarioEntity.create(usuario, claveCript);
        usuarioEntity.correo = 'admin@admin.com';
        usuarioEntity.id = await this.usuarioRepository.guardar(usuarioEntity);
        return Result.ok('ok');
    }
    private async validarUsuario(usuario: string, clave: string): Promise<UsuarioEntity> {
        const usuarioEntity = await this.usuarioRepository.consultar(usuario);
        if (!usuarioEntity) {
            throw new Error('Usuario no valido');
        }
        const claveValida = await validatePassword(clave, usuarioEntity.clave);
        if (!claveValida) {
            throw new Error('Usuario no valido');
        }
        return usuarioEntity;
    }
}
