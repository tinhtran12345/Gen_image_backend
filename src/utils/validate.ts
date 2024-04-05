export const validateSchema = (schema: any) => {
    const { value, error } = schema.validate({
        port: process.env.PORT,
        dataBaseUrl: process.env.DATABASE_URL,
        cloudinaryName: process.env.CLOUD_NAME,
        cloudinaryKey: process.env.API_KEY,
        cloudinarySecret: process.env.API_SECRET,
        // openaiKey: process.env.OPENAI_KEY,
        stableDiffusionKey: process.env.STABLE_DIFFUSION_KEY,
    });

    if (error) {
        console.log(error);
        return;
    }
    return value;
};
