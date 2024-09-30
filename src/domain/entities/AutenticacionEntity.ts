// crear entity de autenticacion
export interface AutenticacionEntity {
    usuario: string;
    token: string;
}

export interface UsuarioJWT {
    id: number;
    usuario: string;
    correo: string;
}
