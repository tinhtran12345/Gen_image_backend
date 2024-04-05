import { imageModel } from "../models/imageModel";
import { ImageInput } from "../types/imageType";

class ImageService {
    findAllImages = async (limit: number, skip: number): Promise<unknown[]> => {
        return await imageModel
            .find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
    };

    createImage = async (input: ImageInput): Promise<unknown> => {
        const newImage = await imageModel.create({
            ...input,
        });
        return newImage;
    };
}

export default new ImageService();
