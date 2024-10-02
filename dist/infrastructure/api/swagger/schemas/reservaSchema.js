"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReservaSchema = exports.updateReservaSchema = exports.getReservaSchema = exports.createReservaSchema = void 0;
exports.createReservaSchema = {
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
exports.getReservaSchema = {
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
exports.updateReservaSchema = {
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
        400: {
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            }
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
exports.deleteReservaSchema = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXJ2YVNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9pbmZyYXN0cnVjdHVyZS9hcGkvc3dhZ2dlci9zY2hlbWFzL3Jlc2VydmFTY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRWEsUUFBQSxtQkFBbUIsR0FBa0I7SUFDOUMsV0FBVyxFQUFFLG1CQUFtQjtJQUNoQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUM7SUFDakIsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsQ0FBQyxlQUFlLENBQUM7UUFDM0IsVUFBVSxFQUFFO1lBQ1IsYUFBYSxFQUFFO2dCQUNYLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSxpREFBaUQ7YUFDakU7U0FDSjtLQUNKO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsQ0FBQyxjQUFjLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixDQUFDO1FBQzNELFlBQVksRUFBRTtZQUNWLFFBQVEsRUFBRTtnQkFDTixZQUFZLEVBQUUsbUNBQW1DO2dCQUNqRCxTQUFTLEVBQUUsZ0NBQWdDO2dCQUMzQyxnQkFBZ0IsRUFBRSxzQ0FBc0M7YUFDM0Q7U0FDSjtRQUNELFVBQVUsRUFBRTtZQUNSLFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsU0FBUztnQkFDZixZQUFZLEVBQUUsZ0RBQWdEO2FBQ2pFO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxTQUFTO2dCQUNmLFlBQVksRUFBRSw2Q0FBNkM7YUFDOUQ7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDZCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsQ0FBQztnQkFDVixZQUFZLEVBQUU7b0JBQ1YsT0FBTyxFQUFFLDZDQUE2QztvQkFDdEQsSUFBSSxFQUFFLG1EQUFtRDtpQkFDNUQ7YUFDSjtTQUNKO0tBQ0o7SUFDRCxRQUFR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RUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7Z0JBQzlCLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7Z0JBQ3pCLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7YUFDOUI7U0FDSjtLQUNKO0NBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RmFzdGlmeVNjaGVtYX0gZnJvbSBcImZhc3RpZnlcIjtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVJlc2VydmFTY2hlbWE6IEZhc3RpZnlTY2hlbWEgPSB7XG4gICAgZGVzY3JpcHRpb246ICdDcmVhciB1bmEgcmVzZXJ2YScsXG4gICAgdGFnczogWydSZXNlcnZhJ10sXG4gICAgaGVhZGVyczoge1xuICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgcmVxdWlyZWQ6IFsnQXV0aG9yaXphdGlvbiddLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICBBdXRob3JpemF0aW9uOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdUb2tlbiBkZSBhdXRlbnRpY2FjaW9uLiBGb3JtYXRvOiBCZWFyZXIgPHRva2VuPidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgYm9keToge1xuICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgcmVxdWlyZWQ6IFsnYXNpc3RlbnRlX2lkJywgJ2V2ZW50b19pZCcsICdjYW50aWRhZF9ib2xldG9zJ10sXG4gICAgICAgIGVycm9yTWVzc2FnZToge1xuICAgICAgICAgICAgcmVxdWlyZWQ6IHtcbiAgICAgICAgICAgICAgICBhc2lzdGVudGVfaWQ6ICdFbCBJRCBkZWwgYXNpc3RlbnRlIGVzIHJlcXVlcmlkby4nLFxuICAgICAgICAgICAgICAgIGV2ZW50b19pZDogJ0VsIElEIGRlbCBldmVudG8gZXMgcmVxdWVyaWRvLicsXG4gICAgICAgICAgICAgICAgY2FudGlkYWRfYm9sZXRvczogJ0xhIGNhbnRpZGFkIGRlIGJvbGV0b3MgZXMgcmVxdWVyaWRhLidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgYXNpc3RlbnRlX2lkOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2ludGVnZXInLFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ0VsIElEIGRlbCBhc2lzdGVudGUgZGViZSBzZXIgdW4gbsO6bWVybyBlbnRlcm8uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV2ZW50b19pZDoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdFbCBJRCBkZWwgZXZlbnRvIGRlYmUgc2VyIHVuIG7Dum1lcm8gZW50ZXJvLidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjYW50aWRhZF9ib2xldG9zOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2ludGVnZXInLFxuICAgICAgICAgICAgICAgIG1pbmltdW06IDEsXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgICAgIG1pbmltdW06ICdMYSBjYW50aWRhZCBkZSBib2xldG9zIGRlYmUgc2VyIGFsIG1lbm9zIDEuJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0xhIGNhbnRpZGFkIGRlIGJvbGV0b3MgZGViZSBzZXIgdW4gbsO6bWVybyBlbnRlcm8uJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlc3BvbnNlOiB7XG4gICAgICAgIDIwMDoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgaXNFcnJvcjogeyB0eXBlOiAnYm9vbGVhbicgfSxcbiAgICAgICAgICAgICAgICBpZDogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB7IHR5cGU6ICdudW1iZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBhc2lzdGVudGVfaWQ6IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50b19pZDogeyB0eXBlOiAnbnVtYmVyJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZmVjaGFfcmVzZXJ2YTogeyB0eXBlOiAnc3RyaW5nJywgZm9ybWF0OiAnZGF0ZS10aW1lJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FudGlkYWRfYm9sZXRvczogeyB0eXBlOiAnbnVtYmVyJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXN0YWRvOiB7IHR5cGU6ICdzdHJpbmcnIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiB7IHR5cGU6ICdzdHJpbmcnLCBmb3JtYXQ6ICdkYXRlLXRpbWUnIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICA0MDA6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHsgdHlwZTogJ3N0cmluZycgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICA0MDk6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHsgdHlwZTogJ3N0cmluZycgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldFJlc2VydmFTY2hlbWE6IEZhc3RpZnlTY2hlbWEgPSB7XG4gICAgZGVzY3JpcHRpb246ICdPYnRlbmVyIHVuYSByZXNlcnZhJyxcbiAgICB0YWdzOiBbJ1Jlc2VydmEnXSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICByZXF1aXJlZDogWydBdXRob3JpemF0aW9uJ10sXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIEF1dGhvcml6YXRpb246IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1Rva2VuIGRlIGF1dGVudGljYWNpb24uIEZvcm1hdG86IEJlYXJlciA8dG9rZW4+J1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBwYXJhbXM6IHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIGlkOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnRWwgSUQgZGViZSBzZXIgdW4gbsO6bWVyby4nXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICByZXF1aXJlZDogWydpZCddLFxuICAgICAgICBlcnJvck1lc3NhZ2U6IHtcbiAgICAgICAgICAgIHJlcXVpcmVkOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICdFbCBJRCBlcyByZXF1ZXJpZG8uJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICByZXNwb25zZToge1xuICAgICAgICAyMDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU3VjY2VzZnVsIHJlc3BvbnNlJyxcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIGlzRXJyb3I6IHsgdHlwZTogJ2Jvb2xlYW4nIH0sXG4gICAgICAgICAgICAgICAgaWQ6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogeyB0eXBlOiAnbnVtYmVyJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgYXNpc3RlbnRlX2lkOiB7IHR5cGU6ICdudW1iZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudG9faWQ6IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZlY2hhX3Jlc2VydmE6IHsgdHlwZTogJ3N0cmluZycsIGZvcm1hdDogJ2RhdGUtdGltZScgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbnRpZGFkX2JvbGV0b3M6IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVzdGFkbzogeyB0eXBlOiAnc3RyaW5nJyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPdHJvcyBjYW1wb3MgcXVlIGRlc2VlcyBkZXZvbHZlciBlbiBsYSByZXNwdWVzdGFcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiB7IHR5cGU6ICdzdHJpbmcnLCBmb3JtYXQ6ICdkYXRlLXRpbWUnIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICA0MDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQmFkIFJlcXVlc3QnLFxuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgaXNFcnJvcjogeyB0eXBlOiAnYm9vbGVhbicgfSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgY29kZTogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgICAgICAgICBjYXVzZTogeyB0eXBlOiBbJ3N0cmluZycsICdudWxsJ10gfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVSZXNlcnZhU2NoZW1hOiBGYXN0aWZ5U2NoZW1hID0ge1xuICAgIGRlc2NyaXB0aW9uOiAnQ29uZmlybWFyIG8gY2FuY2VsYXIgdW5hIHJlc2VydmEnLFxuICAgIHRhZ3M6IFsnUmVzZXJ2YSddLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIHJlcXVpcmVkOiBbJ0F1dGhvcml6YXRpb24nXSxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVG9rZW4gZGUgYXV0ZW50aWNhY2lvbi4gRm9ybWF0bzogQmVhcmVyIDx0b2tlbj4nXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGJvZHk6IHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIHJlcXVpcmVkOiBbJ2lkJywgJ2VzdGFkbyddLFxuICAgICAgICBlcnJvck1lc3NhZ2U6IHtcbiAgICAgICAgICAgIHJlcXVpcmVkOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICdFbCBJRCBlcyByZXF1ZXJpZG8uJyxcbiAgICAgICAgICAgICAgICBlc3RhZG86ICdFbCBlc3RhZG8gZXMgcmVxdWVyaWRvLidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgaWQ6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdFbCBJRCBkZWJlIHNlciB1biBuw7ptZXJvLidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlc3RhZG86IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBlbnVtOiBbJ2NvbmZpcm1hZGEnLCAnY2FuY2VsYWRhJ10sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgICAgIGVudW06ICdFbCBlc3RhZG8gZGViZSBzZXIgXCJjb25maXJtYWRhXCIgbyBcImNhbmNlbGFkYVwiLicsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdFbCBlc3RhZG8gZGViZSBzZXIgdW5hIGNhZGVuYSBkZSB0ZXh0by4nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICByZXNwb25zZToge1xuICAgICAgICAyMDA6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIGlzRXJyb3I6IHsgdHlwZTogJ2Jvb2xlYW4nIH0sXG4gICAgICAgICAgICAgICAgaWQ6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogeyB0eXBlOiAnbnVtYmVyJyB9LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IHsgdHlwZTogJ3N0cmluZycsIGZvcm1hdDogJ2RhdGUtdGltZScgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIDQwMDogeyAvLyBFcnJvciBkZSB2YWxpZGFjacOzbiBvIHByb2JsZW1hIGFsIGFjdHVhbGl6YXJcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHsgdHlwZTogJ3N0cmluZycgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICA0MDQ6IHsgLy8gUmVzZXJ2YSBubyBlbmNvbnRyYWRhXG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiB7IHR5cGU6ICdudW1iZXInIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiB7IHR5cGU6ICdzdHJpbmcnIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBkZWxldGVSZXNlcnZhU2NoZW1hOiBGYXN0aWZ5U2NoZW1hID0ge1xuICAgIGRlc2NyaXB0aW9uOiAnRWxpbWluYXIgdW5hIHJlc2VydmEnLFxuICAgIHRhZ3M6IFsnUmVzZXJ2YSddLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIHJlcXVpcmVkOiBbJ0F1dGhvcml6YXRpb24nXSxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVG9rZW4gZGUgYXV0ZW50aWNhY2lvbi4gRm9ybWF0bzogQmVhcmVyIDx0b2tlbj4nXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHBhcmFtczoge1xuICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgcmVxdWlyZWQ6IFsnaWQnXSxcbiAgICAgICAgZXJyb3JNZXNzYWdlOiB7XG4gICAgICAgICAgICByZXF1aXJlZDoge1xuICAgICAgICAgICAgICAgIGlkOiAnRWwgSUQgZXMgcmVxdWVyaWRvLidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgaWQ6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdFbCBJRCBkZWJlIHNlciB1biBuw7ptZXJvLidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVzcG9uc2U6IHtcbiAgICAgICAgMjAwOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBpc0Vycm9yOiB7IHR5cGU6ICdib29sZWFuJyB9LFxuICAgICAgICAgICAgICAgIGlkOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVuc2FqZTogeyB0eXBlOiAnc3RyaW5nJyB9LCAvLyBNZW5zYWplIGRlIMOpeGl0b1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IHsgdHlwZTogJ3N0cmluZycsIGZvcm1hdDogJ2RhdGUtdGltZScgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIDQwNDogeyAvLyBSZXNlcnZhIG5vIGVuY29udHJhZGFcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHsgdHlwZTogJ3N0cmluZycgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcbiJdfQ==