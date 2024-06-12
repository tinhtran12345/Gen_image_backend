"use strict";

import express, { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import pdfParserController from "../controllers/pdfParserController";
import { upload } from "../utils/multerStorage";

const router: Router = express.Router();

router.post(
    "/upload",
    upload.single("files"),

    asyncHandler(pdfParserController.parsePdfFromUpload)
);

router.post("/url", asyncHandler(pdfParserController.parsePdfFromUrl));

export default router;
