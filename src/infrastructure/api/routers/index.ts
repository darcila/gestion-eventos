import {eventoDelete, eventoGet, eventoPost, eventoPatch} from './EventoRouter';
import { FastifyInstance } from 'fastify';
import {
    autenticacionSchema, crearUsuarioSchema,
    createAsistenteSchema,
    createEventoSchema, createReservaSchema, deleteAsistenteSchema,
    deleteEventoSchema, deleteReservaSchema,
    eventoGetSchema, getAsistentePorIdentificacionSchema, getReservaSchema,
    pathEventoSchema, updateAsistenteSchema, updateReservaSchema
} from "@infrastructure/api/swagger";
import {
    asistenteDelete,
    asistenteGet,
    asistentePatch,
    asistentePost
} from "@infrastructure/api/routers/AsistenteRouter";
import {reservaDelete, reservaGet, reservaPatch, reservaPost} from "@infrastructure/api/routers/ReservaRouter";
import {autenticar, crearUsuario} from "@infrastructure/api/routers/AutenticacionRouter";

export const initRoutes = async (application: FastifyInstance): Promise<void> => {
    const pathEvento = '/evento';
    application.get(`${pathEvento}/:id`, { schema: eventoGetSchema }, eventoGet);
    application.post(`${pathEvento}`, { schema: createEventoSchema }, eventoPost);
    application.patch(`${pathEvento}`, { schema: pathEventoSchema }, eventoPatch);
    application.delete(`${pathEvento}/:id`, { schema: deleteEventoSchema }, eventoDelete);

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
    application.post(`${pathAutenticacion}/crear`, { schema: crearUsuarioSchema }, crearUsuario);

};
