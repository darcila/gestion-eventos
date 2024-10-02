export class UsuarioEntity {
    id?: number;
    usuario: string;
    clave: string;
    estado: boolean;
    nombre?: string;
    apellido?: string;
    correo?: string;
    rol: string;
    creado?: Date;
    actualizado?: Date;

    constructor(
        usuario: string,
        clave: string,
        estado: boolean,
        rol: string,
        nombre?: string,
        apellido?: string,
        correo?: string,
        creado?: Date,
        actualizado?: Date,
        id?: number,
    ) {
        this.id = id;
        this.usuario = usuario;
        this.clave = clave;
        this.estado = estado;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.rol = rol;
        this.creado = creado;
        this.actualizado = actualizado;
    }

    static create(
        usuario: string,
        clave: string,
        estado: boolean = true, // Estado activo por defecto
        rol: string = 'usuario', // Rol 'usuario' por defecto
        nombre?: string,
        apellido?: string,
        correo?: string,
        creado?: Date,
        actualizado?: Date,
        id?: number,
    ): UsuarioEntity {
        return new UsuarioEntity(
            usuario, clave, estado, rol, nombre, apellido, correo,
            creado, actualizado, id
        );
    }
}
