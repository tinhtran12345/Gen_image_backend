import { apiKeyModel } from "../models/apiKeyModel";

class ApiKeyService {
    validateApiKey = async (apiKey: string) => {
        const apiKeyExists = await apiKeyModel.findOne({
            key: apiKey,
        });
        return !!apiKeyExists;
    };

    createApiKey = async () => {
        return;
    };
}

export default new ApiKeyService();
