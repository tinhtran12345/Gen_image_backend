export interface EnvConfig {
    readonly node_env: string
    readonly port: number
    readonly dataBaseUrl: string
    readonly openApiKey: string
    readonly cloudinary: {
        name: string
        apiKey: string
        apiSecret: string
    }
    readonly huggingFaceKey: string
    readonly corsOrigin: string
}
