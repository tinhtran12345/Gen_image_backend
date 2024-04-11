"use strict";

import express, { Router } from "express";
import imageController from "../controllers/imageController";
import { asyncHandler } from "../utils/asyncHandler";

const router: Router = express.Router();

router.get("/all", asyncHandler(imageController.fetchImage));

router.post("/generate", asyncHandler(imageController.generateImage));

export default router;
