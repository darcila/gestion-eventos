export interface ResultadoAsistenteConId {
    id: number;
}

export interface AsistenteRespuestaMensaje {
    mensaje: string;
    identificacion?: string; // Usamos 'identificacion' en lugar de 'id'
}

export interface RespuestaAsistente {
    id?: number;
    identificacion: string;
    nombre: string;
    direccion: string;
    telefono: string;
    correo: string;
    categorias: string[];
}
