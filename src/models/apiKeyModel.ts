"use strict";

import { model, Schema } from "mongoose";

interface IApiKeyModel {
    // organizationId: string;
    key: string;
}

const DOCUMENT_NAME: string = "ApiKey";
const COLLECTION_NAME: string = "ApiKeys";

const apiKeySchema = new Schema<IApiKeyModel>(
    {
        // Provider for each organization: a unique apikey => help to call all api
        // organizationId: {
        //     type: String,
        //     require: true,
        // },

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
