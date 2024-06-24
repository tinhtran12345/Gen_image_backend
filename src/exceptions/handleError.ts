("use strict");
import { ReasonStatusCode, StatusCode } from "../utils/constant";

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

class BadRequestError extends ErrorResponse {
    constructor(
        message = ReasonStatusCode.FORBIDDEN,
        statusCode = StatusCode.FORBIDDEN
    ) {
        super(message, statusCode);
    }
}

class ConflictError extends ErrorResponse {
    constructor(
        message = ReasonStatusCode.CONFLICT,
        statusCode = StatusCode.CONFLICT
    ) {
        super(message, statusCode);
    }
}
class UnAuthorizedError extends ErrorResponse {
    constructor(
        message = ReasonStatusCode.UNAUTHORIZED,
        statusCode = StatusCode.UNAUTHORIZED
    ) {
        super(message, statusCode);
    }
}

class ServerError extends ErrorResponse {
    constructor(
        message = ReasonStatusCode.SERVERERROR,
        statusCode = StatusCode.SERVERERROR
    ) {
        super(message, statusCode);
    }
}

class PdfSizeError extends Error {
    constructor(message = ReasonStatusCode.PDFSIZERROR) {
        super(message);
    }
}

class PdfNotParsedError extends Error {
    constructor(message = ReasonStatusCode.PDFNOTPARSEDERROR) {
        super(message);
    }
}

class ServiceError extends ErrorResponse {
    constructor(
        message = ReasonStatusCode.SERVICEUNAVAILABLE,
        statusCode = StatusCode.SERVICEUNAVAILABLE
    ) {
        super(message, statusCode);
    }
}

class RefinePromptInputVariablesError extends Error {
    statusCode: number;
    constructor(promptTemplate: string, missingInputVariables: string) {
        super(
            `${promptTemplate} is missing mandatory input variable: ${missingInputVariables}`
        );
        this.statusCode = StatusCode.SERVICEUNAVAILABLE;
    }
}

export default {
    ErrorResponse,
    NotFoundError,
    BadRequestError,
    UnAuthorizedError,
    ConflictError,
    ServerError,
    PdfSizeError,
    PdfNotParsedError,
    ServiceError,
    RefinePromptInputVariablesError,
};
