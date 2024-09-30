import { Container } from 'inversify';
import 'reflect-metadata';
import {AsistenteAppService, EventoAppService, ReservaAppService} from '@application/services';
import { MapApiClient } from '@infrastructure/api-client';
import {IDatabase, IMain} from "pg-promise";
import {TYPES} from "@configuration/Types";
import {AsistentesDao, dbEventos, EventosDao, ReservasDao, UsuariosDao} from "@infrastructure/repositories";
import {
    AsistentesRepository,
    EventosRepository,
    MapApiClientRepository,
    ReservasRepository,
    UsuariosRepository
} from "@domain/repository";
import {
    AsistenteInfraService,
    EventoInfraService,
    MapInfraService,
    ReservaInfraService
} from "@infrastructure/services";
import {AutenticacionAppService} from "@application/services/AutenticacionAppService";

export const DEPENDENCY_CONTAINER = new Container();

export const createDependencyContainer = (): void => {
    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPES.PostgresqlEventos).toConstantValue(dbEventos);
    DEPENDENCY_CONTAINER.bind(MapApiClient).toSelf().inSingletonScope();
    // Servicios App
    DEPENDENCY_CONTAINER.bind(EventoAppService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind(AsistenteAppService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind(ReservaAppService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind(AutenticacionAppService).toSelf().inSingletonScope();
    // repositorios
    DEPENDENCY_CONTAINER.bind<EventosRepository>(TYPES.EventosRepository).to(EventosDao).inSingletonScope();
    DEPENDENCY_CONTAINER.bind<MapApiClientRepository>(TYPES.MapRepository).to(MapApiClient).inSingletonScope();
    DEPENDENCY_CONTAINER.bind<AsistentesRepository>(TYPES.AsistentesRepository).to(AsistentesDao).inSingletonScope();
    DEPENDENCY_CONTAINER.bind<ReservasRepository>(TYPES.ReservasRepository).to(ReservasDao).inSingletonScope();
    DEPENDENCY_CONTAINER.bind<UsuariosRepository>(TYPES.UsuariosRepository).to(UsuariosDao).inSingletonScope();
    // servicios infraestructura
    DEPENDENCY_CONTAINER.bind(EventoInfraService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind(MapInfraService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind(AsistenteInfraService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind(ReservaInfraService).toSelf().inSingletonScope();
}
