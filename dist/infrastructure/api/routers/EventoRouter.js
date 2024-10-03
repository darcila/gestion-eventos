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
exports.asistentesPorDia = exports.subirEvento = exports.estadoSubirEvento = exports.totalAsistentes = exports.eventoCercano = exports.eventoLugarCercano = exports.eventoDelete = exports.eventoPatch = exports.eventoPost = exports.eventoGet = void 0;
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
const asistentesPorDia = async (req, reply) => {
    const eventoService = _configuration_1.DEPENDENCY_CONTAINER.get(services_1.EventoAppService);
    const response = await eventoService.asistentesEventos();
    return reply.send(Object.assign(Object.assign({}, response), { id: req.id }));
};
exports.asistentesPorDia = asistentesPorDia;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRvUm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL2FwaS9yb3V0ZXJzL0V2ZW50b1JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUF1RDtBQUN2RCxtREFBc0Q7QUFTdEQsZ0RBQXdCO0FBQ3hCLDRDQUE4QjtBQUM5QixpREFBZ0Q7QUFFekMsTUFBTSxTQUFTLEdBQUcsS0FBSyxFQUFFLEdBQWdELEVBQUUsS0FBbUIsRUFBZ0MsRUFBRTtJQUNuSSxNQUFNLGFBQWEsR0FBRyxxQ0FBb0IsQ0FBQyxHQUFHLENBQUMsMkJBQWdCLENBQUMsQ0FBQztJQUNqRSxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQVksQ0FBQztJQUNuQyxNQUFNLFFBQVEsR0FBRyxNQUFNLGFBQWEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkQsT0FBTyxLQUFLLENBQUMsSUFBSSxpQ0FBTSxRQUFRLEtBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUcsQ0FBQztBQUNuRCxDQUFDLENBQUM7QUFMVyxRQUFBLFNBQVMsYUFLcEI7QUFFSyxNQUFNLFVBQVUsR0FBRyxLQUFLLEVBQUUsR0FBOEMsRUFBRSxLQUFtQixFQUFnQyxFQUFFO0lBQ2xJLE1BQU0sYUFBYSxHQUFHLHFDQUFvQixDQUFDLEdBQUcsQ0FBQywyQkFBZ0IsQ0FBQyxDQUFDO0lBQ2pFLE1BQU0sUUFBUSxHQUFHLE1BQU0sYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUQsT0FBTyxLQUFLLENBQUMsSUFBSSxpQ0FBTSxRQUFRLEtBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUcsQ0FBQztBQUNuRCxDQUFDLENBQUE7QUFKWSxRQUFBLFVBQVUsY0FJdEI7QUFFTSxNQUFNLFdBQVcsR0FBRyxLQUFLLEVBQUUsR0FBNkMsRUFBRSxLQUFtQixFQUFnQyxFQUFFO0lBQ2xJLE1BQU0sYUFBYSxHQUFHLHFDQUFvQixDQUFDLEdBQUcsQ0FBQywyQkFBZ0IsQ0FBQyxDQUFDO0lBQ2pFLE1BQU0sUUFBUSxHQUFHLE1BQU0sYUFBYSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0QsT0FBTyxLQUFLLENBQUMsSUFBSSxpQ0FBTSxRQUFRLEtBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUcsQ0FBQztBQUNuRCxDQUFDLENBQUE7QUFKWSxRQUFBLFdBQVcsZUFJdkI7QUFFTSxNQUFNLFlBQVksR0FBRyxLQUFLLEVBQUUsR0FBK0MsRUFBRSxLQUFtQixFQUFnQyxFQUFFO0lBQ3JJLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLE1BQU0sYUFBYSxHQUFHLHFDQUFvQixDQUFDLEdBQUcsQ0FBQywyQkFBZ0IsQ0FBQyxDQUFDO0lBQ2pFLE1BQU0sUUFBUSxHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzRCxPQUFPLEtBQUssQ0FBQyxJQUFJLGlDQUFNLFFBQVEsS0FBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBRyxDQUFDO0FBQ25ELENBQUMsQ0FBQTtBQUxZLFFBQUEsWUFBWSxnQkFLeEI7QUFDTSxNQUFNLGtCQUFrQixHQUFHLEtBQUssRUFBRSxHQUF5RCxFQUFFLEtBQW1CLEVBQWdDLEVBQUU7SUFDckosTUFBTSxhQUFhLEdBQUcscUNBQW9CLENBQUMsR0FBRyxDQUFDLDJCQUFnQixDQUFDLENBQUM7SUFDakUsTUFBTSxRQUFRLEdBQUcsTUFBTSxhQUFhLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3RixPQUFPLEtBQUssQ0FBQyxJQUFJLGlDQUFNLFFBQVEsS0FBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBRyxDQUFDO0FBQ25ELENBQUMsQ0FBQTtBQUpZLFFBQUEsa0JBQWtCLHNCQUk5QjtBQUVNLE1BQU0sYUFBYSxHQUFHLEtBQUssRUFBRSxHQUFvRCxFQUFFLEtBQW1CLEVBQWdDLEVBQUU7SUFDM0ksTUFBTSxhQUFhLEdBQUcscUNBQW9CLENBQUMsR0FBRyxDQUFDLDJCQUFnQixDQUFDLENBQUM7SUFDakUsTUFBTSxRQUFRLEdBQUcsTUFBTSxhQUFhLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2SCxPQUFPLEtBQUssQ0FBQyxJQUFJLGlDQUFNLFFBQVEsS0FBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBRyxDQUFDO0FBQ25ELENBQUMsQ0FBQTtBQUpZLFFBQUEsYUFBYSxpQkFJekI7QUFFTSxNQUFNLGVBQWUsR0FBRyxLQUFLLEVBQUUsR0FBK0MsRUFBRSxLQUFtQixFQUFnQyxFQUFFO0lBQ3hJLE1BQU0sYUFBYSxHQUFHLHFDQUFvQixDQUFDLEdBQUcsQ0FBQywyQkFBZ0IsQ0FBQyxDQUFDO0lBQ2pFLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBWSxDQUFDO0lBQ25DLE1BQU0sUUFBUSxHQUFHLE1BQU0sYUFBYSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFELE9BQU8sS0FBSyxDQUFDLElBQUksaUNBQU0sUUFBUSxLQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFHLENBQUM7QUFDbkQsQ0FBQyxDQUFBO0FBTFksUUFBQSxlQUFlLG1CQUszQjtBQUVNLE1BQU0saUJBQWlCLEdBQUcsS0FBSyxFQUFFLEdBQWtELEVBQUUsS0FBbUIsRUFBZ0MsRUFBRTtJQUM3SSxNQUFNLEdBQUcsR0FBRyxNQUFNLGlCQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckQsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ1AsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUNELElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQztJQUN2QixJQUFJLE1BQU0sR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7UUFDMUIsTUFBTSxHQUFHLFlBQVksQ0FBQztJQUMxQixDQUFDO1NBQU0sSUFBSSxNQUFNLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO1FBQzlCLE1BQU0sR0FBRyxZQUFZLENBQUM7SUFDMUIsQ0FBQztTQUFNLElBQUksTUFBTSxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQztRQUM5QixNQUFNLEdBQUcsU0FBUyxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUE7QUFkWSxRQUFBLGlCQUFpQixxQkFjN0I7QUFFTSxNQUFNLFdBQVcsR0FBRyxLQUFLLEVBQUUsR0FBbUIsRUFBRSxLQUFtQixFQUFnQyxFQUFFO0lBQ3hHLE1BQU0sSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzlCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNSLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLGlDQUFpQyxFQUFFLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBQ0QsSUFBSSxDQUFDO1FBRUQsTUFBTSxRQUFRLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxNQUFNLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ2xDLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzVCLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztZQUM5QixJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLEdBQUcsR0FBRyxNQUFNLGlCQUFTLENBQUMsR0FBRyxDQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztRQUM1QyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUE0QixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25ELEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLDJCQUEyQixFQUFFLENBQUMsQ0FBQztJQUNqRSxDQUFDO0FBQ0wsQ0FBQyxDQUFBO0FBcEJZLFFBQUEsV0FBVyxlQW9CdkI7QUFFTSxNQUFNLGdCQUFnQixHQUFHLEtBQUssRUFBRSxHQUFvQixFQUFFLEtBQW1CLEVBQWdDLEVBQUU7SUFDOUcsTUFBTSxhQUFhLEdBQUcscUNBQW9CLENBQUMsR0FBRyxDQUFDLDJCQUFnQixDQUFDLENBQUM7SUFDakUsTUFBTSxRQUFRLEdBQUcsTUFBTSxhQUFhLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUN6RCxPQUFPLEtBQUssQ0FBQyxJQUFJLGlDQUFNLFFBQVEsS0FBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBRyxDQUFDO0FBQ25ELENBQUMsQ0FBQztBQUpXLFFBQUEsZ0JBQWdCLG9CQUkzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRvQXBwU2VydmljZX0gZnJvbSAnQGFwcGxpY2F0aW9uL3NlcnZpY2VzJztcbmltcG9ydCB7IERFUEVOREVOQ1lfQ09OVEFJTkVSIH0gZnJvbSAnQGNvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHsgRmFzdGlmeVJlcXVlc3QsIEZhc3RpZnlSZXBseSB9IGZyb20gJ2Zhc3RpZnknO1xuaW1wb3J0IHtcbiAgICBFdmVudG9DZXJjYW5vcyxcbiAgICBFdmVudG9Db25zdWx0YUx1Z2FyLFxuICAgIEV2ZW50b0dldFBhcmFtLFxuICAgIEV2ZW50b1BhdGNoUGFyYW0sXG4gICAgRXZlbnRvUG9zdFBhcmFtXG59IGZyb20gXCJAZG9tYWluL2VudGl0aWVzXCI7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQge2ZpbGVRdWV1ZX0gZnJvbSBcIkBpbmZyYXN0cnVjdHVyZS9jb2xhc1wiO1xuXG5leHBvcnQgY29uc3QgZXZlbnRvR2V0ID0gYXN5bmMgKHJlcTogIEZhc3RpZnlSZXF1ZXN0PHsgUGFyYW1zOiBFdmVudG9HZXRQYXJhbSB9PiwgcmVwbHk6IEZhc3RpZnlSZXBseSk6IFByb21pc2U8RmFzdGlmeVJlcGx5IHwgdm9pZD4gPT4ge1xuICAgIGNvbnN0IGV2ZW50b1NlcnZpY2UgPSBERVBFTkRFTkNZX0NPTlRBSU5FUi5nZXQoRXZlbnRvQXBwU2VydmljZSk7XG4gICAgY29uc3QgaWQgPSByZXEucGFyYW1zLmlkIGFzIG51bWJlcjtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGV2ZW50b1NlcnZpY2UuZ2V0RXZlbnRvKGlkKTtcbiAgICByZXR1cm4gcmVwbHkuc2VuZCh7IC4uLnJlc3BvbnNlLCBpZDogcmVxLmlkIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGV2ZW50b1Bvc3QgPSBhc3luYyAocmVxOiBGYXN0aWZ5UmVxdWVzdDx7IEJvZHk6IEV2ZW50b1Bvc3RQYXJhbSB9PiwgcmVwbHk6IEZhc3RpZnlSZXBseSk6IFByb21pc2U8RmFzdGlmeVJlcGx5IHwgdm9pZD4gPT4ge1xuICAgIGNvbnN0IGV2ZW50b1NlcnZpY2UgPSBERVBFTkRFTkNZX0NPTlRBSU5FUi5nZXQoRXZlbnRvQXBwU2VydmljZSk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBldmVudG9TZXJ2aWNlLnBvc3RFdmVudG8ocmVxLmJvZHkpO1xuICAgIHJldHVybiByZXBseS5zZW5kKHsgLi4ucmVzcG9uc2UsIGlkOiByZXEuaWQgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBldmVudG9QYXRjaCA9IGFzeW5jIChyZXE6IEZhc3RpZnlSZXF1ZXN0PHtCb2R5OiBFdmVudG9QYXRjaFBhcmFtfT4sIHJlcGx5OiBGYXN0aWZ5UmVwbHkpOiBQcm9taXNlPEZhc3RpZnlSZXBseSB8IHZvaWQ+ID0+IHtcbiAgICBjb25zdCBldmVudG9TZXJ2aWNlID0gREVQRU5ERU5DWV9DT05UQUlORVIuZ2V0KEV2ZW50b0FwcFNlcnZpY2UpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZXZlbnRvU2VydmljZS5wYXRjaEV2ZW50byhyZXEuYm9keSk7XG4gICAgcmV0dXJuIHJlcGx5LnNlbmQoeyAuLi5yZXNwb25zZSwgaWQ6IHJlcS5pZCB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IGV2ZW50b0RlbGV0ZSA9IGFzeW5jIChyZXE6IEZhc3RpZnlSZXF1ZXN0PHsgUGFyYW1zOiBFdmVudG9HZXRQYXJhbSB9PiwgcmVwbHk6IEZhc3RpZnlSZXBseSk6IFByb21pc2U8RmFzdGlmeVJlcGx5IHwgdm9pZD4gPT4ge1xuICAgIGNvbnNvbGUubG9nKCdFdmVudG8gREVMRVRFJywgcmVxKTtcbiAgICBjb25zdCBldmVudG9TZXJ2aWNlID0gREVQRU5ERU5DWV9DT05UQUlORVIuZ2V0KEV2ZW50b0FwcFNlcnZpY2UpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gZXZlbnRvU2VydmljZS5kZWxldGVFdmVudG8ocmVxLnBhcmFtcy5pZCk7XG4gICAgcmV0dXJuIHJlcGx5LnNlbmQoeyAuLi5yZXNwb25zZSwgaWQ6IHJlcS5pZCB9KTtcbn1cbmV4cG9ydCBjb25zdCBldmVudG9MdWdhckNlcmNhbm8gPSBhc3luYyAocmVxOiBGYXN0aWZ5UmVxdWVzdDx7IFF1ZXJ5c3RyaW5nOiBFdmVudG9Db25zdWx0YUx1Z2FyIH0+LCByZXBseTogRmFzdGlmeVJlcGx5KTogUHJvbWlzZTxGYXN0aWZ5UmVwbHkgfCB2b2lkPiA9PiB7XG4gICAgY29uc3QgZXZlbnRvU2VydmljZSA9IERFUEVOREVOQ1lfQ09OVEFJTkVSLmdldChFdmVudG9BcHBTZXJ2aWNlKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGV2ZW50b1NlcnZpY2UubGlzdGFyTHVnYXJlc0NlcmNhbm9zKHJlcS5xdWVyeS50aXBvLCByZXEucXVlcnkuZXZlbnRvKTtcbiAgICByZXR1cm4gcmVwbHkuc2VuZCh7IC4uLnJlc3BvbnNlLCBpZDogcmVxLmlkIH0pO1xufVxuXG5leHBvcnQgY29uc3QgZXZlbnRvQ2VyY2FubyA9IGFzeW5jIChyZXE6IEZhc3RpZnlSZXF1ZXN0PHsgUXVlcnlzdHJpbmc6IEV2ZW50b0NlcmNhbm9zIH0+LCByZXBseTogRmFzdGlmeVJlcGx5KTogUHJvbWlzZTxGYXN0aWZ5UmVwbHkgfCB2b2lkPiA9PiB7XG4gICAgY29uc3QgZXZlbnRvU2VydmljZSA9IERFUEVOREVOQ1lfQ09OVEFJTkVSLmdldChFdmVudG9BcHBTZXJ2aWNlKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGV2ZW50b1NlcnZpY2UubGlzdGFyRXZlbnRvc0NlcmNhbm9zKHJlcS5xdWVyeS5kaXJlY2Npb24sIHJlcS5xdWVyeS5kaXN0YW5jaWEsIHJlcS5xdWVyeS5jaXVkYWQpO1xuICAgIHJldHVybiByZXBseS5zZW5kKHsgLi4ucmVzcG9uc2UsIGlkOiByZXEuaWQgfSk7XG59XG5cbmV4cG9ydCBjb25zdCB0b3RhbEFzaXN0ZW50ZXMgPSBhc3luYyAocmVxOiBGYXN0aWZ5UmVxdWVzdDx7IFBhcmFtczogRXZlbnRvR2V0UGFyYW0gfT4sIHJlcGx5OiBGYXN0aWZ5UmVwbHkpOiBQcm9taXNlPEZhc3RpZnlSZXBseSB8IHZvaWQ+ID0+IHtcbiAgICBjb25zdCBldmVudG9TZXJ2aWNlID0gREVQRU5ERU5DWV9DT05UQUlORVIuZ2V0KEV2ZW50b0FwcFNlcnZpY2UpO1xuICAgIGNvbnN0IGlkID0gcmVxLnBhcmFtcy5pZCBhcyBudW1iZXI7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBldmVudG9TZXJ2aWNlLmFzaXN0ZW50ZXNFdmVudG8oaWQpO1xuICAgIHJldHVybiByZXBseS5zZW5kKHsgLi4ucmVzcG9uc2UsIGlkOiByZXEuaWQgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBlc3RhZG9TdWJpckV2ZW50byA9IGFzeW5jIChyZXE6IEZhc3RpZnlSZXF1ZXN0PHsgUGFyYW1zOiB7IGpvYklkOiBzdHJpbmcgfSB9PiwgcmVwbHk6IEZhc3RpZnlSZXBseSk6IFByb21pc2U8RmFzdGlmeVJlcGx5IHwgdm9pZD4gPT4ge1xuICAgIGNvbnN0IGpvYiA9IGF3YWl0IGZpbGVRdWV1ZS5nZXRKb2IocmVxLnBhcmFtcy5qb2JJZCk7XG4gICAgaWYgKCFqb2IpIHtcbiAgICAgICAgcmV0dXJuIHJlcGx5LmNvZGUoNDA0KS5zZW5kKHsgZXJyb3I6ICdKb2Igbm8gZW5jb250cmFkbycgfSk7XG4gICAgfVxuICAgIGxldCBzdGF0dXMgPSAnZW4gY29sYSc7XG4gICAgaWYgKGF3YWl0IGpvYi5pc0NvbXBsZXRlZCgpKSB7XG4gICAgICAgIHN0YXR1cyA9ICdjb21wbGV0YWRvJztcbiAgICB9IGVsc2UgaWYgKGF3YWl0IGpvYi5pc0FjdGl2ZSgpKSB7XG4gICAgICAgIHN0YXR1cyA9ICdwcm9jZXNhbmRvJztcbiAgICB9IGVsc2UgaWYgKGF3YWl0IGpvYi5pc0ZhaWxlZCgpKSB7XG4gICAgICAgIHN0YXR1cyA9ICdmYWxsaWRvJztcbiAgICB9XG4gICAgcmV0dXJuIHJlcGx5LnNlbmQoeyBzdGF0dXM6IHN0YXR1cyB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IHN1YmlyRXZlbnRvID0gYXN5bmMgKHJlcTogRmFzdGlmeVJlcXVlc3QsIHJlcGx5OiBGYXN0aWZ5UmVwbHkpOiBQcm9taXNlPEZhc3RpZnlSZXBseSB8IHZvaWQ+ID0+IHtcbiAgICBjb25zdCBmaWxlID0gYXdhaXQgcmVxLmZpbGUoKTtcbiAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgcmVwbHkuY29kZSg0MDApLnNlbmQoeyBlcnJvcjogJ05vIHNlIGhhIGVudmlhZG8gbmluZ3VuIGFyY2hpdm8nIH0pO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKCcvdG1wJywgZmlsZS5maWxlbmFtZSk7XG4gICAgICAgIGNvbnN0IGZpbGVTdHJlYW0gPSBmcy5jcmVhdGVXcml0ZVN0cmVhbShmaWxlUGF0aCk7XG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGZpbGU/LmZpbGUucGlwZShmaWxlU3RyZWFtKTtcbiAgICAgICAgICAgIGZpbGU/LmZpbGUub24oJ2VuZCcsIHJlc29sdmUpO1xuICAgICAgICAgICAgZmlsZT8uZmlsZS5vbignZXJyb3InLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgam9iID0gYXdhaXQgZmlsZVF1ZXVlLmFkZCh7ZmlsZVBhdGh9KTtcbiAgICAgICAgcmVwbHkuc2VuZCh7am9iSWQ6IGpvYi5pZCwgc3RhdHVzOiAnRW4gY29sYSd9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBhbCBzdWJpciBlbCBhcmNoaXZvOicsIGVycm9yKTtcbiAgICAgICAgcmVwbHkuY29kZSg1MDApLnNlbmQoeyBlcnJvcjogJ0Vycm9yIGFsIHN1YmlyIGVsIGFyY2hpdm8nIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGFzaXN0ZW50ZXNQb3JEaWEgPSBhc3luYyAocmVxOiAgRmFzdGlmeVJlcXVlc3QsIHJlcGx5OiBGYXN0aWZ5UmVwbHkpOiBQcm9taXNlPEZhc3RpZnlSZXBseSB8IHZvaWQ+ID0+IHtcbiAgICBjb25zdCBldmVudG9TZXJ2aWNlID0gREVQRU5ERU5DWV9DT05UQUlORVIuZ2V0KEV2ZW50b0FwcFNlcnZpY2UpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZXZlbnRvU2VydmljZS5hc2lzdGVudGVzRXZlbnRvcygpO1xuICAgIHJldHVybiByZXBseS5zZW5kKHsgLi4ucmVzcG9uc2UsIGlkOiByZXEuaWQgfSk7XG59O1xuIl19