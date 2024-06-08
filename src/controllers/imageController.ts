("use strict");

import { Request, Response } from "express";
import imageService from "../services/imageService";
import handleError from "../utils/handleError";

class ImageController {
    fetchImage = async (req: Request, res: Response) => {
        try {
            const page = req.query["page"] || 1;
            const limit = req.query["limit"] || 8;
            const skip = Number(limit) * Number(page) - 1;
            const images = await imageService.findAllImages(+limit, skip);

            return res.status(200).json({
                code: 201,
                mes: "Successfully!",
                metaData: images,
            });
        } catch (error) {
            console.log(error);
            throw new handleError.ServerError();
        }
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

    searchImage = async (req: Request, res: Response) => {};
}

export default new ImageController();
