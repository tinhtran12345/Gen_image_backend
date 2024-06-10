"use strict";

import express, { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import imageController from "../controllers/imageController";

const router: Router = express.Router();

router.get("/all", asyncHandler(imageController.fetchImage));

router.post("/generate", asyncHandler(imageController.generateImage));

router.post("/search", asyncHandler(imageController.searchImage));

export default router;
