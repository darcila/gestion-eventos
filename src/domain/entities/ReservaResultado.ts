export interface ResultadoReservaConId {
    id: number;
}

export interface ReservaRespuestaMensaje {
    mensaje: string;
    id?: number;
}

export interface RespuestaReserva {
    id?: number;
    asistente_id: number;
    evento_id: number;
    fecha_reserva: string; // O Date, según cómo lo manejes en tu aplicación
    cantidad_boletos: number;
    estado: string;
}
