export const SIZE = {
    Small: "Small",
    Medium: "Medium",
    Large: "Large",
};

export const StatusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409,
    UNAUTHORIZED: 401,
    NOTFOUND: 404,
    SERVERERROR: 500,
    SERVICEUNAVAILABLE: 503,
};

export const ReasonStatusCode = {
    FORBIDDEN: "Bad request error",
    CONFLICT: "Conflict error",
    UNAUTHORIZED: "Unauthorized",
    NOTFOUND: "Not found",
    SERVERERROR: "Something went wrong!",
    PDFSIZERROR: "The PDF file is larger than 5MB",
    PDFNOTPARSEDERROR:
        "The PDF file could not be parsed. It may not contain plain text or information in text format.",
    SERVICEUNAVAILABLE: "Service Unavailable",
};

export const staticPath = {
    images: "public/images/",
    pdfs: "public/pdfs/",
};

export const Header = {};

export const AIModel = [
    {
        id: 1,
        apiUrl: "https://api-inference.huggingface.co/models/stabilityai",
        modelId: "stable-diffusion-2-1",
    },
    {
        id: 2,
        apiUrl: "https://api-inference.huggingface.co/models/runwayml",
        modelId: "stable-diffusion-v1-5",
    },
    {
        id: 3,
        apiUrl: "https://api-inference.huggingface.co/models/prompthero",
        modelId: "openjourney",
    },
];
