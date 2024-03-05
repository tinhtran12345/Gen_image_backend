"use strict";

import { model, Schema } from "mongoose";

interface ImageModel {
    prompt: string;
    imageUrl: string;
}

const DOCUMENT_NAME: string = "Image";
const COLLECTION_NAME: string = "Images";

const imageSchema = new Schema<ImageModel>(
    {
        prompt: {
            type: String,
            require: true,
        },
        imageUrl: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

export const imageModel = model<ImageModel>(DOCUMENT_NAME, imageSchema);
