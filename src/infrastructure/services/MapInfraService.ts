import { injectable } from 'inversify';
import 'reflect-metadata';
import {DEPENDENCY_CONTAINER, TYPES} from "@configuration";
import {MapApiClientRepository} from "@domain/repository";
import {transformarDireccion} from "@domain/services";
import {EventoLugarCercano} from "@domain/entities";

@injectable()
export class MapInfraService {
    private mapRepository = DEPENDENCY_CONTAINER.get<MapApiClientRepository>(TYPES.MapRepository);

    async consultarUbicacion(direccion: string, ciudad: string): Promise<number[]> {
        const ubicacion = transformarDireccion(direccion);
        const response = await this.mapRepository.getByDireccion(`${ubicacion},${ciudad}`);
        if (response) {
            return response[0].coordinates;
        }
        throw new Error('Ubicación no encontrada');
    }
    async consultarLugaresCercanos(lat: number, lng: number, tipo: string): Promise<EventoLugarCercano[]> {
        const response = await this.mapRepository.getNearbyPlaces(lat, lng, tipo);
        if (response) {
            const lugares: EventoLugarCercano[] = [];
            response.forEach((lugar) => {
                lugares.push({
                    nombre: lugar.properties.name,
                    direccion: lugar.properties.full_address,
                });
            });
            return lugares;
        }
        throw new Error('Ubicación no encontrada');
    }
}
