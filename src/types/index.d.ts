import { Document } from 'mongoose'

export type ImageInput = {
    prompt: string
    imageUrl: string
}

export type Model = {
    name: string
    apiKey?: string
}

export interface ImageOutput extends Document {
    imageUrl: string
    prompt: string
    createdAt: Date
    updateAt: Date
}

export type RefineParams = {
    chunkSize: number
    overlap: number
}

export type RefineRecap = RefineParams & {
    llmCallCount: number
}
