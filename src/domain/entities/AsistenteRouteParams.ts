export interface AsistenteGetParam {
    identificacion: string; // Usamos 'identificacion' en lugar de 'id'
}

export interface AsistentePostParam {
    identificacion: string;
    nombre: string;
    direccion: string;
    telefono: string;
    correo: string;
    categorias: string[];
    ciudad: string;
}

export interface AsistentePatchParam {
    identificacion: string; // Usamos 'identificacion' en lugar de 'id'
    nombre?: string;
    direccion?: string;
    telefono?: string;
    correo?: string;
    categorias?: string[];
}
