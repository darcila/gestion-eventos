import { IMemoryDb } from 'pg-mem';

export const connectDB = (dbmem: IMemoryDb) => {
    return dbmem.adapters.createPgPromise();
};
