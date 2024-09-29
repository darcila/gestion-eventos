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
