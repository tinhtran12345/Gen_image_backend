"use strict";
import handleError from "../utils/handleError";
import { Request, Response } from "express";
class ImageController {
    fetchImage = (req: Request, res: Response) => {
        if (1 === 1) {
            throw new handleError.ErrorResponse("Error", 400);
        }
        res.status(200).json({
            code: 200,
            mes: "Hello world",
        });
    };
}

export default new ImageController();
