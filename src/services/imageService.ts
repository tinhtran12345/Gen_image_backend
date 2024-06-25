import { v2 as cloudinary } from "cloudinary";

import aiModelService from "./aiModelService";
import { imageModel } from "../models/imageModel";
import { deleteFileLocal, generateString } from "../utils/commonFunctions";
import { convertBufferToImageAndSave } from "../utils/handleImage";
import { ImageInput } from "../types";
import { HuggingFaceModel } from "../utils/constant";

class ImageService {
    findAllImages = async (limit: number, skip: number): Promise<unknown[]> => {
        return await imageModel
            .find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
    };

    createDocumentImage = async (input: ImageInput): Promise<unknown> => {
        const newImage = await imageModel.create({
            ...input,
        });
        return newImage;
    };

    generateImage = async (prompt: string): Promise<any> => {
        const { apiUrl, modelId } = HuggingFaceModel.stableDiffusion1;
        const model = new aiModelService.StableDiffusionModel(apiUrl, modelId);
        const outputFileName = generateString(8);
        const outputFilePath = `public/images/${outputFileName}.jpeg`;
        const buffer = await model.Post(prompt);

        // convert buffer to image files
        const saveImage = await convertBufferToImageAndSave(
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

            // delete file in local
            await deleteFileLocal(outputFilePath);

            // save image to DB
            const newImage = await this.createDocumentImage({
                prompt,
                imageUrl: upLoadImage.url,
            });
            return newImage;
        }
    };

    resizeAndConvertTypeImage = async (imagePath: string) => {};

    removeBackgroundImage = async (imagePath: string) => {};
}

export default new ImageService();
