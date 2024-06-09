import { NextFunction, Request, Response } from "express";
import apiKeyService from "../services/apiKeyService";
import handleError from "../utils/handleError";
import aiModelService from "../services/aiModelService";

export const validateApiKey = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // validation apikey
    let apiKey = req.header("x-api-key");
    try {
        if (!apiKey) {
            throw new handleError.NotFoundError("ApiKey not found!", 500);
        }
        const checkApiKey = await apiKeyService.findApiKey(apiKey);
        if (!checkApiKey) {
            throw new handleError.UnAuthorizedError("Wrong apiKey!");
        }
        next();
    } catch (error) {
        next(error);
    }
};
