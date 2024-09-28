import {EventoAppService} from '@application/services';
import { DEPENDENCY_CONTAINER } from '@configuration';
import { FastifyRequest, FastifyReply } from 'fastify';

interface RouteParams {
    id: number;
}

export const eventoGet = async (req:  FastifyRequest<{ Params: RouteParams }>, reply: FastifyReply): Promise<FastifyReply | void> => {
    const exampleService = DEPENDENCY_CONTAINER.get(EventoAppService);
    const id = req.params.id as number;
    const response = await exampleService.getEvento(id);
    return reply.send({ ...response, id: req.id });
};
