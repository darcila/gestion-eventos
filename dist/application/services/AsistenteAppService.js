"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsistenteAppService = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const response_1 = require("@domain/response");
const entities_1 = require("@domain/entities");
const _configuration_1 = require("@configuration");
const services_1 = require("@infrastructure/services");
const services_2 = require("@domain/services");
let AsistenteAppService = class AsistenteAppService {
    constructor() {
        this.asistenteInfraService = _configuration_1.DEPENDENCY_CONTAINER.get(services_1.AsistenteInfraService);
    }
    async getAsistente(identificacion) {
        const result = await this.asistenteInfraService.consultar(identificacion);
        return response_1.Result.ok(result);
    }
    async postAsistente(asistente) {
        const asistenteEntity = entities_1.AsistenteEntity.create(asistente.identificacion, asistente.nombre, asistente.direccion, asistente.telefono, (0, services_2.validarCorreo)(asistente.correo), asistente.categorias, asistente.ciudad);
        asistenteEntity.id = await this.asistenteInfraService.guardar(asistenteEntity);
        return response_1.Result.ok(asistenteEntity);
    }
    async patchAsistente(asistente) {
        this.prevalidarCamposAsistente(asistente);
        const asistenteEntity = await this.asistenteInfraService.actualizar(asistente);
        return response_1.Result.ok(asistenteEntity);
    }
    async deleteAsistente(identificacion) {
        const estado = await this.asistenteInfraService.eliminar(identificacion);
        if (estado) {
            return response_1.Result.ok({ mensaje: 'Asistente eliminado', identificacion });
        }
        return response_1.Result.ok({ mensaje: 'Asistente no eliminado', identificacion });
    }
    prevalidarCamposAsistente(asistente) {
        if (!asistente.nombre && !asistente.direccion && !asistente.telefono && !asistente.correo && !asistente.categorias) {
            throw new Error('Debes enviar al menos un campo a actualizar');
        }
    }
};
exports.AsistenteAppService = AsistenteAppService;
exports.AsistenteAppService = AsistenteAppService = __decorate([
    (0, inversify_1.injectable)()
], AsistenteAppService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXNpc3RlbnRlQXBwU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHBsaWNhdGlvbi9zZXJ2aWNlcy9Bc2lzdGVudGVBcHBTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHlDQUF1QztBQUN2Qyw0QkFBMEI7QUFDMUIsK0NBQW9EO0FBQ3BELCtDQUF1SDtBQUN2SCxtREFBc0Q7QUFDdEQsdURBQWlFO0FBQ2pFLCtDQUErQztBQUd4QyxJQUFNLG1CQUFtQixHQUF6QixNQUFNLG1CQUFtQjtJQUF6QjtRQUNLLDBCQUFxQixHQUFHLHFDQUFvQixDQUFDLEdBQUcsQ0FBQyxnQ0FBcUIsQ0FBQyxDQUFDO0lBbUNwRixDQUFDO0lBakNHLEtBQUssQ0FBQyxZQUFZLENBQUMsY0FBc0I7UUFDckMsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzFFLE9BQU8saUJBQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBNkI7UUFDN0MsTUFBTSxlQUFlLEdBQUcsMEJBQWUsQ0FBQyxNQUFNLENBQzFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQ25GLElBQUEsd0JBQWEsRUFBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBUyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsTUFBTSxDQUMxRSxDQUFDO1FBQ0YsZUFBZSxDQUFDLEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDL0UsT0FBTyxpQkFBTSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxTQUE4QjtRQUMvQyxJQUFJLENBQUMseUJBQXlCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsTUFBTSxlQUFlLEdBQUcsTUFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9FLE9BQU8saUJBQU0sQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELEtBQUssQ0FBQyxlQUFlLENBQUMsY0FBc0I7UUFDeEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3pFLElBQUksTUFBTSxFQUFFLENBQUM7WUFDVCxPQUFPLGlCQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7UUFDekUsQ0FBQztRQUNELE9BQU8saUJBQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRU8seUJBQXlCLENBQUMsU0FBOEI7UUFDNUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDakgsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1FBQ25FLENBQUM7SUFDTCxDQUFDO0NBQ0osQ0FBQTtBQXBDWSxrREFBbUI7OEJBQW5CLG1CQUFtQjtJQUQvQixJQUFBLHNCQUFVLEdBQUU7R0FDQSxtQkFBbUIsQ0FvQy9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5qZWN0YWJsZSB9IGZyb20gJ2ludmVyc2lmeSc7XG5pbXBvcnQgJ3JlZmxlY3QtbWV0YWRhdGEnO1xuaW1wb3J0IHsgUmVzdWx0LCBSZXNwb25zZSB9IGZyb20gJ0Bkb21haW4vcmVzcG9uc2UnO1xuaW1wb3J0IHsgQXNpc3RlbnRlRW50aXR5LCBBc2lzdGVudGVQYXRjaFBhcmFtLCBBc2lzdGVudGVQb3N0UGFyYW0sIEFzaXN0ZW50ZVJlc3B1ZXN0YU1lbnNhamUgfSBmcm9tIFwiQGRvbWFpbi9lbnRpdGllc1wiO1xuaW1wb3J0IHsgREVQRU5ERU5DWV9DT05UQUlORVIgfSBmcm9tIFwiQGNvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCB7IEFzaXN0ZW50ZUluZnJhU2VydmljZSB9IGZyb20gXCJAaW5mcmFzdHJ1Y3R1cmUvc2VydmljZXNcIjtcbmltcG9ydCB7dmFsaWRhckNvcnJlb30gZnJvbSBcIkBkb21haW4vc2VydmljZXNcIjtcblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFzaXN0ZW50ZUFwcFNlcnZpY2Uge1xuICAgIHByaXZhdGUgYXNpc3RlbnRlSW5mcmFTZXJ2aWNlID0gREVQRU5ERU5DWV9DT05UQUlORVIuZ2V0KEFzaXN0ZW50ZUluZnJhU2VydmljZSk7XG5cbiAgICBhc3luYyBnZXRBc2lzdGVudGUoaWRlbnRpZmljYWNpb246IHN0cmluZyk6IFByb21pc2U8UmVzcG9uc2U8QXNpc3RlbnRlRW50aXR5IHwgbnVsbD4+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5hc2lzdGVudGVJbmZyYVNlcnZpY2UuY29uc3VsdGFyKGlkZW50aWZpY2FjaW9uKTtcbiAgICAgICAgcmV0dXJuIFJlc3VsdC5vayhyZXN1bHQpO1xuICAgIH1cblxuICAgIGFzeW5jIHBvc3RBc2lzdGVudGUoYXNpc3RlbnRlOiBBc2lzdGVudGVQb3N0UGFyYW0pOiBQcm9taXNlPFJlc3BvbnNlPEFzaXN0ZW50ZUVudGl0eSB8IG51bGw+PiB7XG4gICAgICAgIGNvbnN0IGFzaXN0ZW50ZUVudGl0eSA9IEFzaXN0ZW50ZUVudGl0eS5jcmVhdGUoXG4gICAgICAgICAgICBhc2lzdGVudGUuaWRlbnRpZmljYWNpb24sIGFzaXN0ZW50ZS5ub21icmUsIGFzaXN0ZW50ZS5kaXJlY2Npb24sIGFzaXN0ZW50ZS50ZWxlZm9ubyxcbiAgICAgICAgICAgIHZhbGlkYXJDb3JyZW8oYXNpc3RlbnRlLmNvcnJlbyksIGFzaXN0ZW50ZS5jYXRlZ29yaWFzLCBhc2lzdGVudGUuY2l1ZGFkXG4gICAgICAgICk7XG4gICAgICAgIGFzaXN0ZW50ZUVudGl0eS5pZCA9IGF3YWl0IHRoaXMuYXNpc3RlbnRlSW5mcmFTZXJ2aWNlLmd1YXJkYXIoYXNpc3RlbnRlRW50aXR5KTtcbiAgICAgICAgcmV0dXJuIFJlc3VsdC5vayhhc2lzdGVudGVFbnRpdHkpO1xuICAgIH1cblxuICAgIGFzeW5jIHBhdGNoQXNpc3RlbnRlKGFzaXN0ZW50ZTogQXNpc3RlbnRlUGF0Y2hQYXJhbSk6IFByb21pc2U8UmVzcG9uc2U8QXNpc3RlbnRlRW50aXR5IHwgbnVsbD4+IHtcbiAgICAgICAgdGhpcy5wcmV2YWxpZGFyQ2FtcG9zQXNpc3RlbnRlKGFzaXN0ZW50ZSk7XG4gICAgICAgIGNvbnN0IGFzaXN0ZW50ZUVudGl0eSA9IGF3YWl0IHRoaXMuYXNpc3RlbnRlSW5mcmFTZXJ2aWNlLmFjdHVhbGl6YXIoYXNpc3RlbnRlKTtcbiAgICAgICAgcmV0dXJuIFJlc3VsdC5vayhhc2lzdGVudGVFbnRpdHkpO1xuICAgIH1cblxuICAgIGFzeW5jIGRlbGV0ZUFzaXN0ZW50ZShpZGVudGlmaWNhY2lvbjogc3RyaW5nKTogUHJvbWlzZTxSZXNwb25zZTxBc2lzdGVudGVSZXNwdWVzdGFNZW5zYWplIHwgbnVsbD4+IHtcbiAgICAgICAgY29uc3QgZXN0YWRvID0gYXdhaXQgdGhpcy5hc2lzdGVudGVJbmZyYVNlcnZpY2UuZWxpbWluYXIoaWRlbnRpZmljYWNpb24pO1xuICAgICAgICBpZiAoZXN0YWRvKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVzdWx0Lm9rKHsgbWVuc2FqZTogJ0FzaXN0ZW50ZSBlbGltaW5hZG8nLCBpZGVudGlmaWNhY2lvbiB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUmVzdWx0Lm9rKHsgbWVuc2FqZTogJ0FzaXN0ZW50ZSBubyBlbGltaW5hZG8nLCBpZGVudGlmaWNhY2lvbiB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXZhbGlkYXJDYW1wb3NBc2lzdGVudGUoYXNpc3RlbnRlOiBBc2lzdGVudGVQYXRjaFBhcmFtKTogdm9pZCB7XG4gICAgICAgIGlmICghYXNpc3RlbnRlLm5vbWJyZSAmJiAhYXNpc3RlbnRlLmRpcmVjY2lvbiAmJiAhYXNpc3RlbnRlLnRlbGVmb25vICYmICFhc2lzdGVudGUuY29ycmVvICYmICFhc2lzdGVudGUuY2F0ZWdvcmlhcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEZWJlcyBlbnZpYXIgYWwgbWVub3MgdW4gY2FtcG8gYSBhY3R1YWxpemFyJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=