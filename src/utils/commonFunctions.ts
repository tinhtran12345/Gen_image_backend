import fs from "node:fs";
import fsPromise from "node:fs/promises";
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
    } catch (error) {
        console.log(error);
    }
};
