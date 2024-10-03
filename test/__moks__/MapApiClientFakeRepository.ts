import {injectable} from "inversify";
import 'reflect-metadata';
import {MapApiClientRepository} from "@domain/repository";
import {Feature, Geometry} from "@domain/entities/MapEntity";

@injectable()
export class MapApiClientFakeRepository implements MapApiClientRepository {
    getByDireccion(_: string): Promise<Geometry[] | null> {
        const geometry: Geometry[] = [
            {
                type: 'Point',
                coordinates: [-74.08175, 4.60971],
            },
        ];
        return Promise.resolve(geometry);
    }

    getNearbyPlaces(_lat: number, _lng: number, _tipo: string): Promise<Feature[] | null> {
        const feature: Feature[] = [
            {
                geometry: {
                    type: 'Point',
                    coordinates: [-74.08175, 4.60971],
                },
                properties: {
                    full_address: 'Calle 35',
                    name: 'Cafeteria los yuyos',
                },
            },
            {
                geometry: {
                    type: 'Point',
                    coordinates: [-74.08175, 4.60971],
                },
                properties: {
                    full_address: 'CAlle 42',
                    name: 'Cafe los 30',
                },
            },
        ];
        return Promise.resolve(feature);
    }

}
