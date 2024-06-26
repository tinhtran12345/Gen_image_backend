import multer from 'multer'
import { staticPath } from './constant'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, staticPath.pdfs)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    },
})

export const upload = multer({ storage })
