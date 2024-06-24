import Joi from "joi";

export const validateSchema = Joi.object({
    node_env: Joi.string().valid("pro", "dev", "test").required(),
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
    // openaiKey: Joi.string().messages({ "any.required": "Provide OpenAI key." }),

    huggingFaceKey: Joi.string().required().messages({
        "any.required": "Provide Stable Diffusion Key.",
    }),
    corsOrigin: Joi.string(),
});
