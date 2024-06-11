import { Request, Response } from "express";
import handleError from "../exceptions/handleError";
import logger from "../middlewares/logger";
import pdfParserService from "../services/pdfParserService";
import multer from "multer";

class PdfParserController {
    parsePdfFromUpload = async (req: Request, res: Response) => {
        const file = req.file;
        if (!file) {
            logger.warn("Please upload file");
            throw new handleError.NotFoundError("Please upload file", 400);
        }
        try {
            const text = await pdfParserService.parserPdf(file.buffer);
            logger.info("PDF Controller successfully parsed!!");
            return res.status(200).json({
                code: 200,
                mes: "PDF Controller successfully parsed!!",
                metaData: {
                    originalUrl: file.originalname,
                    content: text,
                },
            });
        } catch (error) {
            if (error instanceof multer.MulterError) {
                throw new handleError.ServerError(error.message, 503);
            }
        }
    };

    parsePdfFromUrl = async (req: Request, res: Response) => {
        try {
            const { url } = req.body;
            const file = await pdfParserService.loadPdfFromUrl(url);
            const text = await pdfParserService.parserPdf(file);
            return res.status(200).json({
                code: 200,
                mes: "PDF parsed successfully",
                metaData: {
                    originalUrl: url,
                    content: text,
                },
            });
        } catch (error) {
            if (error instanceof handleError.PdfNotParsedError) {
                logger.warn("UnprocessableEntityException thrown");
                throw new handleError.ServerError(error.message, 503);
            }
            logger.error("BadRequestException thrown");
            throw new handleError.ServerError();
        }
    };
}

export default new PdfParserController();
