"use strict";

import { model, Schema } from "mongoose";

interface IApiKeyModel {
    userId: string;
    key: string;
}

const DOCUMENT_NAME: string = "ApiKey";
const COLLECTION_NAME: string = "ApiKeys";

const apiKeySchema = new Schema<IApiKeyModel>(
    {
        key: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

export const apiKeyModel = model<IApiKeyModel>(DOCUMENT_NAME, apiKeySchema);
