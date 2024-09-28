import { Container } from 'inversify';
import 'reflect-metadata';
import {EventoAppService} from '@application/services';
import { ExampleApiClient } from '@infrastructure/api-client';

export const DEPENDENCY_CONTAINER = new Container();

export const createDependencyContainer = (): void => {
    DEPENDENCY_CONTAINER.bind(EventoAppService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind(ExampleApiClient).toSelf().inSingletonScope();
}
