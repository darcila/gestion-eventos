import {eventoDelete, eventoGet, eventoPost, eventoPut} from './EventoRouter';
import { FastifyInstance } from 'fastify';
import {eventoGetSchema} from "@infrastructure/api/swagger";

export const initRoutes = async (application: FastifyInstance): Promise<void> => {
    const path = '/evento';
    application.get(`${path}/:id`, { schema: eventoGetSchema }, eventoGet);
    application.post(`${path}/`, eventoPost);
    application.put(`${path}/`, eventoPut);
    application.delete(`${path}/:id`, eventoDelete);
};
