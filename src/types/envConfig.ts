type EnvConfig = {
    port: string;
    dataBaseUrl: string;
    openApiKey: string;
    cloudinary: {
        name: string;
        apiKey: string;
        apiSecret: string;
    };
};

export default EnvConfig;
