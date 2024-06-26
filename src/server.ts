import { envConfig } from './configs/config'
import * as dotenv from 'dotenv'
import logger from './middlewares/logger'
import app from './main'

dotenv.config()

const port: number = envConfig.port || 8000

app.listen(port, async () => {
    logger.info(`Server is listening on port ${port}.`)
})
