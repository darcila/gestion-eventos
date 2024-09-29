import { injectable } from 'inversify';
import 'reflect-metadata';
import {EventosRepository} from "@domain/repository";

@injectable()
export class EventosDao implements EventosRepository {
    actualizar(example: string): Promise<void> {
        console.log('actualizar', example);
        return Promise.resolve(undefined);
    }

    consultar(example: string): Promise<void> {
        console.log('actualizar', example);
        return Promise.resolve(undefined);
    }

    eliminar(example: string): Promise<void> {
        console.log('actualizar', example);
        return Promise.resolve(undefined);
    }

    guardar(example: string): Promise<void> {
        console.log('actualizar', example);
        return Promise.resolve(undefined);
    }
}
