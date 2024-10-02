"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pubSubSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.pubSubSchema = joi_1.default.object({
    message: joi_1.default.object({
        data: joi_1.default.string().required(),
        publishTime: joi_1.default.string().required(),
        messageId: joi_1.default.string().required(),
    })
        .unknown(true)
        .required(),
}).unknown(true);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHViU3ViU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL2FwaS9zY2hlbWFzL1B1YlN1YlNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4Q0FBc0I7QUFZVCxRQUFBLFlBQVksR0FBRyxhQUFHLENBQUMsTUFBTSxDQUFnQjtJQUNsRCxPQUFPLEVBQUUsYUFBRyxDQUFDLE1BQU0sQ0FBQztRQUNoQixJQUFJLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUM3QixXQUFXLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUNwQyxTQUFTLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtLQUNyQyxDQUFDO1NBQ0csT0FBTyxDQUFDLElBQUksQ0FBQztTQUNiLFFBQVEsRUFBRTtDQUNsQixDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEpvaSBmcm9tICdqb2knO1xuXG5leHBvcnQgaW50ZXJmYWNlIFB1YlN1YlBheWxvYWQge1xuICAgIG1lc3NhZ2U6IE1lc3NhZ2U7XG59XG5cbmludGVyZmFjZSBNZXNzYWdlIHtcbiAgICBkYXRhOiBzdHJpbmc7XG4gICAgcHVibGlzaFRpbWU6IHN0cmluZztcbiAgICBtZXNzYWdlSWQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IHB1YlN1YlNjaGVtYSA9IEpvaS5vYmplY3Q8UHViU3ViUGF5bG9hZD4oe1xuICAgIG1lc3NhZ2U6IEpvaS5vYmplY3Qoe1xuICAgICAgICBkYXRhOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgICAgICAgcHVibGlzaFRpbWU6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICAgICAgICBtZXNzYWdlSWQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICAgIH0pXG4gICAgICAgIC51bmtub3duKHRydWUpXG4gICAgICAgIC5yZXF1aXJlZCgpLFxufSkudW5rbm93bih0cnVlKTtcbiJdfQ==