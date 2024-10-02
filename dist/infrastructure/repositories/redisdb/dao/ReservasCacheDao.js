"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservasCacheDao = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const _configuration_1 = require("@configuration");
let ReservasCacheDao = class ReservasCacheDao {
    constructor() {
        this.redis = _configuration_1.DEPENDENCY_CONTAINER.get(_configuration_1.TYPES.RedisClient);
    }
    async deleteReservaCache(id) {
        await this.redis.del(`evento:${id}:asistentes`);
    }
    async getReservaCache(id) {
        const response = await this.redis.get(`evento:${id}:asistentes`);
        return response ? response : null;
    }
    async setReservaCache(id, value) {
        await this.redis.set(`evento:${id}:asistentes`, value);
    }
};
exports.ReservasCacheDao = ReservasCacheDao;
exports.ReservasCacheDao = ReservasCacheDao = __decorate([
    (0, inversify_1.injectable)()
], ReservasCacheDao);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzZXJ2YXNDYWNoZURhby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9pbmZyYXN0cnVjdHVyZS9yZXBvc2l0b3JpZXMvcmVkaXNkYi9kYW8vUmVzZXJ2YXNDYWNoZURhby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx5Q0FBdUM7QUFDdkMsNEJBQTBCO0FBRTFCLG1EQUEyRDtBQUtwRCxJQUFNLGdCQUFnQixHQUF0QixNQUFNLGdCQUFnQjtJQUF0QjtRQUNLLFVBQUssR0FBRyxxQ0FBb0IsQ0FBQyxHQUFHLENBQWlCLHNCQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFjaEYsQ0FBQztJQVpHLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxFQUFVO1FBQy9CLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxLQUFLLENBQUMsZUFBZSxDQUFDLEVBQVU7UUFDNUIsTUFBTSxRQUFRLEdBQXFCLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ25GLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUN0QyxDQUFDO0lBRUQsS0FBSyxDQUFDLGVBQWUsQ0FBQyxFQUFVLEVBQUUsS0FBdUI7UUFDckQsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzNELENBQUM7Q0FDSixDQUFBO0FBZlksNENBQWdCOzJCQUFoQixnQkFBZ0I7SUFENUIsSUFBQSxzQkFBVSxHQUFFO0dBQ0EsZ0JBQWdCLENBZTVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5qZWN0YWJsZSB9IGZyb20gJ2ludmVyc2lmeSc7XG5pbXBvcnQgJ3JlZmxlY3QtbWV0YWRhdGEnO1xuaW1wb3J0IHtSZXNlcnZhQ2FjaGVSZXBvc2l0b3J5fSBmcm9tIFwiQGRvbWFpbi9yZXBvc2l0b3J5XCI7XG5pbXBvcnQge0RFUEVOREVOQ1lfQ09OVEFJTkVSLCBUWVBFU30gZnJvbSBcIkBjb25maWd1cmF0aW9uXCI7XG5pbXBvcnQge0lvUmVkaXNBZGFwdGVyfSBmcm9tICdAdHlwZS1jYWNoZWFibGUvaW9yZWRpcy1hZGFwdGVyJztcbmltcG9ydCB7RXZlbnRvQXNpc3RlbnRlc30gZnJvbSBcIkBkb21haW4vZW50aXRpZXNcIjtcblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlc2VydmFzQ2FjaGVEYW8gaW1wbGVtZW50cyBSZXNlcnZhQ2FjaGVSZXBvc2l0b3J5IHtcbiAgICBwcml2YXRlIHJlZGlzID0gREVQRU5ERU5DWV9DT05UQUlORVIuZ2V0PElvUmVkaXNBZGFwdGVyPihUWVBFUy5SZWRpc0NsaWVudCk7XG5cbiAgICBhc3luYyBkZWxldGVSZXNlcnZhQ2FjaGUoaWQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCB0aGlzLnJlZGlzLmRlbChgZXZlbnRvOiR7aWR9OmFzaXN0ZW50ZXNgKTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRSZXNlcnZhQ2FjaGUoaWQ6IG51bWJlcik6IFByb21pc2U8RXZlbnRvQXNpc3RlbnRlcyB8IG51bGw+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2U6IEV2ZW50b0FzaXN0ZW50ZXMgPSBhd2FpdCB0aGlzLnJlZGlzLmdldChgZXZlbnRvOiR7aWR9OmFzaXN0ZW50ZXNgKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlID8gcmVzcG9uc2UgOiBudWxsO1xuICAgIH1cblxuICAgIGFzeW5jIHNldFJlc2VydmFDYWNoZShpZDogbnVtYmVyLCB2YWx1ZTogRXZlbnRvQXNpc3RlbnRlcyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCB0aGlzLnJlZGlzLnNldChgZXZlbnRvOiR7aWR9OmFzaXN0ZW50ZXNgLCB2YWx1ZSk7XG4gICAgfVxufVxuIl19