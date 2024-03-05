"use strict";

import express, { Router } from "express";
import imageController from "../controllers/imageController";

const router: Router = express.Router();

router.get("/all", imageController.fetchImage);

router.post("/generate", imageController.fetchImage);

export default router;
