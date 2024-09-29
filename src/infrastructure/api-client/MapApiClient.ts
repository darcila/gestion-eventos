import { injectable } from 'inversify';
import { ApiClientException } from '@domain/exceptions';
import { MapApiClientRepository } from '@domain/repository';
import { IResponseApiClient } from '@domain/response';
import {KEY_MAPBOX} from "@util";
import axios from "axios";

@injectable()
export class MapApiClient implements MapApiClientRepository {
    async getByDireccion(address: string): Promise<IResponseApiClient<string>> {
        try {
            const encodedAddress = encodeURIComponent(address);
            //https://api.mapbox.com/search/geocode/v6/forward?q=Carrera%2090a%20%2035c%2023,medellin&access_token=pk.eyJ1IjoiZGllZ29hcmNpbGEiLCJhIjoiY20xam5vNDBkMGdqOTJqbjN1ZnNkbWVkaiJ9.7wPozJejJ_zvY1TzECBSxw
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${KEY_MAPBOX}&limit=5`;
            const response = await axios.get(url);
            const data = response.data;
            if (data.features && data.features.length > 0) {
                return data.features.map((feature: any) => ({
                    place_name: feature.place_name,
                    center: feature.center,
                }));
            } else {
                console.log('No nearby addresses found.');
                return {id: address} as IResponseApiClient<string>;
            }

            return {id: address} as IResponseApiClient<string>;
        } catch (err) {
            console.error(err);
            throw new ApiClientException(
                `Error al consultar la fecha de recaudo al api client: \n ${JSON.stringify(err)}`,
            );
        }
    }
}
