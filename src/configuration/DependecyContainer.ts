import { Container } from 'inversify';
import 'reflect-metadata';
import {EventoAppService} from '@application/services';
import { MapApiClient } from '@infrastructure/api-client';
import {IDatabase, IMain} from "pg-promise";
import {TYPES} from "@configuration/Types";
import {dbEventos, EventosDao} from "@infrastructure/repositories";
import {EventosRepository} from "@domain/repository";

export const DEPENDENCY_CONTAINER = new Container();

export const createDependencyContainer = (): void => {
    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPES.PostgresqlEventos).toConstantValue(dbEventos);
    DEPENDENCY_CONTAINER.bind(EventoAppService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind(MapApiClient).toSelf().inSingletonScope();
    // repositorios
    DEPENDENCY_CONTAINER.bind<EventosRepository>(TYPES.EventosRepository).to(EventosDao).inSingletonScope();
}
