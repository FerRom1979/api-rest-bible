import { Router } from "express";
import { upload } from "../controllers/upload.controllers.js";
import { uploadMiddleware } from "../libs/storage.js";
import { authProtected } from "../middlewares/authProtected.js";

const router = Router();

router.post("/", authProtected, uploadMiddleware.single("myFile"), upload);

export default router;
