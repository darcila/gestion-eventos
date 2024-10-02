"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerUi_config = exports.swagger_config = void 0;
exports.swagger_config = {
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
        host: 'localhost:8080',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
    exposeRoute: true,
};
exports.swaggerUi_config = {
    routePrefix: '/docs',
    uiConfig: {
        docExpansion: 'none',
        deepLinking: false,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL2FwaS9zd2FnZ2VyL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLGNBQWMsR0FDckI7SUFDRixPQUFPLEVBQUU7UUFDTCxJQUFJLEVBQUU7WUFDRixLQUFLLEVBQUUsNEJBQTRCO1lBQ25DLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsT0FBTyxFQUFFLE9BQU87U0FDbkI7UUFDRCxZQUFZLEVBQUU7WUFDVixHQUFHLEVBQUUsb0JBQW9CO1lBQ3pCLFdBQVcsRUFBRSxnQ0FBZ0M7U0FDaEQ7UUFDRCxJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNqQixRQUFRLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztRQUM5QixRQUFRLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztLQUNqQztJQUNELFdBQVcsRUFBRSxJQUFJO0NBQ3BCLENBQUM7QUFFVyxRQUFBLGdCQUFnQixHQUFHO0lBQzVCLFdBQVcsRUFBRSxPQUFPO0lBQ3BCLFFBQVEsRUFBRTtRQUNOLFlBQVksRUFBRSxNQUFNO1FBQ3BCLFdBQVcsRUFBRSxLQUFLO0tBQ3JCO0lBQ0QsU0FBUyxFQUFFLElBQUk7SUFDZixrQkFBa0IsRUFBRSxDQUFDLE1BQWMsRUFBRSxFQUFFLENBQUMsTUFBTTtDQUNqRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHN3YWdnZXJfY29uZmlnXG4gICAgPSB7XG4gICAgc3dhZ2dlcjoge1xuICAgICAgICBpbmZvOiB7XG4gICAgICAgICAgICB0aXRsZTogJ0FQSSBkZSBHZXN0aW9uIGRlIHJlc2VydmFzJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnRG9jdW1lbnRhY2nDs24gZGUgbWkgQVBJJyxcbiAgICAgICAgICAgIHZlcnNpb246ICcxLjAuMCcsXG4gICAgICAgIH0sXG4gICAgICAgIGV4dGVybmFsRG9jczoge1xuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9zd2FnZ2VyLmlvJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnRW5jdWVudHJhIG3DoXMgaW5mb3JtYWNpw7NuIGFxdcOtJyxcbiAgICAgICAgfSxcbiAgICAgICAgaG9zdDogJ2xvY2FsaG9zdDo4MDgwJyxcbiAgICAgICAgc2NoZW1lczogWydodHRwJ10sXG4gICAgICAgIGNvbnN1bWVzOiBbJ2FwcGxpY2F0aW9uL2pzb24nXSxcbiAgICAgICAgcHJvZHVjZXM6IFsnYXBwbGljYXRpb24vanNvbiddLFxuICAgIH0sXG4gICAgZXhwb3NlUm91dGU6IHRydWUsIC8vIE5lY2VzYXJpbyBwYXJhIHNlcnZpciBsYSBydXRhIGRlbCBKU09OIGRlIFN3YWdnZXJcbn07XG5cbmV4cG9ydCBjb25zdCBzd2FnZ2VyVWlfY29uZmlnID0ge1xuICAgIHJvdXRlUHJlZml4OiAnL2RvY3MnLCAvLyBSdXRhIGRvbmRlIHNlIHNlcnZpcsOhIGxhIFVJXG4gICAgdWlDb25maWc6IHtcbiAgICAgICAgZG9jRXhwYW5zaW9uOiAnbm9uZScsIC8vIE9wY2lvbmFsLCBhanVzdGEgbGEgVUlcbiAgICAgICAgZGVlcExpbmtpbmc6IGZhbHNlLFxuICAgIH0sXG4gICAgc3RhdGljQ1NQOiB0cnVlLFxuICAgIHRyYW5zZm9ybVN0YXRpY0NTUDogKGhlYWRlcjogc3RyaW5nKSA9PiBoZWFkZXIsXG59O1xuIl19