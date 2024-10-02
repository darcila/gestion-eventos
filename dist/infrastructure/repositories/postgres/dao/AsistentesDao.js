"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsistentesDao = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const _configuration_1 = require("@configuration");
let AsistentesDao = class AsistentesDao {
    constructor() {
        this.db = _configuration_1.DEPENDENCY_CONTAINER.get(_configuration_1.TYPES.PostgresqlEventos);
    }
    async actualizar(asistente) {
        try {
            const sql = `UPDATE asistente SET nombre = $1, direccion = $2, telefono = $3, correo = $4, categorias = $5, ubicacion = $6, actualizado = NOW() WHERE identificacion = $7 RETURNING id`;
            let pointLatLong = null;
            if (asistente.ubicacion) {
                pointLatLong = `(${asistente.ubicacion[0]},${asistente.ubicacion[1]})`;
            }
            await this.db.oneOrNone(sql, [asistente.nombre, asistente.direccion, asistente.telefono, asistente.correo, asistente.categorias, pointLatLong, asistente.identificacion]);
            return asistente === null || asistente === void 0 ? void 0 : asistente.id;
        }
        catch (error) {
            console.error('Error al actualizar el asistente', error);
            return null;
        }
    }
    async consultarPorIdentificacion(identificacion) {
        try {
            const sql = `SELECT * FROM asistente WHERE identificacion = $1`;
            return await this.db.oneOrNone(sql, [identificacion]);
        }
        catch (error) {
            console.error('Error al consultar asistente', error);
            return null;
        }
    }
    async consultarPorId(id) {
        try {
            const sql = `SELECT * FROM asistente WHERE id = $1`;
            return await this.db.oneOrNone(sql, [id]);
        }
        catch (error) {
            console.error('Error al consultar asistente', error);
            return null;
        }
    }
    async eliminar(identificacion) {
        try {
            const sql = `DELETE FROM asistente WHERE identificacion = $1 RETURNING id`;
            const result = await this.db.oneOrNone(sql, [identificacion]);
            return result === null || result === void 0 ? void 0 : result.id;
        }
        catch (error) {
            console.error('Error al eliminar asistente', error);
            return null;
        }
    }
    async guardar(asistente) {
        try {
            const sql = `INSERT INTO asistente (identificacion, nombre, direccion, telefono, correo, categorias, ubicacion, ciudad) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;
            let pointLatLong = null;
            if (asistente.ubicacion) {
                pointLatLong = `(${asistente.ubicacion[0]},${asistente.ubicacion[1]})`;
            }
            const resultado = await this.db.one(sql, [asistente.identificacion, asistente.nombre, asistente.direccion, asistente.telefono, asistente.correo, asistente.categorias, pointLatLong, asistente.ciudad]);
            return resultado.id;
        }
        catch (error) {
            console.error('Error al guardar asistente', error);
            return -1;
        }
    }
};
exports.AsistentesDao = AsistentesDao;
exports.AsistentesDao = AsistentesDao = __decorate([
    (0, inversify_1.injectable)()
], AsistentesDao);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXNpc3RlbnRlc0Rhby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9pbmZyYXN0cnVjdHVyZS9yZXBvc2l0b3JpZXMvcG9zdGdyZXMvZGFvL0FzaXN0ZW50ZXNEYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEseUNBQXVDO0FBQ3ZDLDRCQUEwQjtBQUcxQixtREFBNkQ7QUFJdEQsSUFBTSxhQUFhLEdBQW5CLE1BQU0sYUFBYTtJQUFuQjtRQUNLLE9BQUUsR0FBRyxxQ0FBb0IsQ0FBQyxHQUFHLENBQW1CLHNCQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQThEckYsQ0FBQztJQTVERyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQTBCO1FBQ3ZDLElBQUksQ0FBQztZQUNELE1BQU0sR0FBRyxHQUFHLDJLQUEySyxDQUFDO1lBQ3hMLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQztZQUN4QixJQUFJLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDdEIsWUFBWSxHQUFHLElBQUksU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDM0UsQ0FBQztZQUNELE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQWlCLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDMUwsT0FBTyxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUUsRUFBRSxDQUFDO1FBQ3pCLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxrQ0FBa0MsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN6RCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxjQUFzQjtRQUNuRCxJQUFJLENBQUM7WUFDRCxNQUFNLEdBQUcsR0FBRyxtREFBbUQsQ0FBQztZQUNoRSxPQUFPLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQWtCLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDM0UsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLDhCQUE4QixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3JELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFVO1FBQzNCLElBQUksQ0FBQztZQUNELE1BQU0sR0FBRyxHQUFHLHVDQUF1QyxDQUFDO1lBQ3BELE9BQU8sTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBa0IsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsOEJBQThCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDckQsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsUUFBUSxDQUFDLGNBQXNCO1FBQ2pDLElBQUksQ0FBQztZQUNELE1BQU0sR0FBRyxHQUFHLDhEQUE4RCxDQUFDO1lBQzNFLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQWlCLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDOUUsT0FBTyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsRUFBRSxDQUFDO1FBQ3RCLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNwRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBMEI7UUFDcEMsSUFBSSxDQUFDO1lBQ0QsTUFBTSxHQUFHLEdBQUcsaUtBQWlLLENBQUM7WUFDOUssSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLElBQUksU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUN0QixZQUFZLEdBQUcsSUFBSSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUMzRSxDQUFDO1lBQ0QsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBaUIsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3hOLE9BQU8sU0FBUyxDQUFDLEVBQUUsQ0FBQztRQUN4QixDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDbkQsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNkLENBQUM7SUFDTCxDQUFDO0NBQ0osQ0FBQTtBQS9EWSxzQ0FBYTt3QkFBYixhQUFhO0lBRHpCLElBQUEsc0JBQVUsR0FBRTtHQUNBLGFBQWEsQ0ErRHpCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5qZWN0YWJsZSB9IGZyb20gJ2ludmVyc2lmeSc7XG5pbXBvcnQgJ3JlZmxlY3QtbWV0YWRhdGEnO1xuaW1wb3J0IHsgQXNpc3RlbnRlc1JlcG9zaXRvcnkgfSBmcm9tIFwiQGRvbWFpbi9yZXBvc2l0b3J5XCI7XG5pbXBvcnQgeyBBc2lzdGVudGVFbnRpdHksIFJlc3VsdGFkb0NvbklkIH0gZnJvbSBcIkBkb21haW4vZW50aXRpZXNcIjtcbmltcG9ydCB7IERFUEVOREVOQ1lfQ09OVEFJTkVSLCBUWVBFUyB9IGZyb20gXCJAY29uZmlndXJhdGlvblwiO1xuaW1wb3J0IHsgSURhdGFiYXNlLCBJTWFpbiB9IGZyb20gXCJwZy1wcm9taXNlXCI7XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBc2lzdGVudGVzRGFvIGltcGxlbWVudHMgQXNpc3RlbnRlc1JlcG9zaXRvcnkge1xuICAgIHByaXZhdGUgZGIgPSBERVBFTkRFTkNZX0NPTlRBSU5FUi5nZXQ8SURhdGFiYXNlPElNYWluPj4oVFlQRVMuUG9zdGdyZXNxbEV2ZW50b3MpOyAvLyBBc2Vnw7pyYXRlIGRlIHRlbmVyIGVzdGEgY29uZmlndXJhY2nDs25cblxuICAgIGFzeW5jIGFjdHVhbGl6YXIoYXNpc3RlbnRlOiBBc2lzdGVudGVFbnRpdHkpOiBQcm9taXNlPG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHNxbCA9IGBVUERBVEUgYXNpc3RlbnRlIFNFVCBub21icmUgPSAkMSwgZGlyZWNjaW9uID0gJDIsIHRlbGVmb25vID0gJDMsIGNvcnJlbyA9ICQ0LCBjYXRlZ29yaWFzID0gJDUsIHViaWNhY2lvbiA9ICQ2LCBhY3R1YWxpemFkbyA9IE5PVygpIFdIRVJFIGlkZW50aWZpY2FjaW9uID0gJDcgUkVUVVJOSU5HIGlkYDtcbiAgICAgICAgICAgIGxldCBwb2ludExhdExvbmcgPSBudWxsO1xuICAgICAgICAgICAgaWYgKGFzaXN0ZW50ZS51YmljYWNpb24pIHtcbiAgICAgICAgICAgICAgICBwb2ludExhdExvbmcgPSBgKCR7YXNpc3RlbnRlLnViaWNhY2lvblswXX0sJHthc2lzdGVudGUudWJpY2FjaW9uWzFdfSlgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5kYi5vbmVPck5vbmU8UmVzdWx0YWRvQ29uSWQ+KHNxbCwgW2FzaXN0ZW50ZS5ub21icmUsIGFzaXN0ZW50ZS5kaXJlY2Npb24sIGFzaXN0ZW50ZS50ZWxlZm9ubywgYXNpc3RlbnRlLmNvcnJlbywgYXNpc3RlbnRlLmNhdGVnb3JpYXMsIHBvaW50TGF0TG9uZywgYXNpc3RlbnRlLmlkZW50aWZpY2FjaW9uXSk7XG4gICAgICAgICAgICByZXR1cm4gYXNpc3RlbnRlPy5pZDtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFsIGFjdHVhbGl6YXIgZWwgYXNpc3RlbnRlJywgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBjb25zdWx0YXJQb3JJZGVudGlmaWNhY2lvbihpZGVudGlmaWNhY2lvbjogc3RyaW5nKTogUHJvbWlzZTxBc2lzdGVudGVFbnRpdHkgfCBudWxsPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBzcWwgPSBgU0VMRUNUICogRlJPTSBhc2lzdGVudGUgV0hFUkUgaWRlbnRpZmljYWNpb24gPSAkMWA7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5kYi5vbmVPck5vbmU8QXNpc3RlbnRlRW50aXR5PihzcWwsIFtpZGVudGlmaWNhY2lvbl0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgYWwgY29uc3VsdGFyIGFzaXN0ZW50ZScsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgY29uc3VsdGFyUG9ySWQoaWQ6IG51bWJlcik6IFByb21pc2U8QXNpc3RlbnRlRW50aXR5IHwgbnVsbD4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgc3FsID0gYFNFTEVDVCAqIEZST00gYXNpc3RlbnRlIFdIRVJFIGlkID0gJDFgO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZGIub25lT3JOb25lPEFzaXN0ZW50ZUVudGl0eT4oc3FsLCBbaWRdKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFsIGNvbnN1bHRhciBhc2lzdGVudGUnLCBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGVsaW1pbmFyKGlkZW50aWZpY2FjaW9uOiBzdHJpbmcpOiBQcm9taXNlPG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHNxbCA9IGBERUxFVEUgRlJPTSBhc2lzdGVudGUgV0hFUkUgaWRlbnRpZmljYWNpb24gPSAkMSBSRVRVUk5JTkcgaWRgO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5kYi5vbmVPck5vbmU8UmVzdWx0YWRvQ29uSWQ+KHNxbCwgW2lkZW50aWZpY2FjaW9uXSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0Py5pZDtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFsIGVsaW1pbmFyIGFzaXN0ZW50ZScsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZ3VhcmRhcihhc2lzdGVudGU6IEFzaXN0ZW50ZUVudGl0eSk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBzcWwgPSBgSU5TRVJUIElOVE8gYXNpc3RlbnRlIChpZGVudGlmaWNhY2lvbiwgbm9tYnJlLCBkaXJlY2Npb24sIHRlbGVmb25vLCBjb3JyZW8sIGNhdGVnb3JpYXMsIHViaWNhY2lvbiwgY2l1ZGFkKSBWQUxVRVMgKCQxLCAkMiwgJDMsICQ0LCAkNSwgJDYsICQ3LCAkOCkgUkVUVVJOSU5HIGlkYDtcbiAgICAgICAgICAgIGxldCBwb2ludExhdExvbmcgPSBudWxsO1xuICAgICAgICAgICAgaWYgKGFzaXN0ZW50ZS51YmljYWNpb24pIHtcbiAgICAgICAgICAgICAgICBwb2ludExhdExvbmcgPSBgKCR7YXNpc3RlbnRlLnViaWNhY2lvblswXX0sJHthc2lzdGVudGUudWJpY2FjaW9uWzFdfSlgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmVzdWx0YWRvID0gYXdhaXQgdGhpcy5kYi5vbmU8UmVzdWx0YWRvQ29uSWQ+KHNxbCwgW2FzaXN0ZW50ZS5pZGVudGlmaWNhY2lvbiwgYXNpc3RlbnRlLm5vbWJyZSwgYXNpc3RlbnRlLmRpcmVjY2lvbiwgYXNpc3RlbnRlLnRlbGVmb25vLCBhc2lzdGVudGUuY29ycmVvLCBhc2lzdGVudGUuY2F0ZWdvcmlhcywgcG9pbnRMYXRMb25nLCBhc2lzdGVudGUuY2l1ZGFkXSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0YWRvLmlkO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgYWwgZ3VhcmRhciBhc2lzdGVudGUnLCBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gLTE7IFxuICAgICAgICB9XG4gICAgfVxufVxuIl19