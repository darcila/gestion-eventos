import { AsistenteAppService } from '@application/services';
import { DEPENDENCY_CONTAINER } from '@configuration';
import { FastifyRequest, FastifyReply } from 'fastify';
import { AsistenteGetParam, AsistentePatchParam, AsistentePostParam } from "@domain/entities";
import { ValidationError } from 'ajv';

export const asistenteGet = async (req: FastifyRequest<{ Params: AsistenteGetParam }>, reply: FastifyReply): Promise<FastifyReply | void> => {
    const asistenteService = DEPENDENCY_CONTAINER.get(AsistenteAppService);
    const identificacion = req.params.identificacion;
    const response = await asistenteService.getAsistente(identificacion);
    return reply.send({ ...response, id: req.id });
};

export const asistentePost = async (req: FastifyRequest<{ Body: AsistentePostParam }>, reply: FastifyReply): Promise<FastifyReply | void> => {
    try {
        const asistenteService = DEPENDENCY_CONTAINER.get(AsistenteAppService);
        const response = await asistenteService.postAsistente(req.body);
        return reply.send({ ...response, id: req.id });
    } catch (error) {
        if (error instanceof ValidationError) { // Importar ValidationError desde 'ajv'
            return reply.status(400).send({
                statusCode: 400,
                error: 'Bad Request',
                message: error.message, //  Mensaje de error de la validación
                details: error.validation // Detalles de la validación (opcional)
            });
        }
    }
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
