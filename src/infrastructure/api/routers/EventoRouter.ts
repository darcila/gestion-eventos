import {EventoAppService} from '@application/services';
import { DEPENDENCY_CONTAINER } from '@configuration';
import { FastifyRequest, FastifyReply } from 'fastify';
import {EventoGetParam, EventoPatchParam, EventoPostParam} from "@domain/entities";

export const eventoGet = async (req:  FastifyRequest<{ Params: EventoGetParam }>, reply: FastifyReply): Promise<FastifyReply | void> => {
    const eventoService = DEPENDENCY_CONTAINER.get(EventoAppService);
    const id = req.params.id as number;
    const response = await eventoService.getEvento(id);
    return reply.send({ ...response, id: req.id });
};

export const eventoPost = async (req: FastifyRequest<{ Body: EventoPostParam }>, reply: FastifyReply): Promise<FastifyReply | void> => {
    const eventoService = DEPENDENCY_CONTAINER.get(EventoAppService);
    const response = await eventoService.postEvento(req.body);
    return reply.send({ ...response, id: req.id });
}

export const eventoPatch = async (req: FastifyRequest<{Body: EventoPatchParam}>, reply: FastifyReply): Promise<FastifyReply | void> => {
    const eventoService = DEPENDENCY_CONTAINER.get(EventoAppService);
    const response = await eventoService.patchEvento(req.body);
    return reply.send({ ...response, id: req.id });
}

export const eventoDelete = async (req: FastifyRequest<{ Params: EventoGetParam }>, reply: FastifyReply): Promise<FastifyReply | void> => {
    console.log('Evento DELETE', req);
    const eventoService = DEPENDENCY_CONTAINER.get(EventoAppService);
    const response = eventoService.deleteEvento(req.params.id);
    return reply.send({ ...response, id: req.id });
}
