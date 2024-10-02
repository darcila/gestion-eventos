"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProcessStatusSchema = exports.uploadExcelSchema = exports.eventoAsistetesGetSchema = exports.deleteEventoSchema = exports.pathEventoSchema = exports.createEventoSchema = exports.eventoCercanosGetSchema = exports.eventoLugaresGetSchema = exports.eventoGetSchema = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRvU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL2FwaS9zd2FnZ2VyL3NjaGVtYXMvZXZlbnRvU2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVhLFFBQUEsZUFBZSxHQUFrQjtJQUMxQyxXQUFXLEVBQUUsbUJBQW1CO0lBQ2hDLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQztJQUNoQixPQUFPLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxDQUFDLGVBQWUsQ0FBQztRQUMzQixVQUFVLEVBQUU7WUFDUixhQUFhLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLGlEQUFpRDthQUNqRTtTQUNKO0tBQ0o7SUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLFVBQVUsRUFBRTtZQUNSLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLDZDQUE2QyxFQUFHO1NBQ3ZGO1FBQ0QsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDO0tBQ25CO0lBQ0QsUUFBUSxFQUFFO1FBQ04sR0FBRyxFQUFFO1lBQ0QsV0FBVyxFQUFFLG9CQUFvQjtZQUNqQyxJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRTtnQkFDUixPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO2dCQUM1QixFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO2dCQUN0QixJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsVUFBVSxFQUFFO3dCQUNSLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7d0JBQ3RCLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7d0JBQzFCLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7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QUksRUFBRSxRQUFRO29CQUNkLFdBQVcsRUFBRSxvQkFBb0I7b0JBQ2pDLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQztpQkFDekQ7Z0JBQ0QsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFO2FBQ3JEO1NBQ0o7UUFDRCxHQUFHLEVBQUU7WUFDRCxXQUFXLEVBQUUsYUFBYTtZQUMxQixJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRTtnQkFDUixPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO2dCQUM1QixPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO2dCQUMzQixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO2dCQUN4QixVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO2dCQUM5QixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7YUFDdEM7U0FDSjtRQUNELEdBQUcsRUFBRTtZQUNELFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsSUFBSSxFQUFFLFFBQVE7WUFDZCxVQUFVLEVBQUU7Z0JBQ1IsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtnQkFDNUIsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtnQkFDM0IsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtnQkFDeEIsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtnQkFDOUIsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO2FBQ3RDO1NBQ0o7S0FDSjtDQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Zhc3RpZnlTY2hlbWF9IGZyb20gXCJmYXN0aWZ5XCI7XG5cbmV4cG9ydCBjb25zdCBldmVudG9HZXRTY2hlbWE6IEZhc3RpZnlTY2hlbWEgPSB7XG4gICAgZGVzY3JpcHRpb246ICdPYnRlbmVyIHVuIGV2ZW50bycsXG4gICAgdGFnczogWydFdmVudG8nXSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICByZXF1aXJlZDogWydBdXRob3JpemF0aW9uJ10sXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIEF1dGhvcml6YXRpb246IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1Rva2VuIGRlIGF1dGVudGljYWNpb24uIEZvcm1hdG86IEJlYXJlciA8dG9rZW4+J1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBwYXJhbXM6IHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIGlkOiB7IHR5cGU6ICdudW1iZXInLCBlcnJvck1lc3NhZ2U6ICdFbCBJRCBkZWwgZXZlbnRvIGRlYmUgc2VyIHVuIG7Dum1lcm8gZW50ZXJvLicgIH0sIC8vIFJlbW92ZW1vcyAnZXhhbXBsZSdcbiAgICAgICAgfSxcbiAgICAgICAgcmVxdWlyZWQ6IFsnaWQnXSxcbiAgICB9LFxuICAgIHJlc3BvbnNlOiB7XG4gICAgICAgIDIwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdTdWNjZXNmdWwgcmVzcG9uc2UnLFxuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgaXNFcnJvcjogeyB0eXBlOiAnYm9vbGVhbicgfSxcbiAgICAgICAgICAgICAgICBpZDogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB7IHR5cGU6ICdudW1iZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBub21icmU6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXBjaW9uOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBsdWdhcjogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2l1ZGFkOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBmZWNoYTogeyB0eXBlOiAnc3RyaW5nJywgZm9ybWF0OiAnZGF0ZScgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvcmE6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbG9yOiB7IHR5cGU6ICdudW1iZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXBhY2lkYWQ6IHsgdHlwZTogJ251bWJlcicgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IHsgdHlwZTogJ3N0cmluZycsIGZvcm1hdDogJ2RhdGUtdGltZScgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIDQwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdCYWQgUmVxdWVzdCcsXG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBpc0Vycm9yOiB7IHR5cGU6ICdib29sZWFuJyB9LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICBjb2RlOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogeyB0eXBlOiAnbnVtYmVyJyB9LFxuICAgICAgICAgICAgICAgIGNhdXNlOiB7IHR5cGU6IFsnc3RyaW5nJywgJ251bGwnXSB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGV2ZW50b0x1Z2FyZXNHZXRTY2hlbWE6IEZhc3RpZnlTY2hlbWEgPSB7XG4gICAgZGVzY3JpcHRpb246ICdPYnRpZW5lIGxvcyBsdWdhcmVzIGNlcmNhbm9zIGFsIGV2ZW50bywgZXN0ZSBkZXZvbHZlcmEgNSBsdWdhcmVzIGNlcmNhbm9zIGFzIHN1IHBvc2ljaW9uJyxcbiAgICB0YWdzOiBbJ0V2ZW50byddLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIHJlcXVpcmVkOiBbJ0F1dGhvcml6YXRpb24nXSxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVG9rZW4gZGUgYXV0ZW50aWNhY2lvbi4gRm9ybWF0bzogQmVhcmVyIDx0b2tlbj4nXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHF1ZXJ5c3RyaW5nOiB7XG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICB0aXBvOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICBldmVudG86IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgfSxcbiAgICAgICAgcmVxdWlyZWQ6IFsndGlwbycsICdldmVudG8nXSxcbiAgICB9LFxuICAgIHJlc3BvbnNlOiB7XG4gICAgICAgIDIwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdTdWNjZXNmdWwgcmVzcG9uc2UnLFxuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgaXNFcnJvcjogeyB0eXBlOiAnYm9vbGVhbicgfSxcbiAgICAgICAgICAgICAgICBpZDogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vbWJyZTogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjY2lvbjogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogeyB0eXBlOiAnc3RyaW5nJywgZm9ybWF0OiAnZGF0ZS10aW1lJyB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgNDAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0JhZCBSZXF1ZXN0JyxcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIGlzRXJyb3I6IHsgdHlwZTogJ2Jvb2xlYW4nIH0sXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIGNvZGU6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiB7IHR5cGU6ICdudW1iZXInIH0sXG4gICAgICAgICAgICAgICAgY2F1c2U6IHsgdHlwZTogWydzdHJpbmcnLCAnbnVsbCddIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH0sXG59O1xuXG5leHBvcnQgY29uc3QgZXZlbnRvQ2VyY2Fub3NHZXRTY2hlbWE6IEZhc3RpZnlTY2hlbWEgPSB7XG4gICAgZGVzY3JpcHRpb246ICdPYnRpZW5lIGV2ZW50b3MgY2VyY2Fub3MgZGUgYWN1ZXJkbyBhIHVuYSBkaXJlY2Npb24geSBkaXN0YW5jaWEgZW4ga2lsb21ldHJvcycsXG4gICAgdGFnczogWydFdmVudG8nXSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICByZXF1aXJlZDogWydBdXRob3JpemF0aW9uJ10sXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIEF1dGhvcml6YXRpb246IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1Rva2VuIGRlIGF1dGVudGljYWNpb24uIEZvcm1hdG86IEJlYXJlciA8dG9rZW4+J1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBxdWVyeXN0cmluZzoge1xuICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgZGlyZWNjaW9uOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnTGEgZGlyZWNjacOzbiBkZWJlIHNlciB1bmEgY2FkZW5hIGRlIHRleHRvIHF1ZSByZXByZXNlbnRlIHVuYSB1YmljYWNpw7NuIHbDoWxpZGEuJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRpc3RhbmNpYToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ0xhIGRpc3RhbmNpYSBkZWJlIHNlciB1biBuw7ptZXJvIHF1ZSByZXByZXNlbnRlIGxhIGRpc3RhbmNpYSBlbiBraWzDs21ldHJvcy4nLFxuICAgICAgICAgICAgICAgIG1pbmltdW06IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaXVkYWQ6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdMYSBjaXVkYWQgZGViZSBzZXIgdW5hIGNhZGVuYSBkZSB0ZXh0by4nXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICByZXF1aXJlZDogWydkaXJlY2Npb24nLCAnZGlzdGFuY2lhJywgJ2NpdWRhZCddLFxuICAgICAgICBlcnJvck1lc3NhZ2U6IHtcbiAgICAgICAgICAgIHJlcXVpcmVkOiB7XG4gICAgICAgICAgICAgICAgZGlyZWNjaW9uOiAnTGEgZGlyZWNjacOzbiBlcyByZXF1ZXJpZGEuJyxcbiAgICAgICAgICAgICAgICBkaXN0YW5jaWE6ICdMYSBkaXN0YW5jaWEgZXMgcmVxdWVyaWRhLicsXG4gICAgICAgICAgICAgICAgY2l1ZGFkOiAnTGEgY2l1ZGFkIGVzIHJlcXVlcmlkYS4nXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlc3BvbnNlOiB7XG4gICAgICAgIDIwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdTdWNjZXNmdWwgcmVzcG9uc2UnLFxuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgaXNFcnJvcjogeyB0eXBlOiAnYm9vbGVhbicgfSxcbiAgICAgICAgICAgICAgICBpZDogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vbWJyZTogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjY2lvbjogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZlY2hhOiB7IHR5cGU6ICdzdHJpbmcnLCBmb3JtYXQ6ICdkYXRlJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbG9yOiB7IHR5cGU6ICdudW1iZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2lhOiB7IHR5cGU6ICdudW1iZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiB7IHR5cGU6ICdzdHJpbmcnLCBmb3JtYXQ6ICdkYXRlLXRpbWUnIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICA0MDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQmFkIFJlcXVlc3QnLFxuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgaXNFcnJvcjogeyB0eXBlOiAnYm9vbGVhbicgfSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgY29kZTogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgICAgICAgICBjYXVzZTogeyB0eXBlOiBbJ3N0cmluZycsICdudWxsJ10gfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVFdmVudG9TY2hlbWE6IEZhc3RpZnlTY2hlbWEgPSB7XG4gICAgZGVzY3JpcHRpb246ICdDcmVhciB1biBldmVudG8nLFxuICAgIHRhZ3M6IFsnRXZlbnRvJ10sXG4gICAgaGVhZGVyczoge1xuICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgcmVxdWlyZWQ6IFsnQXV0aG9yaXphdGlvbiddLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICBBdXRob3JpemF0aW9uOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdUb2tlbiBkZSBhdXRlbnRpY2FjaW9uLiBGb3JtYXRvOiBCZWFyZXIgPHRva2VuPidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgYm9keToge1xuICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgcmVxdWlyZWQ6IFsnbm9tYnJlJywgJ2Rlc2NyaXBjaW9uJywgJ2x1Z2FyJywgJ2NpdWRhZCcsICdmZWNoYScsICdob3JhJ10sXG4gICAgICAgIGVycm9yTWVzc2FnZToge1xuICAgICAgICAgICAgcmVxdWlyZWQ6IHtcbiAgICAgICAgICAgICAgICBub21icmU6ICdFbCBub21icmUgZGVsIGV2ZW50byBlcyByZXF1ZXJpZG8uJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwY2lvbjogJ0xhIGRlc2NyaXBjacOzbiBkZWwgZXZlbnRvIGVzIHJlcXVlcmlkYS4nLFxuICAgICAgICAgICAgICAgIGx1Z2FyOiAnRWwgbHVnYXIgZGVsIGV2ZW50byBlcyByZXF1ZXJpZG8uJyxcbiAgICAgICAgICAgICAgICBjaXVkYWQ6ICdMYSBjaXVkYWQgZGVsIGV2ZW50byBlcyByZXF1ZXJpZGEuJyxcbiAgICAgICAgICAgICAgICBmZWNoYTogJ0xhIGZlY2hhIGRlbCBldmVudG8gZXMgcmVxdWVyaWRhLicsXG4gICAgICAgICAgICAgICAgaG9yYTogJ0xhIGhvcmEgZGVsIGV2ZW50byBlcyByZXF1ZXJpZGEuJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICBub21icmU6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBtYXhMZW5ndGg6IDIwMCxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICAgICAgbWF4TGVuZ3RoOiAnRWwgbm9tYnJlIGRlbCBldmVudG8gbm8gcHVlZGUgZXhjZWRlciBsb3MgMjAwIGNhcmFjdGVyZXMuJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwY2lvbjoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ0xhIGRlc2NyaXBjacOzbiBkZWwgZXZlbnRvIGRlYmUgc2VyIHVuYSBjYWRlbmEgZGUgdGV4dG8uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGx1Z2FyOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgbWF4TGVuZ3RoOiAyMDAsXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgICAgIG1heExlbmd0aDogJ0VsIGx1Z2FyIGRlbCBldmVudG8gbm8gcHVlZGUgZXhjZWRlciBsb3MgMjAwIGNhcmFjdGVyZXMuJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaXVkYWQ6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBtYXhMZW5ndGg6IDcwLFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZToge1xuICAgICAgICAgICAgICAgICAgICBtYXhMZW5ndGg6ICdMYSBjaXVkYWQgZGVsIGV2ZW50byBubyBwdWVkZSBleGNlZGVyIGxvcyA3MCBjYXJhY3RlcmVzLidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmVjaGE6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBmb3JtYXQ6ICdkYXRlJyxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdMYSBmZWNoYSBkZWwgZXZlbnRvIGRlYmUgdGVuZXIgZWwgZm9ybWF0byBBQUFBLU1NLURELidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBob3JhOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnTGEgaG9yYSBkZWwgZXZlbnRvIGRlYmUgc2VyIHVuYSBjYWRlbmEgZGUgdGV4dG8gZW4gZm9ybWF0byB2w6FsaWRvIChlLmcuLCBcIjE0OjMwXCIpLidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjYXRlZ29yaWE6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ0xhIGNhdGVnb3LDrWEgZGViZSBzZXIgdW4gYXJyYXkuJyAsXG4gICAgICAgICAgICAgICAgaXRlbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ0NhZGEgY2F0ZWdvcsOtYSBkZWJlIHNlciB1bmEgY2FkZW5hIGRlIHRleHRvLidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2FwYWNpZGFkOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2ludGVnZXInLFxuICAgICAgICAgICAgICAgIG1pbmltdW06IDAsXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgICAgIG1pbmltdW06ICdMYSBjYXBhY2lkYWQgZGVsIGV2ZW50byBkZWJlIHNlciB1biBuw7ptZXJvIG5vIG5lZ2F0aXZvLicsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdMYSBjYXBhY2lkYWQgZGVsIGV2ZW50byBkZWJlIHNlciB1biBuw7ptZXJvIGVudGVyby4nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZhbG9yOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICAgICAgbWluaW11bTogMCxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICAgICAgbWluaW11bTogJ0VsIHZhbG9yIGRlbCBldmVudG8gZGViZSBzZXIgdW4gbsO6bWVybyBubyBuZWdhdGl2by4nLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnRWwgdmFsb3IgZGVsIGV2ZW50byBkZWJlIHNlciB1biBuw7ptZXJvLidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlc3BvbnNlOiB7XG4gICAgICAgIDIwMDogeyAvLyBSZXNwdWVzdGEgZXhpdG9zYSAoZXZlbnRvIGNyZWFkbylcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIGlzRXJyb3I6IHsgdHlwZTogJ2Jvb2xlYW4nIH0sXG4gICAgICAgICAgICAgICAgaWQ6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogeyB0eXBlOiAnbnVtYmVyJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbm9tYnJlOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwY2lvbjogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbHVnYXI6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNpdWRhZDogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZmVjaGE6IHsgdHlwZTogJ3N0cmluZycsIGZvcm1hdDogJ2RhdGUnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBob3JhOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxvcjogeyB0eXBlOiAnbnVtYmVyJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwYWNpZGFkOiB7IHR5cGU6ICdudW1iZXInIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiB7IHR5cGU6ICdzdHJpbmcnLCBmb3JtYXQ6ICdkYXRlLXRpbWUnIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICA0MDA6IHsgLy8gRXJyb3IgZGUgdmFsaWRhY2nDs25cbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHsgdHlwZTogJ3N0cmluZycgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHBhdGhFdmVudG9TY2hlbWE6IEZhc3RpZnlTY2hlbWEgPSB7XG4gICAgZGVzY3JpcHRpb246ICdBY3R1YWxpemFyIHVuIGV2ZW50bycsXG4gICAgdGFnczogWydFdmVudG8nXSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICByZXF1aXJlZDogWydBdXRob3JpemF0aW9uJ10sXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIEF1dGhvcml6YXRpb246IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1Rva2VuIGRlIGF1dGVudGljYWNpb24uIEZvcm1hdG86IEJlYXJlciA8dG9rZW4+J1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBib2R5OiB7XG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICByZXF1aXJlZDogWydpZCddLFxuICAgICAgICBlcnJvck1lc3NhZ2U6IHtcbiAgICAgICAgICAgIHJlcXVpcmVkOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICdFbCBJRCBkZWwgZXZlbnRvIGVzIHJlcXVlcmlkby4nXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIGlkOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnRWwgSUQgZGVsIGV2ZW50byBkZWJlIHNlciB1biBuw7ptZXJvIGVudGVyby4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm9tYnJlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnRWwgbm9tYnJlIGRlbCBldmVudG8gZGViZSBzZXIgdW5hIGNhZGVuYSBkZSB0ZXh0by4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmVjaGE6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBmb3JtYXQ6ICdkYXRlJyxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdMYSBmZWNoYSBkZWwgZXZlbnRvIGRlYmUgdGVuZXIgZWwgZm9ybWF0byBBQUFBLU1NLURELidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBob3JhOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiAndGltZScsXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnTGEgaG9yYSBkZWwgZXZlbnRvIGRlYmUgdGVuZXIgZWwgZm9ybWF0byBISDpNTS4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2FwYWNpZGFkOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2ludGVnZXInLFxuICAgICAgICAgICAgICAgIG1pbmltdW06IDAsXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdMYSBjYXBhY2lkYWQgZGVsIGV2ZW50byBkZWJlIHNlciB1biBuw7ptZXJvIGVudGVyby4nLFxuICAgICAgICAgICAgICAgICAgICBtaW5pbXVtOiAnTGEgY2FwYWNpZGFkIGRlbCBldmVudG8gZGViZSBzZXIgdW4gbsO6bWVybyBubyBuZWdhdGl2by4nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZhbG9yOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICAgICAgbWluaW11bTogMCxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0VsIHZhbG9yIGRlbCBldmVudG8gZGViZSBzZXIgdW4gbsO6bWVyby4nLFxuICAgICAgICAgICAgICAgICAgICBtaW5pbXVtOiAnRWwgdmFsb3IgZGVsIGV2ZW50byBkZWJlIHNlciB1biBuw7ptZXJvIG5vIG5lZ2F0aXZvLidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlc3BvbnNlOiB7XG4gICAgICAgIDIwMDoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgaXNFcnJvcjogeyB0eXBlOiAnYm9vbGVhbicgfSxcbiAgICAgICAgICAgICAgICBpZDogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB7IHR5cGU6ICdudW1iZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBub21icmU6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiB7IHR5cGU6ICdzdHJpbmcnLCBmb3JtYXQ6ICdkYXRlLXRpbWUnIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICA0MDQ6IHsgLy8gRXZlbnRvIG5vIGVuY29udHJhZG9cbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHsgdHlwZTogJ3N0cmluZycgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGRlbGV0ZUV2ZW50b1NjaGVtYTogRmFzdGlmeVNjaGVtYSA9IHtcbiAgICBkZXNjcmlwdGlvbjogJ0JvcnJhciB1biBldmVudG8nLFxuICAgIHRhZ3M6IFsnRXZlbnRvJ10sXG4gICAgaGVhZGVyczoge1xuICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgcmVxdWlyZWQ6IFsnQXV0aG9yaXphdGlvbiddLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICBBdXRob3JpemF0aW9uOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdUb2tlbiBkZSBhdXRlbnRpY2FjaW9uLiBGb3JtYXRvOiBCZWFyZXIgPHRva2VuPidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcGFyYW1zOiB7XG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICByZXF1aXJlZDogWydpZCddLFxuICAgICAgICBlcnJvck1lc3NhZ2U6IHtcbiAgICAgICAgICAgIHJlcXVpcmVkOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICdFbCBJRCBkZWwgZXZlbnRvIGVzIHJlcXVlcmlkby4nXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIGlkOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2ludGVnZXInLFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ0VsIElEIGRlbCBldmVudG8gZGViZSBzZXIgdW4gbsO6bWVybyBlbnRlcm8uJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICByZXNwb25zZToge1xuICAgICAgICAyMDA6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIGlzRXJyb3I6IHsgdHlwZTogJ2Jvb2xlYW4nIH0sXG4gICAgICAgICAgICAgICAgaWQ6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogeyB0eXBlOiAnbnVtYmVyJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVuc2FqZTogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IHsgdHlwZTogJ3N0cmluZycsIGZvcm1hdDogJ2RhdGUtdGltZScgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIDQwNDoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogeyB0eXBlOiAnbnVtYmVyJyB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogeyB0eXBlOiAnc3RyaW5nJyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgZXZlbnRvQXNpc3RldGVzR2V0U2NoZW1hOiBGYXN0aWZ5U2NoZW1hID0ge1xuICAgIGRlc2NyaXB0aW9uOiAnT2J0aWVuZSBlbCB0b3RhbCBkZSBhc2lzdGVudGVzIGEgdW4gZXZlbnRvJyxcbiAgICB0YWdzOiBbJ0V2ZW50byddLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIHJlcXVpcmVkOiBbJ0F1dGhvcml6YXRpb24nXSxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVG9rZW4gZGUgYXV0ZW50aWNhY2lvbi4gRm9ybWF0bzogQmVhcmVyIDx0b2tlbj4nXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHBhcmFtczoge1xuICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgaWQ6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdFbCBJRCBkZWwgZXZlbnRvIGRlYmUgc2VyIHVuIG7Dum1lcm8uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgcmVxdWlyZWQ6IFsnaWQnXSxcbiAgICAgICAgZXJyb3JNZXNzYWdlOiB7XG4gICAgICAgICAgICByZXF1aXJlZDoge1xuICAgICAgICAgICAgICAgIGlkOiAnRWwgSUQgZGVsIGV2ZW50byBlcyByZXF1ZXJpZG8uJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICByZXNwb25zZToge1xuICAgICAgICAyMDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU3VjY2VzZnVsIHJlc3BvbnNlJyxcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIGlzRXJyb3I6IHsgdHlwZTogJ2Jvb2xlYW4nIH0sXG4gICAgICAgICAgICAgICAgaWQ6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogeyB0eXBlOiAnbnVtYmVyJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbm9tYnJlOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwY2lvbjogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbHVnYXI6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNpdWRhZDogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZmVjaGE6IHsgdHlwZTogJ3N0cmluZycsIGZvcm1hdDogJ2RhdGUnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBob3JhOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3RhbEFzaXN0ZW50ZXM6IHsgdHlwZTogJ251bWJlcicgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IHsgdHlwZTogJ3N0cmluZycsIGZvcm1hdDogJ2RhdGUtdGltZScgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIDQwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdCYWQgUmVxdWVzdCcsXG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBpc0Vycm9yOiB7IHR5cGU6ICdib29sZWFuJyB9LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICBjb2RlOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogeyB0eXBlOiAnbnVtYmVyJyB9LFxuICAgICAgICAgICAgICAgIGNhdXNlOiB7IHR5cGU6IFsnc3RyaW5nJywgJ251bGwnXSB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IHVwbG9hZEV4Y2VsU2NoZW1hOiBGYXN0aWZ5U2NoZW1hID0ge1xuICAgIGRlc2NyaXB0aW9uOiAnU3ViZSB1biBhcmNoaXZvIEV4Y2VsIHkgcmV0b3JuYSBlbCBJRCBkZWwgcHJvY2Vzby4gXFxuXFxuJyArXG4gICAgICAgICcqKkRlc2NhcmdhIGxhIHBsYW50aWxsYSBhcXXDrToqKiBbZW5sYWNlIGEgbGEgcGxhbnRpbGxhIGRlIEV4Y2VsXShodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9zcHJlYWRzaGVldHMvZC8xSU9kWklhWjhCMDlUb3hUazg0Rl8yS2xwanRQQklqZ3kvZWRpdD91c3A9c2hhcmluZyZvdWlkPTEwMzUzNTI5ODMyNjQ2NTU1MjM2OSZydHBvZj10cnVlJnNkPXRydWUpJyxcbiAgICB0YWdzOiBbJ0V2ZW50byddLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIHJlcXVpcmVkOiBbJ0F1dGhvcml6YXRpb24nXSxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVG9rZW4gZGUgYXV0ZW50aWNhY2lvbi4gRm9ybWF0bzogQmVhcmVyIDx0b2tlbj4nXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNvbnN1bWVzOiBbJ211bHRpcGFydC9mb3JtLWRhdGEnXSwgLy8gSW1wb3J0YW50ZSBwYXJhIGFyY2hpdm9zXG4gICAgYm9keToge1xuICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgZmlsZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogJ2JpbmFyeScgLy8gSW5kaWNhIHF1ZSBlbCBjdWVycG8gZXMgdW4gYXJjaGl2byBiaW5hcmlvXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlcXVpcmVkOiBbJ2ZpbGUnXVxuICAgIH0sXG4gICAgcmVzcG9uc2U6IHtcbiAgICAgICAgMjAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1Jlc3B1ZXN0YSBleGl0b3NhJyxcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIGlzRXJyb3I6IHt0eXBlOiAnYm9vbGVhbid9LFxuICAgICAgICAgICAgICAgIGlkOiB7dHlwZTogJ3N0cmluZycsIGRlc2NyaXB0aW9uOiAnSUQgZGVsIHByb2Nlc28nfSxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IHt0eXBlOiAnc3RyaW5nJywgZm9ybWF0OiAnZGF0ZS10aW1lJ31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgNDAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0JhZCBSZXF1ZXN0JyxcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIGlzRXJyb3I6IHt0eXBlOiAnYm9vbGVhbid9LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHt0eXBlOiAnc3RyaW5nJ30sXG4gICAgICAgICAgICAgICAgY29kZToge3R5cGU6ICdzdHJpbmcnfSxcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiB7dHlwZTogJ251bWJlcid9LFxuICAgICAgICAgICAgICAgIGNhdXNlOiB7dHlwZTogWydzdHJpbmcnLCAnbnVsbCddfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICA0MDQ6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnTm90IEZvdW5kJyxcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIGlzRXJyb3I6IHt0eXBlOiAnYm9vbGVhbid9LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHt0eXBlOiAnc3RyaW5nJ30sXG4gICAgICAgICAgICAgICAgY29kZToge3R5cGU6ICdzdHJpbmcnfSxcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiB7dHlwZTogJ251bWJlcid9LFxuICAgICAgICAgICAgICAgIGNhdXNlOiB7dHlwZTogWydzdHJpbmcnLCAnbnVsbCddfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRQcm9jZXNzU3RhdHVzU2NoZW1hOiBGYXN0aWZ5U2NoZW1hID0ge1xuICAgIGRlc2NyaXB0aW9uOiAnT2J0aWVuZSBlbCBlc3RhZG8gZGUgdW4gcHJvY2VzbyBwb3Igc3UgSUQnLFxuICAgIHRhZ3M6IFsnRXZlbnRvJ10sXG4gICAgaGVhZGVyczoge1xuICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgcmVxdWlyZWQ6IFsnQXV0aG9yaXphdGlvbiddLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICBBdXRob3JpemF0aW9uOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdUb2tlbiBkZSBhdXRlbnRpY2FjaW9uLiBGb3JtYXRvOiBCZWFyZXIgPHRva2VuPidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcGFyYW1zOiB7IC8vIFNlIGRlZmluZSB1biBvYmpldG8gcGFyYSBsb3MgcGFyw6FtZXRyb3MgZGUgbGEgcnV0YVxuICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgam9iSWQ6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0lEIGRlbCBwcm9jZXNvJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByZXF1aXJlZDogWydqb2JJZCddXG4gICAgfSxcbiAgICByZXNwb25zZToge1xuICAgICAgICAyMDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmVzcHVlc3RhIGV4aXRvc2EnLFxuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgaXNFcnJvcjogeyB0eXBlOiAnYm9vbGVhbicgfSxcbiAgICAgICAgICAgICAgICBlc3RhZG86IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnRXN0YWRvIGRlbCBwcm9jZXNvJyxcbiAgICAgICAgICAgICAgICAgICAgZW51bTogWydlbiBjb2xhJywgJ3Byb2Nlc2FuZG8nLCAnY29tcGxldGFkbycsICdlcnJvciddIC8vIEVqZW1wbG8gZGUgcG9zaWJsZXMgZXN0YWRvc1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiB7IHR5cGU6ICdzdHJpbmcnLCBmb3JtYXQ6ICdkYXRlLXRpbWUnIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgNDAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0JhZCBSZXF1ZXN0JyxcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIGlzRXJyb3I6IHsgdHlwZTogJ2Jvb2xlYW4nIH0sXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIGNvZGU6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiB7IHR5cGU6ICdudW1iZXInIH0sXG4gICAgICAgICAgICAgICAgY2F1c2U6IHsgdHlwZTogWydzdHJpbmcnLCAnbnVsbCddIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgNDA0OiB7IC8vIFNlIGFncmVnYSB1bmEgcG9zaWJsZSByZXNwdWVzdGEgNDA0IE5vdCBGb3VuZFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdQcm9jZXNvIG5vIGVuY29udHJhZG8nLFxuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgaXNFcnJvcjogeyB0eXBlOiAnYm9vbGVhbicgfSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgY29kZTogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgICAgICAgICBjYXVzZTogeyB0eXBlOiBbJ3N0cmluZycsICdudWxsJ10gfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcbiJdfQ==