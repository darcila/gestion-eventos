export const swagger_config
    = {
    swagger: {
        info: {
            title: 'API de Gestion de reservas',
            description: 'Documentación de mi API',
            version: '1.0.0',
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Encuentra más información aquí',
        },
        host: '34.69.101.106:85',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
    exposeRoute: true, // Necesario para servir la ruta del JSON de Swagger
};

export const swaggerUi_config = {
    routePrefix: '/docs', // Ruta donde se servirá la UI
    uiConfig: {
        docExpansion: 'none', // Opcional, ajusta la UI
        deepLinking: false,
    },
    swaggerUiOptions: {
        url: 'http://34.69.101.106:85/docs/json', // Forzar la URL base con HTTP
    },
    staticCSP: true,
    transformStaticCSP: (header: string) => header,
};
