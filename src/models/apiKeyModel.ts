"use strict";

import { model, Schema } from "mongoose";

interface IApiKeyModel {
    // organizationId: string;
    organization: string;
    key: string;
}

const DOCUMENT_NAME: string = "ApiKey";
const COLLECTION_NAME: string = "ApiKeys";

const apiKeySchema = new Schema<IApiKeyModel>(
    {
        // Provider for each organization: a unique apikey => help to call all api

        organization: {
            type: String,
            require: true,
        },

        key: {
            type: String,
            unique: true,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

export const apiKeyModel = model<IApiKeyModel>(DOCUMENT_NAME, apiKeySchema);
