import {FastifySchema} from "fastify";

export const autenticacionSchema: FastifySchema = {
    description: 'Autenticar un usuario',
    tags: ['Autenticacion'],
    body: {
        type: 'object',
        required: ['usuario', 'clave'],
        errorMessage: {
            required: {
                usuario: 'El nombre de usuario es requerido.',
                clave: 'La clave es requerida.'
            }
        },
        properties: {
            usuario: {
                type: 'string',
                errorMessage: 'El nombre de usuario debe ser una cadena de texto.'
            },
            clave: {
                type: 'string',
                errorMessage: 'La clave debe ser una cadena de texto.'
            },
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
        errorMessage: {
            required: {
                usuario: 'El nombre de usuario es requerido.',
                clave: 'La clave es requerida.'
            }
        },
        properties: {
            usuario: {
                type: 'string',
                minLength: 5,
                maxLength: 50,
                errorMessage: {
                    minLength: 'El nombre de usuario debe tener al menos 5 caracteres.',
                    maxLength: 'El nombre de usuario no puede exceder los 50 caracteres.',
                    type: 'El nombre de usuario debe ser una cadena de texto.'
                }
            },
            clave: {
                type: 'string',
                minLength: 8,
                maxLength: 100,
                errorMessage: {
                    minLength: 'La clave debe tener al menos 8 caracteres.',
                    maxLength: 'La clave no puede exceder los 100 caracteres.',
                    type: 'La clave debe ser una cadena de texto.'
                }
            },
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
