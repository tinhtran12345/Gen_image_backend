import mongoose from "mongoose";
import { devConfig } from "./config";

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
                console.log("Database connect successfully!");
            })
            .catch((error) => {
                console.log("Database connect error", error);
                process.exit();
            });
    };

    disConnect = async (): Promise<void> => {
        mongoose
            .disconnect()
            .then(() => {
                console.log("Disconnected from the database");
            })
            .catch((err) => {
                console.error("Error disconnecting from the database", err);
            });
    };
}

// export const connectDB = (): any => {
//     mongoose
//         .connect(devConfig.dataBaseUrl, {})
//         .then(() => {
//             console.log("Database connect successfully!");
//         })
//         .catch((error) => {
//             console.log("Database connect error", error);
//             process.exit();
//         });
// };

const optional = {
    // useNewUrlParser: true,
    maxPoolSize: 10,
};

export const connectDB = new ConnectDB(devConfig.dataBaseUrl, optional);
