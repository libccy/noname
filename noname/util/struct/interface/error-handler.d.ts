
export interface ErrorHandler {
    onLoad?(): void | Promise<void>

    onHandle?(event: PromiseRejectionEvent): void | Promise<void>

    onErrorPrepare?(): void

    onErrorFinish?(): void
}
