import { DEPENDENCY_CONTAINER } from '@configuration';
import { FastifyRequest, FastifyReply } from 'fastify';
import {AutenticarPostParam} from "@domain/entities";
import {AutenticacionAppService} from "@application/services";

export const autenticar = async (req: FastifyRequest<{ Body: AutenticarPostParam }>, reply: FastifyReply): Promise<FastifyReply | void> => {
    const autenticarService = DEPENDENCY_CONTAINER.get(AutenticacionAppService);
    const response = await autenticarService.autenticar(req.body.usuario, req.body.clave);
    return reply.send({ ...response, id: req.id });
};

export const crearUsuario = async (req: FastifyRequest<{ Body: AutenticarPostParam }>, reply: FastifyReply): Promise<FastifyReply | void> => {
    const autenticarService = DEPENDENCY_CONTAINER.get(AutenticacionAppService);
    const response = await autenticarService.crearUsuario(req.body.usuario, req.body.clave);
    return reply.send({ ...response, id: req.id });
};
