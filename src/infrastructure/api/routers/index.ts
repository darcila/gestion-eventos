import { eventoGet } from './EventoRouter';
import { FastifyInstance } from 'fastify';

export const initRoutes = async (application: FastifyInstance): Promise<void> => {
    application.get(`/:id`, eventoGet);
    //application.post(`/`, eventoPost);
};
