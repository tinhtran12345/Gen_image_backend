"use strict";

import express, { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import pdfParserController from "../controllers/pdfParserController";

const router: Router = express.Router();

router.post("/upload", asyncHandler(pdfParserController.parsePdfFromUpload));

router.post("/url", asyncHandler(pdfParserController.parsePdfFromUrl));

export default router;
