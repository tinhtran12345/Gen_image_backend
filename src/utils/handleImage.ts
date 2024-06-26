// https://www.digitalocean.com/community/tutorials/how-to-process-images-in-node-js-with-sharp

import sharp from 'sharp'

export const convertBufferToImageAndSave = async (
    outputFilePath: string,
    buffer: any,
): Promise<boolean> => {
    const saveImage = await sharp(buffer).toFile(outputFilePath)

    return saveImage ? true : false
}
