import fs from "node:fs";
import fsPromise from "node:fs/promises";
import logger from "../middlewares/logger";
export const generateString = (length: number): string => {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
    }
    return result;
};

export const convertBufferToImageV1 = (outputFilePath: string, buffer: any) =>
    new Promise((resolve, reject) => {
        try {
            fs.createWriteStream(outputFilePath).write(buffer);
            setTimeout(() => {
                // if (writeFile) {
                //     reject(false);
                // }
                resolve(true);
            }, 5000);
        } catch (error) {
            reject(false);
        }
    });

export const deleteFileLocal = async (filePath: string): Promise<void> => {
    try {
        await fsPromise.unlink(filePath);
        logger.info("PDF file deletes successfully!!");
    } catch (error) {
        logger.error(error);
    }
};

export const genAPIKey = () => {
    //create a base-36 string that contains 30 chars in a-z,0-9
    return [...Array(30)]
        .map((e) => ((Math.random() * 36) | 0).toString(36))
        .join("");
};
