import {eventoDelete, eventoGet, eventoPost, eventoPatch} from './EventoRouter';
import { FastifyInstance } from 'fastify';
import {
    createAsistenteSchema,
    createEventoSchema, deleteAsistenteSchema,
    deleteEventoSchema,
    eventoGetSchema, getAsistentePorIdentificacionSchema,
    pathEventoSchema, updateAsistenteSchema
} from "@infrastructure/api/swagger";
import {
    asistenteDelete,
    asistenteGet,
    asistentePatch,
    asistentePost
} from "@infrastructure/api/routers/AsistenteRouter";

export const initRoutes = async (application: FastifyInstance): Promise<void> => {
    const pathEvento = '/evento';
    application.get(`${pathEvento}/:id`, { schema: eventoGetSchema }, eventoGet);
    application.post(`${pathEvento}/`, { schema: createEventoSchema }, eventoPost);
    application.patch(`${pathEvento}/`, { schema: pathEventoSchema }, eventoPatch);
    application.delete(`${pathEvento}/:id`, { schema: deleteEventoSchema }, eventoDelete);

    const pathAsistente = '/asistente';

    application.get(`${pathAsistente}/:identificacion`, { schema: getAsistentePorIdentificacionSchema }, asistenteGet);
    application.post(`${pathAsistente}`, { schema: createAsistenteSchema }, asistentePost);
    application.patch(`${pathAsistente}`, { schema: updateAsistenteSchema }, asistentePatch);
    application.delete(`${pathAsistente}/:identificacion`, { schema: deleteAsistenteSchema }, asistenteDelete);
};
