"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientAdapter = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ioredis_1 = __importDefault(require("ioredis"));
const ioredis_adapter_1 = require("@type-cacheable/ioredis-adapter");
const _util_1 = require("@util");
const client = new ioredis_1.default({
    host: _util_1.REDIS_HOST,
    port: parseInt(_util_1.REDIS_PORT)
});
exports.clientAdapter = (0, ioredis_adapter_1.useAdapter)(client);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVkaXNBZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL3JlcG9zaXRvcmllcy9yZWRpc2RiL2FkYXB0ZXIvUmVkaXNBZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9EQUE0QjtBQUM1QixnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhCLHNEQUE0QjtBQUM1QixxRUFBNkQ7QUFDN0QsaUNBQTZDO0FBRTdDLE1BQU0sTUFBTSxHQUFHLElBQUksaUJBQUssQ0FBQztJQUNyQixJQUFJLEVBQUUsa0JBQVU7SUFDaEIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxrQkFBb0IsQ0FBQztDQUN2QyxDQUFDLENBQUM7QUFFVSxRQUFBLGFBQWEsR0FBRyxJQUFBLDRCQUFVLEVBQUMsTUFBTSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XG5kb3RlbnYuY29uZmlnKCk7XG4vL2ltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gJ3JlZGlzJztcbmltcG9ydCBSZWRpcyBmcm9tICdpb3JlZGlzJztcbmltcG9ydCB7IHVzZUFkYXB0ZXIgfSBmcm9tICdAdHlwZS1jYWNoZWFibGUvaW9yZWRpcy1hZGFwdGVyJztcbmltcG9ydCB7UkVESVNfSE9TVCwgUkVESVNfUE9SVH0gZnJvbSBcIkB1dGlsXCI7XG5cbmNvbnN0IGNsaWVudCA9IG5ldyBSZWRpcyh7XG4gICAgaG9zdDogUkVESVNfSE9TVCxcbiAgICBwb3J0OiBwYXJzZUludChSRURJU19QT1JUIGFzIHN0cmluZylcbn0pO1xuXG5leHBvcnQgY29uc3QgY2xpZW50QWRhcHRlciA9IHVzZUFkYXB0ZXIoY2xpZW50KTtcbiJdfQ==