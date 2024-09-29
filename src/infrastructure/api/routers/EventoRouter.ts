import {EventoAppService} from '@application/services';
import { DEPENDENCY_CONTAINER } from '@configuration';
import { FastifyRequest, FastifyReply } from 'fastify';
import {EventoGetParam} from "@domain/entities";

export const eventoGet = async (req:  FastifyRequest<{ Params: EventoGetParam }>, reply: FastifyReply): Promise<FastifyReply | void> => {
    const exampleService = DEPENDENCY_CONTAINER.get(EventoAppService);
    const id = req.params.id as number;
    const response = await exampleService.getEvento(id);
    return reply.send({ ...response, id: req.id });
};

export const eventoPost = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    console.log('Evento POST', req);
    return reply.send({ message: 'Evento POST' });
}

export const eventoPut = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    console.log('Evento PUT', req);
    return reply.send({ message: 'Evento PUT' });
}

export const eventoDelete = async (req: FastifyRequest<{ Params: EventoGetParam }>, reply: FastifyReply): Promise<FastifyReply | void> => {
    console.log('Evento DELETE', req);
    return reply.send({ message: 'Evento DELETE' });
}
