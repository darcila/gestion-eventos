"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreExampleRepository = void 0;
const inversify_1 = require("inversify");
const _configuration_1 = require("@configuration");
const exceptions_1 = require("@domain/exceptions");
let FirestoreExampleRepository = class FirestoreExampleRepository {
    constructor() {
        this.firestore = _configuration_1.DEPENDENCY_CONTAINER.get(_configuration_1.TYPES.Firestore);
        this.collection = 'testing';
    }
    async save(model) {
        try {
            await this.firestore.collection(this.collection).add(Object.assign({}, model));
        }
        catch (err) {
            const error = JSON.parse(JSON.stringify(err));
            console.error(JSON.stringify(error));
            throw new exceptions_1.FirestoreException(error.code, error.message);
        }
    }
};
exports.FirestoreExampleRepository = FirestoreExampleRepository;
exports.FirestoreExampleRepository = FirestoreExampleRepository = __decorate([
    (0, inversify_1.injectable)()
], FirestoreExampleRepository);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlyZXN0b3JlRXhhbXBsZVJlcG9zaXRvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvaW5mcmFzdHJ1Y3R1cmUvcmVwb3NpdG9yaWVzL2ZpcmVzdG9yZS9kYW8vRmlyZXN0b3JlRXhhbXBsZVJlcG9zaXRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEseUNBQXVDO0FBQ3ZDLG1EQUE2RDtBQUk3RCxtREFBd0Q7QUFFakQsSUFBTSwwQkFBMEIsR0FBaEMsTUFBTSwwQkFBMEI7SUFBaEM7UUFDSyxjQUFTLEdBQUcscUNBQW9CLENBQUMsR0FBRyxDQUFZLHNCQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakUsZUFBVSxHQUFHLFNBQVMsQ0FBQztJQVduQyxDQUFDO0lBVEcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFvQjtRQUMzQixJQUFJLENBQUM7WUFDRCxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLG1CQUFNLEtBQUssRUFBRyxDQUFDO1FBQ3ZFLENBQUM7UUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ1gsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDOUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDckMsTUFBTSxJQUFJLCtCQUFrQixDQUFDLEtBQUssQ0FBQyxJQUFtQyxFQUFFLEtBQUssQ0FBQyxPQUFpQixDQUFDLENBQUM7UUFDckcsQ0FBQztJQUNMLENBQUM7Q0FDSixDQUFBO0FBYlksZ0VBQTBCO3FDQUExQiwwQkFBMEI7SUFEdEMsSUFBQSxzQkFBVSxHQUFFO0dBQ0EsMEJBQTBCLENBYXRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5qZWN0YWJsZSB9IGZyb20gJ2ludmVyc2lmeSc7XG5pbXBvcnQgeyBERVBFTkRFTkNZX0NPTlRBSU5FUiwgVFlQRVMgfSBmcm9tICdAY29uZmlndXJhdGlvbic7XG5pbXBvcnQgeyBGaXJlc3RvcmUgfSBmcm9tICdAZ29vZ2xlLWNsb3VkL2ZpcmVzdG9yZSc7XG5pbXBvcnQgeyBFeGFtcGxlUmVwb3NpdG9yeSB9IGZyb20gJ0Bkb21haW4vcmVwb3NpdG9yeSc7XG5pbXBvcnQgeyBFeGFtcGxlRW50aXR5IH0gZnJvbSAnQGRvbWFpbi9lbnRpdGllcyc7XG5pbXBvcnQgeyBGaXJlc3RvcmVFeGNlcHRpb24gfSBmcm9tICdAZG9tYWluL2V4Y2VwdGlvbnMnO1xuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZpcmVzdG9yZUV4YW1wbGVSZXBvc2l0b3J5IGltcGxlbWVudHMgRXhhbXBsZVJlcG9zaXRvcnkge1xuICAgIHByaXZhdGUgZmlyZXN0b3JlID0gREVQRU5ERU5DWV9DT05UQUlORVIuZ2V0PEZpcmVzdG9yZT4oVFlQRVMuRmlyZXN0b3JlKTtcbiAgICBwcml2YXRlIGNvbGxlY3Rpb24gPSAndGVzdGluZyc7XG5cbiAgICBhc3luYyBzYXZlKG1vZGVsOiBFeGFtcGxlRW50aXR5KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmZpcmVzdG9yZS5jb2xsZWN0aW9uKHRoaXMuY29sbGVjdGlvbikuYWRkKHsgLi4ubW9kZWwgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGVycikpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEZpcmVzdG9yZUV4Y2VwdGlvbihlcnJvci5jb2RlIGFzIG51bWJlciB8IHN0cmluZyB8IHVuZGVmaW5lZCwgZXJyb3IubWVzc2FnZSBhcyBzdHJpbmcpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19