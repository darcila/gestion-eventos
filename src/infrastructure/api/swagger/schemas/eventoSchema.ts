import {FastifySchema} from "fastify";

export const examplePostSchema = {
    schema: {
        description: 'post some data',
        tags: ['post_example_template'],
        body: {
            type: 'object',
            properties: {
                equipo: { type: 'string', example: '10' },
                numero_entrega: { type: 'number', example: 3 },
                estado: { type: 'boolean', example: true },
                cliente: {
                    type: 'object',
                    properties: {
                        nit: { type: 'string', example: '900358833' },
                        razon_social: { type: 'string', example: null },
                        div: { type: 'string', example: '03' },
                    },
                },
            },
        },
        response: {
            '200-OK': {
                description: 'Succesful response',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: { type: 'object', properties: { id: { type: 'string', example: 'f53nMjS5pC3naOdjonwS' } } },
                    timestamp: { type: 'string', format: 'date-time', example: '2030-07-21T17:32:28Z' },
                },
            },
            '400-BAD_REQUEST': {
                description: 'Bad Request',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'example is required' },
                    code: { type: 'string', example: 'BAD_REQUEST' },
                    statusCode: { type: 'number', example: 400 },
                    cause: { type: ['string', 'null'], example: 'Error: example is required' },
                },
            },
        },
    },
};

export const eventoGetSchema: FastifySchema = {
    description: 'Obtener un evento',
    tags: ['get_evento'],
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' }, // Removemos 'example'
        },
        required: ['id'], // Añadimos 'required' para indicar que 'id' es obligatorio
    },
    response: {
        200: { // Usamos códigos de estado numéricos en lugar de strings
            description: 'Succesful response',
            type: 'object',
            properties: {
                isError: { type: 'boolean' },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' }
                    }
                },
                timestamp: { type: 'string', format: 'date-time' },
            },
        },
        400: {
            description: 'Bad Request',
            type: 'object',
            properties: {
                isError: { type: 'boolean' },
                message: { type: 'string' },
                code: { type: 'string' },
                statusCode: { type: 'number' },
                cause: { type: ['string', 'null'] },
            },
        },
    },
};
