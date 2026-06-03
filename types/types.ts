export interface ErrorOutput {
    message: string,
    errorCode: string
    statusCode: number
}

export type Response<T> = {
    data?: T,
    error?: ErrorOutput
}