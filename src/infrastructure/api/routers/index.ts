import {
    eventoDelete,
    eventoGet,
    eventoPost,
    eventoPatch,
    eventoLugarCercano,
    eventoCercano,
    totalAsistentes, subirEvento, estadoSubirEvento
} from './EventoRouter';
import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import {
    autenticacionSchema,
    createAsistenteSchema,
    createEventoSchema, createReservaSchema, deleteAsistenteSchema,
    deleteEventoSchema, deleteReservaSchema, eventoAsistetesGetSchema, eventoCercanosGetSchema,
    eventoGetSchema, eventoLugaresGetSchema, getAsistentePorIdentificacionSchema, getReservaSchema,
    pathEventoSchema, updateAsistenteSchema, updateReservaSchema
} from "@infrastructure/api/swagger";
import {
    asistenteDelete,
    asistenteGet,
    asistentePatch,
    asistentePost
} from "@infrastructure/api/routers/AsistenteRouter";
import {reservaDelete, reservaGet, reservaPatch, reservaPost} from "@infrastructure/api/routers/ReservaRouter";
import {autenticar} from "@infrastructure/api/routers/AutenticacionRouter";
import {DEPENDENCY_CONTAINER} from "@configuration";
import {AutenticacionAppService} from "@application/services";
import {PREFIX} from "@util";

export const initRoutes = async (application: FastifyInstance): Promise<void> => {
    application.addHook('preValidation', async (request: FastifyRequest, reply: FastifyReply) => {
        if (request.url === `${PREFIX}/autenticar`) {
            return; // Skip validation for this route
        }
        try {
            const autenticarService = DEPENDENCY_CONTAINER.get(AutenticacionAppService);
            const estado = await autenticarService.validarToken(request.headers.authorization);
            if (!estado) {
                reply.status(401).send({ error: 'Unauthorized', message: 'Token invalido' });
            }
        } catch (err) {
            reply.status(401).send({ error: 'Unauthorized', message: 'Token invalido' });
        }
    });

    const pathEvento = '/evento';
    application.get(`${pathEvento}/:id`, { schema: eventoGetSchema }, eventoGet);
    application.post(`${pathEvento}`, { schema: createEventoSchema }, eventoPost);
    application.patch(`${pathEvento}`, { schema: pathEventoSchema }, eventoPatch);
    application.delete(`${pathEvento}/:id`, { schema: deleteEventoSchema }, eventoDelete);
    application.get(`${pathEvento}/lugares`, { schema: eventoLugaresGetSchema }, eventoLugarCercano);
    application.get(`${pathEvento}/cerca`, { schema: eventoCercanosGetSchema }, eventoCercano);
    application.get(`${pathEvento}/:id/asistentes`, { schema: eventoAsistetesGetSchema }, totalAsistentes);
    application.post(`${pathEvento}/subir`, subirEvento);
    application.get(`${pathEvento}/status/:jobId`, estadoSubirEvento);


    const pathAsistente = '/asistente';

    application.get(`${pathAsistente}/:identificacion`, { schema: getAsistentePorIdentificacionSchema }, asistenteGet);
    application.post(`${pathAsistente}`, { schema: createAsistenteSchema }, asistentePost);
    application.patch(`${pathAsistente}`, { schema: updateAsistenteSchema }, asistentePatch);
    application.delete(`${pathAsistente}/:identificacion`, { schema: deleteAsistenteSchema }, asistenteDelete);

    const pathReserva = '/reserva';

    application.get(`${pathReserva}/:id`, { schema: getReservaSchema }, reservaGet);
    application.post(`${pathReserva}`, { schema: createReservaSchema }, reservaPost);
    application.patch(`${pathReserva}`, { schema: updateReservaSchema }, reservaPatch);
    application.delete(`${pathReserva}/:id`, { schema: deleteReservaSchema }, reservaDelete);

    const pathAutenticacion = '/autenticar';
    application.post(`${pathAutenticacion}`, { schema: autenticacionSchema } ,autenticar);
    //application.post(`${pathAutenticacion}/crear`, { schema: crearUsuarioSchema }, crearUsuario);

};
