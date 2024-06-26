import { apiKeyModel } from '../models/apiKeyModel'
import { generateKey } from 'node:crypto'
import { genAPIKey } from '../utils/commonFunctions'

class ApiKeyService {
    findApiKey = async (apiKey: string) => {
        const apiKeyExists = await apiKeyModel.findOne({
            key: apiKey,
        })
        return !!apiKeyExists
    }

    createApiKey = async (name: string = 'GenIO'): Promise<any> => {
        const apiKey = await apiKeyModel.create({
            organization: name,
            key: genAPIKey(),
        })
        return apiKey
    }
}

export default new ApiKeyService()
