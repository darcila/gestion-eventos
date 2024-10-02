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
exports.subirEvento = exports.estadoSubirEvento = exports.totalAsistentes = exports.eventoCercano = exports.eventoLugarCercano = exports.eventoDelete = exports.eventoPatch = exports.eventoPost = exports.eventoGet = void 0;
const services_1 = require("@application/services");
const _configuration_1 = require("@configuration");
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("node:fs"));
const colas_1 = require("@infrastructure/colas");
const eventoGet = async (req, reply) => {
    const eventoService = _configuration_1.DEPENDENCY_CONTAINER.get(services_1.EventoAppService);
    const id = req.params.id;
    const response = await eventoService.getEvento(id);
    return reply.send(Object.assign(Object.assign({}, response), { id: req.id }));
};
exports.eventoGet = eventoGet;
const eventoPost = async (req, reply) => {
    const eventoService = _configuration_1.DEPENDENCY_CONTAINER.get(services_1.EventoAppService);
    const response = await eventoService.postEvento(req.body);
    return reply.send(Object.assign(Object.assign({}, response), { id: req.id }));
};
exports.eventoPost = eventoPost;
const eventoPatch = async (req, reply) => {
    const eventoService = _configuration_1.DEPENDENCY_CONTAINER.get(services_1.EventoAppService);
    const response = await eventoService.patchEvento(req.body);
    return reply.send(Object.assign(Object.assign({}, response), { id: req.id }));
};
exports.eventoPatch = eventoPatch;
const eventoDelete = async (req, reply) => {
    console.log('Evento DELETE', req);
    const eventoService = _configuration_1.DEPENDENCY_CONTAINER.get(services_1.EventoAppService);
    const response = eventoService.deleteEvento(req.params.id);
    return reply.send(Object.assign(Object.assign({}, response), { id: req.id }));
};
exports.eventoDelete = eventoDelete;
const eventoLugarCercano = async (req, reply) => {
    const eventoService = _configuration_1.DEPENDENCY_CONTAINER.get(services_1.EventoAppService);
    const response = await eventoService.listarLugaresCercanos(req.query.tipo, req.query.evento);
    return reply.send(Object.assign(Object.assign({}, response), { id: req.id }));
};
exports.eventoLugarCercano = eventoLugarCercano;
const eventoCercano = async (req, reply) => {
    const eventoService = _configuration_1.DEPENDENCY_CONTAINER.get(services_1.EventoAppService);
    const response = await eventoService.listarEventosCercanos(req.query.direccion, req.query.distancia, req.query.ciudad);
    return reply.send(Object.assign(Object.assign({}, response), { id: req.id }));
};
exports.eventoCercano = eventoCercano;
const totalAsistentes = async (req, reply) => {
    const eventoService = _configuration_1.DEPENDENCY_CONTAINER.get(services_1.EventoAppService);
    const id = req.params.id;
    const response = await eventoService.asistentesEvento(id);
    return reply.send(Object.assign(Object.assign({}, response), { id: req.id }));
};
exports.totalAsistentes = totalAsistentes;
const estadoSubirEvento = async (req, reply) => {
    const job = await colas_1.fileQueue.getJob(req.params.jobId);
    if (!job) {
        return reply.code(404).send({ error: 'Job no encontrado' });
    }
    let status = 'en cola';
    if (await job.isCompleted()) {
        status = 'completado';
    }
    else if (await job.isActive()) {
        status = 'procesando';
    }
    else if (await job.isFailed()) {
        status = 'fallido';
    }
    return reply.send({ status: status });
};
exports.estadoSubirEvento = estadoSubirEvento;
const subirEvento = async (req, reply) => {
    const file = await req.file();
    if (!file) {
        reply.code(400).send({ error: 'No se ha enviado ningun archivo' });
    }
    try {
        const filePath = path_1.default.join('/tmp', file.filename);
        const fileStream = fs.createWriteStream(filePath);
        await new Promise((resolve, reject) => {
            file === null || file === void 0 ? void 0 : file.file.pipe(fileStream);
            file === null || file === void 0 ? void 0 : file.file.on('end', resolve);
            file === null || file === void 0 ? void 0 : file.file.on('error', reject);
        });
        const job = await colas_1.fileQueue.add({ filePath });
        reply.send({ jobId: job.id, status: 'En cola' });
    }
    catch (error) {
        console.error('Error al subir el archivo:', error);
        reply.code(500).send({ error: 'Error al subir el archivo' });
    }
};
exports.subirEvento = subirEvento;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRvUm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL2FwaS9yb3V0ZXJzL0V2ZW50b1JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUF1RDtBQUN2RCxtREFBc0Q7QUFTdEQsZ0RBQXdCO0FBQ3hCLDRDQUE4QjtBQUM5QixpREFBZ0Q7QUFFekMsTUFBTSxTQUFTLEdBQUcsS0FBSyxFQUFFLEdBQWdELEVBQUUsS0FBbUIsRUFBZ0MsRUFBRTtJQUNuSSxNQUFNLGFBQWEsR0FBRyxxQ0FBb0IsQ0FBQyxHQUFHLENBQUMsMkJBQWdCLENBQUMsQ0FBQztJQUNqRSxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQVksQ0FBQztJQUNuQyxNQUFNLFFBQVEsR0FBRyxNQUFNLGFBQWEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkQsT0FBTyxLQUFLLENBQUMsSUFBSSxpQ0FBTSxRQUFRLEtBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUcsQ0FBQztBQUNuRCxDQUFDLENBQUM7QUFMVyxRQUFBLFNBQVMsYUFLcEI7QUFFSyxNQUFNLFVBQVUsR0FBRyxLQUFLLEVBQUUsR0FBOEMsRUFBRSxLQUFtQixFQUFnQyxFQUFFO0lBQ2xJLE1BQU0sYUFBYSxHQUFHLHFDQUFvQixDQUFDLEdBQUcsQ0FBQywyQkFBZ0IsQ0FBQyxDQUFDO0lBQ2pFLE1BQU0sUUFBUSxHQUFHLE1BQU0sYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUQsT0FBTyxLQUFLLENBQUMsSUFBSSxpQ0FBTSxRQUFRLEtBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUcsQ0FBQztBQUNuRCxDQUFDLENBQUE7QUFKWSxRQUFBLFVBQVUsY0FJdEI7QUFFTSxNQUFN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QVEsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxNQUFNLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ2xDLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzVCLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztZQUM5QixJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLEdBQUcsR0FBRyxNQUFNLGlCQUFTLENBQUMsR0FBRyxDQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztRQUM1QyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUE0QixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25ELEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLDJCQUEyQixFQUFFLENBQUMsQ0FBQztJQUNqRSxDQUFDO0FBQ0wsQ0FBQyxDQUFBO0FBcEJZLFFBQUEsV0FBVyxlQW9CdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50b0FwcFNlcnZpY2V9IGZyb20gJ0BhcHBsaWNhdGlvbi9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBERVBFTkRFTkNZX0NPTlRBSU5FUiB9IGZyb20gJ0Bjb25maWd1cmF0aW9uJztcbmltcG9ydCB7IEZhc3RpZnlSZXF1ZXN0LCBGYXN0aWZ5UmVwbHkgfSBmcm9tICdmYXN0aWZ5JztcbmltcG9ydCB7XG4gICAgRXZlbnRvQ2VyY2Fub3MsXG4gICAgRXZlbnRvQ29uc3VsdGFMdWdhcixcbiAgICBFdmVudG9HZXRQYXJhbSxcbiAgICBFdmVudG9QYXRjaFBhcmFtLFxuICAgIEV2ZW50b1Bvc3RQYXJhbVxufSBmcm9tIFwiQGRvbWFpbi9lbnRpdGllc1wiO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHtmaWxlUXVldWV9IGZyb20gXCJAaW5mcmFzdHJ1Y3R1cmUvY29sYXNcIjtcblxuZXhwb3J0IGNvbnN0IGV2ZW50b0dldCA9IGFzeW5jIChyZXE6ICBGYXN0aWZ5UmVxdWVzdDx7IFBhcmFtczogRXZlbnRvR2V0UGFyYW0gfT4sIHJlcGx5OiBGYXN0aWZ5UmVwbHkpOiBQcm9taXNlPEZhc3RpZnlSZXBseSB8IHZvaWQ+ID0+IHtcbiAgICBjb25zdCBldmVudG9TZXJ2aWNlID0gREVQRU5ERU5DWV9DT05UQUlORVIuZ2V0KEV2ZW50b0FwcFNlcnZpY2UpO1xuICAgIGNvbnN0IGlkID0gcmVxLnBhcmFtcy5pZCBhcyBudW1iZXI7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBldmVudG9TZXJ2aWNlLmdldEV2ZW50byhpZCk7XG4gICAgcmV0dXJuIHJlcGx5LnNlbmQoeyAuLi5yZXNwb25zZSwgaWQ6IHJlcS5pZCB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBldmVudG9Qb3N0ID0gYXN5bmMgKHJlcTogRmFzdGlmeVJlcXVlc3Q8eyBCb2R5OiBFdmVudG9Qb3N0UGFyYW0gfT4sIHJlcGx5OiBGYXN0aWZ5UmVwbHkpOiBQcm9taXNlPEZhc3RpZnlSZXBseSB8IHZvaWQ+ID0+IHtcbiAgICBjb25zdCBldmVudG9TZXJ2aWNlID0gREVQRU5ERU5DWV9DT05UQUlORVIuZ2V0KEV2ZW50b0FwcFNlcnZpY2UpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZXZlbnRvU2VydmljZS5wb3N0RXZlbnRvKHJlcS5ib2R5KTtcbiAgICByZXR1cm4gcmVwbHkuc2VuZCh7IC4uLnJlc3BvbnNlLCBpZDogcmVxLmlkIH0pO1xufVxuXG5leHBvcnQgY29uc3QgZXZlbnRvUGF0Y2ggPSBhc3luYyAocmVxOiBGYXN0aWZ5UmVxdWVzdDx7Qm9keTogRXZlbnRvUGF0Y2hQYXJhbX0+LCByZXBseTogRmFzdGlmeVJlcGx5KTogUHJvbWlzZTxGYXN0aWZ5UmVwbHkgfCB2b2lkPiA9PiB7XG4gICAgY29uc3QgZXZlbnRvU2VydmljZSA9IERFUEVOREVOQ1lfQ09OVEFJTkVSLmdldChFdmVudG9BcHBTZXJ2aWNlKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGV2ZW50b1NlcnZpY2UucGF0Y2hFdmVudG8ocmVxLmJvZHkpO1xuICAgIHJldHVybiByZXBseS5zZW5kKHsgLi4ucmVzcG9uc2UsIGlkOiByZXEuaWQgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBldmVudG9EZWxldGUgPSBhc3luYyAocmVxOiBGYXN0aWZ5UmVxdWVzdDx7IFBhcmFtczogRXZlbnRvR2V0UGFyYW0gfT4sIHJlcGx5OiBGYXN0aWZ5UmVwbHkpOiBQcm9taXNlPEZhc3RpZnlSZXBseSB8IHZvaWQ+ID0+IHtcbiAgICBjb25zb2xlLmxvZygnRXZlbnRvIERFTEVURScsIHJlcSk7XG4gICAgY29uc3QgZXZlbnRvU2VydmljZSA9IERFUEVOREVOQ1lfQ09OVEFJTkVSLmdldChFdmVudG9BcHBTZXJ2aWNlKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGV2ZW50b1NlcnZpY2UuZGVsZXRlRXZlbnRvKHJlcS5wYXJhbXMuaWQpO1xuICAgIHJldHVybiByZXBseS5zZW5kKHsgLi4ucmVzcG9uc2UsIGlkOiByZXEuaWQgfSk7XG59XG5leHBvcnQgY29uc3QgZXZlbnRvTHVnYXJDZXJjYW5vID0gYXN5bmMgKHJlcTogRmFzdGlmeVJlcXVlc3Q8eyBRdWVyeXN0cmluZzogRXZlbnRvQ29uc3VsdGFMdWdhciB9PiwgcmVwbHk6IEZhc3RpZnlSZXBseSk6IFByb21pc2U8RmFzdGlmeVJlcGx5IHwgdm9pZD4gPT4ge1xuICAgIGNvbnN0IGV2ZW50b1NlcnZpY2UgPSBERVBFTkRFTkNZX0NPTlRBSU5FUi5nZXQoRXZlbnRvQXBwU2VydmljZSk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBldmVudG9TZXJ2aWNlLmxpc3Rhckx1Z2FyZXNDZXJjYW5vcyhyZXEucXVlcnkudGlwbywgcmVxLnF1ZXJ5LmV2ZW50byk7XG4gICAgcmV0dXJuIHJlcGx5LnNlbmQoeyAuLi5yZXNwb25zZSwgaWQ6IHJlcS5pZCB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IGV2ZW50b0NlcmNhbm8gPSBhc3luYyAocmVxOiBGYXN0aWZ5UmVxdWVzdDx7IFF1ZXJ5c3RyaW5nOiBFdmVudG9DZXJjYW5vcyB9PiwgcmVwbHk6IEZhc3RpZnlSZXBseSk6IFByb21pc2U8RmFzdGlmeVJlcGx5IHwgdm9pZD4gPT4ge1xuICAgIGNvbnN0IGV2ZW50b1NlcnZpY2UgPSBERVBFTkRFTkNZX0NPTlRBSU5FUi5nZXQoRXZlbnRvQXBwU2VydmljZSk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBldmVudG9TZXJ2aWNlLmxpc3RhckV2ZW50b3NDZXJjYW5vcyhyZXEucXVlcnkuZGlyZWNjaW9uLCByZXEucXVlcnkuZGlzdGFuY2lhLCByZXEucXVlcnkuY2l1ZGFkKTtcbiAgICByZXR1cm4gcmVwbHkuc2VuZCh7IC4uLnJlc3BvbnNlLCBpZDogcmVxLmlkIH0pO1xufVxuXG5leHBvcnQgY29uc3QgdG90YWxBc2lzdGVudGVzID0gYXN5bmMgKHJlcTogRmFzdGlmeVJlcXVlc3Q8eyBQYXJhbXM6IEV2ZW50b0dldFBhcmFtIH0+LCByZXBseTogRmFzdGlmeVJlcGx5KTogUHJvbWlzZTxGYXN0aWZ5UmVwbHkgfCB2b2lkPiA9PiB7XG4gICAgY29uc3QgZXZlbnRvU2VydmljZSA9IERFUEVOREVOQ1lfQ09OVEFJTkVSLmdldChFdmVudG9BcHBTZXJ2aWNlKTtcbiAgICBjb25zdCBpZCA9IHJlcS5wYXJhbXMuaWQgYXMgbnVtYmVyO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZXZlbnRvU2VydmljZS5hc2lzdGVudGVzRXZlbnRvKGlkKTtcbiAgICByZXR1cm4gcmVwbHkuc2VuZCh7IC4uLnJlc3BvbnNlLCBpZDogcmVxLmlkIH0pO1xufVxuXG5leHBvcnQgY29uc3QgZXN0YWRvU3ViaXJFdmVudG8gPSBhc3luYyAocmVxOiBGYXN0aWZ5UmVxdWVzdDx7IFBhcmFtczogeyBqb2JJZDogc3RyaW5nIH0gfT4sIHJlcGx5OiBGYXN0aWZ5UmVwbHkpOiBQcm9taXNlPEZhc3RpZnlSZXBseSB8IHZvaWQ+ID0+IHtcbiAgICBjb25zdCBqb2IgPSBhd2FpdCBmaWxlUXVldWUuZ2V0Sm9iKHJlcS5wYXJhbXMuam9iSWQpO1xuICAgIGlmICgham9iKSB7XG4gICAgICAgIHJldHVybiByZXBseS5jb2RlKDQwNCkuc2VuZCh7IGVycm9yOiAnSm9iIG5vIGVuY29udHJhZG8nIH0pO1xuICAgIH1cbiAgICBsZXQgc3RhdHVzID0gJ2VuIGNvbGEnO1xuICAgIGlmIChhd2FpdCBqb2IuaXNDb21wbGV0ZWQoKSkge1xuICAgICAgICBzdGF0dXMgPSAnY29tcGxldGFkbyc7XG4gICAgfSBlbHNlIGlmIChhd2FpdCBqb2IuaXNBY3RpdmUoKSkge1xuICAgICAgICBzdGF0dXMgPSAncHJvY2VzYW5kbyc7XG4gICAgfSBlbHNlIGlmIChhd2FpdCBqb2IuaXNGYWlsZWQoKSkge1xuICAgICAgICBzdGF0dXMgPSAnZmFsbGlkbyc7XG4gICAgfVxuICAgIHJldHVybiByZXBseS5zZW5kKHsgc3RhdHVzOiBzdGF0dXMgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBzdWJpckV2ZW50byA9IGFzeW5jIChyZXE6IEZhc3RpZnlSZXF1ZXN0LCByZXBseTogRmFzdGlmeVJlcGx5KTogUHJvbWlzZTxGYXN0aWZ5UmVwbHkgfCB2b2lkPiA9PiB7XG4gICAgY29uc3QgZmlsZSA9IGF3YWl0IHJlcS5maWxlKCk7XG4gICAgaWYgKCFmaWxlKSB7XG4gICAgICAgIHJlcGx5LmNvZGUoNDAwKS5zZW5kKHsgZXJyb3I6ICdObyBzZSBoYSBlbnZpYWRvIG5pbmd1biBhcmNoaXZvJyB9KTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbignL3RtcCcsIGZpbGUuZmlsZW5hbWUpO1xuICAgICAgICBjb25zdCBmaWxlU3RyZWFtID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0oZmlsZVBhdGgpO1xuICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBmaWxlPy5maWxlLnBpcGUoZmlsZVN0cmVhbSk7XG4gICAgICAgICAgICBmaWxlPy5maWxlLm9uKCdlbmQnLCByZXNvbHZlKTtcbiAgICAgICAgICAgIGZpbGU/LmZpbGUub24oJ2Vycm9yJywgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGpvYiA9IGF3YWl0IGZpbGVRdWV1ZS5hZGQoe2ZpbGVQYXRofSk7XG4gICAgICAgIHJlcGx5LnNlbmQoe2pvYklkOiBqb2IuaWQsIHN0YXR1czogJ0VuIGNvbGEnfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgYWwgc3ViaXIgZWwgYXJjaGl2bzonLCBlcnJvcik7XG4gICAgICAgIHJlcGx5LmNvZGUoNTAwKS5zZW5kKHsgZXJyb3I6ICdFcnJvciBhbCBzdWJpciBlbCBhcmNoaXZvJyB9KTtcbiAgICB9XG59XG5cblxuIl19