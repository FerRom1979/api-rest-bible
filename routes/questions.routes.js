import { Router } from "express";
import {
  createQuestions,
  getQuestions,
  getQuestionsById,
  removeQuestionsById,
  updateQuestionsById,
} from "../controllers/questions.controllers.js";
import { authProtected } from "../middlewares/authProtected.js";
import { validatorQuestion } from "../validator/questions.validator.js";

const router = Router();

router.post("/", authProtected, validatorQuestion, createQuestions);

router.get("/", authProtected, getQuestions);

router.get("/:id", authProtected, getQuestionsById);

router.put("/:id", authProtected, updateQuestionsById);

router.delete("/:id", authProtected, removeQuestionsById);

export default router;
