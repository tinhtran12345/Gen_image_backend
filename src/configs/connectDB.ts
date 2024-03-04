import mongoose from "mongoose";
import { devConfig } from "./config";

export const connectDB = (): void => {
    mongoose
        .connect(devConfig.dataBaseUrl, {})
        .then(() => {
            console.log("Database connect successfully!");
        })
        .catch((error) => {
            console.log("Database connect error", error);
            process.exit();
        });
};
