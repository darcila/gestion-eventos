import { AsistenteEntity } from "@domain/entities";

export interface AsistentesRepository {
    guardar(asistente: AsistenteEntity): Promise<number>; // Guarda un asistente y devuelve su ID
    consultarPorIdentificacion(identificacion: string): Promise<AsistenteEntity | null>; // Consulta un asistente por su identificación
    consultarPorId(id: number): Promise<AsistenteEntity | null>; // Consulta un asistente por su identificación
    actualizar(asistente: AsistenteEntity): Promise<number | null | undefined>; // Actualiza un asistente y devuelve su ID o null si falla
    eliminar(identificacion: string): Promise<number | null | undefined>; // Elimina un asistente por su identificación y devuelve su ID o null si falla
}
