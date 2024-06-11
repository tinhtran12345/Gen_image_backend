import { Poppler } from "node-poppler";
import logger from "../middlewares/logger";
import handleError from "../exceptions/handleError";
import axios from "axios";

class PdfParserService {
    // parser pdf to text
    parserPdf = async (file: Buffer) => {
        const poppler = new Poppler();
        const options = {
            maintainLayout: true,
            quiet: true,
        };
        const output = (await poppler.pdfToText(
            file,
            undefined,
            options
        )) as any;

        if (output.length === 0) {
            logger.warn("PDF not parsed");
            throw new handleError.PdfNotParsedError();
        }
        logger.info("PDF parsed successfully");
        return this.postProcessText(output);
    };
    // handle Text
    postProcessText = (text: string) => {
        const processedText = text
            .split("\n")
            //trim each line
            .map((line) => line.trim())
            //keep only one line if multiple lines are empty
            .filter((line, index, arr) => line !== "" || arr[index - 1] !== "")
            //remove whitespace in lines if there are more than 3 spaces
            .map((line) => line.replace(/\s{3,}/g, "   "))
            .join("\n");

        return processedText;
    };

    // upload image => load pdf from url => buffer => parserPdf => text

    loadPdfFromUrl = async (url: string) => {
        const response = await axios({
            url,
            method: "GET",
            responseType: "arraybuffer",
        });
        if (response.headers["content-length"] > 5 * 1024 * 1024) {
            logger.warn("PDF size over 5MB");
            throw new handleError.PdfSizeError();
        }
        return Buffer.from(response.data, "binary");
    };
}

export default new PdfParserService();
