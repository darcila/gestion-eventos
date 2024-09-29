import {FastifySchema} from "fastify";

export const eventoGetSchema: FastifySchema = {
    description: 'Obtener un evento',
    tags: ['Evento'],
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' }, // Removemos 'example'
        },
        required: ['id'], // Añadimos 'required' para indicar que 'id' es obligatorio
    },
    response: {
        200: { // Usamos códigos de estado numéricos en lugar de strings
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

export const createEventoSchema: FastifySchema = {
    description: 'Crear un evento',
    tags: ['Evento'],
    body: {
        type: 'object',
        required: ['nombre', 'descripcion', 'lugar', 'ciudad', 'fecha', 'hora'], // 'nombre' es el único campo obligatorio
        properties: {
            nombre: { type: 'string', maxLength: 200 },
            descripcion: { type: 'string' },
            lugar: { type: 'string', maxLength: 200 },
            ciudad: { type: 'string', maxLength: 70 },
            fecha: { type: 'string', format: 'date' },
            hora: { type: 'string' },
            categoria: { type: 'array' },
            capacidad: { type: 'integer', minimum: 0 },
            valor: { type: 'number', minimum: 0 }
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
    body: { // Usamos 'querystring' para los parámetros en la URL
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'number' },
            nombre: { type: 'string' },
            fecha: { type: 'string', format: 'date' },
            hora: { type: 'string', format: 'time' },
            capacidad: { type: 'integer', minimum: 0 },
            valor: { type: 'number', minimum: 0 }
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
        // ... otros códigos de respuesta de error según sea necesario
    }
};

export const deleteEventoSchema: FastifySchema = {
    description: 'Borrar un evento',
    tags: ['Evento'],
    params: { // Usamos 'params' para los parámetros en la ruta
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'integer' }
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
