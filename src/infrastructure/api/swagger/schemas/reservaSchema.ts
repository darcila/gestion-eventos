import {FastifySchema} from "fastify";

export const createReservaSchema: FastifySchema = {
    description: 'Crear una reserva',
    tags: ['Reserva'],
    body: {
        type: 'object',
        required: ['asistente_id', 'evento_id', 'cantidad_boletos'],
        properties: {
            asistente_id: { type: 'integer' },
            evento_id: { type: 'integer' },
            cantidad_boletos: { type: 'integer', minimum: 1 },
            // Otros campos opcionales según tus necesidades (precio_total, forma_pago, etc.)
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
                        // Otros campos que desees devolver en la respuesta
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
        // ... otros códigos de respuesta de error (ej: 409 para conflicto si se excede la capacidad)
    }
};

export const getReservaSchema: FastifySchema = {
    description: 'Obtener una reserva',
    tags: ['Reserva'],
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' },
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
