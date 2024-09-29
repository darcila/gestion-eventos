export interface EventosRepository {
    guardar(example: string): Promise<void>;
    consultar(example: string): Promise<void>;
    actualizar(example: string): Promise<void>;
    eliminar(example: string): Promise<void>;
}
