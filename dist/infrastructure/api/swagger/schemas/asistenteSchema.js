"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAsistenteSchema = exports.updateAsistenteSchema = exports.getAsistentePorIdentificacionSchema = exports.createAsistenteSchema = void 0;
exports.createAsistenteSchema = {
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
                        id: { type: 'number' },
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
exports.getAsistentePorIdentificacionSchema = {
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
                        id: { type: 'number' },
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
exports.updateAsistenteSchema = {
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
exports.deleteAsistenteSchema = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNpc3RlbnRlU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL2FwaS9zd2FnZ2VyL3NjaGVtYXMvYXNpc3RlbnRlU2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVhLFFBQUEscUJBQXFCLEdBQWtCO0lBQ2hELFdBQVcsRUFBRSxvQkFBb0I7SUFDakMsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDO0lBQ25CLE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLENBQUMsZUFBZSxDQUFDO1FBQzNCLFVBQVUsRUFBRTtZQUNSLGFBQWEsRUFBRTtnQkFDWCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsaURBQWlEO2FBQ2pFO1NBQ0o7S0FDSjtJQUNELElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQztRQUNuRixZQUFZLEVBQUU7WUFDVixRQUFRLEVBQUU7Z0JBQ04sY0FBYyxFQUFFLGlDQUFpQztnQkFDakQsTUFBTSxFQUFFLHlCQUF5QjtnQkFDakMsU0FBUyxFQUFFLDRCQUE0QjtnQkFDdkMsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsTUFBTSxFQUFFLHFDQUFxQztnQkFDN0MsTUFBTSxFQUFFLHlCQUF5QjthQUNwQztTQUNKO1FBQ0QsVUFBVSxFQUFFO1lBQ1IsY0FBYyxFQUFFO2dCQUNaLElBQUksRUFBRSxRQUFRO2dCQUNkLFlBQVksRUFBRSxpREFBaUQ7YUFDbEU7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsU0FBUyxFQUFFLEdBQUc7Z0JBQ2QsWUFBWSxFQUFFO29CQUNWLFNBQVMsRUFBRSxnREFBZ0Q7b0JBQzNELElBQUksRUFBRSx5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SUFDRCxRQUFRLEVBQUU7UUFDTixHQUFHLEVBQUU7WUFDRCxJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRTtnQkFDUixPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO2dCQUM1QixFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO2dCQUN0QixJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsVUFBVSxFQUFFO3dCQUNSLGNBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7d0JBQ2xDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7cUJBQzlCO2lCQUNKO2dCQUNELFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRTthQUNyRDtTQUNKO1FBQ0QsR0FBRyxFQUFFO1lBQ0QsSUFBSSxFQUFFLFFBQVE7WUFDZCxVQUFVLEVBQUU7Z0JBQ1IsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtnQkFDOUIsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtnQkFDekIsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTthQUM5QjtTQUNKO0tBQ0o7Q0FDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtGYXN0aWZ5U2NoZW1hfSBmcm9tIFwiZmFzdGlmeVwiO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQXNpc3RlbnRlU2NoZW1hOiBGYXN0aWZ5U2NoZW1hID0ge1xuICAgIGRlc2NyaXB0aW9uOiAnQ3JlYXIgdW4gYXNpc3RlbnRlJyxcbiAgICB0YWdzOiBbJ0FzaXN0ZW50ZSddLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIHJlcXVpcmVkOiBbJ0F1dGhvcml6YXRpb24nXSxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVG9rZW4gZGUgYXV0ZW50aWNhY2lvbi4gRm9ybWF0bzogQmVhcmVyIDx0b2tlbj4nXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGJvZHk6IHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIHJlcXVpcmVkOiBbJ2lkZW50aWZpY2FjaW9uJywgJ25vbWJyZScsICdkaXJlY2Npb24nLCAndGVsZWZvbm8nLCAnY29ycmVvJywgJ2NpdWRhZCddLFxuICAgICAgICBlcnJvck1lc3NhZ2U6IHtcbiAgICAgICAgICAgIHJlcXVpcmVkOiB7XG4gICAgICAgICAgICAgICAgaWRlbnRpZmljYWNpb246ICdMYSBpZGVudGlmaWNhY2nDs24gZXMgcmVxdWVyaWRhLicsXG4gICAgICAgICAgICAgICAgbm9tYnJlOiAnRWwgbm9tYnJlIGVzIHJlcXVlcmlkby4nLFxuICAgICAgICAgICAgICAgIGRpcmVjY2lvbjogJ0xhIGRpcmVjY2nDs24gZXMgcmVxdWVyaWRhLicsXG4gICAgICAgICAgICAgICAgdGVsZWZvbm86ICdFbCB0ZWzDqWZvbm8gZXMgcmVxdWVyaWRvLicsXG4gICAgICAgICAgICAgICAgY29ycmVvOiAnRWwgY29ycmVvIGVsZWN0csOzbmljbyBlcyByZXF1ZXJpZG8uJyxcbiAgICAgICAgICAgICAgICBjaXVkYWQ6ICdMYSBjaXVkYWQgZXMgcmVxdWVyaWRhLidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgaWRlbnRpZmljYWNpb246IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdMYSBpZGVudGlmaWNhY2nDs24gZGViZSBzZXIgdW5hIGNhZGVuYSBkZSB0ZXh0by4nIC8vIFB1ZWRlcyBhanVzdGFyIGVsIG1lbnNhamUgc2Vnw7puIGVsIGZvcm1hdG8gZGUgaWRlbnRpZmljYWNpw7NuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm9tYnJlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgbWF4TGVuZ3RoOiAyMDAsXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgICAgIG1heExlbmd0aDogJ0VsIG5vbWJyZSBubyBwdWVkZSBleGNlZGVyIGxvcyAyMDAgY2FyYWN0ZXJlcy4nLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnRWwgbm9tYnJlIGRlYmUgc2VyIHVuYSBjYWRlbmEgZGUgdGV4dG8uJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkaXJlY2Npb246IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdMYSBkaXJlY2Npw7NuIGRlYmUgc2VyIHVuYSBjYWRlbmEgZGUgdGV4dG8uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbGVmb25vOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnRWwgdGVsw6lmb25vIGRlYmUgc2VyIHVuYSBjYWRlbmEgZGUgdGV4dG8uJyAvLyBQdWVkZXMgYcOxYWRpciB2YWxpZGFjacOzbiBwYXJhIGZvcm1hdG8gZGUgdGVsw6lmb25vIHNpIGVzIG5lY2VzYXJpb1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvcnJlbzoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogJ2VtYWlsJyxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdFbCBjb3JyZW8gZWxlY3Ryw7NuaWNvIGRlYmUgdGVuZXIgdW4gZm9ybWF0byB2w6FsaWRvLidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjYXRlZ29yaWFzOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgICAgICAgICBpdGVtczoge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnQ2FkYSBjYXRlZ29yw61hIGRlYmUgc2VyIHVuYSBjYWRlbmEgZGUgdGV4dG8uJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaXVkYWQ6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdMYSBjaXVkYWQgZGViZSBzZXIgdW5hIGNhZGVuYSBkZSB0ZXh0by4nXG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgfSxcbiAgICByZXNwb25zZToge1xuICAgICAgICAyMDA6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIGlzRXJyb3I6IHsgdHlwZTogJ2Jvb2xlYW4nIH0sXG4gICAgICAgICAgICAgICAgaWQ6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogeyB0eXBlOiAnbnVtYmVyJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgaWRlbnRpZmljYWNpb246IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vbWJyZTogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWNjaW9uOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZWxlZm9ubzogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY29ycmVvOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yaWFzOiB7IHR5cGU6ICdhcnJheScsIGl0ZW1zOiB7IHR5cGU6ICdzdHJpbmcnIH0gfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IHsgdHlwZTogJ3N0cmluZycsIGZvcm1hdDogJ2RhdGUtdGltZScgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIDQwMDoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogeyB0eXBlOiAnbnVtYmVyJyB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogeyB0eXBlOiAnc3RyaW5nJyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0QXNpc3RlbnRlUG9ySWRlbnRpZmljYWNpb25TY2hlbWE6IEZhc3RpZnlTY2hlbWEgPSB7XG4gICAgZGVzY3JpcHRpb246ICdPYnRlbmVyIHVuIGFzaXN0ZW50ZSBwb3Igc3UgaWRlbnRpZmljYWNpw7NuJyxcbiAgICB0YWdzOiBbJ0FzaXN0ZW50ZSddLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIHJlcXVpcmVkOiBbJ0F1dGhvcml6YXRpb24nXSxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVG9rZW4gZGUgYXV0ZW50aWNhY2lvbi4gRm9ybWF0bzogQmVhcmVyIDx0b2tlbj4nXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHBhcmFtczoge1xuICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgaWRlbnRpZmljYWNpb246IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdMYSBpZGVudGlmaWNhY2nDs24gZGViZSBzZXIgdW5hIGNhZGVuYSBkZSB0ZXh0by4nXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICByZXF1aXJlZDogWydpZGVudGlmaWNhY2lvbiddLFxuICAgICAgICBlcnJvck1lc3NhZ2U6IHtcbiAgICAgICAgICAgIHJlcXVpcmVkOiB7XG4gICAgICAgICAgICAgICAgaWRlbnRpZmljYWNpb246ICdMYSBpZGVudGlmaWNhY2nDs24gZXMgcmVxdWVyaWRhLidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVzcG9uc2U6IHtcbiAgICAgICAgMjAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1N1Y2Nlc2Z1bCByZXNwb25zZScsXG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBpc0Vycm9yOiB7IHR5cGU6ICdib29sZWFuJyB9LFxuICAgICAgICAgICAgICAgIGlkOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkZW50aWZpY2FjaW9uOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBub21icmU6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjY2lvbjogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVsZWZvbm86IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcnJlbzogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcmlhczogeyB0eXBlOiAnYXJyYXknLCBpdGVtczogeyB0eXBlOiAnc3RyaW5nJyB9IH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiB7IHR5cGU6ICdzdHJpbmcnLCBmb3JtYXQ6ICdkYXRlLXRpbWUnIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICA0MDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQmFkIFJlcXVlc3QnLFxuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgaXNFcnJvcjogeyB0eXBlOiAnYm9vbGVhbicgfSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgY29kZTogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgICAgICAgICBjYXVzZTogeyB0eXBlOiBbJ3N0cmluZycsICdudWxsJ10gfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIDQwNDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdBc2lzdGVudGUgbm8gZW5jb250cmFkbycsXG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiB7IHR5cGU6ICdudW1iZXInIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiB7IHR5cGU6ICdzdHJpbmcnIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG59O1xuXG5leHBvcnQgY29uc3QgdXBkYXRlQXNpc3RlbnRlU2NoZW1hOiBGYXN0aWZ5U2NoZW1hID0ge1xuICAgIGRlc2NyaXB0aW9uOiAnQWN0dWFsaXphciB1biBhc2lzdGVudGUgcG9yIHN1IGlkZW50aWZpY2FjacOzbicsXG4gICAgdGFnczogWydBc2lzdGVudGUnXSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICByZXF1aXJlZDogWydBdXRob3JpemF0aW9uJ10sXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIEF1dGhvcml6YXRpb246IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1Rva2VuIGRlIGF1dGVudGljYWNpb24uIEZvcm1hdG86IEJlYXJlciA8dG9rZW4+J1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBib2R5OiB7XG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICByZXF1aXJlZDogWydpZGVudGlmaWNhY2lvbiddLFxuICAgICAgICBlcnJvck1lc3NhZ2U6IHtcbiAgICAgICAgICAgIHJlcXVpcmVkOiB7XG4gICAgICAgICAgICAgICAgaWRlbnRpZmljYWNpb246ICdMYSBpZGVudGlmaWNhY2nDs24gZXMgcmVxdWVyaWRhLidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgaWRlbnRpZmljYWNpb246IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdMYSBpZGVudGlmaWNhY2nDs24gZGViZSBzZXIgdW5hIGNhZGVuYSBkZSB0ZXh0by4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm9tYnJlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgbWF4TGVuZ3RoOiAyMDAsXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgICAgIG1heExlbmd0aDogJ0VsIG5vbWJyZSBubyBwdWVkZSBleGNlZGVyIGxvcyAyMDAgY2FyYWN0ZXJlcy4nLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnRWwgbm9tYnJlIGRlYmUgc2VyIHVuYSBjYWRlbmEgZGUgdGV4dG8uJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkaXJlY2Npb246IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdMYSBkaXJlY2Npw7NuIGRlYmUgc2VyIHVuYSBjYWRlbmEgZGUgdGV4dG8uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbGVmb25vOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnRWwgdGVsw6lmb25vIGRlYmUgc2VyIHVuYSBjYWRlbmEgZGUgdGV4dG8uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvcnJlbzoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogJ2VtYWlsJyxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdFbCBjb3JyZW8gZWxlY3Ryw7NuaWNvIGRlYmUgdGVuZXIgdW4gZm9ybWF0byB2w6FsaWRvLidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjYXRlZ29yaWFzOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgICAgICAgICBpdGVtczoge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnQ2FkYSBjYXRlZ29yw61hIGRlYmUgc2VyIHVuYSBjYWRlbmEgZGUgdGV4dG8uJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnTGFzIGNhdGVnb3LDrWFzIGRlYmVuIHNlciB1biBhcnJheS4nXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlc3BvbnNlOiB7XG4gICAgICAgIDIwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdTdWNjZXNmdWwgcmVzcG9uc2UnLFxuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgaXNFcnJvcjogeyB0eXBlOiAnYm9vbGVhbicgfSxcbiAgICAgICAgICAgICAgICBpZDogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkZW50aWZpY2FjaW9uOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBub21icmU6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjY2lvbjogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVsZWZvbm86IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcnJlbzogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcmlhczogeyB0eXBlOiAnYXJyYXknLCBpdGVtczogeyB0eXBlOiAnc3RyaW5nJyB9IH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiB7IHR5cGU6ICdzdHJpbmcnLCBmb3JtYXQ6ICdkYXRlLXRpbWUnIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICA0MDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQmFkIFJlcXVlc3QnLFxuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgaXNFcnJvcjogeyB0eXBlOiAnYm9vbGVhbicgfSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgY29kZTogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgICAgICAgICBjYXVzZTogeyB0eXBlOiBbJ3N0cmluZycsICdudWxsJ10gfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIDQwNDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdBc2lzdGVudGUgbm8gZW5jb250cmFkbycsXG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiB7IHR5cGU6ICdudW1iZXInIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiB7IHR5cGU6ICdzdHJpbmcnIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG59O1xuXG5leHBvcnQgY29uc3QgZGVsZXRlQXNpc3RlbnRlU2NoZW1hOiBGYXN0aWZ5U2NoZW1hID0ge1xuICAgIGRlc2NyaXB0aW9uOiAnQm9ycmFyIHVuIGFzaXN0ZW50ZScsXG4gICAgdGFnczogWydBc2lzdGVudGUnXSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICByZXF1aXJlZDogWydBdXRob3JpemF0aW9uJ10sXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIEF1dGhvcml6YXRpb246IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1Rva2VuIGRlIGF1dGVudGljYWNpb24uIEZvcm1hdG86IEJlYXJlciA8dG9rZW4+J1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBwYXJhbXM6IHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIHJlcXVpcmVkOiBbJ2lkZW50aWZpY2FjaW9uJ10sXG4gICAgICAgIGVycm9yTWVzc2FnZToge1xuICAgICAgICAgICAgcmVxdWlyZWQ6IHtcbiAgICAgICAgICAgICAgICBpZGVudGlmaWNhY2lvbjogJ0xhIGlkZW50aWZpY2FjacOzbiBlcyByZXF1ZXJpZGEuJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICBpZGVudGlmaWNhY2lvbjoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ0xhIGlkZW50aWZpY2FjacOzbiBkZWJlIHNlciB1bmEgY2FkZW5hIGRlIHRleHRvLidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVzcG9uc2U6IHtcbiAgICAgICAgMjAwOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBpc0Vycm9yOiB7IHR5cGU6ICdib29sZWFuJyB9LFxuICAgICAgICAgICAgICAgIGlkOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWRlbnRpZmljYWNpb246IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnNhamU6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiB7IHR5cGU6ICdzdHJpbmcnLCBmb3JtYXQ6ICdkYXRlLXRpbWUnIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICA0MDQ6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHsgdHlwZTogJ3N0cmluZycgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcbiJdfQ==