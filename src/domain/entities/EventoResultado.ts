export interface ResultadoConId {
    id: number;
}

export interface EventoRespuestaMensaje {
    mensaje: string;
    id?: number;
}

export interface RespuestaEvento {
    id?: number;
    nombre: string;
    descripcion: string;
    lugar: string;
    ciudad: string;
    fecha: Date;
    hora: string;
    valor?: number;
    capacidad?: number;
}


export interface EventoLugarCercano {
    nombre: string;
    direccion: string;
    fecha?: Date;
    valor?: number;
    distancia?: number;
}

export interface EventoAsistentes {
    id: number;
    nombre: string;
    descripcion: string;
    lugar: string;
    ciudad: string;
    fecha: Date;
    hora: string;
    totalAsistentes: number;
}
