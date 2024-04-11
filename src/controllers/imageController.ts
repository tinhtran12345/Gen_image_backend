("use strict");

import handleError from "../utils/handleError";
import { Request, Response } from "express";
import imageService from "../services/imageService";

class ImageController {
    fetchImage = (req: Request, res: Response) => {
        if (1 === 1) {
            throw new handleError.ErrorResponse("Error", 400);
        }
        return res.status(200).json({
            code: 200,
            mes: "Hello world",
        });
    };

    generateImage = async (req: Request, res: Response, next: any) => {
        const { prompt } = req.body;

        if (!prompt || prompt === "") {
            throw new handleError.BadRequestError("Prompt is required!");
        }

        try {
            const genImage = await imageService.generateImage(prompt);
            if (genImage) {
                return res.status(201).json({
                    code: 201,
                    mes: "Generate Successfully!",
                    metaData: genImage,
                });
            }

            throw new handleError.NotFoundError("Image not found!");
        } catch (error) {
            // console.log(error);
            next(error);
        }
    };
}

export default new ImageController();
