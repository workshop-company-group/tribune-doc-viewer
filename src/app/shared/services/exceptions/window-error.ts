export class WindowError extends Error {
    constructor (public status: number, public message: string) {
        super();
    }
}