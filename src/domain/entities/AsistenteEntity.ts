export class AsistenteEntity {
    id?: number;
    identificacion: string;
    nombre: string;
    direccion: string;
    telefono: string;
    correo: string;
    categorias: any;
    ciudad: string;
    ubicacion?: number[];
    creado?: Date;
    actualizado?: Date;
    eliminado?: Date;

    constructor(
        identificacion: string,
        nombre: string,
        direccion: string,
        telefono: string,
        correo: string,
        categorias: any,
        ciudad: string,
        ubicacion?: number[],
        creado?: Date,
        actualizado?: Date,
        eliminado?: Date,
        id?: number,
    ) {
        this.id = id;
        this.identificacion = identificacion;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.correo = correo;
        this.categorias
            = categorias;
        this.ciudad = ciudad;
        this.ubicacion = ubicacion;
        this.creado = creado;
        this.actualizado = actualizado;
        this.eliminado = eliminado;
    }

    static create(
        identificacion: string,
        nombre: string,
        direccion: string,
        telefono: string,
        correo: string,
        categorias: any,
        ciudad: string,
        ubicacion?: number[],
        creado?: Date,
        actualizado?: Date,
        eliminado?: Date,
        id?: number,
    ): AsistenteEntity {
        return new AsistenteEntity(
            identificacion, nombre, direccion, telefono, correo, categorias, ciudad, ubicacion,
            creado, actualizado, eliminado, id
        );
    }
}
