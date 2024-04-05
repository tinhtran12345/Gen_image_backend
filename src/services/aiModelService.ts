import { devConfig } from "../configs/config";

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

        return buffer;
    };
}

export default {
    StableDiffusionModel,
    BaseModelService,
};
