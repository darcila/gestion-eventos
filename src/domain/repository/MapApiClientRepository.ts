import { IResponseApiClient } from '@domain/response';

export interface MapApiClientRepository {
    getByDireccion(address: string): Promise<IResponseApiClient<string>>;
}
