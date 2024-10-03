import 'reflect-metadata';
import {createDependencyContainer, DEPENDENCY_CONTAINER, TYPES} from "@configuration";
import {
    connectDB,
    consulta,
    dataAsistenteCreado,
    dataResponseAsistente,
    dbEventos,
    mockAsistente,
    usuarioAuth
} from "./data";
import {IDatabase, IMain} from "pg-promise";
import {MapApiClientRepository} from "@domain/repository";
import {application} from "@infrastructure/api/Application";
import {MapApiClientFakeRepository} from "./__moks__";
import {AutenticacionAppService} from "./__moks__/AutenticationServiceMock";
import {validarJWT} from "@domain/services";
//import process from "process";
jest.mock('@domain/services/TokenDomainServices');

export const mockAutenticarService = {
    validarToken: jest.fn()
};

describe('AsistenteAppService', () => {
    beforeAll(() => {

        if (DEPENDENCY_CONTAINER) {
            DEPENDENCY_CONTAINER.unbindAll();
        }
        createDependencyContainer();
        const pgEventos = connectDB(dbEventos());
        DEPENDENCY_CONTAINER.rebind<IDatabase<IMain>>(TYPES.PostgresqlEventos).toConstantValue(pgEventos);
        DEPENDENCY_CONTAINER.rebind<MapApiClientRepository>(TYPES.MapRepository).to(MapApiClientFakeRepository).inSingletonScope();

        DEPENDENCY_CONTAINER.get.bind(AutenticacionAppService)
    });
    it('Asistente consultar', async () => {
        (validarJWT as jest.Mock).mockReturnValue({
            id: usuarioAuth.id,
            usuario: usuarioAuth.usuario,
            correo: usuarioAuth.correo,
        });
        //const prefix = `/${process.env.DOMAIN}/${process.env.SERVICE_NAME}`;
        //console.log(application);
        const response = await application.inject({
            method: 'GET',
            headers: {authorization: 'Bearer token'},
            //url: `${prefix}/asistente/12345679`,
            url: `${consulta}/asistente/12345679`,
        });
        const bodyResponse = JSON.parse(response.body);
        expect(response.statusCode).toBe(200);
        expect(bodyResponse).toEqual(dataResponseAsistente);
    });
    afterAll(() => {
        application.close();
    });

    it('Asistente Crear ', async () => {
        (validarJWT as jest.Mock).mockReturnValue({
            id: usuarioAuth.id,
            usuario: usuarioAuth.usuario,
            correo: usuarioAuth.correo,
        });
        const response = await application.inject({
            method: 'POST',
            headers: {authorization: 'Bearer token'},
            url: `${consulta}/asistente`,
            body: mockAsistente,
        });
        const bodyResponse = JSON.parse(response.body);
        expect(response.statusCode).toBe(200);
        expect(bodyResponse).toEqual(dataAsistenteCreado);
    });

});
