import { ReservaAppService } from '@application/services'; // Asegúrate de tener este servicio definido
import { DEPENDENCY_CONTAINER } from '@configuration';
import { FastifyRequest, FastifyReply } from 'fastify';
import {
    ReservaGetParam,
    ReservaPostParam,
    ReservaPatchParam
} from "@domain/entities"; // Asegúrate de tener estas entidades definidas

export const reservaGet = async (req: FastifyRequest<{ Params: ReservaGetParam }>, reply: FastifyReply): Promise<FastifyReply | void> => {
    const reservaService = DEPENDENCY_CONTAINER.get(ReservaAppService);
    const id = req.params.id;
    const response = await reservaService.getReserva(id);
    return reply.send({ ...response, id: req.id });
};

export const reservaPost = async (req: FastifyRequest<{ Body: ReservaPostParam }>, reply: FastifyReply): Promise<FastifyReply | void> => {
    const reservaService = DEPENDENCY_CONTAINER.get(ReservaAppService);
    const response = await reservaService.postReserva(req.body);
    return reply.send({ ...response, id: req.id });
}

export const reservaPatch = async (req: FastifyRequest<{ Params: ReservaGetParam, Body: ReservaPatchParam }>, reply: FastifyReply): Promise<FastifyReply | void> => {
    const reservaService = DEPENDENCY_CONTAINER.get(ReservaAppService);
    const id = req.params.id;
    const response = await reservaService.patchReserva(id, req.body);
    return reply.send({ ...response, id: req.id });
}

export const reservaDelete = async (req: FastifyRequest<{ Params: ReservaGetParam }>, reply: FastifyReply): Promise<FastifyReply | void> => {
    const reservaService = DEPENDENCY_CONTAINER.get(ReservaAppService);
    const id = req.params.id
    const response = await reservaService.deleteReserva(id);
    return reply.send({ ...response, id: req.id });
}
