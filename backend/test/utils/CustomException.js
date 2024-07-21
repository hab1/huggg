"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomException = void 0;
// Custom exception
class CustomException {
    constructor(message, statusCode = 500) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.CustomException = CustomException;
