"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventosDao = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const _configuration_1 = require("@configuration");
let EventosDao = class EventosDao {
    constructor() {
        this.db = _configuration_1.DEPENDENCY_CONTAINER.get(_configuration_1.TYPES.PostgresqlEventos);
    }
    async actualizar(evento) {
        try {
            const sql = `UPDATE evento SET nombre = $1, fecha = $2, hora = $3, capacidad = $4, valor = $5, actualizado = NOW() WHERE id = $6 RETURNING id`;
            await this.db.oneOrNone(sql, [evento.nombre, evento.fecha, evento.hora, evento.capacidad, evento.valor, evento.id]);
            return evento === null || evento === void 0 ? void 0 : evento.id;
        }
        catch (error) {
            console.error('Error al actualizar el evento', error);
            return null;
        }
    }
    async consultarPorId(id) {
        try {
            const sql = `SELECT * FROM evento WHERE id = $1`;
            return await this.db.oneOrNone(sql, [id]);
        }
        catch (error) {
            console.error('Error al consultar', error);
            return null;
        }
    }
    async eliminar(id) {
        try {
            const sql = `DELETE FROM evento WHERE id = $1 returning id`;
            const result = await this.db.oneOrNone(sql, [id]);
            return result === null || result === void 0 ? void 0 : result.id;
        }
        catch (error) {
            console.error('Error al eliminar', error);
            return null;
        }
    }
    async guardar(evento) {
        try {
            const sql = `INSERT INTO evento (nombre, descripcion, lugar, ciudad, fecha, hora, categoria, capacidad, valor, ubicacion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`;
            let pointLatLong = null;
            if (evento.ubicacion) {
                pointLatLong = `(${evento.ubicacion[0]},${evento.ubicacion[1]})`;
            }
            const resultado = await this.db.one(sql, [evento.nombre, evento.descripcion, evento.lugar, evento.ciudad, evento.fecha, evento.hora, evento.categoria, evento.capacidad, evento.valor, pointLatLong]);
            return resultado.id;
        }
        catch (error) {
            console.error('Error al guardar', error);
            return -1;
        }
    }
    async eventosCercanos(lat, lng, distancia) {
        try {
            const sql = `SELECT nombre, lugar as direccion, fecha, valor, earth_distance(ll_to_earth(ubicacion[1], ubicacion[0]), ll_to_earth($1, $2)) as distancia FROM evento WHERE earth_distance(ll_to_earth(ubicacion[1], ubicacion[0]), ll_to_earth($1, $2)) <= $3;`;
            return await this.db.manyOrNone(sql, [lng, lat, distancia]);
        }
        catch (error) {
            console.error('Error al consultar eventos cercanos', error);
            return [];
        }
    }
    async totalAsistenteDia() {
        try {
            const sql = `SELECT to_char(fecha, 'Day') as diaSemana, count(reserva.cantidad_boletos) as totalAsistentes 
            FROM evento 
            JOIN reserva ON evento.id = reserva.evento_id
            WHERE reserva.estado = 'confirmada' and fecha >= now() - interval '3 months'
            GROUP BY diaSemana ORDER BY totalAsistentes DESC;`;
            return await this.db.manyOrNone(sql);
        }
        catch (error) {
            console.error('Error al consultar asistentes por día', error);
            return null;
        }
    }
};
exports.EventosDao = EventosDao;
exports.EventosDao = EventosDao = __decorate([
    (0, inversify_1.injectable)()
], EventosDao);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRvc0Rhby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9pbmZyYXN0cnVjdHVyZS9yZXBvc2l0b3JpZXMvcG9zdGdyZXMvZGFvL0V2ZW50b3NEYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEseUNBQXVDO0FBQ3ZDLDRCQUEwQjtBQUcxQixtREFBMkQ7QUFJcEQsSUFBTSxVQUFVLEdBQWhCLE1BQU0sVUFBVTtJQUFoQjtRQUNLLE9BQUUsR0FBRyxxQ0FBb0IsQ0FBQyxHQUFHLENBQW1CLHNCQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQXNFckYsQ0FBQztJQXBFRyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQW9CO1FBQ2pDLElBQUksQ0FBQztZQUNELE1BQU0sR0FBRyxHQUFHLGtJQUFrSSxDQUFDO1lBQy9JLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQWlCLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwSSxPQUFPLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxFQUFFLENBQUM7UUFDdEIsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLCtCQUErQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3RELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFVO1FBQzNCLElBQUksQ0FBQztZQUNELE1BQU0sR0FBRyxHQUFHLG9DQUFvQyxDQUFDO1lBQ2pELE9BQU8sTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBZSxH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O0NBQ0osQ0FBQTtBQXZFWSxnQ0FBVTtxQkFBVixVQUFVO0lBRHRCLElBQUEsc0JBQVUsR0FBRTtHQUNBLFVBQVUsQ0F1RXRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5qZWN0YWJsZSB9IGZyb20gJ2ludmVyc2lmeSc7XG5pbXBvcnQgJ3JlZmxlY3QtbWV0YWRhdGEnO1xuaW1wb3J0IHtFdmVudG9zUmVwb3NpdG9yeX0gZnJvbSBcIkBkb21haW4vcmVwb3NpdG9yeVwiO1xuaW1wb3J0IHtFdmVudG9Bc2lzdGVudGVEaWEsIEV2ZW50b0VudGl0eSwgRXZlbnRvTHVnYXJDZXJjYW5vLCBSZXN1bHRhZG9Db25JZH0gZnJvbSBcIkBkb21haW4vZW50aXRpZXNcIjtcbmltcG9ydCB7REVQRU5ERU5DWV9DT05UQUlORVIsIFRZUEVTfSBmcm9tIFwiQGNvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCB7SURhdGFiYXNlLCBJTWFpbn0gZnJvbSBcInBnLXByb21pc2VcIjtcblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEV2ZW50b3NEYW8gaW1wbGVtZW50cyBFdmVudG9zUmVwb3NpdG9yeSB7XG4gICAgcHJpdmF0ZSBkYiA9IERFUEVOREVOQ1lfQ09OVEFJTkVSLmdldDxJRGF0YWJhc2U8SU1haW4+PihUWVBFUy5Qb3N0Z3Jlc3FsRXZlbnRvcyk7XG5cbiAgICBhc3luYyBhY3R1YWxpemFyKGV2ZW50bzogRXZlbnRvRW50aXR5KTogUHJvbWlzZTxudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBzcWwgPSBgVVBEQVRFIGV2ZW50byBTRVQgbm9tYnJlID0gJDEsIGZlY2hhID0gJDIsIGhvcmEgPSAkMywgY2FwYWNpZGFkID0gJDQsIHZhbG9yID0gJDUsIGFjdHVhbGl6YWRvID0gTk9XKCkgV0hFUkUgaWQgPSAkNiBSRVRVUk5JTkcgaWRgO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5kYi5vbmVPck5vbmU8UmVzdWx0YWRvQ29uSWQ+KHNxbCwgW2V2ZW50by5ub21icmUsIGV2ZW50by5mZWNoYSwgZXZlbnRvLmhvcmEsIGV2ZW50by5jYXBhY2lkYWQsIGV2ZW50by52YWxvciwgZXZlbnRvLmlkXSk7XG4gICAgICAgICAgICByZXR1cm4gZXZlbnRvPy5pZDtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFsIGFjdHVhbGl6YXIgZWwgZXZlbnRvJywgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBjb25zdWx0YXJQb3JJZChpZDogbnVtYmVyKTogUHJvbWlzZTxFdmVudG9FbnRpdHkgfCBudWxsPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBzcWwgPSBgU0VMRUNUICogRlJPTSBldmVudG8gV0hFUkUgaWQgPSAkMWA7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5kYi5vbmVPck5vbmU8RXZlbnRvRW50aXR5PihzcWwsIFtpZF0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgYWwgY29uc3VsdGFyJywgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBlbGltaW5hcihpZDogbnVtYmVyKTogUHJvbWlzZTxudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBzcWwgPSBgREVMRVRFIEZST00gZXZlbnRvIFdIRVJFIGlkID0gJDEgcmV0dXJuaW5nIGlkYDtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuZGIub25lT3JOb25lPFJlc3VsdGFkb0NvbklkPihzcWwsIFtpZF0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdD8uaWQ7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBhbCBlbGltaW5hcicsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZ3VhcmRhcihldmVudG86IEV2ZW50b0VudGl0eSk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBzcWwgPSBgSU5TRVJUIElOVE8gZXZlbnRvIChub21icmUsIGRlc2NyaXBjaW9uLCBsdWdhciwgY2l1ZGFkLCBmZWNoYSwgaG9yYSwgY2F0ZWdvcmlhLCBjYXBhY2lkYWQsIHZhbG9yLCB1YmljYWNpb24pIFZBTFVFUyAoJDEsICQyLCAkMywgJDQsICQ1LCAkNiwgJDcsICQ4LCAkOSwgJDEwKSBSRVRVUk5JTkcgaWRgO1xuICAgICAgICAgICAgbGV0IHBvaW50TGF0TG9uZyA9IG51bGw7XG4gICAgICAgICAgICBpZiAoZXZlbnRvLnViaWNhY2lvbikge1xuICAgICAgICAgICAgICAgIHBvaW50TGF0TG9uZyA9IGAoJHtldmVudG8udWJpY2FjaW9uWzBdfSwke2V2ZW50by51YmljYWNpb25bMV19KWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZXN1bHRhZG8gPSBhd2FpdCB0aGlzLmRiLm9uZTxSZXN1bHRhZG9Db25JZD4oc3FsLCBbZXZlbnRvLm5vbWJyZSwgZXZlbnRvLmRlc2NyaXBjaW9uLCBldmVudG8ubHVnYXIsIGV2ZW50by5jaXVkYWQsIGV2ZW50by5mZWNoYSwgZXZlbnRvLmhvcmEsIGV2ZW50by5jYXRlZ29yaWEsIGV2ZW50by5jYXBhY2lkYWQsIGV2ZW50by52YWxvciwgcG9pbnRMYXRMb25nXSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0YWRvLmlkO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgYWwgZ3VhcmRhcicsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBldmVudG9zQ2VyY2Fub3MobGF0OiBudW1iZXIsIGxuZzogbnVtYmVyLCBkaXN0YW5jaWE6IG51bWJlcik6IFByb21pc2U8RXZlbnRvTHVnYXJDZXJjYW5vW10+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHNxbCA9IGBTRUxFQ1Qgbm9tYnJlLCBsdWdhciBhcyBkaXJlY2Npb24sIGZlY2hhLCB2YWxvciwgZWFydGhfZGlzdGFuY2UobGxfdG9fZWFydGgodWJpY2FjaW9uWzFdLCB1YmljYWNpb25bMF0pLCBsbF90b19lYXJ0aCgkMSwgJDIpKSBhcyBkaXN0YW5jaWEgRlJPTSBldmVudG8gV0hFUkUgZWFydGhfZGlzdGFuY2UobGxfdG9fZWFydGgodWJpY2FjaW9uWzFdLCB1YmljYWNpb25bMF0pLCBsbF90b19lYXJ0aCgkMSwgJDIpKSA8PSAkMztgO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZGIubWFueU9yTm9uZTxFdmVudG9MdWdhckNlcmNhbm8+KHNxbCwgW2xuZywgbGF0LCBkaXN0YW5jaWFdKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFsIGNvbnN1bHRhciBldmVudG9zIGNlcmNhbm9zJywgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIHRvdGFsQXNpc3RlbnRlRGlhKCk6IFByb21pc2U8RXZlbnRvQXNpc3RlbnRlRGlhW10gfCBudWxsPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBzcWwgPSBgU0VMRUNUIHRvX2NoYXIoZmVjaGEsICdEYXknKSBhcyBkaWFTZW1hbmEsIGNvdW50KHJlc2VydmEuY2FudGlkYWRfYm9sZXRvcykgYXMgdG90YWxBc2lzdGVudGVzIFxuICAgICAgICAgICAgRlJPTSBldmVudG8gXG4gICAgICAgICAgICBKT0lOIHJlc2VydmEgT04gZXZlbnRvLmlkID0gcmVzZXJ2YS5ldmVudG9faWRcbiAgICAgICAgICAgIFdIRVJFIHJlc2VydmEuZXN0YWRvID0gJ2NvbmZpcm1hZGEnIGFuZCBmZWNoYSA+PSBub3coKSAtIGludGVydmFsICczIG1vbnRocydcbiAgICAgICAgICAgIEdST1VQIEJZIGRpYVNlbWFuYSBPUkRFUiBCWSB0b3RhbEFzaXN0ZW50ZXMgREVTQztgO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZGIubWFueU9yTm9uZTxFdmVudG9Bc2lzdGVudGVEaWE+KHNxbCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBhbCBjb25zdWx0YXIgYXNpc3RlbnRlcyBwb3IgZMOtYScsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19