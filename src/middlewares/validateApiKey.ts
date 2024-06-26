import { NextFunction, Request, Response } from 'express'
import apiKeyService from '../services/apiKeyService'
import handleError from '../exceptions/handleError'
import logger from './logger'

export const validateApiKey = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // validation apikey
    const apiKey = req.header('x-api-key')
    try {
        if (!apiKey) {
            throw new handleError.NotFoundError('ApiKey not found!', 500)
        }
        const checkApiKey = await apiKeyService.findApiKey(apiKey)
        if (!checkApiKey) {
            throw new handleError.UnAuthorizedError('Wrong apiKey!')
        }
        next()
    } catch (error) {
        logger.error(error)
        next(error)
    }
}
