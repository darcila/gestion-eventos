"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaCacheInfraService = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const _configuration_1 = require("@configuration");
let ReservaCacheInfraService = class ReservaCacheInfraService {
    constructor() {
        this.reservaCacheRepository = _configuration_1.DEPENDENCY_CONTAINER.get(_configuration_1.TYPES.ReservaCacheRepository);
    }
    async getCacheAsistentesCount(id) {
        return this.reservaCacheRepository.getReservaCache(id);
    }
    async setCacheAasistentesCount(id, asistentes) {
        return await this.reservaCacheRepository.setReservaCache(id, asistentes);
    }
    async invalidateCacheAsistentesCount(id) {
        return await this.reservaCacheRepository.deleteReservaCache(id);
    }
};
exports.ReservaCacheInfraService = ReservaCacheInfraService;
exports.ReservaCacheInfraService = ReservaCacheInfraService = __decorate([
    (0, inversify_1.injectable)()
], ReservaCacheInfraService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzZXJ2YUNhY2hlSW5mcmFTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL3NlcnZpY2VzL1Jlc2VydmFDYWNoZUluZnJhU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx5Q0FBdUM7QUFDdkMsNEJBQTBCO0FBQzFCLG1EQUEyRDtBQUtwRCxJQUFNLHdCQUF3QixHQUE5QixNQUFNLHdCQUF3QjtJQUE5QjtRQUNLLDJCQUFzQixHQUFHLHFDQUFvQixDQUFDLEdBQUcsQ0FBeUIsc0JBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBYXBILENBQUM7SUFYRyxLQUFLLENBQUMsdUJBQXVCLENBQUMsRUFBVTtRQUNwQyxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxFQUFVLEVBQUUsVUFBNEI7UUFDbkUsT0FBTyxNQUFNLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFRCxLQUFLLENBQUMsOEJBQThCLENBQUMsRUFBVTtRQUMzQyxPQUFPLE1BQU0sSUFBSSxDQUFDLHNCQUFzQixDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7Q0FDSixDQUFBO0FBZFksNERBQXdCO21DQUF4Qix3QkFBd0I7SUFEcEMsSUFBQSxzQkFBVSxHQUFFO0dBQ0Esd0JBQXdCLENBY3BDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5qZWN0YWJsZSB9IGZyb20gJ2ludmVyc2lmeSc7XG5pbXBvcnQgJ3JlZmxlY3QtbWV0YWRhdGEnO1xuaW1wb3J0IHtERVBFTkRFTkNZX0NPTlRBSU5FUiwgVFlQRVN9IGZyb20gXCJAY29uZmlndXJhdGlvblwiO1xuaW1wb3J0IHtSZXNlcnZhQ2FjaGVSZXBvc2l0b3J5fSBmcm9tIFwiQGRvbWFpbi9yZXBvc2l0b3J5XCI7XG5pbXBvcnQge0V2ZW50b0FzaXN0ZW50ZXN9IGZyb20gXCJAZG9tYWluL2VudGl0aWVzXCI7XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZXNlcnZhQ2FjaGVJbmZyYVNlcnZpY2Uge1xuICAgIHByaXZhdGUgcmVzZXJ2YUNhY2hlUmVwb3NpdG9yeSA9IERFUEVOREVOQ1lfQ09OVEFJTkVSLmdldDxSZXNlcnZhQ2FjaGVSZXBvc2l0b3J5PihUWVBFUy5SZXNlcnZhQ2FjaGVSZXBvc2l0b3J5KTtcblxuICAgIGFzeW5jIGdldENhY2hlQXNpc3RlbnRlc0NvdW50KGlkOiBudW1iZXIpOiBQcm9taXNlPEV2ZW50b0FzaXN0ZW50ZXMgfCBudWxsPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc2VydmFDYWNoZVJlcG9zaXRvcnkuZ2V0UmVzZXJ2YUNhY2hlKGlkKTtcbiAgICB9XG5cbiAgICBhc3luYyBzZXRDYWNoZUFhc2lzdGVudGVzQ291bnQoaWQ6IG51bWJlciwgYXNpc3RlbnRlczogRXZlbnRvQXNpc3RlbnRlcyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5yZXNlcnZhQ2FjaGVSZXBvc2l0b3J5LnNldFJlc2VydmFDYWNoZShpZCwgYXNpc3RlbnRlcyk7XG4gICAgfVxuXG4gICAgYXN5bmMgaW52YWxpZGF0ZUNhY2hlQXNpc3RlbnRlc0NvdW50KGlkOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucmVzZXJ2YUNhY2hlUmVwb3NpdG9yeS5kZWxldGVSZXNlcnZhQ2FjaGUoaWQpO1xuICAgIH1cbn1cbiJdfQ==