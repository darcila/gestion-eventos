import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import formbody from '@fastify/formbody';
import { validatePubSub } from '@infrastructure/api';
import {decode, parse, PREFIX} from '@util';
import {DEPENDENCY_CONTAINER} from "@configuration";
import {AutenticacionAppService} from "@application/services";
import {UnauthorizedException} from "@domain/exceptions";

type Payload = Record<string, unknown>;

export const middlewares = (application: FastifyInstance): void => {
    application.register(cors);
    application.register(formbody);
    application.register(helmet, {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: [`'self'`],
                styleSrc: [`'self'`, `'unsafe-inline'`],
                imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
                scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
            },
        },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    application.addHook<Payload, any>('onSend', async (req, reply, payload) => {
        const { id, method, url, headers, params, query, body } = req;
        const isPubSub = await validatePubSub(body);
        console.log(
            JSON.stringify({
                application: process.env.SERVICE_NAME ?? 'SERVICE_NAME NOT FOUND',
                id,
                method,
                url,
                request: {
                    headers,
                    body: body ?? {},
                    buffer: isPubSub ? parse(decode(isPubSub.message.data)) : {},
                    messageId: isPubSub ? isPubSub.message.messageId : null,
                    params,
                    query,
                },
                response: {
                    statusCode: reply.statusCode,
                    payload,
                },
            }),
        );
    });

    application.addHook('preValidation', async (request: FastifyRequest, reply: FastifyReply) => {
        const url = request.url;
        const regex = /^\/docs/;
        if (url === `${PREFIX}/autenticar` || regex.test(url)) {
            return; // Skip validation for this route
        }

        try {
            const autenticarService = DEPENDENCY_CONTAINER.get(AutenticacionAppService);
            const estado = await autenticarService.validarToken(request.headers.authorization);

            if (!estado) {
                //reply.status(401).send({ error: 'Unauthorized', message: 'Token invalido' });
                console.log('Token invalido', reply);
                throw new UnauthorizedException('Token invalido', 'Token no es válido');
            }
        } catch (err:any) {
            // Manejar el error y detener la ejecución
            //reply.status(401).send({ error: 'Unauthorized', message: err.message });
            throw err;
        }
    });
};


