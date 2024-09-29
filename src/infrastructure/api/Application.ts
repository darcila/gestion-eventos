// libraries
import 'reflect-metadata';
import 'module-alias/register';
import dotenv from 'dotenv';
dotenv.config();
import fastify from 'fastify';
import swagger from '@fastify/swagger';
import { randomBytes } from 'crypto';
import { PREFIX } from '@util';
import { initRoutes } from '@infrastructure/api/routers';
import { middlewares, errorHandler } from '@infrastructure/api/middlewares';
import {swagger_config, swaggerUi_config} from '@infrastructure/api/swagger';
import swaggerUi, {FastifySwaggerUiOptions} from '@fastify/swagger-ui';

export const application = fastify({
    genReqId: (_) => randomBytes(20).toString('hex'),
    logger: true
});

// middlewares
middlewares(application);
errorHandler(application);

//fastify swagger
application.register(swagger, swagger_config);
application.register(swaggerUi, swaggerUi_config as FastifySwaggerUiOptions);

// routes
application.register(initRoutes, { prefix: PREFIX });
console.log('Application running on port 8080 with prefix', PREFIX);
