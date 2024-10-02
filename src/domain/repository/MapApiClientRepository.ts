import {Feature, Geometry} from "@domain/entities/MapEntity";

export interface MapApiClientRepository {
    getByDireccion(direccion: string): Promise<Geometry[] | null>;
    getNearbyPlaces(lat: number, lng: number, tipo: string): Promise<Feature[] | null>;
}
