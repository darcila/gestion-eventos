"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapInfraService = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const _configuration_1 = require("@configuration");
const services_1 = require("@domain/services");
let MapInfraService = class MapInfraService {
    constructor() {
        this.mapRepository = _configuration_1.DEPENDENCY_CONTAINER.get(_configuration_1.TYPES.MapRepository);
    }
    async consultarUbicacion(direccion, ciudad) {
        const ubicacion = (0, services_1.transformarDireccion)(direccion);
        const response = await this.mapRepository.getByDireccion(`${ubicacion},${ciudad}`);
        if (response) {
            return response[0].coordinates;
        }
        throw new Error('Ubicación no encontrada');
    }
    async consultarLugaresCercanos(lat, lng, tipo) {
        const response = await this.mapRepository.getNearbyPlaces(lat, lng, tipo);
        if (response) {
            const lugares = [];
            response.forEach((lugar) => {
                lugares.push({
                    nombre: lugar.properties.name,
                    direccion: lugar.properties.full_address,
                });
            });
            return lugares;
        }
        throw new Error('Ubicación no encontrada');
    }
};
exports.MapInfraService = MapInfraService;
exports.MapInfraService = MapInfraService = __decorate([
    (0, inversify_1.injectable)()
], MapInfraService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFwSW5mcmFTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL3NlcnZpY2VzL01hcEluZnJhU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx5Q0FBdUM7QUFDdkMsNEJBQTBCO0FBQzFCLG1EQUEyRDtBQUUzRCwrQ0FBc0Q7QUFJL0MsSUFBTSxlQUFlLEdBQXJCLE1BQU0sZUFBZTtJQUFyQjtRQUNLLGtCQUFhLEdBQUcscUNBQW9CLENBQUMsR0FBRyxDQUF5QixzQkFBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBd0JsRyxDQUFDO0lBdEJHLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxTQUFpQixFQUFFLE1BQWM7UUFDdEQsTUFBTSxTQUFTLEdBQUcsSUFBQSwrQkFBb0IsRUFBQyxTQUFTLENBQUMsQ0FBQztRQUNsRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEdBQUcsU0FBUyxJQUFJLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDbkYsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNYLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUNuQyxDQUFDO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFDRCxLQUFLLENBQUMsd0JBQXdCLENBQUMsR0FBVyxFQUFFLEdBQVcsRUFBRSxJQUFZO1FBQ2pFLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxRSxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQ1gsTUFBTSxPQUFPLEdBQXlCLEVBQUUsQ0FBQztZQUN6QyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ1QsTUFBTSxFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSTtvQkFDN0IsU0FBUyxFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsWUFBWTtpQkFDM0MsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLE9BQU8sQ0FBQztRQUNuQixDQUFDO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7Q0FDSixDQUFBO0FBekJZLDBDQUFlOzBCQUFmLGVBQWU7SUFEM0IsSUFBQSxzQkFBVSxHQUFFO0dBQ0EsZUFBZSxDQXlCM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbmplY3RhYmxlIH0gZnJvbSAnaW52ZXJzaWZ5JztcbmltcG9ydCAncmVmbGVjdC1tZXRhZGF0YSc7XG5pbXBvcnQge0RFUEVOREVOQ1lfQ09OVEFJTkVSLCBUWVBFU30gZnJvbSBcIkBjb25maWd1cmF0aW9uXCI7XG5pbXBvcnQge01hcEFwaUNsaWVudFJlcG9zaXRvcnl9IGZyb20gXCJAZG9tYWluL3JlcG9zaXRvcnlcIjtcbmltcG9ydCB7dHJhbnNmb3JtYXJEaXJlY2Npb259IGZyb20gXCJAZG9tYWluL3NlcnZpY2VzXCI7XG5pbXBvcnQge0V2ZW50b0x1Z2FyQ2VyY2Fub30gZnJvbSBcIkBkb21haW4vZW50aXRpZXNcIjtcblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hcEluZnJhU2VydmljZSB7XG4gICAgcHJpdmF0ZSBtYXBSZXBvc2l0b3J5ID0gREVQRU5ERU5DWV9DT05UQUlORVIuZ2V0PE1hcEFwaUNsaWVudFJlcG9zaXRvcnk+KFRZUEVTLk1hcFJlcG9zaXRvcnkpO1xuXG4gICAgYXN5bmMgY29uc3VsdGFyVWJpY2FjaW9uKGRpcmVjY2lvbjogc3RyaW5nLCBjaXVkYWQ6IHN0cmluZyk6IFByb21pc2U8bnVtYmVyW10+IHtcbiAgICAgICAgY29uc3QgdWJpY2FjaW9uID0gdHJhbnNmb3JtYXJEaXJlY2Npb24oZGlyZWNjaW9uKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLm1hcFJlcG9zaXRvcnkuZ2V0QnlEaXJlY2Npb24oYCR7dWJpY2FjaW9ufSwke2NpdWRhZH1gKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2VbMF0uY29vcmRpbmF0ZXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVYmljYWNpw7NuIG5vIGVuY29udHJhZGEnKTtcbiAgICB9XG4gICAgYXN5bmMgY29uc3VsdGFyTHVnYXJlc0NlcmNhbm9zKGxhdDogbnVtYmVyLCBsbmc6IG51bWJlciwgdGlwbzogc3RyaW5nKTogUHJvbWlzZTxFdmVudG9MdWdhckNlcmNhbm9bXT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMubWFwUmVwb3NpdG9yeS5nZXROZWFyYnlQbGFjZXMobGF0LCBsbmcsIHRpcG8pO1xuICAgICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGx1Z2FyZXM6IEV2ZW50b0x1Z2FyQ2VyY2Fub1tdID0gW107XG4gICAgICAgICAgICByZXNwb25zZS5mb3JFYWNoKChsdWdhcikgPT4ge1xuICAgICAgICAgICAgICAgIGx1Z2FyZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIG5vbWJyZTogbHVnYXIucHJvcGVydGllcy5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBkaXJlY2Npb246IGx1Z2FyLnByb3BlcnRpZXMuZnVsbF9hZGRyZXNzLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbHVnYXJlcztcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ViaWNhY2nDs24gbm8gZW5jb250cmFkYScpO1xuICAgIH1cbn1cbiJdfQ==