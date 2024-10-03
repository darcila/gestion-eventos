"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventoAsistetesDiaGetSchema = exports.getProcessStatusSchema = exports.uploadExcelSchema = exports.eventoAsistetesGetSchema = exports.deleteEventoSchema = exports.pathEventoSchema = exports.createEventoSchema = exports.eventoCercanosGetSchema = exports.eventoLugaresGetSchema = exports.eventoGetSchema = void 0;
exports.eventoGetSchema = {
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
            id: { type: 'number', errorMessage: 'El ID del evento debe ser un número entero.' },
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
exports.eventoLugaresGetSchema = {
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
exports.eventoCercanosGetSchema = {
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
exports.createEventoSchema = {
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
                errorMessage: 'La categoría debe ser un array.',
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
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            }
        }
    }
};
exports.pathEventoSchema = {
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
exports.deleteEventoSchema = {
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
exports.eventoAsistetesGetSchema = {
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
exports.uploadExcelSchema = {
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
    consumes: ['multipart/form-data'],
    body: {
        type: 'object',
        properties: {
            file: {
                type: 'string',
                format: 'binary'
            }
        },
        required: ['file']
    },
    response: {
        200: {
            description: 'Respuesta exitosa',
            type: 'object',
            properties: {
                isError: { type: 'boolean' },
                id: { type: 'string', description: 'ID del proceso' },
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
        404: {
            description: 'Not Found',
            type: 'object',
            properties: {
                isError: { type: 'boolean' },
                message: { type: 'string' },
                code: { type: 'string' },
                statusCode: { type: 'number' },
                cause: { type: ['string', 'null'] }
            }
        },
    }
};
exports.getProcessStatusSchema = {
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
    params: {
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
                    enum: ['en cola', 'procesando', 'completado', 'error']
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
        404: {
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
exports.eventoAsistetesDiaGetSchema = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRvU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL2FwaS9zd2FnZ2VyL3NjaGVtYXMvZXZlbnRvU2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVhLFFBQUEsZUFBZSxHQUFrQjtJQUMxQyxXQUFXLEVBQUUsbUJBQW1CO0lBQ2hDLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQztJQUNoQixPQUFPLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxDQUFDLGVBQWUsQ0FBQztRQUMzQixVQUFVLEVBQUU7WUFDUixhQUFhLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLGlEQUFpRDthQUNqRTtTQUNKO0tBQ0o7SUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLFVBQVUsRUFBRTtZQUNSLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLDZDQUE2QyxFQUFHO1NBQ3ZGO1FBQ0QsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDO0tBQ25CO0lBQ0QsUUFBUSxFQUFFO1FBQ04sR0FBRyxFQUFFO1lBQ0QsV0FBVyxFQUFFLG9CQUFvQjtZQUNqQyxJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRTtnQkFDUixPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO2dCQUM1QixFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO2dCQUN0QixJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsVUFBVSxFQUFFO3dCQUNSLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7d0JBQ3RCLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7d0JBQzFCLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7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dGlmeVNjaGVtYX0gZnJvbSBcImZhc3RpZnlcIjtcblxuZXhwb3J0IGNvbnN0IGV2ZW50b0dldFNjaGVtYTogRmFzdGlmeVNjaGVtYSA9IHtcbiAgICBkZXNjcmlwdGlvbjogJ09idGVuZXIgdW4gZXZlbnRvJyxcbiAgICB0YWdzOiBbJ0V2ZW50byddLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIHJlcXVpcmVkOiBbJ0F1dGhvcml6YXRpb24nXSxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVG9rZW4gZGUgYXV0ZW50aWNhY2lvbi4gRm9ybWF0bzogQmVhcmVyIDx0b2tlbj4nXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHBhcmFtczoge1xuICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgaWQ6IHsgdHlwZTogJ251bWJlcicsIGVycm9yTWVzc2FnZTogJ0VsIElEIGRlbCBldmVudG8gZGViZSBzZXIgdW4gbsO6bWVybyBlbnRlcm8uJyAgfSwgLy8gUmVtb3ZlbW9zICdleGFtcGxlJ1xuICAgICAgICB9LFxuICAgICAgICByZXF1aXJlZDogWydpZCddLFxuICAgIH0sXG4gICAgcmVzcG9uc2U6IHtcbiAgICAgICAgMjAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1N1Y2Nlc2Z1bCByZXNwb25zZScsXG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBpc0Vycm9yOiB7IHR5cGU6ICdib29sZWFuJyB9LFxuICAgICAgICAgICAgICAgIGlkOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vbWJyZTogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcGNpb246IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGx1Z2FyOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjaXVkYWQ6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZlY2hhOiB7IHR5cGU6ICdzdHJpbmcnLCBmb3JtYXQ6ICdkYXRlJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgaG9yYTogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsb3I6IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcGFjaWRhZDogeyB0eXBlOiAnbnVtYmVyJyB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogeyB0eXBlOiAnc3RyaW5nJywgZm9ybWF0OiAnZGF0ZS10aW1lJyB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgNDAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0JhZCBSZXF1ZXN0JyxcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIGlzRXJyb3I6IHsgdHlwZTogJ2Jvb2xlYW4nIH0sXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIGNvZGU6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiB7IHR5cGU6ICdudW1iZXInIH0sXG4gICAgICAgICAgICAgICAgY2F1c2U6IHsgdHlwZTogWydzdHJpbmcnLCAnbnVsbCddIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH0sXG59O1xuXG5leHBvcnQgY29uc3QgZXZlbnRvTHVnYXJlc0dldFNjaGVtYTogRmFzdGlmeVNjaGVtYSA9IHtcbiAgICBkZXNjcmlwdGlvbjogJ09idGllbmUgbG9zIGx1Z2FyZXMgY2VyY2Fub3MgYWwgZXZlbnRvLCBlc3RlIGRldm9sdmVyYSA1IGx1Z2FyZXMgY2VyY2Fub3MgYXMgc3UgcG9zaWNpb24nLFxuICAgIHRhZ3M6IFsnRXZlbnRvJ10sXG4gICAgaGVhZGVyczoge1xuICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgcmVxdWlyZWQ6IFsnQXV0aG9yaXphdGlvbiddLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICBBdXRob3JpemF0aW9uOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdUb2tlbiBkZSBhdXRlbnRpY2FjaW9uLiBGb3JtYXRvOiBCZWFyZXIgPHRva2VuPidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcXVlcnlzdHJpbmc6IHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIHRpcG86IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgIGV2ZW50bzogeyB0eXBlOiAnbnVtYmVyJyB9LFxuICAgICAgICB9LFxuICAgICAgICByZXF1aXJlZDogWyd0aXBvJywgJ2V2ZW50byddLFxuICAgIH0sXG4gICAgcmVzcG9uc2U6IHtcbiAgICAgICAgMjAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1N1Y2Nlc2Z1bCByZXNwb25zZScsXG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBpc0Vycm9yOiB7IHR5cGU6ICdib29sZWFuJyB9LFxuICAgICAgICAgICAgICAgIGlkOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICAgICAgICAgICAgICBpdGVtczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9tYnJlOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWNjaW9uOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiB7IHR5cGU6ICdzdHJpbmcnLCBmb3JtYXQ6ICdkYXRlLXRpbWUnIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICA0MDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQmFkIFJlcXVlc3QnLFxuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgaXNFcnJvcjogeyB0eXBlOiAnYm9vbGVhbicgfSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgY29kZTogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgICAgICAgICBjYXVzZTogeyB0eXBlOiBbJ3N0cmluZycsICdudWxsJ10gfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBldmVudG9DZXJjYW5vc0dldFNjaGVtYTogRmFzdGlmeVNjaGVtYSA9IHtcbiAgICBkZXNjcmlwdGlvbjogJ09idGllbmUgZXZlbnRvcyBjZXJjYW5vcyBkZSBhY3VlcmRvIGEgdW5hIGRpcmVjY2lvbiB5IGRpc3RhbmNpYSBlbiBraWxvbWV0cm9zJyxcbiAgICB0YWdzOiBbJ0V2ZW50byddLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIHJlcXVpcmVkOiBbJ0F1dGhvcml6YXRpb24nXSxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVG9rZW4gZGUgYXV0ZW50aWNhY2lvbi4gRm9ybWF0bzogQmVhcmVyIDx0b2tlbj4nXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHF1ZXJ5c3RyaW5nOiB7XG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICBkaXJlY2Npb246IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdMYSBkaXJlY2Npw7NuIGRlYmUgc2VyIHVuYSBjYWRlbmEgZGUgdGV4dG8gcXVlIHJlcHJlc2VudGUgdW5hIHViaWNhY2nDs24gdsOhbGlkYS4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGlzdGFuY2lhOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnTGEgZGlzdGFuY2lhIGRlYmUgc2VyIHVuIG7Dum1lcm8gcXVlIHJlcHJlc2VudGUgbGEgZGlzdGFuY2lhIGVuIGtpbMOzbWV0cm9zLicsXG4gICAgICAgICAgICAgICAgbWluaW11bTogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNpdWRhZDoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ0xhIGNpdWRhZCBkZWJlIHNlciB1bmEgY2FkZW5hIGRlIHRleHRvLidcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHJlcXVpcmVkOiBbJ2RpcmVjY2lvbicsICdkaXN0YW5jaWEnLCAnY2l1ZGFkJ10sXG4gICAgICAgIGVycm9yTWVzc2FnZToge1xuICAgICAgICAgICAgcmVxdWlyZWQ6IHtcbiAgICAgICAgICAgICAgICBkaXJlY2Npb246ICdMYSBkaXJlY2Npw7NuIGVzIHJlcXVlcmlkYS4nLFxuICAgICAgICAgICAgICAgIGRpc3RhbmNpYTogJ0xhIGRpc3RhbmNpYSBlcyByZXF1ZXJpZGEuJyxcbiAgICAgICAgICAgICAgICBjaXVkYWQ6ICdMYSBjaXVkYWQgZXMgcmVxdWVyaWRhLidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVzcG9uc2U6IHtcbiAgICAgICAgMjAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1N1Y2Nlc2Z1bCByZXNwb25zZScsXG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBpc0Vycm9yOiB7IHR5cGU6ICdib29sZWFuJyB9LFxuICAgICAgICAgICAgICAgIGlkOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICAgICAgICAgICAgICBpdGVtczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9tYnJlOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWNjaW9uOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVjaGE6IHsgdHlwZTogJ3N0cmluZycsIGZvcm1hdDogJ2RhdGUnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsb3I6IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jaWE6IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IHsgdHlwZTogJ3N0cmluZycsIGZvcm1hdDogJ2RhdGUtdGltZScgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIDQwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdCYWQgUmVxdWVzdCcsXG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBpc0Vycm9yOiB7IHR5cGU6ICdib29sZWFuJyB9LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICBjb2RlOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogeyB0eXBlOiAnbnVtYmVyJyB9LFxuICAgICAgICAgICAgICAgIGNhdXNlOiB7IHR5cGU6IFsnc3RyaW5nJywgJ251bGwnXSB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUV2ZW50b1NjaGVtYTogRmFzdGlmeVNjaGVtYSA9IHtcbiAgICBkZXNjcmlwdGlvbjogJ0NyZWFyIHVuIGV2ZW50bycsXG4gICAgdGFnczogWydFdmVudG8nXSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICByZXF1aXJlZDogWydBdXRob3JpemF0aW9uJ10sXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIEF1dGhvcml6YXRpb246IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1Rva2VuIGRlIGF1dGVudGljYWNpb24uIEZvcm1hdG86IEJlYXJlciA8dG9rZW4+J1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBib2R5OiB7XG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICByZXF1aXJlZDogWydub21icmUnLCAnZGVzY3JpcGNpb24nLCAnbHVnYXInLCAnY2l1ZGFkJywgJ2ZlY2hhJywgJ2hvcmEnXSxcbiAgICAgICAgZXJyb3JNZXNzYWdlOiB7XG4gICAgICAgICAgICByZXF1aXJlZDoge1xuICAgICAgICAgICAgICAgIG5vbWJyZTogJ0VsIG5vbWJyZSBkZWwgZXZlbnRvIGVzIHJlcXVlcmlkby4nLFxuICAgICAgICAgICAgICAgIGRlc2NyaXBjaW9uOiAnTGEgZGVzY3JpcGNpw7NuIGRlbCBldmVudG8gZXMgcmVxdWVyaWRhLicsXG4gICAgICAgICAgICAgICAgbHVnYXI6ICdFbCBsdWdhciBkZWwgZXZlbnRvIGVzIHJlcXVlcmlkby4nLFxuICAgICAgICAgICAgICAgIGNpdWRhZDogJ0xhIGNpdWRhZCBkZWwgZXZlbnRvIGVzIHJlcXVlcmlkYS4nLFxuICAgICAgICAgICAgICAgIGZlY2hhOiAnTGEgZmVjaGEgZGVsIGV2ZW50byBlcyByZXF1ZXJpZGEuJyxcbiAgICAgICAgICAgICAgICBob3JhOiAnTGEgaG9yYSBkZWwgZXZlbnRvIGVzIHJlcXVlcmlkYS4nXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIG5vbWJyZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgIG1heExlbmd0aDogMjAwLFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZToge1xuICAgICAgICAgICAgICAgICAgICBtYXhMZW5ndGg6ICdFbCBub21icmUgZGVsIGV2ZW50byBubyBwdWVkZSBleGNlZGVyIGxvcyAyMDAgY2FyYWN0ZXJlcy4nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXBjaW9uOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnTGEgZGVzY3JpcGNpw7NuIGRlbCBldmVudG8gZGViZSBzZXIgdW5hIGNhZGVuYSBkZSB0ZXh0by4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbHVnYXI6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBtYXhMZW5ndGg6IDIwMCxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICAgICAgbWF4TGVuZ3RoOiAnRWwgbHVnYXIgZGVsIGV2ZW50byBubyBwdWVkZSBleGNlZGVyIGxvcyAyMDAgY2FyYWN0ZXJlcy4nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNpdWRhZDoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgIG1heExlbmd0aDogNzAsXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgICAgIG1heExlbmd0aDogJ0xhIGNpdWRhZCBkZWwgZXZlbnRvIG5vIHB1ZWRlIGV4Y2VkZXIgbG9zIDcwIGNhcmFjdGVyZXMuJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmZWNoYToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogJ2RhdGUnLFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ0xhIGZlY2hhIGRlbCBldmVudG8gZGViZSB0ZW5lciBlbCBmb3JtYXRvIEFBQUEtTU0tREQuJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhvcmE6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdMYSBob3JhIGRlbCBldmVudG8gZGViZSBzZXIgdW5hIGNhZGVuYSBkZSB0ZXh0byBlbiBmb3JtYXRvIHbDoWxpZG8gKGUuZy4sIFwiMTQ6MzBcIikuJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNhdGVnb3JpYToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdhcnJheScsXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnTGEgY2F0ZWdvcsOtYSBkZWJlIHNlciB1biBhcnJheS4nICxcbiAgICAgICAgICAgICAgICBpdGVtczoge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnQ2FkYSBjYXRlZ29yw61hIGRlYmUgc2VyIHVuYSBjYWRlbmEgZGUgdGV4dG8uJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjYXBhY2lkYWQ6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgICAgICAgICAgICAgbWluaW11bTogMCxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICAgICAgbWluaW11bTogJ0xhIGNhcGFjaWRhZCBkZWwgZXZlbnRvIGRlYmUgc2VyIHVuIG7Dum1lcm8gbm8gbmVnYXRpdm8uJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0xhIGNhcGFjaWRhZCBkZWwgZXZlbnRvIGRlYmUgc2VyIHVuIG7Dum1lcm8gZW50ZXJvLidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmFsb3I6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICBtaW5pbXVtOiAwLFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZToge1xuICAgICAgICAgICAgICAgICAgICBtaW5pbXVtOiAnRWwgdmFsb3IgZGVsIGV2ZW50byBkZWJlIHNlciB1biBuw7ptZXJvIG5vIG5lZ2F0aXZvLicsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdFbCB2YWxvciBkZWwgZXZlbnRvIGRlYmUgc2VyIHVuIG7Dum1lcm8uJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVzcG9uc2U6IHtcbiAgICAgICAgMjAwOiB7IC8vIFJlc3B1ZXN0YSBleGl0b3NhIChldmVudG8gY3JlYWRvKVxuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgaXNFcnJvcjogeyB0eXBlOiAnYm9vbGVhbicgfSxcbiAgICAgICAgICAgICAgICBpZDogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB7IHR5cGU6ICdudW1iZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBub21icmU6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXBjaW9uOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBsdWdhcjogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2l1ZGFkOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBmZWNoYTogeyB0eXBlOiAnc3RyaW5nJywgZm9ybWF0OiAnZGF0ZScgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvcmE6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbG9yOiB7IHR5cGU6ICdudW1iZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXBhY2lkYWQ6IHsgdHlwZTogJ251bWJlcicgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IHsgdHlwZTogJ3N0cmluZycsIGZvcm1hdDogJ2RhdGUtdGltZScgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIDQwMDogeyAvLyBFcnJvciBkZSB2YWxpZGFjacOzblxuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogeyB0eXBlOiAnbnVtYmVyJyB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogeyB0eXBlOiAnc3RyaW5nJyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgcGF0aEV2ZW50b1NjaGVtYTogRmFzdGlmeVNjaGVtYSA9IHtcbiAgICBkZXNjcmlwdGlvbjogJ0FjdHVhbGl6YXIgdW4gZXZlbnRvJyxcbiAgICB0YWdzOiBbJ0V2ZW50byddLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIHJlcXVpcmVkOiBbJ0F1dGhvcml6YXRpb24nXSxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVG9rZW4gZGUgYXV0ZW50aWNhY2lvbi4gRm9ybWF0bzogQmVhcmVyIDx0b2tlbj4nXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGJvZHk6IHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIHJlcXVpcmVkOiBbJ2lkJ10sXG4gICAgICAgIGVycm9yTWVzc2FnZToge1xuICAgICAgICAgICAgcmVxdWlyZWQ6IHtcbiAgICAgICAgICAgICAgICBpZDogJ0VsIElEIGRlbCBldmVudG8gZXMgcmVxdWVyaWRvLidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgaWQ6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdFbCBJRCBkZWwgZXZlbnRvIGRlYmUgc2VyIHVuIG7Dum1lcm8gZW50ZXJvLidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub21icmU6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdFbCBub21icmUgZGVsIGV2ZW50byBkZWJlIHNlciB1bmEgY2FkZW5hIGRlIHRleHRvLidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmZWNoYToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogJ2RhdGUnLFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ0xhIGZlY2hhIGRlbCBldmVudG8gZGViZSB0ZW5lciBlbCBmb3JtYXRvIEFBQUEtTU0tREQuJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhvcmE6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBmb3JtYXQ6ICd0aW1lJyxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdMYSBob3JhIGRlbCBldmVudG8gZGViZSB0ZW5lciBlbCBmb3JtYXRvIEhIOk1NLidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjYXBhY2lkYWQ6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgICAgICAgICAgICAgbWluaW11bTogMCxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0xhIGNhcGFjaWRhZCBkZWwgZXZlbnRvIGRlYmUgc2VyIHVuIG7Dum1lcm8gZW50ZXJvLicsXG4gICAgICAgICAgICAgICAgICAgIG1pbmltdW06ICdMYSBjYXBhY2lkYWQgZGVsIGV2ZW50byBkZWJlIHNlciB1biBuw7ptZXJvIG5vIG5lZ2F0aXZvLidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmFsb3I6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICBtaW5pbXVtOiAwLFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnRWwgdmFsb3IgZGVsIGV2ZW50byBkZWJlIHNlciB1biBuw7ptZXJvLicsXG4gICAgICAgICAgICAgICAgICAgIG1pbmltdW06ICdFbCB2YWxvciBkZWwgZXZlbnRvIGRlYmUgc2VyIHVuIG7Dum1lcm8gbm8gbmVnYXRpdm8uJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVzcG9uc2U6IHtcbiAgICAgICAgMjAwOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBpc0Vycm9yOiB7IHR5cGU6ICdib29sZWFuJyB9LFxuICAgICAgICAgICAgICAgIGlkOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vbWJyZTogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IHsgdHlwZTogJ3N0cmluZycsIGZvcm1hdDogJ2RhdGUtdGltZScgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIDQwNDogeyAvLyBFdmVudG8gbm8gZW5jb250cmFkb1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogeyB0eXBlOiAnbnVtYmVyJyB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogeyB0eXBlOiAnc3RyaW5nJyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgZGVsZXRlRXZlbnRvU2NoZW1hOiBGYXN0aWZ5U2NoZW1hID0ge1xuICAgIGRlc2NyaXB0aW9uOiAnQm9ycmFyIHVuIGV2ZW50bycsXG4gICAgdGFnczogWydFdmVudG8nXSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICByZXF1aXJlZDogWydBdXRob3JpemF0aW9uJ10sXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIEF1dGhvcml6YXRpb246IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1Rva2VuIGRlIGF1dGVudGljYWNpb24uIEZvcm1hdG86IEJlYXJlciA8dG9rZW4+J1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBwYXJhbXM6IHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIHJlcXVpcmVkOiBbJ2lkJ10sXG4gICAgICAgIGVycm9yTWVzc2FnZToge1xuICAgICAgICAgICAgcmVxdWlyZWQ6IHtcbiAgICAgICAgICAgICAgICBpZDogJ0VsIElEIGRlbCBldmVudG8gZXMgcmVxdWVyaWRvLidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgaWQ6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnRWwgSUQgZGVsIGV2ZW50byBkZWJlIHNlciB1biBuw7ptZXJvIGVudGVyby4nXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlc3BvbnNlOiB7XG4gICAgICAgIDIwMDoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgaXNFcnJvcjogeyB0eXBlOiAnYm9vbGVhbicgfSxcbiAgICAgICAgICAgICAgICBpZDogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB7IHR5cGU6ICdudW1iZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW5zYWplOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogeyB0eXBlOiAnc3RyaW5nJywgZm9ybWF0OiAnZGF0ZS10aW1lJyB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgNDA0OiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiB7IHR5cGU6ICdudW1iZXInIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiB7IHR5cGU6ICdzdHJpbmcnIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBldmVudG9Bc2lzdGV0ZXNHZXRTY2hlbWE6IEZhc3RpZnlTY2hlbWEgPSB7XG4gICAgZGVzY3JpcHRpb246ICdPYnRpZW5lIGVsIHRvdGFsIGRlIGFzaXN0ZW50ZXMgYSB1biBldmVudG8nLFxuICAgIHRhZ3M6IFsnRXZlbnRvJ10sXG4gICAgaGVhZGVyczoge1xuICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgcmVxdWlyZWQ6IFsnQXV0aG9yaXphdGlvbiddLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICBBdXRob3JpemF0aW9uOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdUb2tlbiBkZSBhdXRlbnRpY2FjaW9uLiBGb3JtYXRvOiBCZWFyZXIgPHRva2VuPidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcGFyYW1zOiB7XG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICBpZDoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ0VsIElEIGRlbCBldmVudG8gZGViZSBzZXIgdW4gbsO6bWVyby4nXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICByZXF1aXJlZDogWydpZCddLFxuICAgICAgICBlcnJvck1lc3NhZ2U6IHtcbiAgICAgICAgICAgIHJlcXVpcmVkOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICdFbCBJRCBkZWwgZXZlbnRvIGVzIHJlcXVlcmlkby4nXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlc3BvbnNlOiB7XG4gICAgICAgIDIwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdTdWNjZXNmdWwgcmVzcG9uc2UnLFxuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgaXNFcnJvcjogeyB0eXBlOiAnYm9vbGVhbicgfSxcbiAgICAgICAgICAgICAgICBpZDogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB7IHR5cGU6ICdudW1iZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBub21icmU6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXBjaW9uOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBsdWdhcjogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2l1ZGFkOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBmZWNoYTogeyB0eXBlOiAnc3RyaW5nJywgZm9ybWF0OiAnZGF0ZScgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvcmE6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsQXNpc3RlbnRlczogeyB0eXBlOiAnbnVtYmVyJyB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogeyB0eXBlOiAnc3RyaW5nJywgZm9ybWF0OiAnZGF0ZS10aW1lJyB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgNDAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0JhZCBSZXF1ZXN0JyxcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIGlzRXJyb3I6IHsgdHlwZTogJ2Jvb2xlYW4nIH0sXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIGNvZGU6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiB7IHR5cGU6ICdudW1iZXInIH0sXG4gICAgICAgICAgICAgICAgY2F1c2U6IHsgdHlwZTogWydzdHJpbmcnLCAnbnVsbCddIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH0sXG59O1xuXG5leHBvcnQgY29uc3QgdXBsb2FkRXhjZWxTY2hlbWE6IEZhc3RpZnlTY2hlbWEgPSB7XG4gICAgZGVzY3JpcHRpb246ICdTdWJlIHVuIGFyY2hpdm8gRXhjZWwgeSByZXRvcm5hIGVsIElEIGRlbCBwcm9jZXNvLiBcXG5cXG4nICtcbiAgICAgICAgJyoqRGVzY2FyZ2EgbGEgcGxhbnRpbGxhIGFxdcOtOioqIFtlbmxhY2UgYSBsYSBwbGFudGlsbGEgZGUgRXhjZWxdKGh0dHBzOi8vZG9jcy5nb29nbGUuY29tL3NwcmVhZHNoZWV0cy9kLzFJT2RaSWFaOEIwOVRveFRrODRGXzJLbHBqdFBCSWpneS9lZGl0P3VzcD1zaGFyaW5nJm91aWQ9MTAzNTM1Mjk4MzI2NDY1NTUyMzY5JnJ0cG9mPXRydWUmc2Q9dHJ1ZSknLFxuICAgIHRhZ3M6IFsnRXZlbnRvJ10sXG4gICAgaGVhZGVyczoge1xuICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgcmVxdWlyZWQ6IFsnQXV0aG9yaXphdGlvbiddLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICBBdXRob3JpemF0aW9uOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdUb2tlbiBkZSBhdXRlbnRpY2FjaW9uLiBGb3JtYXRvOiBCZWFyZXIgPHRva2VuPidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgY29uc3VtZXM6IFsnbXVsdGlwYXJ0L2Zvcm0tZGF0YSddLCAvLyBJbXBvcnRhbnRlIHBhcmEgYXJjaGl2b3NcbiAgICBib2R5OiB7XG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICBmaWxlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiAnYmluYXJ5JyAvLyBJbmRpY2EgcXVlIGVsIGN1ZXJwbyBlcyB1biBhcmNoaXZvIGJpbmFyaW9cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcmVxdWlyZWQ6IFsnZmlsZSddXG4gICAgfSxcbiAgICByZXNwb25zZToge1xuICAgICAgICAyMDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmVzcHVlc3RhIGV4aXRvc2EnLFxuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgaXNFcnJvcjoge3R5cGU6ICdib29sZWFuJ30sXG4gICAgICAgICAgICAgICAgaWQ6IHt0eXBlOiAnc3RyaW5nJywgZGVzY3JpcHRpb246ICdJRCBkZWwgcHJvY2Vzbyd9LFxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDoge3R5cGU6ICdzdHJpbmcnLCBmb3JtYXQ6ICdkYXRlLXRpbWUnfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICA0MDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQmFkIFJlcXVlc3QnLFxuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgaXNFcnJvcjoge3R5cGU6ICdib29sZWFuJ30sXG4gICAgICAgICAgICAgICAgbWVzc2FnZToge3R5cGU6ICdzdHJpbmcnfSxcbiAgICAgICAgICAgICAgICBjb2RlOiB7dHlwZTogJ3N0cmluZyd9LFxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHt0eXBlOiAnbnVtYmVyJ30sXG4gICAgICAgICAgICAgICAgY2F1c2U6IHt0eXBlOiBbJ3N0cmluZycsICdudWxsJ119XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIDQwNDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdOb3QgRm91bmQnLFxuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgaXNFcnJvcjoge3R5cGU6ICdib29sZWFuJ30sXG4gICAgICAgICAgICAgICAgbWVzc2FnZToge3R5cGU6ICdzdHJpbmcnfSxcbiAgICAgICAgICAgICAgICBjb2RlOiB7dHlwZTogJ3N0cmluZyd9LFxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHt0eXBlOiAnbnVtYmVyJ30sXG4gICAgICAgICAgICAgICAgY2F1c2U6IHt0eXBlOiBbJ3N0cmluZycsICdudWxsJ119XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldFByb2Nlc3NTdGF0dXNTY2hlbWE6IEZhc3RpZnlTY2hlbWEgPSB7XG4gICAgZGVzY3JpcHRpb246ICdPYnRpZW5lIGVsIGVzdGFkbyBkZSB1biBwcm9jZXNvIHBvciBzdSBJRCcsXG4gICAgdGFnczogWydFdmVudG8nXSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICByZXF1aXJlZDogWydBdXRob3JpemF0aW9uJ10sXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIEF1dGhvcml6YXRpb246IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1Rva2VuIGRlIGF1dGVudGljYWNpb24uIEZvcm1hdG86IEJlYXJlciA8dG9rZW4+J1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBwYXJhbXM6IHsgLy8gU2UgZGVmaW5lIHVuIG9iamV0byBwYXJhIGxvcyBwYXLDoW1ldHJvcyBkZSBsYSBydXRhXG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICBqb2JJZDoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnSUQgZGVsIHByb2Nlc28nXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlcXVpcmVkOiBbJ2pvYklkJ11cbiAgICB9LFxuICAgIHJlc3BvbnNlOiB7XG4gICAgICAgIDIwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZXNwdWVzdGEgZXhpdG9zYScsXG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBpc0Vycm9yOiB7IHR5cGU6ICdib29sZWFuJyB9LFxuICAgICAgICAgICAgICAgIGVzdGFkbzoge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdFc3RhZG8gZGVsIHByb2Nlc28nLFxuICAgICAgICAgICAgICAgICAgICBlbnVtOiBbJ2VuIGNvbGEnLCAncHJvY2VzYW5kbycsICdjb21wbGV0YWRvJywgJ2Vycm9yJ10gLy8gRWplbXBsbyBkZSBwb3NpYmxlcyBlc3RhZG9zXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IHsgdHlwZTogJ3N0cmluZycsIGZvcm1hdDogJ2RhdGUtdGltZScgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICA0MDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQmFkIFJlcXVlc3QnLFxuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgaXNFcnJvcjogeyB0eXBlOiAnYm9vbGVhbicgfSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgY29kZTogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgICAgICAgICBjYXVzZTogeyB0eXBlOiBbJ3N0cmluZycsICdudWxsJ10gfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICA0MDQ6IHsgLy8gU2UgYWdyZWdhIHVuYSBwb3NpYmxlIHJlc3B1ZXN0YSA0MDQgTm90IEZvdW5kXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1Byb2Nlc28gbm8gZW5jb250cmFkbycsXG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBpc0Vycm9yOiB7IHR5cGU6ICdib29sZWFuJyB9LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICBjb2RlOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogeyB0eXBlOiAnbnVtYmVyJyB9LFxuICAgICAgICAgICAgICAgIGNhdXNlOiB7IHR5cGU6IFsnc3RyaW5nJywgJ251bGwnXSB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgZXZlbnRvQXNpc3RldGVzRGlhR2V0U2NoZW1hOiBGYXN0aWZ5U2NoZW1hID0ge1xuICAgIGRlc2NyaXB0aW9uOiAnT2J0aWVuZSBlbCB0b3RhbCBkZSBhc2lzdGVudGVzIGEgdW4gZXZlbnRvIHBvciBkaWEnLFxuICAgIHRhZ3M6IFsnRXZlbnRvJ10sXG4gICAgaGVhZGVyczoge1xuICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgcmVxdWlyZWQ6IFsnQXV0aG9yaXphdGlvbiddLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICBBdXRob3JpemF0aW9uOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdUb2tlbiBkZSBhdXRlbnRpY2FjaW9uLiBGb3JtYXRvOiBCZWFyZXIgPHRva2VuPidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVzcG9uc2U6IHtcbiAgICAgICAgMjAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1N1Y2Nlc2Z1bCByZXNwb25zZScsXG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBpc0Vycm9yOiB7IHR5cGU6ICdib29sZWFuJyB9LFxuICAgICAgICAgICAgICAgIGlkOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlhU2VtYW5hOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3RhbEFzaXN0ZW50ZXM6IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiB7IHR5cGU6ICdzdHJpbmcnLCBmb3JtYXQ6ICdkYXRlLXRpbWUnIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICA0MDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQmFkIFJlcXVlc3QnLFxuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgaXNFcnJvcjogeyB0eXBlOiAnYm9vbGVhbicgfSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgY29kZTogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgICAgICAgICBjYXVzZTogeyB0eXBlOiBbJ3N0cmluZycsICdudWxsJ10gfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfSxcbn07XG4iXX0=