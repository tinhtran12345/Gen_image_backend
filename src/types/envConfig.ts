type EnvConfig = {
    port: number;
    dataBaseUrl: string;
    openApiKey: string;
    cloudinary: {
        name: string;
        apiKey: string;
        apiSecret: string;
    };
    stableDiffusionKey: string;
};

export default EnvConfig;
