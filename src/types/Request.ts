export enum Status {
    Success = 0,
    Error = 1,
}

export interface Response<T, E> {
    success: Status;
    data?: T;
    error?: E;
}