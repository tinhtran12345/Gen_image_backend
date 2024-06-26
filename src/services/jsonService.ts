import { PromptTemplate } from '@langchain/core/prompts'
import handleError from '../exceptions/handleError'
import logger from '../middlewares/logger'
import { RefineParams } from '../types'
import {
    jsonAnalysis,
    jsonClassification,
    jsonOneShotExtraction,
    jsonZeroShotSchemaExtraction,
} from '../utils/prompts'
import llmService from './llmService'

class JsonService {
    private defaultRefineParams: RefineParams = {
        chunkSize: 2000,
        overlap: 100,
    }

    extractWithSchema = async (text: string, schema: string) => {
        try {
            const output = await llmService.generateOutput(
                jsonZeroShotSchemaExtraction,
                {
                    context: text,
                    jsonSchema: schema,
                },
            )

            return output[0]
        } catch (error) {
            logger.error(`Error: ${error}`)
            throw new handleError.ServiceError('The output is not valid JSON')
        }
    }

    extractWithSchemaAndRefine = async () => {}

    extractWithExample = async (
        text: string,
        example: { input: string; output: string },
    ) => {
        try {
            const output = await llmService.generateOutput(
                jsonOneShotExtraction,
                {
                    context: text,
                    exampleInput: example.input,
                    exampleOutput: example.output,
                },
            )

            return output[0]
        } catch (error) {
            logger.error(`Error: ${error}`)
            throw new handleError.ServiceError('The output is not valid JSON')
        }
    }

    analyzeJsonOutput = async (
        jsonOutput: string,
        originalText: string,
        schema: string,
    ) => {
        try {
            //
            const outputFormat = {
                corrections: [
                    {
                        field: 'the field in the generated JSON that needs to be corrected',
                        issue: 'the issue you identified',
                        description:
                            'your description of the issue, give your full reasoning for why it is an issue',
                        suggestion: 'your suggestion for correction',
                    },
                ],
                textAnalysis:
                    'Your detailed and precise analysis, exposing your whole thought process, step by step. Do not provide a corrected JSON output in this field. Generate a readable text in markdown.',
            }

            const output = await llmService.generateOutput(jsonAnalysis, {
                jsonSchema: schema,
                originalText,
                jsonOutput,
                outputFormat: JSON.stringify(outputFormat),
            })

            return output[0]
        } catch (error) {
            logger.error(`Error: ${error}`)
            throw new handleError.ServiceError('The output is not valid JSON')
        }
    }

    classifyText = async (text: string, categories: string[]) => {
        try {
            const outputFormat = {
                classification: 'classification of the text',
                confidence:
                    'number representing your confidence of the classification in percentage. display only the number, not the percentage sign',
            }
            const output = await llmService.generateOutput(jsonClassification, {
                categories,
                text,
                outputFormat: JSON.stringify(outputFormat),
            })
            return output[0]
        } catch (error) {
            logger.error(`Error: ${error}`)
            throw new handleError.ServiceError(
                'classifyText: json parsing failed',
            )
        }
    }

    handleGenericPrompt = async (prompt: string) => {
        try {
            //
            const promptTemplate = new PromptTemplate({
                inputVariables: ['prompt'],
                template: '{prompt}',
            })

            const output = await llmService.generateOutput(promptTemplate, {
                prompt,
            })

            return output[0]
        } catch (error) {
            logger.error(`Error: ${error}`)
            throw new handleError.ServiceError(
                'Something went wrong at json service!',
            )
        }
    }
}

export default new JsonService()
