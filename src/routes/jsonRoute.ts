"use strict";

import express, { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";

const router: Router = express.Router();

router.post(
    "/schema",
    asyncHandler(() => {})
);
router.post(
    "/example",
    asyncHandler(() => {})
);
router.post(
    "/analysis",
    asyncHandler(() => {})
);
router.post(
    "/classification",
    asyncHandler(() => {})
);
router.post(
    "/generic-output",
    asyncHandler(() => {})
);

export default router;
