"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearUsuarioSchema = exports.autenticacionSchema = void 0;
exports.autenticacionSchema = {
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
                        token: { type: 'string' },
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
exports.crearUsuarioSchema = {
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
                        id: { type: 'number' },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0ZW50aWNhY2lvblNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9pbmZyYXN0cnVjdHVyZS9hcGkvc3dhZ2dlci9zY2hlbWFzL2F1dGVudGljYWNpb25TY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRWEsUUFBQSxtQkFBbUIsR0FBa0I7SUFDOUMsV0FBVyxFQUFFLHVCQUF1QjtJQUNwQyxJQUFJLEVBQUUsQ0FBQyxlQUFlLENBQUM7SUFDdkIsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDO1FBQzlCLFlBQVksRUFBRTtZQUNWLFFBQVEsRUFBRTtnQkFDTixPQUFPLEVBQUUsb0NBQW9DO2dCQUM3QyxLQUFLLEVBQUUsd0JBQXdCO2FBQ2xDO1NBQ0o7UUFDRCxVQUFVLEVBQUU7WUFDUixPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsWUFBWSxFQUFFLG9EQUFvRDthQUNyRTtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxZQUFZLEVBQUUsd0NBQXdDO2FBQ3pEO1NBQ0o7S0FDSjtJQUNELFFBQVEsRUFBRTtRQUNOLEdBQUcsRUFBRTtZQUNELFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsSUFBSSxFQUFFLFFBQVE7WUFDZCxVQUFVLEVBQUU7Z0JBQ1IsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtnQkFDNUIsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtnQkFDdEIsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxRQUFRO29CQUNkLFVBQVUsRUFBRTt3QkFDUixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO3FCQUM1QjtpQkFDSjtnQkFDRCxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUU7YUFDckQ7U0FDSjtRQUNELEdBQUcsRUFBRTtZQUNELFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsSUFBSSxFQUFFLFFBQVE7WUFDZCxVQUFVLEVBQUU7Z0JBQ1IsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtnQkFDNUIsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtnQkFDM0IsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtnQkFDeEIsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTthQUNqQztTQUNKO0tBQ0o7Q0FDSixDQUFDO0FBRVcsUUFBQSxrQkFBa0IsR0FBa0I7SUFDN0MsV0FBVyxFQUFFLHdCQUF3QjtJQUNyQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUM7SUFDakIsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDO1FBQzlCLFlBQVksRUFBRTtZQUNWLFFBQVEsRUFBRTtnQkFDTixPQUFPLEVBQUUsb0NBQW9DO2dCQUM3QyxLQUFLLEVBQUUsd0JBQXdCO2FBQ2xDO1NBQ0o7UUFDRCxVQUFVLEVBQUU7WUFDUixPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsU0FBUyxFQUFFLENBQUM7Z0JBQ1osU0FBUyxFQUFFLEVBQUU7Z0JBQ2IsWUFBWSxFQUFFO29CQUNWLFNBQVMsRUFBRSx3REFBd0Q7b0JBQ25FLFNBQVMsRUFBRSwwREFBMEQ7b0JBQ3JFLElBQUksRUFBRSxvREFBb0Q7aUJBQzdEO2FBQ0o7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsU0FBUyxFQUFFLENBQUM7Z0JBQ1osU0FBUyxFQUFFLEdBQUc7Z0JBQ2QsWUFBWSxFQUFFO29CQUNWLFNBQVMsRUFBRSw0Q0FBNEM7b0JBQ3ZELFNBQVMsRUFBRSwrQ0FBK0M7b0JBQzFELElBQUksRUFBRSx3Q0FBd0M7aUJBQ2pEO2FBQ0o7U0FDSjtLQUNKO0lBQ0QsUUFBUSxFQUFFO1FBQ04sR0FBRyxFQUFFO1lBQ0QsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRTtnQkFDUixPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO2dCQUM1QixFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO2dCQUN0QixJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsVUFBVSxFQUFFO3dCQUNSLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7cUJBRXpCO2lCQUNKO2dCQUNELFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRTthQUNyRDtTQUNKO1FBQ0QsR0FBRyxFQUFFO1lBQ0QsV0FBVyxFQUFFLDRDQUE0QztZQUN6RCxJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRTtnQkFDUixPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO2dCQUM1QixPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO2dCQUMzQixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO2dCQUN4QixVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO2FBQ2pDO1NBQ0o7S0FDSjtDQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Zhc3RpZnlTY2hlbWF9IGZyb20gXCJmYXN0aWZ5XCI7XG5cbmV4cG9ydCBjb25zdCBhdXRlbnRpY2FjaW9uU2NoZW1hOiBGYXN0aWZ5U2NoZW1hID0ge1xuICAgIGRlc2NyaXB0aW9uOiAnQXV0ZW50aWNhciB1biB1c3VhcmlvJyxcbiAgICB0YWdzOiBbJ0F1dGVudGljYWNpb24nXSxcbiAgICBib2R5OiB7XG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICByZXF1aXJlZDogWyd1c3VhcmlvJywgJ2NsYXZlJ10sXG4gICAgICAgIGVycm9yTWVzc2FnZToge1xuICAgICAgICAgICAgcmVxdWlyZWQ6IHtcbiAgICAgICAgICAgICAgICB1c3VhcmlvOiAnRWwgbm9tYnJlIGRlIHVzdWFyaW8gZXMgcmVxdWVyaWRvLicsXG4gICAgICAgICAgICAgICAgY2xhdmU6ICdMYSBjbGF2ZSBlcyByZXF1ZXJpZGEuJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICB1c3VhcmlvOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnRWwgbm9tYnJlIGRlIHVzdWFyaW8gZGViZSBzZXIgdW5hIGNhZGVuYSBkZSB0ZXh0by4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xhdmU6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdMYSBjbGF2ZSBkZWJlIHNlciB1bmEgY2FkZW5hIGRlIHRleHRvLidcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlc3BvbnNlOiB7XG4gICAgICAgIDIwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdBdXRlbnRpY2FjacOzbiBleGl0b3NhJyxcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIGlzRXJyb3I6IHsgdHlwZTogJ2Jvb2xlYW4nIH0sXG4gICAgICAgICAgICAgICAgaWQ6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogeyB0eXBlOiAnc3RyaW5nJyB9LCAvLyBFbCB0b2tlbiBKV1QgZ2VuZXJhZG9cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiB7IHR5cGU6ICdzdHJpbmcnLCBmb3JtYXQ6ICdkYXRlLXRpbWUnIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICA0MDE6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQ3JlZGVuY2lhbGVzIGludsOhbGlkYXMnLFxuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgaXNFcnJvcjogeyB0eXBlOiAnYm9vbGVhbicgfSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgY29kZTogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNyZWFyVXN1YXJpb1NjaGVtYTogRmFzdGlmeVNjaGVtYSA9IHtcbiAgICBkZXNjcmlwdGlvbjogJ0NyZWFyIHVuIG51ZXZvIHVzdWFyaW8nLFxuICAgIHRhZ3M6IFsnVXN1YXJpbyddLFxuICAgIGJvZHk6IHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIHJlcXVpcmVkOiBbJ3VzdWFyaW8nLCAnY2xhdmUnXSxcbiAgICAgICAgZXJyb3JNZXNzYWdlOiB7XG4gICAgICAgICAgICByZXF1aXJlZDoge1xuICAgICAgICAgICAgICAgIHVzdWFyaW86ICdFbCBub21icmUgZGUgdXN1YXJpbyBlcyByZXF1ZXJpZG8uJyxcbiAgICAgICAgICAgICAgICBjbGF2ZTogJ0xhIGNsYXZlIGVzIHJlcXVlcmlkYS4nXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIHVzdWFyaW86IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBtaW5MZW5ndGg6IDUsXG4gICAgICAgICAgICAgICAgbWF4TGVuZ3RoOiA1MCxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICAgICAgbWluTGVuZ3RoOiAnRWwgbm9tYnJlIGRlIHVzdWFyaW8gZGViZSB0ZW5lciBhbCBtZW5vcyA1IGNhcmFjdGVyZXMuJyxcbiAgICAgICAgICAgICAgICAgICAgbWF4TGVuZ3RoOiAnRWwgbm9tYnJlIGRlIHVzdWFyaW8gbm8gcHVlZGUgZXhjZWRlciBsb3MgNTAgY2FyYWN0ZXJlcy4nLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnRWwgbm9tYnJlIGRlIHVzdWFyaW8gZGViZSBzZXIgdW5hIGNhZGVuYSBkZSB0ZXh0by4nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsYXZlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgbWluTGVuZ3RoOiA4LFxuICAgICAgICAgICAgICAgIG1heExlbmd0aDogMTAwLFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZToge1xuICAgICAgICAgICAgICAgICAgICBtaW5MZW5ndGg6ICdMYSBjbGF2ZSBkZWJlIHRlbmVyIGFsIG1lbm9zIDggY2FyYWN0ZXJlcy4nLFxuICAgICAgICAgICAgICAgICAgICBtYXhMZW5ndGg6ICdMYSBjbGF2ZSBubyBwdWVkZSBleGNlZGVyIGxvcyAxMDAgY2FyYWN0ZXJlcy4nLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnTGEgY2xhdmUgZGViZSBzZXIgdW5hIGNhZGVuYSBkZSB0ZXh0by4nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVzcG9uc2U6IHtcbiAgICAgICAgMjAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1VzdWFyaW8gY3JlYWRvIGV4aXRvc2FtZW50ZScsXG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBpc0Vycm9yOiB7IHR5cGU6ICdib29sZWFuJyB9LFxuICAgICAgICAgICAgICAgIGlkOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHsgdHlwZTogJ251bWJlcicgfSwgLy8gTyBlbCBpZGVudGlmaWNhZG9yIHF1ZSB1c2VzIHBhcmEgZWwgdXN1YXJpb1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUHVlZGVzIGluY2x1aXIgb3Ryb3MgZGF0b3MgZGVsIHVzdWFyaW8gc2kgZXMgbmVjZXNhcmlvXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogeyB0eXBlOiAnc3RyaW5nJywgZm9ybWF0OiAnZGF0ZS10aW1lJyB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgNDAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0Vycm9yIGRlIHZhbGlkYWNpw7NuIG8gdXN1YXJpbyB5YSBleGlzdGVudGUnLFxuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgaXNFcnJvcjogeyB0eXBlOiAnYm9vbGVhbicgfSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgY29kZTogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHsgdHlwZTogJ251bWJlcicgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfVxufTtcbiJdfQ==