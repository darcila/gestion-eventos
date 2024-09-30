import {UsuarioEntity, UsuarioJWT} from "@domain/entities";
import jwt from 'jsonwebtoken';
import {KEY_JWT} from "@util";

export const generarToken = (usuario: UsuarioEntity): string => {
    return jwt.sign({ id: usuario.id, usuario: usuario.usuario, correo: usuario.correo }, KEY_JWT, { expiresIn: '1h' });
}

export const validarJWT = (token: string): UsuarioJWT | null => {
    try {
        return jwt.verify(token, KEY_JWT) as UsuarioJWT;
    } catch (error) {
        // Si hay un error de verificación (token inválido o expirado), devuelve null
        console.error('Error al validar el token JWT:', error);
        return null;
    }
}
