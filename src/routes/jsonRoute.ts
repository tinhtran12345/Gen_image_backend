"use strict";

import express, { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import jsonController from "../controllers/jsonController";

const router: Router = express.Router();

router.post("/schema", asyncHandler(jsonController.extractSchema));
router.post("/example", asyncHandler(jsonController.extractExample));
router.post("/analysis", asyncHandler(jsonController.analyzeJsonOutput));
router.post("/classification", asyncHandler(jsonController.classifyText));
router.post(
    "/generic-output",
    asyncHandler(jsonController.createGenericOutput)
);

export default router;
