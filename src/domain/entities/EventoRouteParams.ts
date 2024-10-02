export interface EventoGetParam {
    id: number;
}

export interface EventoPostParam {
    nombre: string;
    descripcion: string;
    lugar: string;
    ciudad: string;
    fecha: Date;
    hora: string;
    categoria?: any;
    capacidad?: number;
    valor?: number;
}

export interface EventoPatchParam {
    id: number;
    nombre?: string;
    fecha?: Date;
    hora?: string;
    capacidad?: number;
    valor?: number;
}

export interface EventoConsultaLugar {
    tipo: string;
    evento: number;
}

export interface EventoCercanos {
    direccion: string;
    distancia: number;
    ciudad: string;
}
