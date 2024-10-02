import {
    eventoDelete,
    eventoGet,
    eventoPost,
    eventoPatch,
    eventoLugarCercano,
    eventoCercano,
    totalAsistentes, subirEvento, estadoSubirEvento
} from './EventoRouter';
import {FastifyInstance} from 'fastify';
import {
    autenticacionSchema,
    createAsistenteSchema,
    createEventoSchema,
    createReservaSchema,
    deleteAsistenteSchema,
    deleteEventoSchema,
    deleteReservaSchema,
    eventoAsistetesGetSchema,
    eventoCercanosGetSchema,
    eventoGetSchema,
    eventoLugaresGetSchema,
    getAsistentePorIdentificacionSchema,
    getProcessStatusSchema,
    getReservaSchema,
    pathEventoSchema,
    updateAsistenteSchema,
    updateReservaSchema,
    uploadExcelSchema
} from "@infrastructure/api/swagger";
import {
    asistenteDelete,
    asistenteGet,
    asistentePatch,
    asistentePost
} from "@infrastructure/api/routers/AsistenteRouter";
import {reservaDelete, reservaGet, reservaPatch, reservaPost} from "@infrastructure/api/routers/ReservaRouter";
import {autenticar} from "@infrastructure/api/routers/AutenticacionRouter";

export const initRoutes = async (application: FastifyInstance): Promise<void> => {
    const pathEvento = '/evento';
    application.get(`${pathEvento}/:id`, { schema: eventoGetSchema }, eventoGet);
    application.post(`${pathEvento}`, { schema: createEventoSchema }, eventoPost);
    application.patch(`${pathEvento}`, { schema: pathEventoSchema }, eventoPatch);
    application.delete(`${pathEvento}/:id`, { schema: deleteEventoSchema }, eventoDelete);
    application.get(`${pathEvento}/lugares`, { schema: eventoLugaresGetSchema }, eventoLugarCercano);
    application.get(`${pathEvento}/cerca`, { schema: eventoCercanosGetSchema }, eventoCercano);
    application.get(`${pathEvento}/:id/asistentes`, { schema: eventoAsistetesGetSchema }, totalAsistentes);
    application.post(`${pathEvento}/subir`, { schema: uploadExcelSchema },subirEvento);
    application.get(`${pathEvento}/status/:jobId`, {schema: getProcessStatusSchema}, estadoSubirEvento);


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
