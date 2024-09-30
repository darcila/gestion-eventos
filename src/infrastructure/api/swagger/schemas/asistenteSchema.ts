import {FastifySchema} from "fastify";

export const createAsistenteSchema: FastifySchema = {
    description: 'Crear un asistente',
    tags: ['Asistente'],
    headers: {
        type: 'object',
        required: ['Authorization'],
        properties: {
            Authorization: {
                type: 'string',
                description: 'Token de autenticacion. Formato: Bearer <token>'
            }
        }
    },
    body: {
        type: 'object',
        required: ['identificacion', 'nombre', 'direccion', 'telefono', 'correo', 'ciudad'],
        properties: {
            identificacion: { type: 'string' }, // Puedes ajustar el tipo según el formato de identificación
            nombre: { type: 'string', maxLength: 200 },
            direccion: { type: 'string' },
            telefono: { type: 'string' }, // Puedes añadir validación para formato de teléfono si es necesario
            correo: { type: 'string', format: 'email' },
            categorias: { type: 'array', items: { type: 'string' } },
            ciudad: { type: 'string' },
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                isError: { type: 'boolean' },
                id: { type: 'string' },
                data: {
                    type: 'object',
                    properties: {
                        identificacion: { type: 'string' },
                        nombre: { type: 'string' },
                        direccion: { type: 'string' },
                        telefono: { type: 'string' },
                        correo: { type: 'string' },
                        categorias: { type: 'array', items: { type: 'string' } }
                    }
                },
                timestamp: { type: 'string', format: 'date-time' },
            },
        },
        400: {
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            }
        }
    }
};

export const getAsistentePorIdentificacionSchema: FastifySchema = {
    description: 'Obtener un asistente por su identificación',
    tags: ['Asistente'],
    headers: {
        type: 'object',
        required: ['Authorization'],
        properties: {
            Authorization: {
                type: 'string',
                description: 'Token de autenticacion. Formato: Bearer <token>'
            }
        }
    },
    params: {
        type: 'object',
        properties: {
            identificacion: { type: 'string' },
        },
        required: ['identificacion'],
    },
    response: {
        200: {
            description: 'Succesful response',
            type: 'object',
            properties: {
                isError: { type: 'boolean' },
                id: { type: 'string' },
                data: {
                    type: 'object',
                    properties: {
                        identificacion: { type: 'string' },
                        nombre: { type: 'string' },
                        direccion: { type: 'string' },
                        telefono: { type: 'string' },
                        correo: { type: 'string' },
                        categorias: { type: 'array', items: { type: 'string' } }
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
        404: {
            description: 'Asistente no encontrado',
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            }
        }
    },
};

export const updateAsistenteSchema: FastifySchema = {
    description: 'Actualizar un asistente por su identificación',
    tags: ['Asistente'],
    headers: {
        type: 'object',
        required: ['Authorization'],
        properties: {
            Authorization: {
                type: 'string',
                description: 'Token de autenticacion. Formato: Bearer <token>'
            }
        }
    },
    body: {
        type: 'object',
        required: ['identificacion'],
        properties: {
            identificacion: { type: 'string' },
            nombre: { type: 'string', maxLength: 200 },
            direccion: { type: 'string' },
            telefono: { type: 'string' },
            correo: { type: 'string', format: 'email' },
            categorias: { type: 'array', items: { type: 'string' } }
        }
    },
    response: {
        200: {
            description: 'Succesful response',
            type: 'object',
            properties: {
                isError: { type: 'boolean' },
                id: { type: 'string' },
                data: {
                    type: 'object',
                    properties: {
                        identificacion: { type: 'string' },
                        nombre: { type: 'string' },
                        direccion: { type: 'string' },
                        telefono: { type: 'string' },
                        correo: { type: 'string' },
                        categorias: { type: 'array', items: { type: 'string' } }
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
        404: {
            description: 'Asistente no encontrado',
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            }
        }
    },
};

export const deleteAsistenteSchema: FastifySchema = {
    description: 'Borrar un asistente',
    tags: ['Asistente'],
    headers: {
        type: 'object',
        required: ['Authorization'],
        properties: {
            Authorization: {
                type: 'string',
                description: 'Token de autenticacion. Formato: Bearer <token>'
            }
        }
    },
    params: {
        type: 'object',
        required: ['identificacion'],
        properties: {
            identificacion: { type: 'string' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                isError: { type: 'boolean' },
                id: { type: 'string' },
                data: {
                    type: 'object',
                    properties: {
                        identificacion: { type: 'string' },
                        mensaje: { type: 'string' },
                    }
                },
                timestamp: { type: 'string', format: 'date-time' },
            },
        },
        404: {
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            }
        }
    }
};
