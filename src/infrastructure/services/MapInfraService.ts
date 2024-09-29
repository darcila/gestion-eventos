import { injectable } from 'inversify';
import 'reflect-metadata';
import {DEPENDENCY_CONTAINER, TYPES} from "@configuration";
import {MapApiClientRepository} from "@domain/repository";
import {transformarDireccion} from "@domain/services";

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
}
