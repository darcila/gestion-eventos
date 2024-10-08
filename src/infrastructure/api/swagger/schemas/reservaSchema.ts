import {FastifySchema} from "fastify";

export const createReservaSchema: FastifySchema = {
    description: 'Crear una reserva',
    tags: ['Reserva'],
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
        required: ['asistente_id', 'evento_id', 'cantidad_boletos'],
        errorMessage: {
            required: {
                asistente_id: 'El ID del asistente es requerido.',
                evento_id: 'El ID del evento es requerido.',
                cantidad_boletos: 'La cantidad de boletos es requerida.'
            }
        },
        properties: {
            asistente_id: {
                type: 'integer',
                errorMessage: 'El ID del asistente debe ser un número entero.'
            },
            evento_id: {
                type: 'integer',
                errorMessage: 'El ID del evento debe ser un número entero.'
            },
            cantidad_boletos: {
                type: 'integer',
                minimum: 1,
                errorMessage: {
                    minimum: 'La cantidad de boletos debe ser al menos 1.',
                    type: 'La cantidad de boletos debe ser un número entero.'
                }
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
                        id: { type: 'number' },
                        asistente_id: { type: 'number' },
                        evento_id: { type: 'number' },
                        fecha_reserva: { type: 'string', format: 'date-time' },
                        cantidad_boletos: { type: 'number' },
                        estado: { type: 'string' }
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
        },
        409: {
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            }
        }
    }
};

export const getReservaSchema: FastifySchema = {
    description: 'Obtener una reserva',
    tags: ['Reserva'],
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
            id: {
                type: 'number',
                errorMessage: 'El ID debe ser un número.'
            },
        },
        required: ['id'],
        errorMessage: {
            required: {
                id: 'El ID es requerido.'
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
                        id: { type: 'number' },
                        asistente_id: { type: 'number' },
                        evento_id: { type: 'number' },
                        fecha_reserva: { type: 'string', format: 'date-time' },
                        cantidad_boletos: { type: 'number' },
                        estado: { type: 'string' }
                        // Otros campos que desees devolver en la respuesta
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

export const updateReservaSchema: FastifySchema = {
    description: 'Confirmar o cancelar una reserva',
    tags: ['Reserva'],
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
        required: ['id', 'estado'],
        errorMessage: {
            required: {
                id: 'El ID es requerido.',
                estado: 'El estado es requerido.'
            }
        },
        properties: {
            id: {
                type: 'number',
                errorMessage: 'El ID debe ser un número.'
            },
            estado: {
                type: 'string',
                enum: ['confirmada', 'cancelada'],
                errorMessage: {
                    enum: 'El estado debe ser "confirmada" o "cancelada".',
                    type: 'El estado debe ser una cadena de texto.'
                }
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
                        id: { type: 'number' },
                    }
                },
                timestamp: { type: 'string', format: 'date-time' },
            },
        },
        400: { // Error de validación o problema al actualizar
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            }
        },
        404: { // Reserva no encontrada
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            }
        }
    }
};

export const deleteReservaSchema: FastifySchema = {
    description: 'Eliminar una reserva',
    tags: ['Reserva'],
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
        required: ['id'],
        errorMessage: {
            required: {
                id: 'El ID es requerido.'
            }
        },
        properties: {
            id: {
                type: 'number',
                errorMessage: 'El ID debe ser un número.'
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
                        mensaje: { type: 'string' }, // Mensaje de éxito
                    }
                },
                timestamp: { type: 'string', format: 'date-time' },
            },
        },
        404: { // Reserva no encontrada
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            }
        }
    }
};
