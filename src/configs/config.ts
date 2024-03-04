import Joi from "joi";
import EnvConfig from "../types/envConfig";
import * as dotenv from "dotenv";
dotenv.config();
import { validateSchema } from "../utils/validate";
import { OpenAI } from "openai";
import { v2 as cloudinary } from "cloudinary";

const envSchema = Joi.object({
    port: Joi.number().required(),
    dataBaseUrl: Joi.string().messages({
        "any.required": "Provide Mongodb Url",
    }),
    cloudinaryName: Joi.string().messages({
        "any.required": "Provide cloudinaty cloud name",
    }),
    cloudinaryKey: Joi.string().messages({
        "any.required": "Provide cloudinary api key",
    }),
    cloudinarySecret: Joi.string().messages({
        "any.required": "Provide cloudinary api secret",
    }),
    openaiKey: Joi.string().messages({ "any.required": "Provide OpenAI key." }),
});

const envConfigValues = validateSchema(envSchema);

// config env

export const devConfig: EnvConfig = {
    port: envConfigValues.port,
    dataBaseUrl: envConfigValues.dataBaseUrl,
    openApiKey: envConfigValues.openaiKey,
    cloudinary: {
        name: envConfigValues.cloudinaryName,
        apiKey: envConfigValues.cloudinaryKey,
        apiSecret: envConfigValues.cloudinarySecret,
    },
};

// Open AI setup
export const openAI = new OpenAI({
    apiKey: devConfig.openApiKey,
});

// Cloudinary setup

export const cloud = cloudinary.config({
    cloud_name: devConfig.cloudinary.name,
    api_key: devConfig.cloudinary.apiKey,
    api_secret: devConfig.cloudinary.apiSecret,
});
