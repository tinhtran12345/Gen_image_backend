import { Request, Response } from 'express'
import handleError from '../exceptions/handleError'
import logger from '../middlewares/logger'
import jsonService from '../services/jsonService'

class JsonController {
    extractSchema = async (req: Request, res: Response) => {
        const { text, jsonSchema } = req.body

        if (!text || !jsonSchema) {
            throw new handleError.BadRequestError('Missing text or jsonSchema!')
        }

        try {
            const json = await jsonService.extractWithSchema(text, jsonSchema)
            logger.debug(
                'Request for json extraction with schema processed successfully',
            )
            return res.status(200).json({
                code: 200,
                mes: 'Json successfully',
                metaData: json,
            })
        } catch (error) {
            if (error instanceof handleError.ServiceError) {
                logger.error('UnprocessableEntityException thrown')
                throw new handleError.ServiceError(
                    error.message,
                    error.statusCode,
                )
            }
            logger.error(`BadRequestException thrown: ${error}`)
            throw new handleError.ServerError()
        }
    }

    extractExample = async (req: Request, res: Response) => {
        const { text, exampleInput, exampleOutput } = req.body

        if (!text || !exampleInput || !exampleOutput) {
            throw new handleError.BadRequestError('Missing values!')
        }

        try {
            const json = await jsonService.extractWithExample(text, {
                input: exampleInput,
                output: exampleOutput,
            })

            logger.debug(
                "'Request for json extraction with example processed successfully'",
            )
            return res.status(200).json({
                code: 200,
                mes: 'Successfully!',
                metaData: json,
            })
            //
        } catch (error) {
            if (error instanceof handleError.ServiceError) {
                logger.error('UnprocessableEntityException thrown')
                throw new handleError.ServiceError(
                    error.message,
                    error.statusCode,
                )
            }
            logger.error(`BadRequestException thrown: ${error}`)
            throw new handleError.ServerError()
        }
    }

    analyzeJsonOutput = async (req: Request, res: Response) => {
        const { jsonOutput, jsonSchema, originalText } = req.body

        if (!jsonOutput || !jsonSchema || !originalText) {
            throw new handleError.BadRequestError('Missing values!')
        }
        try {
            const json = await jsonService.analyzeJsonOutput(
                jsonOutput,
                originalText,
                jsonSchema,
            )
            logger.debug('Request for analysis processed successfully')
            return res.status(200).json({
                code: 200,
                mes: 'Successfully',
                metaData: json,
            })
        } catch (error) {
            if (error instanceof handleError.ServiceError) {
                logger.error('UnprocessableEntityException thrown')
                throw new handleError.ServiceError(
                    error.message,
                    error.statusCode,
                )
            }
            logger.error(`BadRequestException thrown: ${error}`)
            throw new handleError.ServerError()
        }
    }

    classifyText = async (req: Request, res: Response) => {
        const { categories, text } = req.body
        if (!categories || !text) {
            throw new handleError.BadRequestError('Missing values!')
        }
        try {
            //
            const json = await jsonService.classifyText(text, categories)
            logger.debug('Request for classification processed successfully')
            return res.status(200).json({
                code: 200,
                mes: 'Successfully!',
                metaData: json,
            })
        } catch (error) {
            if (error instanceof handleError.ServiceError) {
                logger.error('UnprocessableEntityException thrown')
                throw new handleError.ServiceError(
                    error.message,
                    error.statusCode,
                )
            }
            logger.error(`BadRequestException thrown: ${error}`)
            throw new handleError.ServerError()
        }
    }

    createGenericOutput = async (req: Request, res: Response) => {
        const { prompt } = req.body
        if (!prompt) {
            throw new handleError.BadRequestError('Missing values!')
        }
        try {
            const json = await jsonService.handleGenericPrompt(prompt)
            logger.debug('Request for generic output processed successfully')
            return res.status(200).json({
                code: 200,
                mes: 'Successfully!',
                metaData: json,
            })
        } catch (error) {
            if (error instanceof handleError.ServiceError) {
                logger.error('UnprocessableEntityException thrown')
                throw new handleError.ServiceError(
                    error.message,
                    error.statusCode,
                )
            }
            logger.error(`BadRequestException thrown: ${error}`)
            throw new handleError.ServerError()
        }
    }
}

export default new JsonController()
