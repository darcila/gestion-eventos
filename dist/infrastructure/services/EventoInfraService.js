"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventoInfraService = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const _configuration_1 = require("@configuration");
const MapInfraService_1 = require("@infrastructure/services/MapInfraService");
const ReservaInfraService_1 = require("@infrastructure/services/ReservaInfraService");
let EventoInfraService = class EventoInfraService {
    constructor() {
        this.eventosRepository = _configuration_1.DEPENDENCY_CONTAINER.get(_configuration_1.TYPES.EventosRepository);
        this.mapService = _configuration_1.DEPENDENCY_CONTAINER.get(MapInfraService_1.MapInfraService);
        this.reservaInfraService = _configuration_1.DEPENDENCY_CONTAINER.get(ReservaInfraService_1.ReservaInfraService);
    }
    async actualizar(evento) {
        const eventoEntity = await this.eventosRepository.consultarPorId(evento.id);
        if (!eventoEntity) {
            throw new Error('Evento no encontrado');
        }
        if (evento.nombre) {
            eventoEntity.nombre = evento.nombre;
        }
        if (evento.fecha) {
            eventoEntity.fecha = evento.fecha;
        }
        if (evento.hora) {
            eventoEntity.hora = evento.hora;
        }
        if (evento.capacidad) {
            eventoEntity.capacidad = evento.capacidad;
        }
        if (evento.valor) {
            eventoEntity.valor = evento.valor;
        }
        const idEvento = await this.eventosRepository.actualizar(eventoEntity);
        if (idEvento) {
            return eventoEntity;
        }
        throw new Error('Error al actualizar el evento');
    }
    async consultar(id) {
        const evento = await this.eventosRepository.consultarPorId(id);
        if (evento) {
            return evento;
        }
        throw new Error('Evento no encontrado');
    }
    async eliminar(id) {
        return !!(await this.eventosRepository.eliminar(id));
    }
    async guardar(evento) {
        console.log('guardar', evento);
        evento.ubicacion = await this.mapService.consultarUbicacion(evento.lugar, evento.ciudad);
        const idEvento = await this.eventosRepository.guardar(evento);
        if (idEvento > 0) {
            return idEvento;
        }
        throw new Error('Error al guardar el evento');
    }
    async consultarEventosCercanos(lat, lng, distancia) {
        const response = await this.eventosRepository.eventosCercanos(lat, lng, distancia * 1000);
        if (response) {
            return response;
        }
        throw new Error('Ubicación no encontrada');
    }
    async consultarAsistentes(id) {
        const evento = await this.eventosRepository.consultarPorId(id);
        if (!evento) {
            throw new Error('Evento no encontrado');
        }
        const total = await this.reservaInfraService.totalAsistentes(id);
        return {
            id: (evento.id ? evento.id : 0),
            nombre: evento.nombre,
            descripcion: evento.descripcion,
            lugar: evento.lugar,
            ciudad: evento.ciudad,
            fecha: evento.fecha,
            hora: evento.hora,
            totalAsistentes: total
        };
    }
    async consultarAsistentesEventos() {
        const eventos = await this.eventosRepository.totalAsistenteDia();
        if (eventos === null) {
            throw new Error('Error al consultar asistentes');
        }
        return eventos;
    }
};
exports.EventoInfraService = EventoInfraService;
exports.EventoInfraService = EventoInfraService = __decorate([
    (0, inversify_1.injectable)()
], EventoInfraService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRvSW5mcmFTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL3NlcnZpY2VzL0V2ZW50b0luZnJhU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx5Q0FBdUM7QUFDdkMsNEJBQTBCO0FBQzFCLG1EQUEyRDtBQVMzRCw4RUFBeUU7QUFDekUsc0ZBQWlGO0FBRzFFLElBQU0sa0JBQWtCLEdBQXhCLE1BQU0sa0JBQWtCO0lBQXhCO1FBQ0ssc0JBQWlCLEdBQUcscUNBQW9CLENBQUMsR0FBRyxDQUFvQixzQkFBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDekYsZUFBVSxHQUFHLHFDQUFvQixDQUFDLEdBQUcsQ0FBQyxpQ0FBZSxDQUFDLENBQUM7UUFDdkQsd0JBQW1CLEdBQUcscUNBQW9CLENBQUMsR0FBRyxDQUFDLHlDQUFtQixDQUFDLENBQUM7SUE4RWhGLENBQUM7SUE1RUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUF3QjtRQUNyQyxNQUFNLFlBQVksR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUNELElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2hCLFlBQVksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUN4QyxDQUFDO1FBQ0QsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDZixZQUFZLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDdEMsQ0FBQztRQUNELElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2QsWUFBWSxDQUFDLElBQUks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LENBQUMsV0FBVztZQUMvQixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7WUFDbkIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1lBQ3JCLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztZQUNuQixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7WUFDakIsZUFBZSxFQUFFLEtBQUs7U0FDekIsQ0FBQztJQUNOLENBQUM7SUFDRCxLQUFLLENBQUMsMEJBQTBCO1FBQzVCLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDakUsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0NBQ0osQ0FBQTtBQWpGWSxnREFBa0I7NkJBQWxCLGtCQUFrQjtJQUQ5QixJQUFBLHNCQUFVLEdBQUU7R0FDQSxrQkFBa0IsQ0FpRjlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5qZWN0YWJsZSB9IGZyb20gJ2ludmVyc2lmeSc7XG5pbXBvcnQgJ3JlZmxlY3QtbWV0YWRhdGEnO1xuaW1wb3J0IHtERVBFTkRFTkNZX0NPTlRBSU5FUiwgVFlQRVN9IGZyb20gXCJAY29uZmlndXJhdGlvblwiO1xuaW1wb3J0IHtFdmVudG9zUmVwb3NpdG9yeX0gZnJvbSBcIkBkb21haW4vcmVwb3NpdG9yeVwiO1xuaW1wb3J0IHtcbiAgICBFdmVudG9Bc2lzdGVudGVEaWEsXG4gICAgRXZlbnRvQXNpc3RlbnRlcyxcbiAgICBFdmVudG9FbnRpdHksXG4gICAgRXZlbnRvTHVnYXJDZXJjYW5vLFxuICAgIEV2ZW50b1BhdGNoUGFyYW1cbn0gZnJvbSBcIkBkb21haW4vZW50aXRpZXNcIjtcbmltcG9ydCB7TWFwSW5mcmFTZXJ2aWNlfSBmcm9tIFwiQGluZnJhc3RydWN0dXJlL3NlcnZpY2VzL01hcEluZnJhU2VydmljZVwiO1xuaW1wb3J0IHtSZXNlcnZhSW5mcmFTZXJ2aWNlfSBmcm9tIFwiQGluZnJhc3RydWN0dXJlL3NlcnZpY2VzL1Jlc2VydmFJbmZyYVNlcnZpY2VcIjtcblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEV2ZW50b0luZnJhU2VydmljZSB7XG4gICAgcHJpdmF0ZSBldmVudG9zUmVwb3NpdG9yeSA9IERFUEVOREVOQ1lfQ09OVEFJTkVSLmdldDxFdmVudG9zUmVwb3NpdG9yeT4oVFlQRVMuRXZlbnRvc1JlcG9zaXRvcnkpO1xuICAgIHByaXZhdGUgbWFwU2VydmljZSA9IERFUEVOREVOQ1lfQ09OVEFJTkVSLmdldChNYXBJbmZyYVNlcnZpY2UpO1xuICAgIHByaXZhdGUgcmVzZXJ2YUluZnJhU2VydmljZSA9IERFUEVOREVOQ1lfQ09OVEFJTkVSLmdldChSZXNlcnZhSW5mcmFTZXJ2aWNlKTtcblxuICAgIGFzeW5jIGFjdHVhbGl6YXIoZXZlbnRvOiBFdmVudG9QYXRjaFBhcmFtKTpQcm9taXNlPEV2ZW50b0VudGl0eT4ge1xuICAgICAgICBjb25zdCBldmVudG9FbnRpdHkgPSBhd2FpdCB0aGlzLmV2ZW50b3NSZXBvc2l0b3J5LmNvbnN1bHRhclBvcklkKGV2ZW50by5pZCk7XG4gICAgICAgIGlmICghZXZlbnRvRW50aXR5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V2ZW50byBubyBlbmNvbnRyYWRvJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50by5ub21icmUpIHtcbiAgICAgICAgICAgIGV2ZW50b0VudGl0eS5ub21icmUgPSBldmVudG8ubm9tYnJlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudG8uZmVjaGEpIHtcbiAgICAgICAgICAgIGV2ZW50b0VudGl0eS5mZWNoYSA9IGV2ZW50by5mZWNoYTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnRvLmhvcmEpIHtcbiAgICAgICAgICAgIGV2ZW50b0VudGl0eS5ob3JhID0gZXZlbnRvLmhvcmE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50by5jYXBhY2lkYWQpIHtcbiAgICAgICAgICAgIGV2ZW50b0VudGl0eS5jYXBhY2lkYWQgPSBldmVudG8uY2FwYWNpZGFkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudG8udmFsb3IpIHtcbiAgICAgICAgICAgIGV2ZW50b0VudGl0eS52YWxvciA9IGV2ZW50by52YWxvcjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpZEV2ZW50byA9IGF3YWl0IHRoaXMuZXZlbnRvc1JlcG9zaXRvcnkuYWN0dWFsaXphcihldmVudG9FbnRpdHkpO1xuICAgICAgICBpZiAoaWRFdmVudG8pIHtcbiAgICAgICAgICAgIHJldHVybiBldmVudG9FbnRpdHk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciBhbCBhY3R1YWxpemFyIGVsIGV2ZW50bycpO1xuICAgIH1cbiAgICBhc3luYyBjb25zdWx0YXIoaWQ6IG51bWJlcik6UHJvbWlzZTxFdmVudG9FbnRpdHk+IHtcbiAgICAgICAgY29uc3QgZXZlbnRvID0gYXdhaXQgdGhpcy5ldmVudG9zUmVwb3NpdG9yeS5jb25zdWx0YXJQb3JJZChpZCk7XG4gICAgICAgIGlmIChldmVudG8pIHtcbiAgICAgICAgICAgIHJldHVybiBldmVudG87XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFdmVudG8gbm8gZW5jb250cmFkbycpO1xuICAgIH1cbiAgICBhc3luYyBlbGltaW5hcihpZDogbnVtYmVyKTpQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuICEhKGF3YWl0IHRoaXMuZXZlbnRvc1JlcG9zaXRvcnkuZWxpbWluYXIoaWQpKTtcbiAgICB9XG4gICAgYXN5bmMgZ3VhcmRhcihldmVudG86IEV2ZW50b0VudGl0eSk6UHJvbWlzZTxudW1iZXI+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2d1YXJkYXInLCBldmVudG8pO1xuICAgICAgICBldmVudG8udWJpY2FjaW9uID0gYXdhaXQgdGhpcy5tYXBTZXJ2aWNlLmNvbnN1bHRhclViaWNhY2lvbihldmVudG8ubHVnYXIsIGV2ZW50by5jaXVkYWQpO1xuICAgICAgICBjb25zdCBpZEV2ZW50byA9IGF3YWl0IHRoaXMuZXZlbnRvc1JlcG9zaXRvcnkuZ3VhcmRhcihldmVudG8pO1xuICAgICAgICBpZiAoaWRFdmVudG8gPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gaWRFdmVudG87XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciBhbCBndWFyZGFyIGVsIGV2ZW50bycpO1xuICAgIH1cbiAgICBhc3luYyBjb25zdWx0YXJFdmVudG9zQ2VyY2Fub3MobGF0OiBudW1iZXIsIGxuZzogbnVtYmVyLCBkaXN0YW5jaWE6IG51bWJlcik6IFByb21pc2U8RXZlbnRvTHVnYXJDZXJjYW5vW10+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmV2ZW50b3NSZXBvc2l0b3J5LmV2ZW50b3NDZXJjYW5vcyhsYXQsIGxuZywgZGlzdGFuY2lhICogMTAwMCk7XG4gICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVWJpY2FjacOzbiBubyBlbmNvbnRyYWRhJyk7XG4gICAgfVxuICAgIGFzeW5jIGNvbnN1bHRhckFzaXN0ZW50ZXMoaWQ6IG51bWJlcik6IFByb21pc2U8RXZlbnRvQXNpc3RlbnRlcz4ge1xuICAgICAgICBjb25zdCBldmVudG8gPSBhd2FpdCB0aGlzLmV2ZW50b3NSZXBvc2l0b3J5LmNvbnN1bHRhclBvcklkKGlkKTtcbiAgICAgICAgaWYgKCFldmVudG8pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXZlbnRvIG5vIGVuY29udHJhZG8nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0b3RhbCA9IGF3YWl0IHRoaXMucmVzZXJ2YUluZnJhU2VydmljZS50b3RhbEFzaXN0ZW50ZXMoaWQpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IChldmVudG8uaWQgPyBldmVudG8uaWQgOiAwKSxcbiAgICAgICAgICAgIG5vbWJyZTogZXZlbnRvLm5vbWJyZSxcbiAgICAgICAgICAgIGRlc2NyaXBjaW9uOiBldmVudG8uZGVzY3JpcGNpb24sXG4gICAgICAgICAgICBsdWdhcjogZXZlbnRvLmx1Z2FyLFxuICAgICAgICAgICAgY2l1ZGFkOiBldmVudG8uY2l1ZGFkLFxuICAgICAgICAgICAgZmVjaGE6IGV2ZW50by5mZWNoYSxcbiAgICAgICAgICAgIGhvcmE6IGV2ZW50by5ob3JhLFxuICAgICAgICAgICAgdG90YWxBc2lzdGVudGVzOiB0b3RhbFxuICAgICAgICB9O1xuICAgIH1cbiAgICBhc3luYyBjb25zdWx0YXJBc2lzdGVudGVzRXZlbnRvcygpOiBQcm9taXNlPEV2ZW50b0FzaXN0ZW50ZURpYVtdPiB7XG4gICAgICAgIGNvbnN0IGV2ZW50b3MgPSBhd2FpdCB0aGlzLmV2ZW50b3NSZXBvc2l0b3J5LnRvdGFsQXNpc3RlbnRlRGlhKCk7XG4gICAgICAgIGlmIChldmVudG9zID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIGFsIGNvbnN1bHRhciBhc2lzdGVudGVzJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV2ZW50b3M7XG4gICAgfVxufVxuIl19