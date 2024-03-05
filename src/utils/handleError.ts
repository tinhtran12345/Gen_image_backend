"use strict";
import { ReasonStatusCode, StatusCode } from "./constant";

class ErrorResponse extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

class NotFoundError extends ErrorResponse {
    constructor(
        message = ReasonStatusCode.NOTFOUND,
        statusCode = StatusCode.NOTFOUND
    ) {
        super(message, statusCode);
    }
}

export default {
    ErrorResponse,
    NotFoundError,
};
