"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsistenteInfraService = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const _configuration_1 = require("@configuration");
const MapInfraService_1 = require("@infrastructure/services/MapInfraService");
let AsistenteInfraService = class AsistenteInfraService {
    constructor() {
        this.asistentesRepository = _configuration_1.DEPENDENCY_CONTAINER.get(_configuration_1.TYPES.AsistentesRepository);
        this.mapService = _configuration_1.DEPENDENCY_CONTAINER.get(MapInfraService_1.MapInfraService);
    }
    async actualizar(asistente) {
        const asistenteEntity = await this.asistentesRepository.consultarPorIdentificacion(asistente.identificacion);
        if (!asistenteEntity) {
            throw new Error('Asistente no encontrado');
        }
        if (asistente.nombre) {
            asistenteEntity.nombre = asistente.nombre;
        }
        if (asistente.direccion) {
            asistenteEntity.direccion = asistente.direccion;
            asistenteEntity.ubicacion = await this.mapService.consultarUbicacion(asistente.direccion, asistenteEntity.ciudad);
        }
        if (asistente.telefono) {
            asistenteEntity.telefono = asistente.telefono;
        }
        if (asistente.correo) {
            asistenteEntity.correo = asistente.correo;
        }
        if (asistente.categorias) {
            asistenteEntity.categorias = asistente.categorias;
        }
        const idAsistente = await this.asistentesRepository.actualizar(asistenteEntity);
        if (idAsistente) {
            return asistenteEntity;
        }
        throw new Error('Error al actualizar el asistente');
    }
    async consultarPorId(id) {
        const asistente = await this.asistentesRepository.consultarPorId(id);
        if (asistente) {
            return asistente;
        }
        throw new Error('Asistente no encontrado');
    }
    async consultar(identificacion) {
        const asistente = await this.asistentesRepository.consultarPorIdentificacion(identificacion);
        if (asistente) {
            return asistente;
        }
        throw new Error('Asistente no encontrado');
    }
    async eliminar(identificacion) {
        return !!(await this.asistentesRepository.eliminar(identificacion));
    }
    async guardar(asistente) {
        asistente.ubicacion = await this.mapService.consultarUbicacion(asistente.direccion, asistente.ciudad);
        const idAsistente = await this.asistentesRepository.guardar(asistente);
        if (idAsistente > 0) {
            return idAsistente;
        }
        throw new Error('Error al guardar el asistente');
    }
};
exports.AsistenteInfraService = AsistenteInfraService;
exports.AsistenteInfraService = AsistenteInfraService = __decorate([
    (0, inversify_1.injectable)()
], AsistenteInfraService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXNpc3RlbnRlSW5mcmFTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL3NlcnZpY2VzL0FzaXN0ZW50ZUluZnJhU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx5Q0FBdUM7QUFDdkMsNEJBQTBCO0FBQzFCLG1EQUEyRDtBQUczRCw4RUFBeUU7QUFHbEUsSUFBTSxxQkFBcUIsR0FBM0IsTUFBTSxxQkFBcUI7SUFBM0I7UUFDSyx5QkFBb0IsR0FBRyxxQ0FBb0IsQ0FBQyxHQUFHLENBQXVCLHNCQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNsRyxlQUFVLEdBQUcscUNBQW9CLENBQUMsR0FBRyxDQUFDLGlDQUFlLENBQUMsQ0FBQztJQTBEbkUsQ0FBQztJQXhERyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQThCO1FBQzNDLE1BQU0sZUFBZSxHQUFHLE1BQU0sSUFBSSxDQUFDLG9CQUFvQixDQUFDLDBCQUEwQixDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM3RyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFDRCxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixlQUFlLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFDOUMsQ0FBQztRQUNELElBQUksU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3RCLGVBQWUsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQztZQUNoRCxlQUFlLENBQUMsU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0SCxDQUFDO1FBQ0QsSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDckIsZUFBZSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDO1FBQ2xELENBQUM7UUFDRCxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixlQUFlLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFDOUMsQ0FBQztRQUNELElBQUksU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3ZCLGVBQWUsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQztRQUN0RCxDQUFDO1FBQ0QsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2hGLElBQUksV0FBVyxFQUFFLENBQUM7WUFDZCxPQUFPLGVBQWUsQ0FBQztRQUMzQixDQUFDO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxLQUFLLENBQUMsY0FBYyxDQUFDLEVBQVU7UUFDM0IsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksU0FBUyxFQUFFLENBQUM7WUFDWixPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxLQUFLLENBQUMsU0FBUyxDQUFDLGNBQXNCO1FBQ2xDLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLG9CQUFvQixDQUFDLDBCQUEwQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzdGLElBQUksU0FBUyxFQUFFLENBQUM7WUFDWixPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxLQUFLLENBQUMsUUFBUSxDQUFDLGNBQXNCO1FBQ2pDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBMEI7UUFDcEMsU0FBUyxDQUFDLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEcsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksV0FBVyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ2xCLE9BQU8sV0FBVyxDQUFDO1FBQ3ZCLENBQUM7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7SUFDckQsQ0FBQztDQUNKLENBQUE7QUE1RFksc0RBQXFCO2dDQUFyQixxQkFBcUI7SUFEakMsSUFBQSxzQkFBVSxHQUFFO0dBQ0EscUJBQXFCLENBNERqQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluamVjdGFibGUgfSBmcm9tICdpbnZlcnNpZnknO1xuaW1wb3J0ICdyZWZsZWN0LW1ldGFkYXRhJztcbmltcG9ydCB7REVQRU5ERU5DWV9DT05UQUlORVIsIFRZUEVTfSBmcm9tIFwiQGNvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCB7QXNpc3RlbnRlc1JlcG9zaXRvcnl9IGZyb20gXCJAZG9tYWluL3JlcG9zaXRvcnlcIjsgLy8gQXNlZ8O6cmF0ZSBkZSB0ZW5lciBlc3RlIHJlcG9zaXRvcmlvXG5pbXBvcnQge0FzaXN0ZW50ZUVudGl0eSwgQXNpc3RlbnRlUGF0Y2hQYXJhbX0gZnJvbSBcIkBkb21haW4vZW50aXRpZXNcIjtcbmltcG9ydCB7TWFwSW5mcmFTZXJ2aWNlfSBmcm9tIFwiQGluZnJhc3RydWN0dXJlL3NlcnZpY2VzL01hcEluZnJhU2VydmljZVwiOyAvLyBBc2Vnw7pyYXRlIGRlIHRlbmVyIGVzdGFzIGVudGlkYWRlc1xuXG5AaW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXNpc3RlbnRlSW5mcmFTZXJ2aWNlIHtcbiAgICBwcml2YXRlIGFzaXN0ZW50ZXNSZXBvc2l0b3J5ID0gREVQRU5ERU5DWV9DT05UQUlORVIuZ2V0PEFzaXN0ZW50ZXNSZXBvc2l0b3J5PihUWVBFUy5Bc2lzdGVudGVzUmVwb3NpdG9yeSk7XG4gICAgcHJpdmF0ZSBtYXBTZXJ2aWNlID0gREVQRU5ERU5DWV9DT05UQUlORVIuZ2V0KE1hcEluZnJhU2VydmljZSk7XG5cbiAgICBhc3luYyBhY3R1YWxpemFyKGFzaXN0ZW50ZTogQXNpc3RlbnRlUGF0Y2hQYXJhbSk6UHJvbWlzZTxBc2lzdGVudGVFbnRpdHk+IHtcbiAgICAgICAgY29uc3QgYXNpc3RlbnRlRW50aXR5ID0gYXdhaXQgdGhpcy5hc2lzdGVudGVzUmVwb3NpdG9yeS5jb25zdWx0YXJQb3JJZGVudGlmaWNhY2lvbihhc2lzdGVudGUuaWRlbnRpZmljYWNpb24pO1xuICAgICAgICBpZiAoIWFzaXN0ZW50ZUVudGl0eSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBc2lzdGVudGUgbm8gZW5jb250cmFkbycpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhc2lzdGVudGUubm9tYnJlKSB7XG4gICAgICAgICAgICBhc2lzdGVudGVFbnRpdHkubm9tYnJlID0gYXNpc3RlbnRlLm5vbWJyZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXNpc3RlbnRlLmRpcmVjY2lvbikge1xuICAgICAgICAgICAgYXNpc3RlbnRlRW50aXR5LmRpcmVjY2lvbiA9IGFzaXN0ZW50ZS5kaXJlY2Npb247XG4gICAgICAgICAgICBhc2lzdGVudGVFbnRpdHkudWJpY2FjaW9uID0gYXdhaXQgdGhpcy5tYXBTZXJ2aWNlLmNvbnN1bHRhclViaWNhY2lvbihhc2lzdGVudGUuZGlyZWNjaW9uLCBhc2lzdGVudGVFbnRpdHkuY2l1ZGFkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXNpc3RlbnRlLnRlbGVmb25vKSB7XG4gICAgICAgICAgICBhc2lzdGVudGVFbnRpdHkudGVsZWZvbm8gPSBhc2lzdGVudGUudGVsZWZvbm87XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFzaXN0ZW50ZS5jb3JyZW8pIHtcbiAgICAgICAgICAgIGFzaXN0ZW50ZUVudGl0eS5jb3JyZW8gPSBhc2lzdGVudGUuY29ycmVvO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhc2lzdGVudGUuY2F0ZWdvcmlhcykge1xuICAgICAgICAgICAgYXNpc3RlbnRlRW50aXR5LmNhdGVnb3JpYXMgPSBhc2lzdGVudGUuY2F0ZWdvcmlhcztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpZEFzaXN0ZW50ZSA9IGF3YWl0IHRoaXMuYXNpc3RlbnRlc1JlcG9zaXRvcnkuYWN0dWFsaXphcihhc2lzdGVudGVFbnRpdHkpO1xuICAgICAgICBpZiAoaWRBc2lzdGVudGUpIHtcbiAgICAgICAgICAgIHJldHVybiBhc2lzdGVudGVFbnRpdHk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciBhbCBhY3R1YWxpemFyIGVsIGFzaXN0ZW50ZScpO1xuICAgIH1cblxuICAgIGFzeW5jIGNvbnN1bHRhclBvcklkKGlkOiBudW1iZXIpOlByb21pc2U8QXNpc3RlbnRlRW50aXR5PiB7XG4gICAgICAgIGNvbnN0IGFzaXN0ZW50ZSA9IGF3YWl0IHRoaXMuYXNpc3RlbnRlc1JlcG9zaXRvcnkuY29uc3VsdGFyUG9ySWQoaWQpO1xuICAgICAgICBpZiAoYXNpc3RlbnRlKSB7XG4gICAgICAgICAgICByZXR1cm4gYXNpc3RlbnRlO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQXNpc3RlbnRlIG5vIGVuY29udHJhZG8nKTtcbiAgICB9XG5cbiAgICBhc3luYyBjb25zdWx0YXIoaWRlbnRpZmljYWNpb246IHN0cmluZyk6UHJvbWlzZTxBc2lzdGVudGVFbnRpdHk+IHtcbiAgICAgICAgY29uc3QgYXNpc3RlbnRlID0gYXdhaXQgdGhpcy5hc2lzdGVudGVzUmVwb3NpdG9yeS5jb25zdWx0YXJQb3JJZGVudGlmaWNhY2lvbihpZGVudGlmaWNhY2lvbik7XG4gICAgICAgIGlmIChhc2lzdGVudGUpIHtcbiAgICAgICAgICAgIHJldHVybiBhc2lzdGVudGU7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBc2lzdGVudGUgbm8gZW5jb250cmFkbycpO1xuICAgIH1cblxuICAgIGFzeW5jIGVsaW1pbmFyKGlkZW50aWZpY2FjaW9uOiBzdHJpbmcpOlByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gISEoYXdhaXQgdGhpcy5hc2lzdGVudGVzUmVwb3NpdG9yeS5lbGltaW5hcihpZGVudGlmaWNhY2lvbikpO1xuICAgIH1cblxuICAgIGFzeW5jIGd1YXJkYXIoYXNpc3RlbnRlOiBBc2lzdGVudGVFbnRpdHkpOlByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIGFzaXN0ZW50ZS51YmljYWNpb24gPSBhd2FpdCB0aGlzLm1hcFNlcnZpY2UuY29uc3VsdGFyVWJpY2FjaW9uKGFzaXN0ZW50ZS5kaXJlY2Npb24sIGFzaXN0ZW50ZS5jaXVkYWQpO1xuICAgICAgICBjb25zdCBpZEFzaXN0ZW50ZSA9IGF3YWl0IHRoaXMuYXNpc3RlbnRlc1JlcG9zaXRvcnkuZ3VhcmRhcihhc2lzdGVudGUpO1xuICAgICAgICBpZiAoaWRBc2lzdGVudGUgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gaWRBc2lzdGVudGU7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciBhbCBndWFyZGFyIGVsIGFzaXN0ZW50ZScpO1xuICAgIH1cbn1cbiJdfQ==