import {FastifySchema} from "fastify";

export const autenticacionSchema: FastifySchema = {
    description: 'Autenticar un usuario',
    tags: ['Autenticacion'],
    body: {
        type: 'object',
        required: ['usuario', 'clave'],
        properties: {
            usuario: { type: 'string' },
            clave: { type: 'string' },
        }
    },
    response: {
        200: {
            description: 'Autenticación exitosa',
            type: 'object',
            properties: {
                isError: { type: 'boolean' },
                id: { type: 'string' },
                data: {
                    type: 'object',
                    properties: {
                        token: { type: 'string' }, // El token JWT generado
                    }
                },
                timestamp: { type: 'string', format: 'date-time' },
            },
        },
        401: {
            description: 'Credenciales inválidas',
            type: 'object',
            properties: {
                isError: { type: 'boolean' },
                message: { type: 'string' },
                code: { type: 'string' },
                statusCode: { type: 'number' },
            },
        },
    }
};

export const crearUsuarioSchema: FastifySchema = {
    description: 'Crear un nuevo usuario',
    tags: ['Usuario'],
    body: {
        type: 'object',
        required: ['usuario', 'clave'],
        properties: {
            usuario: { type: 'string' },
            clave: { type: 'string' },
        }
    },
    response: {
        200: {
            description: 'Usuario creado exitosamente',
            type: 'object',
            properties: {
                isError: { type: 'boolean' },
                id: { type: 'string' },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' }, // O el identificador que uses para el usuario
                        // Puedes incluir otros datos del usuario si es necesario
                    }
                },
                timestamp: { type: 'string', format: 'date-time' },
            },
        },
        400: {
            description: 'Error de validación o usuario ya existente',
            type: 'object',
            properties: {
                isError: { type: 'boolean' },
                message: { type: 'string' },
                code: { type: 'string' },
                statusCode: { type: 'number' },
            },
        },
    }
};
