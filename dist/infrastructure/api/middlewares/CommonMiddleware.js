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
};
exports.middlewares = middlewares;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbW9uTWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9pbmZyYXN0cnVjdHVyZS9hcGkvbWlkZGxld2FyZXMvQ29tbW9uTWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSx5REFBaUM7QUFDakMsNkRBQXFDO0FBQ3JDLGlFQUF5QztBQUN6Qyw2Q0FBcUQ7QUFDckQsaUNBQXNDO0FBSS9CLE1BQU0sV0FBVyxHQUFHLENBQUMsV0FBNEIsRUFBUSxFQUFFO0lBQzlELFdBQVcsQ0FBQyxRQUFRLENBQUMsY0FBSSxDQUFDLENBQUM7SUFDM0IsV0FBVyxDQUFDLFFBQVEsQ0FBQyxrQkFBUSxDQUFDLENBQUM7SUFDL0IsV0FBVyxDQUFDLFFBQVEsQ0FBQyxnQkFBTSxFQUFFO1FBQ3pCLHFCQUFxQixFQUFFO1lBQ25CLFVBQVUsRUFBRTtnQkFDUixVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQztnQkFDdkMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxzQkFBc0IsQ0FBQztnQkFDbkQsU0FBUyxFQUFFLENBQUMsUUFBUSxFQUFFLHdCQUF3QixDQUFDO2FBQ2xEO1NBQ0o7S0FDSixDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsT0FBTyxDQUFlLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRTs7UUFDdEUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUM5RCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUEsb0JBQWMsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxPQUFPLENBQUMsR0FBRyxDQUNQLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDWCxXQUFXLEVBQUUsTUFBQSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksbUNBQUksd0JBQXdCO1lBQ2pFLEVBQUU7WUFDRixNQUFNO1lBQ04sR0FBRztZQUNILE9BQU8sRUFBRTtnQkFDTCxPQUFPO2dCQUNQLElBQUksRUFBRSxJQUFJLGFBQUosSUFBSSxjQUFKLElBQUksR0FBSSxFQUFFO2dCQUNoQixNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFBLGFBQUssRUFBQyxJQUFBLGNBQU0sRUFBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQzVELFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJO2dCQUN2RCxNQUFNO2dCQUNOLEtBQUs7YUFDUjtZQUNELFFBQVEsRUFBRTtnQkFDTixVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7Z0JBQzVCLE9BQU87YUFDVjtTQUNKLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUM7QUF0Q1csUUFBQSxXQUFXLGVBc0N0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZhc3RpZnlJbnN0YW5jZSB9IGZyb20gJ2Zhc3RpZnknO1xuaW1wb3J0IGNvcnMgZnJvbSAnQGZhc3RpZnkvY29ycyc7XG5pbXBvcnQgaGVsbWV0IGZyb20gJ0BmYXN0aWZ5L2hlbG1ldCc7XG5pbXBvcnQgZm9ybWJvZHkgZnJvbSAnQGZhc3RpZnkvZm9ybWJvZHknO1xuaW1wb3J0IHsgdmFsaWRhdGVQdWJTdWIgfSBmcm9tICdAaW5mcmFzdHJ1Y3R1cmUvYXBpJztcbmltcG9ydCB7IGRlY29kZSwgcGFyc2UgfSBmcm9tICdAdXRpbCc7XG5cbnR5cGUgUGF5bG9hZCA9IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuXG5leHBvcnQgY29uc3QgbWlkZGxld2FyZXMgPSAoYXBwbGljYXRpb246IEZhc3RpZnlJbnN0YW5jZSk6IHZvaWQgPT4ge1xuICAgIGFwcGxpY2F0aW9uLnJlZ2lzdGVyKGNvcnMpO1xuICAgIGFwcGxpY2F0aW9uLnJlZ2lzdGVyKGZvcm1ib2R5KTtcbiAgICBhcHBsaWNhdGlvbi5yZWdpc3RlcihoZWxtZXQsIHtcbiAgICAgICAgY29udGVudFNlY3VyaXR5UG9saWN5OiB7XG4gICAgICAgICAgICBkaXJlY3RpdmVzOiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFNyYzogW2Anc2VsZidgXSxcbiAgICAgICAgICAgICAgICBzdHlsZVNyYzogW2Anc2VsZidgLCBgJ3Vuc2FmZS1pbmxpbmUnYF0sXG4gICAgICAgICAgICAgICAgaW1nU3JjOiBbYCdzZWxmJ2AsICdkYXRhOicsICd2YWxpZGF0b3Iuc3dhZ2dlci5pbyddLFxuICAgICAgICAgICAgICAgIHNjcmlwdFNyYzogW2Anc2VsZidgLCBgaHR0cHM6ICd1bnNhZmUtaW5saW5lJ2BdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9KTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGFwcGxpY2F0aW9uLmFkZEhvb2s8UGF5bG9hZCwgYW55Pignb25TZW5kJywgYXN5bmMgKHJlcSwgcmVwbHksIHBheWxvYWQpID0+IHtcbiAgICAgICAgY29uc3QgeyBpZCwgbWV0aG9kLCB1cmwsIGhlYWRlcnMsIHBhcmFtcywgcXVlcnksIGJvZHkgfSA9IHJlcTtcbiAgICAgICAgY29uc3QgaXNQdWJTdWIgPSBhd2FpdCB2YWxpZGF0ZVB1YlN1Yihib2R5KTtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb246IHByb2Nlc3MuZW52LlNFUlZJQ0VfTkFNRSA/PyAnU0VSVklDRV9OQU1FIE5PVCBGT1VORCcsXG4gICAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0OiB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGJvZHkgPz8ge30sXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlcjogaXNQdWJTdWIgPyBwYXJzZShkZWNvZGUoaXNQdWJTdWIubWVzc2FnZS5kYXRhKSkgOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZUlkOiBpc1B1YlN1YiA/IGlzUHViU3ViLm1lc3NhZ2UubWVzc2FnZUlkIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLFxuICAgICAgICAgICAgICAgICAgICBxdWVyeSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHJlcGx5LnN0YXR1c0NvZGUsXG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWQsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgIH0pO1xufTtcbiJdfQ==