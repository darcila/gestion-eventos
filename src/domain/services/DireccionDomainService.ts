export const  transformarDireccion = (direccionOriginal: string): string => {
    return  direccionOriginal.replace(/[^a-zA-Z0-9\s]/g, "");
}
