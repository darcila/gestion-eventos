"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewares = void 0;
const cors_1 = __importDefault(require("@fastify/cors"));
const helmet_1 = __importDefault(require("@fastify/helmet"));
const formbody_1 = __importDefault(require("@fastify/formbody"));
const api_1 = require("@infrastructure/api");
const _util_1 = require("@util");
const _configuration_1 = require("@configuration");
const services_1 = require("@application/services");
const exceptions_1 = require("@domain/exceptions");
const middlewares = (application) => {
    application.register(cors_1.default);
    application.register(formbody_1.default);
    application.register(helmet_1.default, {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: [`'self'`],
                styleSrc: [`'self'`, `'unsafe-inline'`],
                imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
                scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
            },
        },
    });
    application.addHook('onSend', async (req, reply, payload) => {
        var _a;
        const { id, method, url, headers, params, query, body } = req;
        const isPubSub = await (0, api_1.validatePubSub)(body);
        console.log(JSON.stringify({
            application: (_a = process.env.SERVICE_NAME) !== null && _a !== void 0 ? _a : 'SERVICE_NAME NOT FOUND',
            id,
            method,
            url,
            request: {
                headers,
                body: body !== null && body !== void 0 ? body : {},
                buffer: isPubSub ? (0, _util_1.parse)((0, _util_1.decode)(isPubSub.message.data)) : {},
                messageId: isPubSub ? isPubSub.message.messageId : null,
                params,
                query,
            },
            response: {
                statusCode: reply.statusCode,
                payload,
            },
        }));
    });
    application.addHook('preValidation', async (request, reply) => {
        const url = request.url;
        const regex = /^\/docs/;
        if (url === `${_util_1.PREFIX}/autenticar` || regex.test(url)) {
            return;
        }
        try {
            const autenticarService = _configuration_1.DEPENDENCY_CONTAINER.get(services_1.AutenticacionAppService);
            const estado = await autenticarService.validarToken(request.headers.authorization);
            if (!estado) {
                console.log('Token invalido', reply);
                throw new exceptions_1.UnauthorizedException('Token invalido', 'Token no es válido');
            }
        }
        catch (err) {
            throw err;
        }
    });
};
exports.middlewares = middlewares;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbW9uTWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9pbmZyYXN0cnVjdHVyZS9hcGkvbWlkZGxld2FyZXMvQ29tbW9uTWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSx5REFBaUM7QUFDakMsNkRBQXFDO0FBQ3JDLGlFQUF5QztBQUN6Qyw2Q0FBcUQ7QUFDckQsaUNBQTRDO0FBQzVDLG1EQUFvRDtBQUNwRCxvREFBOEQ7QUFDOUQsbURBQXlEO0FBSWxELE1BQU0sV0FBVyxHQUFHLENBQUMsV0FBNEIsRUFBUSxFQUFFO0lBQzlELFdBQVcsQ0FBQyxRQUFRLENBQUMsY0FBSSxDQUFDLENBQUM7SUFDM0IsV0FBVyxDQUFDLFFBQVEsQ0FBQyxrQkFBUSxDQUFDLENBQUM7SUFDL0IsV0FBVyxDQUFDLFFBQVEsQ0FBQyxnQkFBTSxFQUFFO1FBQ3pCLHFCQUFxQixFQUFFO1lBQ25CLFVBQVUsRUFBRTtnQkFDUixVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQztnQkFDdkMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxzQkFBc0IsQ0FBQztnQkFDbkQsU0FBUyxFQUFFLENBQUMsUUFBUSxFQUFFLHdCQUF3QixDQUFDO2FBQ2xEO1NBQ0o7S0FDSixDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsT0FBTyxDQUFlLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRTs7UUFDdEUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUM5RCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUEsb0JBQWMsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxPQUFPLENBQUMsR0FBRyxDQUNQLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDWCxXQUFXLEVBQUUsTUFBQSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksbUNBQUksd0JBQXdCO1lBQ2pFLEVBQUU7WUFDRixNQUFNO1lBQ04sR0FBRztZQUNILE9BQU8sRUFBRTtnQkFDTCxPQUFPO2dCQUNQLElBQUksRUFBRSxJQUFJLGFBQUosSUFBSSxjQUFKLElBQUksR0FBSSxFQUFFO2dCQUNoQixNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFBLGFBQUssRUFBQyxJQUFBLGNBQU0sRUFBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQzVELFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJO2dCQUN2RCxNQUFNO2dCQUNOLEtBQUs7YUFDUjtZQUNELFFBQVEsRUFBRTtnQkFDTixVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7Z0JBQzVCLE9BQU87YUFDVjtTQUNKLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxLQUFLLEVBQUUsT0FBdUIsRUFBRSxLQUFtQixFQUFFLEVBQUU7UUFDeEYsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUN4QixNQUFNLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDeEIsSUFBSSxHQUFHLEtBQUssR0FBRyxjQUFNLGFBQWEsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDcEQsT0FBTztRQUNYLENBQUM7UUFFRCxJQUFJLENBQUM7WUFDRCxNQUFNLGlCQUFpQixHQUFHLHFDQUFvQixDQUFDLEdBQUcsQ0FBQyxrQ0FBdUIsQ0FBQyxDQUFDO1lBQzVFLE1BQU0sTUFBTSxHQUFHLE1BQU0saUJBQWlCLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFbkYsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUVWLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3JDLE1BQU0sSUFBSSxrQ0FBcUIsQ0FBQyxnQkFBZ0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBQzVFLENBQUM7UUFDTCxDQUFDO1FBQUMsT0FBTyxHQUFPLEVBQUUsQ0FBQztZQUdmLE1BQU0sR0FBRyxDQUFDO1FBQ2QsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDO0FBN0RXLFFBQUEsV0FBVyxlQTZEdEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Zhc3RpZnlJbnN0YW5jZSwgRmFzdGlmeVJlcGx5LCBGYXN0aWZ5UmVxdWVzdH0gZnJvbSAnZmFzdGlmeSc7XG5pbXBvcnQgY29ycyBmcm9tICdAZmFzdGlmeS9jb3JzJztcbmltcG9ydCBoZWxtZXQgZnJvbSAnQGZhc3RpZnkvaGVsbWV0JztcbmltcG9ydCBmb3JtYm9keSBmcm9tICdAZmFzdGlmeS9mb3JtYm9keSc7XG5pbXBvcnQgeyB2YWxpZGF0ZVB1YlN1YiB9IGZyb20gJ0BpbmZyYXN0cnVjdHVyZS9hcGknO1xuaW1wb3J0IHtkZWNvZGUsIHBhcnNlLCBQUkVGSVh9IGZyb20gJ0B1dGlsJztcbmltcG9ydCB7REVQRU5ERU5DWV9DT05UQUlORVJ9IGZyb20gXCJAY29uZmlndXJhdGlvblwiO1xuaW1wb3J0IHtBdXRlbnRpY2FjaW9uQXBwU2VydmljZX0gZnJvbSBcIkBhcHBsaWNhdGlvbi9zZXJ2aWNlc1wiO1xuaW1wb3J0IHtVbmF1dGhvcml6ZWRFeGNlcHRpb259IGZyb20gXCJAZG9tYWluL2V4Y2VwdGlvbnNcIjtcblxudHlwZSBQYXlsb2FkID0gUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG5cbmV4cG9ydCBjb25zdCBtaWRkbGV3YXJlcyA9IChhcHBsaWNhdGlvbjogRmFzdGlmeUluc3RhbmNlKTogdm9pZCA9PiB7XG4gICAgYXBwbGljYXRpb24ucmVnaXN0ZXIoY29ycyk7XG4gICAgYXBwbGljYXRpb24ucmVnaXN0ZXIoZm9ybWJvZHkpO1xuICAgIGFwcGxpY2F0aW9uLnJlZ2lzdGVyKGhlbG1ldCwge1xuICAgICAgICBjb250ZW50U2VjdXJpdHlQb2xpY3k6IHtcbiAgICAgICAgICAgIGRpcmVjdGl2ZXM6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0U3JjOiBbYCdzZWxmJ2BdLFxuICAgICAgICAgICAgICAgIHN0eWxlU3JjOiBbYCdzZWxmJ2AsIGAndW5zYWZlLWlubGluZSdgXSxcbiAgICAgICAgICAgICAgICBpbWdTcmM6IFtgJ3NlbGYnYCwgJ2RhdGE6JywgJ3ZhbGlkYXRvci5zd2FnZ2VyLmlvJ10sXG4gICAgICAgICAgICAgICAgc2NyaXB0U3JjOiBbYCdzZWxmJ2AsIGBodHRwczogJ3Vuc2FmZS1pbmxpbmUnYF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH0pO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgYXBwbGljYXRpb24uYWRkSG9vazxQYXlsb2FkLCBhbnk+KCdvblNlbmQnLCBhc3luYyAocmVxLCByZXBseSwgcGF5bG9hZCkgPT4ge1xuICAgICAgICBjb25zdCB7IGlkLCBtZXRob2QsIHVybCwgaGVhZGVycywgcGFyYW1zLCBxdWVyeSwgYm9keSB9ID0gcmVxO1xuICAgICAgICBjb25zdCBpc1B1YlN1YiA9IGF3YWl0IHZhbGlkYXRlUHViU3ViKGJvZHkpO1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbjogcHJvY2Vzcy5lbnYuU0VSVklDRV9OQU1FID8/ICdTRVJWSUNFX05BTUUgTk9UIEZPVU5EJyxcbiAgICAgICAgICAgICAgICBpZCxcbiAgICAgICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgICAgIHJlcXVlc3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogYm9keSA/PyB7fSxcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyOiBpc1B1YlN1YiA/IHBhcnNlKGRlY29kZShpc1B1YlN1Yi5tZXNzYWdlLmRhdGEpKSA6IHt9LFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlSWQ6IGlzUHViU3ViID8gaXNQdWJTdWIubWVzc2FnZS5tZXNzYWdlSWQgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXMsXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogcmVwbHkuc3RhdHVzQ29kZSxcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgfSk7XG5cbiAgICBhcHBsaWNhdGlvbi5hZGRIb29rKCdwcmVWYWxpZGF0aW9uJywgYXN5bmMgKHJlcXVlc3Q6IEZhc3RpZnlSZXF1ZXN0LCByZXBseTogRmFzdGlmeVJlcGx5KSA9PiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHJlcXVlc3QudXJsO1xuICAgICAgICBjb25zdCByZWdleCA9IC9eXFwvZG9jcy87XG4gICAgICAgIGlmICh1cmwgPT09IGAke1BSRUZJWH0vYXV0ZW50aWNhcmAgfHwgcmVnZXgudGVzdCh1cmwpKSB7XG4gICAgICAgICAgICByZXR1cm47IC8vIFNraXAgdmFsaWRhdGlvbiBmb3IgdGhpcyByb3V0ZVxuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGF1dGVudGljYXJTZXJ2aWNlID0gREVQRU5ERU5DWV9DT05UQUlORVIuZ2V0KEF1dGVudGljYWNpb25BcHBTZXJ2aWNlKTtcbiAgICAgICAgICAgIGNvbnN0IGVzdGFkbyA9IGF3YWl0IGF1dGVudGljYXJTZXJ2aWNlLnZhbGlkYXJUb2tlbihyZXF1ZXN0LmhlYWRlcnMuYXV0aG9yaXphdGlvbik7XG5cbiAgICAgICAgICAgIGlmICghZXN0YWRvKSB7XG4gICAgICAgICAgICAgICAgLy9yZXBseS5zdGF0dXMoNDAxKS5zZW5kKHsgZXJyb3I6ICdVbmF1dGhvcml6ZWQnLCBtZXNzYWdlOiAnVG9rZW4gaW52YWxpZG8nIH0pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdUb2tlbiBpbnZhbGlkbycsIHJlcGx5KTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKCdUb2tlbiBpbnZhbGlkbycsICdUb2tlbiBubyBlcyB2w6FsaWRvJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycjphbnkpIHtcbiAgICAgICAgICAgIC8vIE1hbmVqYXIgZWwgZXJyb3IgeSBkZXRlbmVyIGxhIGVqZWN1Y2nDs25cbiAgICAgICAgICAgIC8vcmVwbHkuc3RhdHVzKDQwMSkuc2VuZCh7IGVycm9yOiAnVW5hdXRob3JpemVkJywgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cblxuIl19