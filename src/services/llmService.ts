import { PromptTemplate } from "@langchain/core/prompts";
import handleError from "../exceptions/handleError";
import { ChainValues } from "@langchain/core/utils/types";
import { Model } from "../types";
import { RecursiveCharacterTextSplitter } from "langchain/dist/text_splitter";
import { ChatOpenAI } from "@langchain/openai";
import logger from "../middlewares/logger";

class LlmService {
    generateOutput = async (
        model: Model,
        promptTemplate: PromptTemplate,
        chainValues: ChainValues,
        debug: boolean
    ) => {
        const llm = this.retrieveAvailableModel(model);
        try {
            await promptTemplate.format(chainValues);
        } catch (e) {
            logger.error("Prompt template doesn't match input variables");
            throw new handleError.ServiceError(
                "Prompt template doesn't match input variables"
            );
        }
    };

    splitDocument = async (
        document: string,
        params: { chunkSize: number; overlap: number }
    ) => {
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: params?.chunkSize,
            chunkOverlap: params?.overlap,
        });

        const output = await splitter.createDocuments([document]);
        logger.info(
            `splitDocument created ${output.length} documents (chunks size: ${params.chunkSize}, overlap: ${params.overlap})`
        );
        return output;
    };

    generateRefineOutput = async (
        model: Model,
        initialPromptTemplate: PromptTemplate,
        refinePromptTemplate: PromptTemplate,
        chainValues: ChainValues & { input_documents: Document[] },
        debug: boolean = false
    ) => {
        const llm = this.retrieveAvailableModel(model);
        if (chainValues["context"] || chainValues["existing_answer"]) {
            // this.logger.error(
            //   "Reserved chain values 'context' & 'existing_answer' can't be used",
            // );
            throw new handleError.ServiceError("context or existing_answer");
        }
        this.throwErrorIfInputVariableMissing(
            "initialPromptTemplate",
            "context",
            initialPromptTemplate.inputVariables
        );

        this.throwErrorIfInputVariableMissing(
            "refinePromptTemplate",
            "context",
            refinePromptTemplate.inputVariables
        );

        this.throwErrorIfInputVariableMissing(
            "refinePromptTemplate",
            "existing_answer",
            refinePromptTemplate.inputVariables
        );
        // const refineChain = loadQARefineChain(llm, {
        //     questionPrompt: initialPromptTemplate,
        //     refinePrompt: refinePromptTemplate,
        // });
        try {
            //
        } catch (error) {
            throw new handleError.ServiceError(
                "Prompt template could not be formatted with provided chain values."
            );
        }
    };

    private throwErrorIfInputVariableMissing = (
        templateName: string,
        variableName: string,
        inputVariables: string[]
    ) => {
        if (!inputVariables.includes(variableName)) {
            // logger.error(
            //   `Input variable ${variableName} is missing from ${templateName}`,
            // );
            throw new handleError.RefinePromptInputVaribalesError(
                templateName,
                variableName
            );
        }
    };

    private retrieveAvailableModel = async (model: Model) => {
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
                const llm = new ChatOpenAI({
                    cache: true,
                    maxConcurrency: 10,
                    maxRetries: 3,
                    modelName: model.name,
                    openAIApiKey: model.apiKey,
                    temperature: 0,
                });
                return llm;
            }
            default: {
                //this.logger.warn(`Model ${model.name} was not found`);
                throw new handleError.ServiceError(
                    `Not available ${model.name} model error`
                );
            }
        }
    };
}

export default new LlmService();
