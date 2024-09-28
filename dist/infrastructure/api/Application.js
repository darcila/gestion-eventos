"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.application = void 0;
require("reflect-metadata");
require("module-alias/register");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const fastify_1 = __importDefault(require("fastify"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const crypto_1 = require("crypto");
const _util_1 = require("@util");
const routers_1 = require("@infrastructure/api/routers");
const middlewares_1 = require("@infrastructure/api/middlewares");
const swagger_2 = require("@infrastructure/api/swagger");
const console = __importStar(require("node:console"));
exports.application = (0, fastify_1.default)({
    genReqId: (_) => (0, crypto_1.randomBytes)(20).toString('hex'),
});
(0, middlewares_1.middlewares)(exports.application);
(0, middlewares_1.errorHandler)(exports.application);
exports.application.register(swagger_1.default, swagger_2.swagger_config);
exports.application.register(routers_1.initRoutes, { prefix: _util_1.PREFIX });
console.log('Application running on port 8080 with prefix', _util_1.PREFIX);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwbGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5mcmFzdHJ1Y3R1cmUvYXBpL0FwcGxpY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNEJBQTBCO0FBQzFCLGlDQUErQjtBQUMvQixvREFBNEI7QUFDNUIsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNoQixzREFBOEI7QUFDOUIsK0RBQThDO0FBQzlDLG1DQUFxQztBQUNyQyxpQ0FBK0I7QUFDL0IseURBQXlEO0FBQ3pELGlFQUE0RTtBQUU1RSx5REFBNkQ7QUFDN0Qsc0RBQXdDO0FBRTNCLFFBQUEsV0FBVyxHQUFHLElBQUEsaUJBQU8sRUFBQztJQUMvQixRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUEsb0JBQVcsRUFBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO0NBQ25ELENBQUMsQ0FBQztBQUdILElBQUEseUJBQVcsRUFBQyxtQkFBVyxDQUFDLENBQUM7QUFDekIsSUFBQSwwQkFBWSxFQUFDLG1CQUFXLENBQUMsQ0FBQztBQUcxQixtQkFBVyxDQUFDLFFBQVEsQ0FBQyxpQkFBYyxFQUFFLHdCQUFjLENBQUMsQ0FBQztBQUdyRCxtQkFBVyxDQUFDLFFBQVEsQ0FBQyxvQkFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLGNBQU0sRUFBRSxDQUFDLENBQUM7QUFDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4Q0FBOEMsRUFBRSxjQUFNLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGxpYnJhcmllc1xuaW1wb3J0ICdyZWZsZWN0LW1ldGFkYXRhJztcbmltcG9ydCAnbW9kdWxlLWFsaWFzL3JlZ2lzdGVyJztcbmltcG9ydCBkb3RlbnYgZnJvbSAnZG90ZW52JztcbmRvdGVudi5jb25maWcoKTtcbmltcG9ydCBmYXN0aWZ5IGZyb20gJ2Zhc3RpZnknO1xuaW1wb3J0IGZhc3RpZnlTd2FnZ2VyIGZyb20gJ0BmYXN0aWZ5L3N3YWdnZXInO1xuaW1wb3J0IHsgcmFuZG9tQnl0ZXMgfSBmcm9tICdjcnlwdG8nO1xuaW1wb3J0IHsgUFJFRklYIH0gZnJvbSAnQHV0aWwnO1xuaW1wb3J0IHsgaW5pdFJvdXRlcyB9IGZyb20gJ0BpbmZyYXN0cnVjdHVyZS9hcGkvcm91dGVycyc7XG5pbXBvcnQgeyBtaWRkbGV3YXJlcywgZXJyb3JIYW5kbGVyIH0gZnJvbSAnQGluZnJhc3RydWN0dXJlL2FwaS9taWRkbGV3YXJlcyc7XG5cbmltcG9ydCB7IHN3YWdnZXJfY29uZmlnIH0gZnJvbSAnQGluZnJhc3RydWN0dXJlL2FwaS9zd2FnZ2VyJztcbmltcG9ydCAqIGFzIGNvbnNvbGUgZnJvbSBcIm5vZGU6Y29uc29sZVwiO1xuXG5leHBvcnQgY29uc3QgYXBwbGljYXRpb24gPSBmYXN0aWZ5KHtcbiAgICBnZW5SZXFJZDogKF8pID0+IHJhbmRvbUJ5dGVzKDIwKS50b1N0cmluZygnaGV4JyksXG59KTtcblxuLy8gbWlkZGxld2FyZXNcbm1pZGRsZXdhcmVzKGFwcGxpY2F0aW9uKTtcbmVycm9ySGFuZGxlcihhcHBsaWNhdGlvbik7XG5cbi8vZmFzdGlmeSBzd2FnZ2VyXG5hcHBsaWNhdGlvbi5yZWdpc3RlcihmYXN0aWZ5U3dhZ2dlciwgc3dhZ2dlcl9jb25maWcpO1xuXG4vLyByb3V0ZXNcbmFwcGxpY2F0aW9uLnJlZ2lzdGVyKGluaXRSb3V0ZXMsIHsgcHJlZml4OiBQUkVGSVggfSk7XG5jb25zb2xlLmxvZygnQXBwbGljYXRpb24gcnVubmluZyBvbiBwb3J0IDgwODAgd2l0aCBwcmVmaXgnLCBQUkVGSVgpO1xuIl19