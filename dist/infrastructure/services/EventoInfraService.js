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
};
exports.EventoInfraService = EventoInfraService;
exports.EventoInfraService = EventoInfraService = __decorate([
    (0, inversify_1.injectable)()
], EventoInfraService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRvSW5mcmFTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL3NlcnZpY2VzL0V2ZW50b0luZnJhU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx5Q0FBdUM7QUFDdkMsNEJBQTBCO0FBQzFCLG1EQUEyRDtBQUczRCw4RUFBeUU7QUFDekUsc0ZBQWlGO0FBRzFFLElBQU0sa0JBQWtCLEdBQXhCLE1BQU0sa0JBQWtCO0lBQXhCO1FBQ0ssc0JBQWlCLEdBQUcscUNBQW9CLENBQUMsR0FBRyxDQUFvQixzQkFBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDekYsZUFBVSxHQUFHLHFDQUFvQixDQUFDLEdBQUcsQ0FBQyxpQ0FBZSxDQUFDLENBQUM7UUFDdkQsd0JBQW1CLEdBQUcscUNBQW9CLENBQUMsR0FBRyxDQUFDLHlDQUFtQixDQUFDLENBQUM7SUF1RWhGLENBQUM7SUFyRUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUF3QjtRQUNyQyxNQUFNLFlBQVksR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUNELElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2hCLFlBQVksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUN4QyxDQUFDO1FBQ0QsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDZixZQUFZLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDdEMsQ0FBQztRQUNELElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2QsWUFBWSxDQUFDLElBQUks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LENBQUMsV0FBVztZQUMvQixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7WUFDbkIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1lBQ3JCLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztZQUNuQixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7WUFDakIsZUFBZSxFQUFFLEtBQUs7U0FDekIsQ0FBQztJQUNOLENBQUM7Q0FDSixDQUFBO0FBMUVZLGdEQUFrQjs2QkFBbEIsa0JBQWtCO0lBRDlCLElBQUEsc0JBQVUsR0FBRTtHQUNBLGtCQUFrQixDQTBFOUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbmplY3RhYmxlIH0gZnJvbSAnaW52ZXJzaWZ5JztcbmltcG9ydCAncmVmbGVjdC1tZXRhZGF0YSc7XG5pbXBvcnQge0RFUEVOREVOQ1lfQ09OVEFJTkVSLCBUWVBFU30gZnJvbSBcIkBjb25maWd1cmF0aW9uXCI7XG5pbXBvcnQge0V2ZW50b3NSZXBvc2l0b3J5fSBmcm9tIFwiQGRvbWFpbi9yZXBvc2l0b3J5XCI7XG5pbXBvcnQge0V2ZW50b0FzaXN0ZW50ZXMsIEV2ZW50b0VudGl0eSwgRXZlbnRvTHVnYXJDZXJjYW5vLCBFdmVudG9QYXRjaFBhcmFtfSBmcm9tIFwiQGRvbWFpbi9lbnRpdGllc1wiO1xuaW1wb3J0IHtNYXBJbmZyYVNlcnZpY2V9IGZyb20gXCJAaW5mcmFzdHJ1Y3R1cmUvc2VydmljZXMvTWFwSW5mcmFTZXJ2aWNlXCI7XG5pbXBvcnQge1Jlc2VydmFJbmZyYVNlcnZpY2V9IGZyb20gXCJAaW5mcmFzdHJ1Y3R1cmUvc2VydmljZXMvUmVzZXJ2YUluZnJhU2VydmljZVwiO1xuXG5AaW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRXZlbnRvSW5mcmFTZXJ2aWNlIHtcbiAgICBwcml2YXRlIGV2ZW50b3NSZXBvc2l0b3J5ID0gREVQRU5ERU5DWV9DT05UQUlORVIuZ2V0PEV2ZW50b3NSZXBvc2l0b3J5PihUWVBFUy5FdmVudG9zUmVwb3NpdG9yeSk7XG4gICAgcHJpdmF0ZSBtYXBTZXJ2aWNlID0gREVQRU5ERU5DWV9DT05UQUlORVIuZ2V0KE1hcEluZnJhU2VydmljZSk7XG4gICAgcHJpdmF0ZSByZXNlcnZhSW5mcmFTZXJ2aWNlID0gREVQRU5ERU5DWV9DT05UQUlORVIuZ2V0KFJlc2VydmFJbmZyYVNlcnZpY2UpO1xuXG4gICAgYXN5bmMgYWN0dWFsaXphcihldmVudG86IEV2ZW50b1BhdGNoUGFyYW0pOlByb21pc2U8RXZlbnRvRW50aXR5PiB7XG4gICAgICAgIGNvbnN0IGV2ZW50b0VudGl0eSA9IGF3YWl0IHRoaXMuZXZlbnRvc1JlcG9zaXRvcnkuY29uc3VsdGFyUG9ySWQoZXZlbnRvLmlkKTtcbiAgICAgICAgaWYgKCFldmVudG9FbnRpdHkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXZlbnRvIG5vIGVuY29udHJhZG8nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnRvLm5vbWJyZSkge1xuICAgICAgICAgICAgZXZlbnRvRW50aXR5Lm5vbWJyZSA9IGV2ZW50by5ub21icmU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50by5mZWNoYSkge1xuICAgICAgICAgICAgZXZlbnRvRW50aXR5LmZlY2hhID0gZXZlbnRvLmZlY2hhO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudG8uaG9yYSkge1xuICAgICAgICAgICAgZXZlbnRvRW50aXR5LmhvcmEgPSBldmVudG8uaG9yYTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnRvLmNhcGFjaWRhZCkge1xuICAgICAgICAgICAgZXZlbnRvRW50aXR5LmNhcGFjaWRhZCA9IGV2ZW50by5jYXBhY2lkYWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50by52YWxvcikge1xuICAgICAgICAgICAgZXZlbnRvRW50aXR5LnZhbG9yID0gZXZlbnRvLnZhbG9yO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGlkRXZlbnRvID0gYXdhaXQgdGhpcy5ldmVudG9zUmVwb3NpdG9yeS5hY3R1YWxpemFyKGV2ZW50b0VudGl0eSk7XG4gICAgICAgIGlmIChpZEV2ZW50bykge1xuICAgICAgICAgICAgcmV0dXJuIGV2ZW50b0VudGl0eTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIGFsIGFjdHVhbGl6YXIgZWwgZXZlbnRvJyk7XG4gICAgfVxuICAgIGFzeW5jIGNvbnN1bHRhcihpZDogbnVtYmVyKTpQcm9taXNlPEV2ZW50b0VudGl0eT4ge1xuICAgICAgICBjb25zdCBldmVudG8gPSBhd2FpdCB0aGlzLmV2ZW50b3NSZXBvc2l0b3J5LmNvbnN1bHRhclBvcklkKGlkKTtcbiAgICAgICAgaWYgKGV2ZW50bykge1xuICAgICAgICAgICAgcmV0dXJuIGV2ZW50bztcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V2ZW50byBubyBlbmNvbnRyYWRvJyk7XG4gICAgfVxuICAgIGFzeW5jIGVsaW1pbmFyKGlkOiBudW1iZXIpOlByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gISEoYXdhaXQgdGhpcy5ldmVudG9zUmVwb3NpdG9yeS5lbGltaW5hcihpZCkpO1xuICAgIH1cbiAgICBhc3luYyBndWFyZGFyKGV2ZW50bzogRXZlbnRvRW50aXR5KTpQcm9taXNlPG51bWJlcj4ge1xuICAgICAgICBjb25zb2xlLmxvZygnZ3VhcmRhcicsIGV2ZW50byk7XG4gICAgICAgIGV2ZW50by51YmljYWNpb24gPSBhd2FpdCB0aGlzLm1hcFNlcnZpY2UuY29uc3VsdGFyVWJpY2FjaW9uKGV2ZW50by5sdWdhciwgZXZlbnRvLmNpdWRhZCk7XG4gICAgICAgIGNvbnN0IGlkRXZlbnRvID0gYXdhaXQgdGhpcy5ldmVudG9zUmVwb3NpdG9yeS5ndWFyZGFyKGV2ZW50byk7XG4gICAgICAgIGlmIChpZEV2ZW50byA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBpZEV2ZW50bztcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIGFsIGd1YXJkYXIgZWwgZXZlbnRvJyk7XG4gICAgfVxuICAgIGFzeW5jIGNvbnN1bHRhckV2ZW50b3NDZXJjYW5vcyhsYXQ6IG51bWJlciwgbG5nOiBudW1iZXIsIGRpc3RhbmNpYTogbnVtYmVyKTogUHJvbWlzZTxFdmVudG9MdWdhckNlcmNhbm9bXT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuZXZlbnRvc1JlcG9zaXRvcnkuZXZlbnRvc0NlcmNhbm9zKGxhdCwgbG5nLCBkaXN0YW5jaWEgKiAxMDAwKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVYmljYWNpw7NuIG5vIGVuY29udHJhZGEnKTtcbiAgICB9XG4gICAgYXN5bmMgY29uc3VsdGFyQXNpc3RlbnRlcyhpZDogbnVtYmVyKTogUHJvbWlzZTxFdmVudG9Bc2lzdGVudGVzPiB7XG4gICAgICAgIGNvbnN0IGV2ZW50byA9IGF3YWl0IHRoaXMuZXZlbnRvc1JlcG9zaXRvcnkuY29uc3VsdGFyUG9ySWQoaWQpO1xuICAgICAgICBpZiAoIWV2ZW50bykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFdmVudG8gbm8gZW5jb250cmFkbycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRvdGFsID0gYXdhaXQgdGhpcy5yZXNlcnZhSW5mcmFTZXJ2aWNlLnRvdGFsQXNpc3RlbnRlcyhpZCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogKGV2ZW50by5pZCA/IGV2ZW50by5pZCA6IDApLFxuICAgICAgICAgICAgbm9tYnJlOiBldmVudG8ubm9tYnJlLFxuICAgICAgICAgICAgZGVzY3JpcGNpb246IGV2ZW50by5kZXNjcmlwY2lvbixcbiAgICAgICAgICAgIGx1Z2FyOiBldmVudG8ubHVnYXIsXG4gICAgICAgICAgICBjaXVkYWQ6IGV2ZW50by5jaXVkYWQsXG4gICAgICAgICAgICBmZWNoYTogZXZlbnRvLmZlY2hhLFxuICAgICAgICAgICAgaG9yYTogZXZlbnRvLmhvcmEsXG4gICAgICAgICAgICB0b3RhbEFzaXN0ZW50ZXM6IHRvdGFsXG4gICAgICAgIH07XG4gICAgfVxufVxuIl19