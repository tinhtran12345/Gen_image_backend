import { NextFunction, Request, Response } from "express";

export const validateApiKey = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // validate apikey in there
    next();
};
