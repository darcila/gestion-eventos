import { AsistenteAppService } from '@application/services';
import { DEPENDENCY_CONTAINER } from '@configuration';
import { FastifyRequest, FastifyReply } from 'fastify';
import { AsistenteGetParam, AsistentePatchParam, AsistentePostParam } from "@domain/entities";

export const asistenteGet = async (req: FastifyRequest<{ Params: AsistenteGetParam }>, reply: FastifyReply): Promise<FastifyReply | void> => {
    const asistenteService = DEPENDENCY_CONTAINER.get(AsistenteAppService);
    const identificacion = req.params.identificacion;
    const response = await asistenteService.getAsistente(identificacion);
    return reply.send({ ...response, id: req.id });
};

export const asistentePost = async (req: FastifyRequest<{ Body: AsistentePostParam }>, reply: FastifyReply): Promise<FastifyReply | void> => {
    const asistenteService = DEPENDENCY_CONTAINER.get(AsistenteAppService);
    const response = await asistenteService.postAsistente(req.body);
    return reply.send({ ...response, id: req.id });
}

export const asistentePatch = async (req: FastifyRequest<{ Body: AsistentePatchParam }>, reply: FastifyReply): Promise<FastifyReply | void> => {
    const asistenteService = DEPENDENCY_CONTAINER.get(AsistenteAppService);
    const response = await asistenteService.patchAsistente(req.body);
    return reply.send({ ...response, id: req.id });
}

export const asistenteDelete = async (req: FastifyRequest<{ Params: AsistenteGetParam }>, reply: FastifyReply): Promise<FastifyReply | void> => {
    const asistenteService = DEPENDENCY_CONTAINER.get(AsistenteAppService);
    const response = asistenteService.deleteAsistente(req.params.identificacion);
    return reply.send({ ...response, id: req.id });
}
