import { injectable } from 'inversify';
import { ApiClientException } from '@domain/exceptions';
import { MapApiClientRepository } from '@domain/repository';
import {KEY_MAPBOX} from "@util";
import axios from "axios";
import {Geometry} from "@domain/entities/MapEntity";

@injectable()
export class MapApiClient implements MapApiClientRepository {
    async getByDireccion(direccion: string): Promise<Geometry[] | null> {
        try {
            const encodedAddress = encodeURIComponent(direccion);
            const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodedAddress}&country=CO&access_token=${KEY_MAPBOX}`;
            const response = await axios.get(url);
            const data = response.data;
            if (data.features && data.features.length > 0) {
                return data.features.map((feature: any) => ({
                    coordinates: feature.geometry.coordinates,
                    type: feature.geometry.type,
                }));
            } else {
                console.log('No nearby addresses found.');
                return null;
            }
        } catch (err) {
            console.error(err);
            throw new ApiClientException(
                `Error al consultar la fecha de recaudo al api client: \n ${JSON.stringify(err)}`,
            );
        }
    }
}
