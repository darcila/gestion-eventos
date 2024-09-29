export interface IDataBase<T> {
    [key: string]: T;
    cloudDb: T;
}
