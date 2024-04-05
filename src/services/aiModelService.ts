import { devConfig } from "../configs/config";
import { generateString } from "../utils/generateString";
import fs from "node:fs";

class BaseModelService {
    protected apiUrl: string;
    protected modelId: string;
    public constructor(apiUrl: string, modelId: string) {
        this.apiUrl = apiUrl;
        this.modelId = modelId;
    }
}

class StableDiffusionModel extends BaseModelService {
    constructor(apiUrl: string, modelId: string) {
        super(apiUrl, modelId);
    }

    public Post = async (data: string): Promise<any> => {
        const response = await fetch(`${this.apiUrl}/${this.modelId}`, {
            headers: {
                Authorization: `Bearer ${devConfig.stableDiffusionKey}`,
            },

            method: "POST",
            body: JSON.stringify(data),
        });
        // Write and save image
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const outputFileName = generateString(8);
        const outputFilePath = `./public/images/${outputFileName}.jpeg`;
        const saveImage = await fs
            .createWriteStream(outputFilePath)
            .write(buffer);

        return {
            name: outputFileName,
            path: outputFilePath,
            save: saveImage,
        };
    };
}

export default {
    StableDiffusionModel,
    BaseModelService,
};
