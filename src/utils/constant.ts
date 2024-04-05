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
};

export const ReasonStatusCode = {
    FORBIDDEN: "Bad request error",
    CONFLICT: "Conflict error",
    UNAUTHORIZED: "Unauthorized",
    NOTFOUND: "Not found",
    SERVERERROR: "Something went wrong!",
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
];
