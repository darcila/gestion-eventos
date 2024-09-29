import {Geometry} from "@domain/entities/MapEntity";

export interface MapApiClientRepository {
    getByDireccion(direccion: string): Promise<Geometry[] | null>;
}
