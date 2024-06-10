import { envConfig } from "./configs/config";
import app from "./main";
import * as dotenv from "dotenv";
import logger from "./middlewares/logger";
dotenv.config();

const port: number = envConfig.port || 8000;

app.listen(port, async () => {
    logger.info(`Server is listening on port ${port}.`);
});
