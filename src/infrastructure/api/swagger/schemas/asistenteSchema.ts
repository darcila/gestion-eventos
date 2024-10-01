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
        errorMessage: {
            required: {
                identificacion: 'La identificación es requerida.',
                nombre: 'El nombre es requerido.',
                direccion: 'La dirección es requerida.',
                telefono: 'El teléfono es requerido.',
                correo: 'El correo electrónico es requerido.',
                ciudad: 'La ciudad es requerida.'
            }
        },
        properties: {
            identificacion: {
                type: 'string',
                errorMessage: 'La identificación debe ser una cadena de texto.' // Puedes ajustar el mensaje según el formato de identificación
            },
            nombre: {
                type: 'string',
                maxLength: 200,
                errorMessage: {
                    maxLength: 'El nombre no puede exceder los 200 caracteres.',
                    type: 'El nombre debe ser una cadena de texto.'
                }
            },
            direccion: {
                type: 'string',
                errorMessage: 'La dirección debe ser una cadena de texto.'
            },
            telefono: {
                type: 'string',
                errorMessage: 'El teléfono debe ser una cadena de texto.' // Puedes añadir validación para formato de teléfono si es necesario
            },
            correo: {
                type: 'string',
                format: 'email',
                errorMessage: 'El correo electrónico debe tener un formato válido.'
            },
            categorias: {
                type: 'array',
                items: {
                    type: 'string',
                    errorMessage: 'Cada categoría debe ser una cadena de texto.'
                }
            },
            ciudad: {
                type: 'string',
                errorMessage: 'La ciudad debe ser una cadena de texto.'
            },
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
            identificacion: {
                type: 'string',
                errorMessage: 'La identificación debe ser una cadena de texto.'
            },
        },
        required: ['identificacion'],
        errorMessage: {
            required: {
                identificacion: 'La identificación es requerida.'
            }
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
        errorMessage: {
            required: {
                identificacion: 'La identificación es requerida.'
            }
        },
        properties: {
            identificacion: {
                type: 'string',
                errorMessage: 'La identificación debe ser una cadena de texto.'
            },
            nombre: {
                type: 'string',
                maxLength: 200,
                errorMessage: {
                    maxLength: 'El nombre no puede exceder los 200 caracteres.',
                    type: 'El nombre debe ser una cadena de texto.'
                }
            },
            direccion: {
                type: 'string',
                errorMessage: 'La dirección debe ser una cadena de texto.'
            },
            telefono: {
                type: 'string',
                errorMessage: 'El teléfono debe ser una cadena de texto.'
            },
            correo: {
                type: 'string',
                format: 'email',
                errorMessage: 'El correo electrónico debe tener un formato válido.'
            },
            categorias: {
                type: 'array',
                items: {
                    type: 'string',
                    errorMessage: 'Cada categoría debe ser una cadena de texto.'
                },
                errorMessage: 'Las categorías deben ser un array.'
            }
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
        errorMessage: {
            required: {
                identificacion: 'La identificación es requerida.'
            }
        },
        properties: {
            identificacion: {
                type: 'string',
                errorMessage: 'La identificación debe ser una cadena de texto.'
            }
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
