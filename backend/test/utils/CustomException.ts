// Custom exception
export class CustomException {
    public message: string;
    public statusCode: number;

    constructor(message: string, statusCode: number = 500) {
        this.message = message;
        this.statusCode = statusCode;
    }
}