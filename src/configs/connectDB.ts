import mongoose from "mongoose";
import { envConfig } from "./config";
import logger from "../middlewares/logger";

class ConnectDB {
    private dataBaseUrl: string;
    private optional: any;

    constructor(dataBaseUrl: string, optional?: {}) {
        this.dataBaseUrl = dataBaseUrl;
        this.optional = optional;
    }

    connect = async (): Promise<void> => {
        mongoose
            .connect(this.dataBaseUrl, this.optional)
            .then(() => {
                logger.info("Database connect successfully!");
            })
            .catch((error) => {
                logger.error(`Database connect error: ${error}`);
                process.exit();
            });
    };

    disConnect = async (): Promise<void> => {
        mongoose
            .disconnect()
            .then(() => {
                logger.info("Disconnected from the database");
            })
            .catch((err) => {
                logger.error(`Error disconnecting from the database: ${err}`);
            });
    };
}

const optional = {
    // useNewUrlParser: true,
    maxPoolSize: 10,
};

export const connectDB = new ConnectDB(envConfig.dataBaseUrl, optional);
