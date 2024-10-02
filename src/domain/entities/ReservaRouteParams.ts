export interface ReservaGetParam {
    id: number;
}

export interface ReservaPostParam {
    asistente_id: number;
    evento_id: number;
    cantidad_boletos: number;
}

export interface ReservaPatchParam {
    id: number;
    cantidad_boletos?: number;
    estado?: string;
}
