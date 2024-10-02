import {EventoAppService} from '@application/services';
import { DEPENDENCY_CONTAINER } from '@configuration';
import { FastifyRequest, FastifyReply } from 'fastify';
import {
    EventoCercanos,
    EventoConsultaLugar,
    EventoGetParam,
    EventoPatchParam,
    EventoPostParam
} from "@domain/entities";
import path from 'path';
import * as fs from "node:fs";
import {fileQueue} from "@infrastructure/colas";

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
export const eventoLugarCercano = async (req: FastifyRequest<{ Querystring: EventoConsultaLugar }>, reply: FastifyReply): Promise<FastifyReply | void> => {
    const eventoService = DEPENDENCY_CONTAINER.get(EventoAppService);
    const response = await eventoService.listarLugaresCercanos(req.query.tipo, req.query.evento);
    return reply.send({ ...response, id: req.id });
}

export const eventoCercano = async (req: FastifyRequest<{ Querystring: EventoCercanos }>, reply: FastifyReply): Promise<FastifyReply | void> => {
    const eventoService = DEPENDENCY_CONTAINER.get(EventoAppService);
    const response = await eventoService.listarEventosCercanos(req.query.direccion, req.query.distancia, req.query.ciudad);
    return reply.send({ ...response, id: req.id });
}

export const totalAsistentes = async (req: FastifyRequest<{ Params: EventoGetParam }>, reply: FastifyReply): Promise<FastifyReply | void> => {
    const eventoService = DEPENDENCY_CONTAINER.get(EventoAppService);
    const id = req.params.id as number;
    const response = await eventoService.asistentesEvento(id);
    return reply.send({ ...response, id: req.id });
}

export const estadoSubirEvento = async (req: FastifyRequest<{ Params: { jobId: string } }>, reply: FastifyReply): Promise<FastifyReply | void> => {
    const job = await fileQueue.getJob(req.params.jobId);
    if (!job) {
        return reply.code(404).send({ error: 'Job no encontrado' });
    }
    let status = 'en cola';
    if (await job.isCompleted()) {
        status = 'completado';
    } else if (await job.isActive()) {
        status = 'procesando';
    } else if (await job.isFailed()) {
        status = 'fallido';
    }
    return reply.send({ status: status });
}

export const subirEvento = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const file = await req.file();
    if (!file) {
        reply.code(400).send({ error: 'No se ha enviado ningun archivo' });
    }
    try {
        // @ts-ignore
        const filePath = path.join('/tmp', file.filename);
        const fileStream = fs.createWriteStream(filePath);
        await new Promise((resolve, reject) => {
            file?.file.pipe(fileStream);
            file?.file.on('end', resolve);
            file?.file.on('error', reject);
        });
        const job = await fileQueue.add({filePath});
        reply.send({jobId: job.id, status: 'En cola'});
    } catch (error) {
        console.error('Error al subir el archivo:', error);
        reply.code(500).send({ error: 'Error al subir el archivo' });
    }
}


