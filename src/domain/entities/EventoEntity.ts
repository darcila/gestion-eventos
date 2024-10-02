export class EventoEntity {
    id?: number;
    nombre: string;
    descripcion: string; // Opcional
    lugar: string; // Opcional
    ciudad: string; // Opcional
    fecha: Date; // Opcional
    hora: string; // Opcional (asumiendo que 'time' se almacena como string)
    categoria?: any; // Opcional (ajusta el tipo según cómo uses 'jsonb')
    capacidad?: number; // Opcional
    valor?: number; // Opcional
    ubicacion?: number[]; // Opcional (asumiendo 'point')
    estado?: string; // Opcional
    visible?: boolean; // Opcional
    creado?: Date; // Opcional
    actualizado?: Date; // Opcional
    eliminado?: Date; // Opcional

    constructor(
        nombre: string,
        descripcion: string,
        lugar: string,
        ciudad: string,
        fecha: Date,
        hora: string,
        categoria?: any,
        capacidad?: number,
        valor?: number,
        ubicacion?: number[],
        estado?: string,
        visible?: boolean,
        creado?: Date,
        actualizado?: Date,
        eliminado?: Date,
        id?: number,
    ) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.lugar = lugar;
        this.ciudad = ciudad;
        this.fecha = fecha;
        this.hora = hora;
        this.categoria = categoria;
        this.capacidad = capacidad;
        this.valor = valor;
        this.ubicacion = ubicacion;
        this.estado = estado;
        this.visible = visible;
        this.creado = creado;
        this.actualizado = actualizado;
        this.eliminado = eliminado;
    }

    static create(
        nombre: string,
        descripcion: string,
        lugar: string,
        ciudad: string,
        fecha: Date,
        hora: string,
        categoria?: any,
        capacidad?: number,
        valor?: number,
        ubicacion?: number[],
        estado?: string,
        visible?: boolean,
        creado?: Date,
        actualizado?: Date,
        eliminado?: Date,
        id?: number,
    ): EventoEntity {
        return new EventoEntity(
            nombre, descripcion, lugar, ciudad, fecha, hora, categoria,
            capacidad, valor, ubicacion, estado, visible, creado, actualizado, eliminado, id
        );
    }
    static fromJson(json: any): EventoEntity {
        return new EventoEntity(
            json.nombre, json.descripcion, json.lugar, json.ciudad, json.fecha, json.hora,
            json.categoria, json.capacidad, json.valor, json.ubicacion, json.estado, json.visible,
            json.creado, json.actualizado, json.eliminado, json.id
        );
    }
}
