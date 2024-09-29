import { Container } from 'inversify';
import 'reflect-metadata';
import {AsistenteAppService, EventoAppService} from '@application/services';
import { MapApiClient } from '@infrastructure/api-client';
import {IDatabase, IMain} from "pg-promise";
import {TYPES} from "@configuration/Types";
import {AsistentesDao, dbEventos, EventosDao} from "@infrastructure/repositories";
import {AsistentesRepository, EventosRepository, MapApiClientRepository} from "@domain/repository";
import {AsistenteInfraService, EventoInfraService, MapInfraService} from "@infrastructure/services";

export const DEPENDENCY_CONTAINER = new Container();

export const createDependencyContainer = (): void => {
    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPES.PostgresqlEventos).toConstantValue(dbEventos);
    DEPENDENCY_CONTAINER.bind(MapApiClient).toSelf().inSingletonScope();
    // Servicios App
    DEPENDENCY_CONTAINER.bind(EventoAppService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind(AsistenteAppService).toSelf().inSingletonScope();
    // repositorios
    DEPENDENCY_CONTAINER.bind<EventosRepository>(TYPES.EventosRepository).to(EventosDao).inSingletonScope();
    DEPENDENCY_CONTAINER.bind<MapApiClientRepository>(TYPES.MapRepository).to(MapApiClient).inSingletonScope();
    DEPENDENCY_CONTAINER.bind<AsistentesRepository>(TYPES.AsistentesRepository).to(AsistentesDao).inSingletonScope();
    // servicios infraestructura
    DEPENDENCY_CONTAINER.bind(EventoInfraService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind(MapInfraService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind(AsistenteInfraService).toSelf().inSingletonScope();
}
