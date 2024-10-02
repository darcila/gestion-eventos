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
exports.fileQueue = void 0;
const bull_1 = __importDefault(require("bull"));
const xlsx = __importStar(require("xlsx"));
const entities_1 = require("@domain/entities");
const _util_1 = require("@util");
const _configuration_1 = require("@configuration");
const services_1 = require("@infrastructure/services");
exports.fileQueue = new bull_1.default('file processing', `redis://${_util_1.REDIS_HOST}:${_util_1.REDIS_PORT}`);
exports.fileQueue.process(async (job) => {
    const eventoService = _configuration_1.DEPENDENCY_CONTAINER.get(services_1.EventoInfraService);
    const { filePath } = job.data;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    console.log(data);
    const eventos = data.map((evento) => {
        return entities_1.EventoEntity.fromJson(evento);
    });
    for (const evento of eventos) {
        try {
            await eventoService.guardar(evento);
        }
        catch (e) {
            console.error(e);
        }
    }
    return data;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sYUV2ZW50b3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5mcmFzdHJ1Y3R1cmUvY29sYXMvQ29sYUV2ZW50b3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBaUM7QUFDakMsMkNBQTZCO0FBQzdCLCtDQUEyRDtBQUMzRCxpQ0FBNkM7QUFDN0MsbURBQW9EO0FBQ3BELHVEQUE0RDtBQUUvQyxRQUFBLFNBQVMsR0FBRyxJQUFJLGNBQUksQ0FBYyxpQkFBaUIsRUFBRSxXQUFXLGtCQUFVLElBQUksa0JBQVUsRUFBRSxDQUFDLENBQUM7QUFFekcsaUJBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQXFCLEVBQUUsRUFBRTtJQUM5QyxNQUFNLGFBQWEsR0FBRyxxQ0FBb0IsQ0FBQyxHQUFHLENBQUMsNkJBQWtCLENBQUMsQ0FBQztJQUNuRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztJQUM5QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN6QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLE1BQU0sT0FBTyxHQUFrQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBVyxFQUFFLEVBQUU7UUFDcEQsT0FBTyx1QkFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNILEtBQUssTUFBTSxNQUFNLElBQUksT0FBTyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDO1lBQ0QsTUFBTSxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ1QsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixDQUFDO0lBQ0wsQ0FBQztJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJ1bGwsIHsgSm9iIH0gZnJvbSAnYnVsbCc7XG5pbXBvcnQgKiBhcyB4bHN4IGZyb20gJ3hsc3gnO1xuaW1wb3J0IHtFdmVudG9FbnRpdHksIEZpbGVKb2JEYXRhfSBmcm9tIFwiQGRvbWFpbi9lbnRpdGllc1wiO1xuaW1wb3J0IHtSRURJU19IT1NULCBSRURJU19QT1JUfSBmcm9tIFwiQHV0aWxcIjtcbmltcG9ydCB7REVQRU5ERU5DWV9DT05UQUlORVJ9IGZyb20gXCJAY29uZmlndXJhdGlvblwiO1xuaW1wb3J0IHtFdmVudG9JbmZyYVNlcnZpY2V9IGZyb20gXCJAaW5mcmFzdHJ1Y3R1cmUvc2VydmljZXNcIjtcblxuZXhwb3J0IGNvbnN0IGZpbGVRdWV1ZSA9IG5ldyBCdWxsPEZpbGVKb2JEYXRhPignZmlsZSBwcm9jZXNzaW5nJywgYHJlZGlzOi8vJHtSRURJU19IT1NUfToke1JFRElTX1BPUlR9YCk7XG5cbmZpbGVRdWV1ZS5wcm9jZXNzKGFzeW5jIChqb2I6IEpvYjxGaWxlSm9iRGF0YT4pID0+IHtcbiAgICBjb25zdCBldmVudG9TZXJ2aWNlID0gREVQRU5ERU5DWV9DT05UQUlORVIuZ2V0KEV2ZW50b0luZnJhU2VydmljZSk7XG4gICAgY29uc3QgeyBmaWxlUGF0aCB9ID0gam9iLmRhdGE7XG4gICAgY29uc3Qgd29ya2Jvb2sgPSB4bHN4LnJlYWRGaWxlKGZpbGVQYXRoKTtcbiAgICBjb25zdCBzaGVldE5hbWUgPSB3b3JrYm9vay5TaGVldE5hbWVzWzBdO1xuICAgIGNvbnN0IHNoZWV0ID0gd29ya2Jvb2suU2hlZXRzW3NoZWV0TmFtZV07XG4gICAgY29uc3QgZGF0YSA9IHhsc3gudXRpbHMuc2hlZXRfdG9fanNvbihzaGVldCk7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgY29uc3QgZXZlbnRvczpFdmVudG9FbnRpdHlbXSA9IGRhdGEubWFwKChldmVudG86IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gRXZlbnRvRW50aXR5LmZyb21Kc29uKGV2ZW50byk7XG4gICAgfSk7XG4gICAgZm9yIChjb25zdCBldmVudG8gb2YgZXZlbnRvcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgZXZlbnRvU2VydmljZS5ndWFyZGFyKGV2ZW50byk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG59KTtcbiJdfQ==