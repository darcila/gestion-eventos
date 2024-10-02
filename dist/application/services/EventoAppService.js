"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventoAppService = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const response_1 = require("@domain/response");
const entities_1 = require("@domain/entities");
const _configuration_1 = require("@configuration");
const services_1 = require("@infrastructure/services");
const ReservaCacheInfraService_1 = require("@infrastructure/services/ReservaCacheInfraService");
let EventoAppService = class EventoAppService {
    constructor() {
        this.eventoInfraService = _configuration_1.DEPENDENCY_CONTAINER.get(services_1.EventoInfraService);
        this.mapInfraService = _configuration_1.DEPENDENCY_CONTAINER.get(services_1.MapInfraService);
        this.reservaCacheInfraService = _configuration_1.DEPENDENCY_CONTAINER.get(ReservaCacheInfraService_1.ReservaCacheInfraService);
    }
    async getEvento(id) {
        const result = await this.eventoInfraService.consultar(id);
        return response_1.Result.ok(result);
    }
    async postEvento(evento) {
        const eventoEntity = entities_1.EventoEntity.create(evento.nombre, evento.descripcion, evento.lugar, evento.ciudad, evento.fecha, evento.hora, evento.categoria, evento.capacidad, evento.valor);
        eventoEntity.id = await this.eventoInfraService.guardar(eventoEntity);
        return response_1.Result.ok(eventoEntity);
    }
    async patchEvento(evento) {
        this.prevalidarCamposEvento(evento);
        const eventoEntity = await this.eventoInfraService.actualizar(evento);
        return response_1.Result.ok(eventoEntity);
    }
    async deleteEvento(id) {
        const estado = await this.eventoInfraService.eliminar(id);
        if (estado) {
            return response_1.Result.ok({ mensaje: 'Evento eliminado', id });
        }
        return response_1.Result.ok({ mensaje: 'Evento no eliminado', id });
    }
    async listarLugaresCercanos(tipo, evento) {
        const eventoEntity = await this.eventoInfraService.consultar(evento);
        let lat;
        let lng;
        if (eventoEntity.ubicacion) {
            const ubicacion = eventoEntity.ubicacion;
            lat = ubicacion.x;
            lng = ubicacion.y;
        }
        else {
            throw new Error('Evento no tiene ubicación');
        }
        const eventos = await this.mapInfraService.consultarLugaresCercanos(lat, lng, tipo);
        return response_1.Result.ok(eventos);
    }
    async listarEventosCercanos(direccion, distancia, ciudad) {
        const ubicacion = await this.mapInfraService.consultarUbicacion(direccion, ciudad);
        const eventos = await this.eventoInfraService.consultarEventosCercanos(ubicacion[0], ubicacion[1], distancia);
        return response_1.Result.ok(eventos);
    }
    async asistentesEvento(id) {
        const cache = await this.reservaCacheInfraService.getCacheAsistentesCount(id);
        if (cache) {
            return response_1.Result.ok(cache);
        }
        const asistentes = await this.eventoInfraService.consultarAsistentes(id);
        await this.reservaCacheInfraService.setCacheAasistentesCount(id, asistentes);
        return response_1.Result.ok(asistentes);
    }
    prevalidarCamposEvento(evento) {
        if (!evento.nombre && !evento.fecha && !evento.hora && !evento.capacidad && !evento.valor) {
            throw new Error('Debes enviar al menos un campo a actualizar');
        }
    }
};
exports.EventoAppService = EventoAppService;
exports.EventoAppService = EventoAppService = __decorate([
    (0, inversify_1.injectable)()
], EventoAppService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRvQXBwU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHBsaWNhdGlvbi9zZXJ2aWNlcy9FdmVudG9BcHBTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHlDQUF1QztBQUN2Qyw0QkFBMEI7QUFDMUIsK0NBQW9EO0FBQ3BELCtDQU8wQjtBQUMxQixtREFBb0Q7QUFDcEQsdURBQTZFO0FBRTdFLGdHQUEyRjtBQUdwRixJQUFNLGdCQUFnQixHQUF0QixNQUFNLGdCQUFnQjtJQUF0QjtRQUNLLHVCQUFrQixHQUFHLHFDQUFvQixDQUFDLEdBQUcsQ0FBQyw2QkFBa0IsQ0FBQyxDQUFDO1FBQ2xFLG9CQUFlLEdBQUcscUNBQW9CLENBQUMsR0FBRyxDQUFDLDBCQUFlLENBQUMsQ0FBQztRQUM1RCw2QkFBd0IsR0FBRyxxQ0FBb0IsQ0FBQyxHQUFHLENBQUMsbURBQXdCLENBQUMsQ0FBQztJQXdEMUYsQ0FBQztJQXRERyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQVU7UUFDdEIsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNELE9BQU8saUJBQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNELEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBdUI7UUFDcEMsTUFBTSxZQUFZLEdBQUcsdUJBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0TCxZQUFZ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QUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUM3RSxPQUFPLGlCQUFNLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDTyxzQkFBc0IsQ0FBQyxNQUF3QjtRQUNuRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN4RixNQUFNLElBQUksS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7UUFDbkUsQ0FBQztJQUNMLENBQUM7Q0FDSixDQUFBO0FBM0RZLDRDQUFnQjsyQkFBaEIsZ0JBQWdCO0lBRDVCLElBQUEsc0JBQVUsR0FBRTtHQUNBLGdCQUFnQixDQTJENUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbmplY3RhYmxlIH0gZnJvbSAnaW52ZXJzaWZ5JztcbmltcG9ydCAncmVmbGVjdC1tZXRhZGF0YSc7XG5pbXBvcnQgeyBSZXN1bHQsIFJlc3BvbnNlIH0gZnJvbSAnQGRvbWFpbi9yZXNwb25zZSc7XG5pbXBvcnQge1xuICAgIEV2ZW50b0FzaXN0ZW50ZXMsXG4gICAgRXZlbnRvRW50aXR5LFxuICAgIEV2ZW50b0x1Z2FyQ2VyY2FubyxcbiAgICBFdmVudG9QYXRjaFBhcmFtLFxuICAgIEV2ZW50b1Bvc3RQYXJhbSxcbiAgICBFdmVudG9SZXNwdWVzdGFNZW5zYWplXG59IGZyb20gXCJAZG9tYWluL2VudGl0aWVzXCI7XG5pbXBvcnQge0RFUEVOREVOQ1lfQ09OVEFJTkVSfSBmcm9tIFwiQGNvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCB7RXZlbnRvSW5mcmFTZXJ2aWNlLCBNYXBJbmZyYVNlcnZpY2V9IGZyb20gXCJAaW5mcmFzdHJ1Y3R1cmUvc2VydmljZXNcIjtcbmltcG9ydCB7VWJpY2FjaW9ufSBmcm9tIFwiQGRvbWFpbi9lbnRpdGllcy9NYXBFbnRpdHlcIjtcbmltcG9ydCB7UmVzZXJ2YUNhY2hlSW5mcmFTZXJ2aWNlfSBmcm9tIFwiQGluZnJhc3RydWN0dXJlL3NlcnZpY2VzL1Jlc2VydmFDYWNoZUluZnJhU2VydmljZVwiO1xuXG5AaW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRXZlbnRvQXBwU2VydmljZSB7XG4gICAgcHJpdmF0ZSBldmVudG9JbmZyYVNlcnZpY2UgPSBERVBFTkRFTkNZX0NPTlRBSU5FUi5nZXQoRXZlbnRvSW5mcmFTZXJ2aWNlKTtcbiAgICBwcml2YXRlIG1hcEluZnJhU2VydmljZSA9IERFUEVOREVOQ1lfQ09OVEFJTkVSLmdldChNYXBJbmZyYVNlcnZpY2UpO1xuICAgIHByaXZhdGUgcmVzZXJ2YUNhY2hlSW5mcmFTZXJ2aWNlID0gREVQRU5ERU5DWV9DT05UQUlORVIuZ2V0KFJlc2VydmFDYWNoZUluZnJhU2VydmljZSk7XG5cbiAgICBhc3luYyBnZXRFdmVudG8oaWQ6IG51bWJlcik6IFByb21pc2U8UmVzcG9uc2U8RXZlbnRvRW50aXR5IHwgbnVsbD4+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5ldmVudG9JbmZyYVNlcnZpY2UuY29uc3VsdGFyKGlkKTtcbiAgICAgICAgcmV0dXJuIFJlc3VsdC5vayhyZXN1bHQpO1xuICAgIH1cbiAgICBhc3luYyBwb3N0RXZlbnRvKGV2ZW50bzogRXZlbnRvUG9zdFBhcmFtKTogUHJvbWlzZTxSZXNwb25zZTxFdmVudG9FbnRpdHkgfCBudWxsPj4ge1xuICAgICAgICBjb25zdCBldmVudG9FbnRpdHkgPSBFdmVudG9FbnRpdHkuY3JlYXRlKGV2ZW50by5ub21icmUsIGV2ZW50by5kZXNjcmlwY2lvbiwgZXZlbnRvLmx1Z2FyLCBldmVudG8uY2l1ZGFkLCBldmVudG8uZmVjaGEsIGV2ZW50by5ob3JhLCBldmVudG8uY2F0ZWdvcmlhLCBldmVudG8uY2FwYWNpZGFkLCBldmVudG8udmFsb3IpO1xuICAgICAgICBldmVudG9FbnRpdHkuaWQgPSBhd2FpdCB0aGlzLmV2ZW50b0luZnJhU2VydmljZS5ndWFyZGFyKGV2ZW50b0VudGl0eSk7XG4gICAgICAgIHJldHVybiBSZXN1bHQub2soZXZlbnRvRW50aXR5KTtcbiAgICB9XG4gICAgYXN5bmMgcGF0Y2hFdmVudG8oZXZlbnRvOiBFdmVudG9QYXRjaFBhcmFtKTogUHJvbWlzZTxSZXNwb25zZTxFdmVudG9FbnRpdHkgfCBudWxsPj4ge1xuICAgICAgICB0aGlzLnByZXZhbGlkYXJDYW1wb3NFdmVudG8oZXZlbnRvKTtcbiAgICAgICAgY29uc3QgZXZlbnRvRW50aXR5ID0gYXdhaXQgdGhpcy5ldmVudG9JbmZyYVNlcnZpY2UuYWN0dWFsaXphcihldmVudG8pO1xuICAgICAgICByZXR1cm4gUmVzdWx0Lm9rKGV2ZW50b0VudGl0eSk7XG4gICAgfVxuICAgIGFzeW5jIGRlbGV0ZUV2ZW50byhpZDogbnVtYmVyKTogUHJvbWlzZTxSZXNwb25zZTxFdmVudG9SZXNwdWVzdGFNZW5zYWplIHwgbnVsbD4+IHtcbiAgICAgICAgY29uc3QgZXN0YWRvID0gYXdhaXQgdGhpcy5ldmVudG9JbmZyYVNlcnZpY2UuZWxpbWluYXIoaWQpO1xuICAgICAgICBpZiAoZXN0YWRvKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVzdWx0Lm9rKHsgbWVuc2FqZTogJ0V2ZW50byBlbGltaW5hZG8nLCBpZCB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUmVzdWx0Lm9rKHsgbWVuc2FqZTogJ0V2ZW50byBubyBlbGltaW5hZG8nLCBpZCB9KTtcbiAgICB9XG4gICAgYXN5bmMgbGlzdGFyTHVnYXJlc0NlcmNhbm9zKHRpcG86IHN0cmluZywgZXZlbnRvOiBudW1iZXIpOiBQcm9taXNlPFJlc3BvbnNlPEV2ZW50b0x1Z2FyQ2VyY2Fub1tdIHwgbnVsbD4+IHtcbiAgICAgICAgY29uc3QgZXZlbnRvRW50aXR5ID0gYXdhaXQgdGhpcy5ldmVudG9JbmZyYVNlcnZpY2UuY29uc3VsdGFyKGV2ZW50byk7XG4gICAgICAgIGxldCBsYXQ6IG51bWJlcjtcbiAgICAgICAgbGV0IGxuZzogbnVtYmVyO1xuICAgICAgICBpZiAoZXZlbnRvRW50aXR5LnViaWNhY2lvbikge1xuICAgICAgICAgICAgY29uc3QgdWJpY2FjaW9uOiBVYmljYWNpb24gPSBldmVudG9FbnRpdHkudWJpY2FjaW9uIGFzIHVua25vd24gYXMgVWJpY2FjaW9uO1xuICAgICAgICAgICAgbGF0ID0gdWJpY2FjaW9uLng7XG4gICAgICAgICAgICBsbmcgPSB1YmljYWNpb24ueTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXZlbnRvIG5vIHRpZW5lIHViaWNhY2nDs24nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBldmVudG9zID0gYXdhaXQgdGhpcy5tYXBJbmZyYVNlcnZpY2UuY29uc3VsdGFyTHVnYXJlc0NlcmNhbm9zKGxhdCwgbG5nLCB0aXBvKTtcbiAgICAgICAgcmV0dXJuIFJlc3VsdC5vayhldmVudG9zKTtcbiAgICB9XG4gICAgYXN5bmMgbGlzdGFyRXZlbnRvc0NlcmNhbm9zKGRpcmVjY2lvbjogc3RyaW5nLCBkaXN0YW5jaWE6IG51bWJlciwgY2l1ZGFkOiBzdHJpbmcpOiBQcm9taXNlPFJlc3BvbnNlPEV2ZW50b0x1Z2FyQ2VyY2Fub1tdIHwgbnVsbD4+IHtcbiAgICAgICAgY29uc3QgdWJpY2FjaW9uID0gYXdhaXQgdGhpcy5tYXBJbmZyYVNlcnZpY2UuY29uc3VsdGFyVWJpY2FjaW9uKGRpcmVjY2lvbiwgY2l1ZGFkKTtcbiAgICAgICAgY29uc3QgZXZlbnRvcyA9IGF3YWl0IHRoaXMuZXZlbnRvSW5mcmFTZXJ2aWNlLmNvbnN1bHRhckV2ZW50b3NDZXJjYW5vcyh1YmljYWNpb25bMF0sIHViaWNhY2lvblsxXSwgZGlzdGFuY2lhKTtcbiAgICAgICAgcmV0dXJuIFJlc3VsdC5vayhldmVudG9zKTtcbiAgICB9XG4gICAgYXN5bmMgYXNpc3RlbnRlc0V2ZW50byhpZDogbnVtYmVyKTogUHJvbWlzZTxSZXNwb25zZTxFdmVudG9Bc2lzdGVudGVzIHwgbnVsbD4+IHtcbiAgICAgICAgY29uc3QgY2FjaGUgPSBhd2FpdCB0aGlzLnJlc2VydmFDYWNoZUluZnJhU2VydmljZS5nZXRDYWNoZUFzaXN0ZW50ZXNDb3VudChpZCk7XG4gICAgICAgIGlmIChjYWNoZSkge1xuICAgICAgICAgICAgcmV0dXJuIFJlc3VsdC5vayhjYWNoZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXNpc3RlbnRlcyA9IGF3YWl0IHRoaXMuZXZlbnRvSW5mcmFTZXJ2aWNlLmNvbnN1bHRhckFzaXN0ZW50ZXMoaWQpO1xuICAgICAgICBhd2FpdCB0aGlzLnJlc2VydmFDYWNoZUluZnJhU2VydmljZS5zZXRDYWNoZUFhc2lzdGVudGVzQ291bnQoaWQsIGFzaXN0ZW50ZXMpO1xuICAgICAgICByZXR1cm4gUmVzdWx0Lm9rKGFzaXN0ZW50ZXMpO1xuICAgIH1cbiAgICBwcml2YXRlIHByZXZhbGlkYXJDYW1wb3NFdmVudG8oZXZlbnRvOiBFdmVudG9QYXRjaFBhcmFtKTogdm9pZCB7XG4gICAgICAgIGlmICghZXZlbnRvLm5vbWJyZSAmJiAhZXZlbnRvLmZlY2hhICYmICFldmVudG8uaG9yYSAmJiAhZXZlbnRvLmNhcGFjaWRhZCAmJiAhZXZlbnRvLnZhbG9yKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RlYmVzIGVudmlhciBhbCBtZW5vcyB1biBjYW1wbyBhIGFjdHVhbGl6YXInKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==