"use strict";

import imageController from "@/controllers/imageController";
import { asyncHandler } from "@/utils/asyncHandler";
import express, { Router } from "express";

const router: Router = express.Router();

router.get("/all", asyncHandler(imageController.fetchImage));

router.post("/generate", asyncHandler(imageController.generateImage));

router.post("/search", asyncHandler(imageController.searchImage));

export default router;
