type EnvConfig = {
    port: number;
    dataBaseUrl: string;
    openApiKey: string;
    cloudinary: {
        name: string;
        apiKey: string;
        apiSecret: string;
    };
};

export default EnvConfig;
