import EnvConfig from "../types/envConfig";
import * as dotenv from "dotenv";
dotenv.config();
import { validateSchema } from "../utils/validation";
import { v2 as cloudinary } from "cloudinary";

const envValues = (schema: any) => {
    const node_env = process.env.NODE_ENV || "dev";
    let checkSchema;

    switch (node_env) {
        case "dev":
            checkSchema = {
                node_env: process.env.NODE_ENV,
                port: process.env.PORT,
                dataBaseUrl: process.env.DATABASE_URL,
                cloudinaryName: process.env.CLOUD_NAME,
                cloudinaryKey: process.env.API_KEY,
                cloudinarySecret: process.env.API_SECRET,
                // openaiKey: process.env.OPENAI_KEY,
                stableDiffusionKey: process.env.STABLE_DIFFUSION_KEY,
                corsOrigin: process.env.CORS_ORIGIN,
            };
            break;
        case "pro":
            checkSchema = {
                node_env: process.env.NODE_ENV,
                port: process.env.PRO_PORT,
                dataBaseUrl: process.env.PRO_DATABASE_URL,
                cloudinaryName: process.env.PRO_CLOUD_NAME,
                cloudinaryKey: process.env.PRO_API_KEY,
                cloudinarySecret: process.env.PRO_API_SECRET,
                // openaiKey: process.env.OPENAI_KEY,
                stableDiffusionKey: process.env.PRO_STABLE_DIFFUSION_KEY,
                corsOrigin: process.env.PRO_CORS_ORIGIN,
            };
            break;
        case "test":
            checkSchema = {
                node_env: process.env.NODE_ENV,
                port: process.env.TEST_PORT,
                dataBaseUrl: process.env.TEST_DATABASE_URL,
                cloudinaryName: process.env.TEST_CLOUD_NAME,
                cloudinaryKey: process.env.TEST_API_KEY,
                cloudinarySecret: process.env.TEST_API_SECRET,
                // openaiKey: process.env.OPENAI_KEY,
                stableDiffusionKey: process.env.TEST_STABLE_DIFFUSION_KEY,
                corsOrigin: process.env.TEST_CORS_ORIGIN,
            };
            break;
    }

    const { value, error } = schema.validate(checkSchema);

    if (error) {
        console.log(error);
        return;
    }
    return value;
};

const envConfigValues = envValues(validateSchema);

// config env

export const envConfig: EnvConfig = {
    node_env: envConfigValues.node_env,
    port: envConfigValues.port,
    dataBaseUrl: envConfigValues.dataBaseUrl,
    openApiKey: envConfigValues.openaiKey,
    cloudinary: {
        name: envConfigValues.cloudinaryName,
        apiKey: envConfigValues.cloudinaryKey,
        apiSecret: envConfigValues.cloudinarySecret,
    },
    stableDiffusionKey: envConfigValues.stableDiffusionKey,
    corsOrigin: envConfigValues.corsOrigin,
};

// Cloudinary setup
cloudinary.config({
    cloud_name: envConfig.cloudinary.name,
    api_key: envConfig.cloudinary.apiKey,
    api_secret: envConfig.cloudinary.apiSecret,
});
