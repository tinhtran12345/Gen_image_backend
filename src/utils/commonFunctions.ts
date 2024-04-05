import fs from "node:fs";
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

export const convertBufferToImage = (outputFilePath: string, buffer: any) =>
    new Promise((resolve, reject) => {
        try {
            fs.createWriteStream(outputFilePath).write(buffer);
            setTimeout(() => {
                resolve(true);
            }, 3000);
        } catch (error) {
            reject(false);
        }
    });
