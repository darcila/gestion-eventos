import {FastifySchema} from "fastify";

export const eventoGetSchema: FastifySchema = {
    description: 'Obtener un evento',
    tags: ['Evento'],
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
            id: { type: 'number', errorMessage: 'El ID del evento debe ser un número entero.'  }, // Removemos 'example'
        },
        required: ['id'],
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
                        nombre: { type: 'string' },
                        descripcion: { type: 'string' },
                        lugar: { type: 'string' },
                        ciudad: { type: 'string' },
                        fecha: { type: 'string', format: 'date' },
                        hora: { type: 'string' },
                        valor: { type: 'number' },
                        capacidad: { type: 'number' }
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

export const eventoLugaresGetSchema: FastifySchema = {
    description: 'Obtiene los lugares cercanos al evento, este devolvera 5 lugares cercanos as su posicion',
    tags: ['Evento'],
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
    querystring: {
        type: 'object',
        properties: {
            tipo: { type: 'string' },
            evento: { type: 'number' },
        },
        required: ['tipo', 'evento'],
    },
    response: {
        200: {
            description: 'Succesful response',
            type: 'object',
            properties: {
                isError: { type: 'boolean' },
                id: { type: 'string' },
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            nombre: { type: 'string' },
                            direccion: { type: 'string' },
                        },
                    },
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

export const eventoCercanosGetSchema: FastifySchema = {
    description: 'Obtiene eventos cercanos de acuerdo a una direccion y distancia en kilometros',
    tags: ['Evento'],
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
    querystring: {
        type: 'object',
        properties: {
            direccion: {
                type: 'string',
                errorMessage: 'La dirección debe ser una cadena de texto que represente una ubicación válida.'
            },
            distancia: {
                type: 'number',
                errorMessage: 'La distancia debe ser un número que represente la distancia en kilómetros.',
                minimum: 0
            },
            ciudad: {
                type: 'string',
                errorMessage: 'La ciudad debe ser una cadena de texto.'
            },
        },
        required: ['direccion', 'distancia', 'ciudad'],
        errorMessage: {
            required: {
                direccion: 'La dirección es requerida.',
                distancia: 'La distancia es requerida.',
                ciudad: 'La ciudad es requerida.'
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
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            nombre: { type: 'string' },
                            direccion: { type: 'string' },
                            fecha: { type: 'string', format: 'date' },
                            valor: { type: 'number' },
                            distancia: { type: 'number' },
                        },
                    },
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

export const createEventoSchema: FastifySchema = {
    description: 'Crear un evento',
    tags: ['Evento'],
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
        required: ['nombre', 'descripcion', 'lugar', 'ciudad', 'fecha', 'hora'],
        errorMessage: {
            required: {
                nombre: 'El nombre del evento es requerido.',
                descripcion: 'La descripción del evento es requerida.',
                lugar: 'El lugar del evento es requerido.',
                ciudad: 'La ciudad del evento es requerida.',
                fecha: 'La fecha del evento es requerida.',
                hora: 'La hora del evento es requerida.'
            }
        },
        properties: {
            nombre: {
                type: 'string',
                maxLength: 200,
                errorMessage: {
                    maxLength: 'El nombre del evento no puede exceder los 200 caracteres.'
                }
            },
            descripcion: {
                type: 'string',
                errorMessage: 'La descripción del evento debe ser una cadena de texto.'
            },
            lugar: {
                type: 'string',
                maxLength: 200,
                errorMessage: {
                    maxLength: 'El lugar del evento no puede exceder los 200 caracteres.'
                }
            },
            ciudad: {
                type: 'string',
                maxLength: 70,
                errorMessage: {
                    maxLength: 'La ciudad del evento no puede exceder los 70 caracteres.'
                }
            },
            fecha: {
                type: 'string',
                format: 'date',
                errorMessage: 'La fecha del evento debe tener el formato AAAA-MM-DD.'
            },
            hora: {
                type: 'string',
                errorMessage: 'La hora del evento debe ser una cadena de texto en formato válido (e.g., "14:30").'
            },
            categoria: {
                type: 'array',
                errorMessage: 'La categoría debe ser un array.' ,
                items: {
                    type: 'string',
                    errorMessage: 'Cada categoría debe ser una cadena de texto.'
                }
            },
            capacidad: {
                type: 'integer',
                minimum: 0,
                errorMessage: {
                    minimum: 'La capacidad del evento debe ser un número no negativo.',
                    type: 'La capacidad del evento debe ser un número entero.'
                }
            },
            valor: {
                type: 'number',
                minimum: 0,
                errorMessage: {
                    minimum: 'El valor del evento debe ser un número no negativo.',
                    type: 'El valor del evento debe ser un número.'
                }
            }
        }
    },
    response: {
        200: { // Respuesta exitosa (evento creado)
            type: 'object',
            properties: {
                isError: { type: 'boolean' },
                id: { type: 'string' },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        nombre: { type: 'string' },
                        descripcion: { type: 'string' },
                        lugar: { type: 'string' },
                        ciudad: { type: 'string' },
                        fecha: { type: 'string', format: 'date' },
                        hora: { type: 'string' },
                        valor: { type: 'number' },
                        capacidad: { type: 'number' }
                    }
                },
                timestamp: { type: 'string', format: 'date-time' },
            },
        },
        400: { // Error de validación
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            }
        }
    }
};

export const pathEventoSchema: FastifySchema = {
    description: 'Actualizar un evento',
    tags: ['Evento'],
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
        required: ['id'],
        errorMessage: {
            required: {
                id: 'El ID del evento es requerido.'
            }
        },
        properties: {
            id: {
                type: 'number',
                errorMessage: 'El ID del evento debe ser un número entero.'
            },
            nombre: {
                type: 'string',
                errorMessage: 'El nombre del evento debe ser una cadena de texto.'
            },
            fecha: {
                type: 'string',
                format: 'date',
                errorMessage: 'La fecha del evento debe tener el formato AAAA-MM-DD.'
            },
            hora: {
                type: 'string',
                format: 'time',
                errorMessage: 'La hora del evento debe tener el formato HH:MM.'
            },
            capacidad: {
                type: 'integer',
                minimum: 0,
                errorMessage: {
                    type: 'La capacidad del evento debe ser un número entero.',
                    minimum: 'La capacidad del evento debe ser un número no negativo.'
                }
            },
            valor: {
                type: 'number',
                minimum: 0,
                errorMessage: {
                    type: 'El valor del evento debe ser un número.',
                    minimum: 'El valor del evento debe ser un número no negativo.'
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
                        nombre: { type: 'string' },
                    }
                },
                timestamp: { type: 'string', format: 'date-time' },
            },
        },
        404: { // Evento no encontrado
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            }
        }
    }
};

export const deleteEventoSchema: FastifySchema = {
    description: 'Borrar un evento',
    tags: ['Evento'],
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
                id: 'El ID del evento es requerido.'
            }
        },
        properties: {
            id: {
                type: 'integer',
                errorMessage: 'El ID del evento debe ser un número entero.'
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

export const eventoAsistetesGetSchema: FastifySchema = {
    description: 'Obtiene el total de asistentes a un evento',
    tags: ['Evento'],
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
                errorMessage: 'El ID del evento debe ser un número.'
            },
        },
        required: ['id'],
        errorMessage: {
            required: {
                id: 'El ID del evento es requerido.'
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
                        nombre: { type: 'string' },
                        descripcion: { type: 'string' },
                        lugar: { type: 'string' },
                        ciudad: { type: 'string' },
                        fecha: { type: 'string', format: 'date' },
                        hora: { type: 'string' },
                        totalAsistentes: { type: 'number' }
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

export const uploadExcelSchema: FastifySchema = {
    description: 'Sube un archivo Excel y retorna el ID del proceso. \n\n' +
        '**Descarga la plantilla aquí:** [enlace a la plantilla de Excel](https://docs.google.com/spreadsheets/d/1IOdZIaZ8B09ToxTk84F_2KlpjtPBIjgy/edit?usp=sharing&ouid=103535298326465552369&rtpof=true&sd=true)',
    tags: ['Evento'],
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
    consumes: ['multipart/form-data'], // Importante para archivos
    body: {
        type: 'object',
        properties: {
            file: {
                type: 'string',
                format: 'binary' // Indica que el cuerpo es un archivo binario
            }
        },
        required: ['file']
    },
    response: {
        200: {
            description: 'Respuesta exitosa',
            type: 'object',
            properties: {
                isError: {type: 'boolean'},
                id: {type: 'string', description: 'ID del proceso'},
                timestamp: {type: 'string', format: 'date-time'}
            }
        },
        400: {
            description: 'Bad Request',
            type: 'object',
            properties: {
                isError: {type: 'boolean'},
                message: {type: 'string'},
                code: {type: 'string'},
                statusCode: {type: 'number'},
                cause: {type: ['string', 'null']}
            }
        },
        404: {
            description: 'Not Found',
            type: 'object',
            properties: {
                isError: {type: 'boolean'},
                message: {type: 'string'},
                code: {type: 'string'},
                statusCode: {type: 'number'},
                cause: {type: ['string', 'null']}
            }
        },
    }
};

export const getProcessStatusSchema: FastifySchema = {
    description: 'Obtiene el estado de un proceso por su ID',
    tags: ['Evento'],
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
    params: { // Se define un objeto para los parámetros de la ruta
        type: 'object',
        properties: {
            jobId: {
                type: 'string',
                description: 'ID del proceso'
            }
        },
        required: ['jobId']
    },
    response: {
        200: {
            description: 'Respuesta exitosa',
            type: 'object',
            properties: {
                isError: { type: 'boolean' },
                estado: {
                    type: 'string',
                    description: 'Estado del proceso',
                    enum: ['en cola', 'procesando', 'completado', 'error'] // Ejemplo de posibles estados
                },
                timestamp: { type: 'string', format: 'date-time' }
            }
        },
        400: {
            description: 'Bad Request',
            type: 'object',
            properties: {
                isError: { type: 'boolean' },
                message: { type: 'string' },
                code: { type: 'string' },
                statusCode: { type: 'number' },
                cause: { type: ['string', 'null'] }
            }
        },
        404: { // Se agrega una posible respuesta 404 Not Found
            description: 'Proceso no encontrado',
            type: 'object',
            properties: {
                isError: { type: 'boolean' },
                message: { type: 'string' },
                code: { type: 'string' },
                statusCode: { type: 'number' },
                cause: { type: ['string', 'null'] }
            }
        }
    }
};

export const eventoAsistetesDiaGetSchema: FastifySchema = {
    description: 'Obtiene el total de asistentes a un evento por dia',
    tags: ['Evento'],
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
                        diaSemana: { type: 'string' },
                        totalAsistentes: { type: 'number' },
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
