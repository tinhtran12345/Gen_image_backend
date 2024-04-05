("use strict");

import handleError from "../utils/handleError";
import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import aiModelService from "../services/aiModelService";
import { AIModel } from "../utils/constant";
import imageService from "../services/imageService";
import { convertBufferToImage, generateString } from "../utils/commonFunctions";

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
            const model = new aiModelService.StableDiffusionModel(
                AIModel[1].apiUrl,
                AIModel[1].modelId
            );

            const buffer = await model.Post(prompt);

            const outputFileName = generateString(8);
            const outputFilePath = `public/images/${outputFileName}.jpeg`;
            const saveImage = await convertBufferToImage(
                outputFilePath,
                buffer
            );

            if (saveImage) {
                // upload image on cloud

                const upLoadImage = await cloudinary.uploader.upload(
                    outputFilePath,
                    {
                        public_id: outputFileName,
                        folder: "GanDB",
                    }
                );

                // save image to DB
                const saveImage = await imageService.createImage({
                    prompt,
                    imageUrl: upLoadImage.url,
                });

                return res.status(201).json({
                    code: 201,
                    mes: "Generate Successfully!",
                    data: saveImage,
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
