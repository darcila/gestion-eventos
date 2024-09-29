export const validarCorreo = (correo: string): string => {
    const regExp = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    if (!correo) {
        throw new Error('El correo es requerido');
    }
    if (!regExp.test(correo)) {
        throw new Error('El correo no tiene un formato válido');
    }
    return correo;
}
