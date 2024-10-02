"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWT = exports.generarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const _util_1 = require("@util");
const generarToken = (usuario) => {
    return jsonwebtoken_1.default.sign({ id: usuario.id, usuario: usuario.usuario, correo: usuario.correo }, _util_1.KEY_JWT, { expiresIn: '1h' });
};
exports.generarToken = generarToken;
const validarJWT = (token) => {
    try {
        token = token.split(' ')[1];
        return jsonwebtoken_1.default.verify(token, _util_1.KEY_JWT);
    }
    catch (error) {
        console.error('Error al validar el token JWT:', error);
        return null;
    }
};
exports.validarJWT = validarJWT;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9rZW5Eb21haW5TZXJ2aWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb21haW4vc2VydmljZXMvVG9rZW5Eb21haW5TZXJ2aWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxnRUFBK0I7QUFDL0IsaUNBQThCO0FBRXZCLE1BQU0sWUFBWSxHQUFHLENBQUMsT0FBc0IsRUFBVSxFQUFFO0lBQzNELE9BQU8sc0JBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLGVBQU8sRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3hILENBQUMsQ0FBQTtBQUZZLFFBQUEsWUFBWSxnQkFFeEI7QUFFTSxNQUFNLFVBQVUsR0FBRyxDQUFDLEtBQWEsRUFBcUIsRUFBRTtJQUMzRCxJQUFJLENBQUM7UUFFRCxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixPQUFPLHNCQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxlQUFPLENBQWUsQ0FBQztJQUNwRCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUViLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztBQUNMLENBQUMsQ0FBQTtBQVZZLFFBQUEsVUFBVSxjQVV0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VXN1YXJpb0VudGl0eSwgVXN1YXJpb0pXVH0gZnJvbSBcIkBkb21haW4vZW50aXRpZXNcIjtcbmltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJztcbmltcG9ydCB7S0VZX0pXVH0gZnJvbSBcIkB1dGlsXCI7XG5cbmV4cG9ydCBjb25zdCBnZW5lcmFyVG9rZW4gPSAodXN1YXJpbzogVXN1YXJpb0VudGl0eSk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIGp3dC5zaWduKHsgaWQ6IHVzdWFyaW8uaWQsIHVzdWFyaW86IHVzdWFyaW8udXN1YXJpbywgY29ycmVvOiB1c3VhcmlvLmNvcnJlbyB9LCBLRVlfSldULCB7IGV4cGlyZXNJbjogJzFoJyB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IHZhbGlkYXJKV1QgPSAodG9rZW46IHN0cmluZyk6IFVzdWFyaW9KV1QgfCBudWxsID0+IHtcbiAgICB0cnkge1xuICAgICAgICAvLyBleHRyYWN0IEJlYXJlclxuICAgICAgICB0b2tlbiA9IHRva2VuLnNwbGl0KCcgJylbMV07XG4gICAgICAgIHJldHVybiBqd3QudmVyaWZ5KHRva2VuLCBLRVlfSldUKSBhcyBVc3VhcmlvSldUO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIC8vIFNpIGhheSB1biBlcnJvciBkZSB2ZXJpZmljYWNpw7NuICh0b2tlbiBpbnbDoWxpZG8gbyBleHBpcmFkbyksIGRldnVlbHZlIG51bGxcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgYWwgdmFsaWRhciBlbCB0b2tlbiBKV1Q6JywgZXJyb3IpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG4iXX0=