"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoiDate = void 0;
const joi_1 = __importDefault(require("joi"));
exports.JoiDate = joi_1.default.alternatives([
    joi_1.default.object().keys({ _seconds: joi_1.default.number(), _nanoseconds: joi_1.default.number() }),
    joi_1.default.date(),
    joi_1.default.string(),
    null,
]).required();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9pRGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9pbmZyYXN0cnVjdHVyZS9hcGkvdXRpbC9Kb2lEYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDhDQUFzQjtBQUNULFFBQUEsT0FBTyxHQUFHLGFBQUcsQ0FBQyxZQUFZLENBQUM7SUFDcEMsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFLEVBQUUsWUFBWSxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO0lBQ3pFLGFBQUcsQ0FBQyxJQUFJLEVBQUU7SUFDVixhQUFHLENBQUMsTUFBTSxFQUFFO0lBQ1osSUFBSTtDQUNQLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBKb2kgZnJvbSAnam9pJztcbmV4cG9ydCBjb25zdCBKb2lEYXRlID0gSm9pLmFsdGVybmF0aXZlcyhbXG4gICAgSm9pLm9iamVjdCgpLmtleXMoeyBfc2Vjb25kczogSm9pLm51bWJlcigpLCBfbmFub3NlY29uZHM6IEpvaS5udW1iZXIoKSB9KSxcbiAgICBKb2kuZGF0ZSgpLFxuICAgIEpvaS5zdHJpbmcoKSxcbiAgICBudWxsLFxuXSkucmVxdWlyZWQoKTtcbiJdfQ==