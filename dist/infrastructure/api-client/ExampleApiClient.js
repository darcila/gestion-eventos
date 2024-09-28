"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleApiClient = void 0;
const inversify_1 = require("inversify");
const exceptions_1 = require("@domain/exceptions");
let ExampleApiClient = class ExampleApiClient {
    async get(id) {
        try {
            return { id };
        }
        catch (err) {
            console.error(err);
            throw new exceptions_1.ApiClientException(`Error al consultar la fecha de recaudo al api client: \n ${JSON.stringify(err)}`);
        }
    }
};
exports.ExampleApiClient = ExampleApiClient;
exports.ExampleApiClient = ExampleApiClient = __decorate([
    (0, inversify_1.injectable)()
], ExampleApiClient);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhhbXBsZUFwaUNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbmZyYXN0cnVjdHVyZS9hcGktY2xpZW50L0V4YW1wbGVBcGlDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEseUNBQXVDO0FBQ3ZDLG1EQUF3RDtBQUtqRCxJQUFNLGdCQUFnQixHQUF0QixNQUFNLGdCQUFnQjtJQUN6QixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQVU7UUFDaEIsSUFBSSxDQUFDO1lBQ0QsT0FBTyxFQUFDLEVBQUUsRUFBK0IsQ0FBQztRQUM5QyxDQUFDO1FBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsTUFBTSxJQUFJLCtCQUFrQixDQUN4Qiw0REFBNEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUNwRixDQUFDO1FBQ04sQ0FBQztJQUNMLENBQUM7Q0FDSixDQUFBO0FBWFksNENBQWdCOzJCQUFoQixnQkFBZ0I7SUFENUIsSUFBQSxzQkFBVSxHQUFFO0dBQ0EsZ0JBQWdCLENBVzVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5qZWN0YWJsZSB9IGZyb20gJ2ludmVyc2lmeSc7XG5pbXBvcnQgeyBBcGlDbGllbnRFeGNlcHRpb24gfSBmcm9tICdAZG9tYWluL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHsgRXhhbXBsZUFwaUNsaWVudFJlcG9zaXRvcnkgfSBmcm9tICdAZG9tYWluL3JlcG9zaXRvcnknO1xuaW1wb3J0IHsgSVJlc3BvbnNlQXBpQ2xpZW50IH0gZnJvbSAnQGRvbWFpbi9yZXNwb25zZSc7XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFeGFtcGxlQXBpQ2xpZW50IGltcGxlbWVudHMgRXhhbXBsZUFwaUNsaWVudFJlcG9zaXRvcnkge1xuICAgIGFzeW5jIGdldChpZDogc3RyaW5nKTogUHJvbWlzZTxJUmVzcG9uc2VBcGlDbGllbnQ8c3RyaW5nPj4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHtpZH0gYXMgSVJlc3BvbnNlQXBpQ2xpZW50PHN0cmluZz47XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEFwaUNsaWVudEV4Y2VwdGlvbihcbiAgICAgICAgICAgICAgICBgRXJyb3IgYWwgY29uc3VsdGFyIGxhIGZlY2hhIGRlIHJlY2F1ZG8gYWwgYXBpIGNsaWVudDogXFxuICR7SlNPTi5zdHJpbmdpZnkoZXJyKX1gLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==