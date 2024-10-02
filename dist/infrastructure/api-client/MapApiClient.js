"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapApiClient = void 0;
const inversify_1 = require("inversify");
const exceptions_1 = require("@domain/exceptions");
const _util_1 = require("@util");
const axios_1 = __importDefault(require("axios"));
let MapApiClient = class MapApiClient {
    async getByDireccion(direccion) {
        try {
            const encodedAddress = encodeURIComponent(direccion);
            const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodedAddress}&country=CO&access_token=${_util_1.KEY_MAPBOX}`;
            const response = await axios_1.default.get(url);
            const data = response.data;
            if (data.features && data.features.length > 0) {
                return data.features.map((feature) => ({
                    coordinates: feature.geometry.coordinates,
                    type: feature.geometry.type,
                }));
            }
            else {
                console.log('No nearby addresses found.');
                return null;
            }
        }
        catch (err) {
            console.error(err);
            throw new exceptions_1.ApiClientException(`Error al consultar : \n ${JSON.stringify(err)}`);
        }
    }
    async getNearbyPlaces(lat, lng, tipo) {
        try {
            const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${tipo}&proximity=${lng},${lat}&country=CO&language=es&access_token=${_util_1.KEY_MAPBOX}`;
            const response = await axios_1.default.get(url);
            const data = response.data;
            if (data.features && data.features.length > 0) {
                return data.features.map((feature) => ({
                    geometry: feature.geometry,
                    properties: feature.properties,
                }));
            }
            else {
                console.log('No nearby addresses found.');
                return null;
            }
        }
        catch (err) {
            console.error(err);
            throw new exceptions_1.ApiClientException(`Error al consultar: \n ${JSON.stringify(err)}`);
        }
    }
};
exports.MapApiClient = MapApiClient;
exports.MapApiClient = MapApiClient = __decorate([
    (0, inversify_1.injectable)()
], MapApiClient);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFwQXBpQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL2FwaS1jbGllbnQvTWFwQXBpQ2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUF1QztBQUN2QyxtREFBd0Q7QUFFeEQsaUNBQWlDO0FBQ2pDLGtEQUEwQjtBQUluQixJQUFNLFlBQVksR0FBbEIsTUFBTSxZQUFZO0lBQ3JCLEtBQUssQ0FBQyxjQUFjLENBQUMsU0FBaUI7UUFDbEMsSUFBSSxDQUFDO1lBQ0QsTUFBTSxjQUFjLEdBQUcsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckQsTUFBTSxHQUFHLEdBQUcsc0RBQXNELGNBQWMsNEJBQTRCLGtCQUFVLEVBQUUsQ0FBQztZQUN6SCxNQUFNLFFBQVEsR0FBRyxNQUFNLGVBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztZQUMzQixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQzVDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ3hDLFdBQVcsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVc7b0JBQ3pDLElBQUksRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUk7aUJBQzlCLENBQUMsQ0FBQyxDQUFDO1lBQ1IsQ0FBQztpQkFBTSxDQUFDO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztnQkFDMUMsT0FBTyxJQUFJLENBQUM7WUFDaEIsQ0FBQztRQUNMLENBQUM7UUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixNQUFNLElBQUksK0JBQWtCLENBQ3hCLDJCQUEyQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQ25ELENBQUM7UUFDTixDQUFDO0lBQ0wsQ0FBQztJQUNELEtBQUssQ0FBQyxlQUFlLENBQUMsR0FBVyxFQUFFLEdBQVcsRUFBRSxJQUFZO1FBQ3hELElBQUksQ0FBQztZQUNELE1BQU0sR0FBRyxHQUFHLHNEQUFzRCxJQUFJLGNBQWMsR0FBRyxJQUFJLEdBQUcsd0NBQXdDLGtCQUFVLEVBQUUsQ0FBQztZQUNuSixNQUFNLFFBQVEsR0FBRyxNQUFNLGVBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztZQUMzQixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQzVDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ3hDLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTtvQkFDMUIsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVO2lCQUNqQyxDQUFDLENBQUMsQ0FBQztZQUNSLENBQUM7aUJBQU0sQ0FBQztnQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7Z0JBQzFDLE9BQU8sSUFBSSxDQUFDO1lBQ2hCLENBQUM7UUFDTCxDQUFDO1FBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsTUFBTSxJQUFJLCtCQUFrQixDQUN4QiwwQkFBMEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUNsRCxDQUFDO1FBQ04sQ0FBQztJQUNMLENBQUM7Q0FDSixDQUFBO0FBNUNZLG9DQUFZO3VCQUFaLFlBQVk7SUFEeEIsSUFBQSxzQkFBVSxHQUFFO0dBQ0EsWUFBWSxDQTRDeEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbmplY3RhYmxlIH0gZnJvbSAnaW52ZXJzaWZ5JztcbmltcG9ydCB7IEFwaUNsaWVudEV4Y2VwdGlvbiB9IGZyb20gJ0Bkb21haW4vZXhjZXB0aW9ucyc7XG5pbXBvcnQgeyBNYXBBcGlDbGllbnRSZXBvc2l0b3J5IH0gZnJvbSAnQGRvbWFpbi9yZXBvc2l0b3J5JztcbmltcG9ydCB7S0VZX01BUEJPWH0gZnJvbSBcIkB1dGlsXCI7XG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQge0ZlYXR1cmUsIEdlb21ldHJ5fSBmcm9tIFwiQGRvbWFpbi9lbnRpdGllcy9NYXBFbnRpdHlcIjtcblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hcEFwaUNsaWVudCBpbXBsZW1lbnRzIE1hcEFwaUNsaWVudFJlcG9zaXRvcnkge1xuICAgIGFzeW5jIGdldEJ5RGlyZWNjaW9uKGRpcmVjY2lvbjogc3RyaW5nKTogUHJvbWlzZTxHZW9tZXRyeVtdIHwgbnVsbD4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZW5jb2RlZEFkZHJlc3MgPSBlbmNvZGVVUklDb21wb25lbnQoZGlyZWNjaW9uKTtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGBodHRwczovL2FwaS5tYXBib3guY29tL3NlYXJjaC9nZW9jb2RlL3Y2L2ZvcndhcmQ/cT0ke2VuY29kZWRBZGRyZXNzfSZjb3VudHJ5PUNPJmFjY2Vzc190b2tlbj0ke0tFWV9NQVBCT1h9YDtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KHVybCk7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgIGlmIChkYXRhLmZlYXR1cmVzICYmIGRhdGEuZmVhdHVyZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLmZlYXR1cmVzLm1hcCgoZmVhdHVyZTogYW55KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICBjb29yZGluYXRlczogZmVhdHVyZS5nZW9tZXRyeS5jb29yZGluYXRlcyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmVhdHVyZS5nZW9tZXRyeS50eXBlLFxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05vIG5lYXJieSBhZGRyZXNzZXMgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEFwaUNsaWVudEV4Y2VwdGlvbihcbiAgICAgICAgICAgICAgICBgRXJyb3IgYWwgY29uc3VsdGFyIDogXFxuICR7SlNPTi5zdHJpbmdpZnkoZXJyKX1gLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBnZXROZWFyYnlQbGFjZXMobGF0OiBudW1iZXIsIGxuZzogbnVtYmVyLCB0aXBvOiBzdHJpbmcpOiBQcm9taXNlPEZlYXR1cmVbXSB8IG51bGw+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGBodHRwczovL2FwaS5tYXBib3guY29tL3NlYXJjaC9nZW9jb2RlL3Y2L2ZvcndhcmQ/cT0ke3RpcG99JnByb3hpbWl0eT0ke2xuZ30sJHtsYXR9JmNvdW50cnk9Q08mbGFuZ3VhZ2U9ZXMmYWNjZXNzX3Rva2VuPSR7S0VZX01BUEJPWH1gO1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQodXJsKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgaWYgKGRhdGEuZmVhdHVyZXMgJiYgZGF0YS5mZWF0dXJlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuZmVhdHVyZXMubWFwKChmZWF0dXJlOiBhbnkpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgIGdlb21ldHJ5OiBmZWF0dXJlLmdlb21ldHJ5LFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiBmZWF0dXJlLnByb3BlcnRpZXMsXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTm8gbmVhcmJ5IGFkZHJlc3NlcyBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgQXBpQ2xpZW50RXhjZXB0aW9uKFxuICAgICAgICAgICAgICAgIGBFcnJvciBhbCBjb25zdWx0YXI6IFxcbiAke0pTT04uc3RyaW5naWZ5KGVycil9YCxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=