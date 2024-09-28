"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleAppService = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const entities_1 = require("@domain/entities");
const services_1 = require("@domain/services");
const response_1 = require("@domain/response");
let ExampleAppService = class ExampleAppService {
    async example() {
        const example = entities_1.ExampleEntity.create('123', 'Daniel');
        const length = (0, services_1.calculateNameLength)(example.name);
        const result = length <= 4 ? `You're weird` : `You're incredible`;
        return response_1.Result.ok(result);
    }
};
exports.ExampleAppService = ExampleAppService;
exports.ExampleAppService = ExampleAppService = __decorate([
    (0, inversify_1.injectable)()
], ExampleAppService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhhbXBsZUFwcFNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwbGljYXRpb24vc2VydmljZXMvRXhhbXBsZUFwcFNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EseUNBQXVDO0FBQ3ZDLDRCQUEwQjtBQUMxQiwrQ0FBaUQ7QUFDakQsK0NBQXVEO0FBQ3ZELCtDQUFvRDtBQUc3QyxJQUFNLGlCQUFpQixHQUF2QixNQUFNLGlCQUFpQjtJQUMxQixLQUFLLENBQUMsT0FBTztRQUNULE1BQU0sT0FBTyxHQUFHLHdCQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN0RCxNQUFNLE1BQU0sR0FBRyxJQUFBLDhCQUFtQixFQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDO1FBQ2xFLE9BQU8saUJBQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0IsQ0FBQztDQUNKLENBQUE7QUFQWSw4Q0FBaUI7NEJBQWpCLGlCQUFpQjtJQUQ3QixJQUFBLHNCQUFVLEdBQUU7R0FDQSxpQkFBaUIsQ0FPN0IiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IGluamVjdGFibGUgfSBmcm9tICdpbnZlcnNpZnknO1xuaW1wb3J0ICdyZWZsZWN0LW1ldGFkYXRhJztcbmltcG9ydCB7IEV4YW1wbGVFbnRpdHkgfSBmcm9tICdAZG9tYWluL2VudGl0aWVzJztcbmltcG9ydCB7IGNhbGN1bGF0ZU5hbWVMZW5ndGggfSBmcm9tICdAZG9tYWluL3NlcnZpY2VzJztcbmltcG9ydCB7IFJlc3VsdCwgUmVzcG9uc2UgfSBmcm9tICdAZG9tYWluL3Jlc3BvbnNlJztcbi8vY20tbWlkZGxld2FyZS1jbGllbnRlcy1tc1xuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEV4YW1wbGVBcHBTZXJ2aWNlIHtcbiAgICBhc3luYyBleGFtcGxlKCk6IFByb21pc2U8UmVzcG9uc2U8c3RyaW5nIHwgbnVsbD4+IHtcbiAgICAgICAgY29uc3QgZXhhbXBsZSA9IEV4YW1wbGVFbnRpdHkuY3JlYXRlKCcxMjMnLCAnRGFuaWVsJyk7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IGNhbGN1bGF0ZU5hbWVMZW5ndGgoZXhhbXBsZS5uYW1lKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbGVuZ3RoIDw9IDQgPyBgWW91J3JlIHdlaXJkYCA6IGBZb3UncmUgaW5jcmVkaWJsZWA7XG4gICAgICAgIHJldHVybiBSZXN1bHQub2socmVzdWx0KTtcbiAgICB9XG59XG4iXX0=