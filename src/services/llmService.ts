import { PromptTemplate } from "@langchain/core/prompts";
import { ChainValues } from "langchain/dist/schema";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import logger from "../middlewares/logger";
import handleError from "../exceptions/handleError";
import { ChatAnthropic } from "@langchain/anthropic";
import aiModelService from "./aiModelService";
import { HuggingFaceModel } from "../utils/constant";
import { Model } from "../types";
import { log } from "console";

class LlmService {
    splitDocument = async (
        text: string,
        params: {
            chunkSize: number;
            chunkOverlap: number;
        }
    ) => {
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: params.chunkSize,
            chunkOverlap: params.chunkOverlap,
        });
        const output = await splitter.createDocuments([text]);
        return output;
    };

    retrieveModelFromOpenAI = async (model: Model) => {
        switch (model.name) {
            case "gpt-3.5-turbo":
            case "gpt-3.5-turbo-16k":
            case "gpt-4": {
                if (!model.apiKey) {
                    //this.logger.warn(`Missing API key for ${model.name} model`);
                    throw new handleError.ServiceError(
                        `API key for model ${model.name} is missing.`
                    );
                }
                const llm = new ChatAnthropic({
                    temperature: 0.9,
                    model: model.name,
                    apiKey: model.apiKey,
                    maxTokens: 1024,
                });
                return llm;
            }
            default: {
                logger.warn(`Model ${model.name} was not found`);
                throw new handleError.ServiceError(
                    `Not available ${model.name} model error`
                );
            }
        }
    };

    generateOutput = async (
        promptTemplate: PromptTemplate,
        chainValues: ChainValues
    ) => {
        const { apiUrl, modelId } = HuggingFaceModel.metaLLM;
        // retrieve model
        const llm = new aiModelService.MetaLLModel(apiUrl, modelId);
        try {
            const prompt = await promptTemplate.format(chainValues);
            const output = await llm.Post(prompt);
            return output;
        } catch (error) {
            logger.error(`Something went wrong!: ${error}`);
            throw new handleError.ServiceError();
        }
    };
}

export default new LlmService();
