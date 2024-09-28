"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
class Result {
    static ok(data) {
        return {
            isError: false,
            data: data || null,
            timestamp: new Date(),
        };
    }
    static failure(exception) {
        throw exception;
    }
}
exports.Result = Result;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzdWx0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RvbWFpbi9yZXNwb25zZS9SZXN1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBUUEsTUFBYSxNQUFNO0lBQ2YsTUFBTSxDQUFDLEVBQUUsQ0FBSSxJQUFRO1FBQ2pCLE9BQU87WUFDSCxPQUFPLEVBQUUsS0FBSztZQUNkLElBQUksRUFBRSxJQUFJLElBQUksSUFBSTtZQUNsQixTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUU7U0FDeEIsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBTyxDQUFnQixTQUFZO1FBQ3RDLE1BQU0sU0FBUyxDQUFDO0lBQ3BCLENBQUM7Q0FDSjtBQVpELHdCQVlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXhjZXB0aW9uIH0gZnJvbSAnQGRvbWFpbi9leGNlcHRpb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBSZXNwb25zZTxUPiB7XG4gICAgaXNFcnJvcjogYm9vbGVhbjtcbiAgICBkYXRhOiBUO1xuICAgIHRpbWVzdGFtcDogRGF0ZTtcbn1cblxuZXhwb3J0IGNsYXNzIFJlc3VsdCB7XG4gICAgc3RhdGljIG9rPFQ+KGRhdGE/OiBUKTogUmVzcG9uc2U8VCB8IG51bGw+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlzRXJyb3I6IGZhbHNlLFxuICAgICAgICAgICAgZGF0YTogZGF0YSB8fCBudWxsLFxuICAgICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHN0YXRpYyBmYWlsdXJlPEUgPSBFeGNlcHRpb24+KGV4Y2VwdGlvbjogRSk6IEUge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgfVxufVxuIl19