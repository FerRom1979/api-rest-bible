import { Router } from "express";
import {
  createQuestions,
  getQuestions,
  getQuestionsById,
  removeQuestionsById,
  updateQuestionsById,
  filtering,
  counter,
  test,
} from "../controllers/questions.controllers.js";
import { authProtected } from "../middlewares/authProtected.js";
import { checkRol } from "../middlewares/rol.js";
import { validatorQuestion } from "../validator/questions.validator.js";

const router = Router();

router.post(
  "/",
  authProtected,
  checkRol(["admin"]),
  validatorQuestion,
  createQuestions
);
router.get("/", authProtected, getQuestions);

router.get("/counter", authProtected, counter);

router.get("/search", authProtected, filtering);

router.get("/:id", authProtected, getQuestionsById);

router.put("/:id", authProtected, checkRol(["admin"]), updateQuestionsById);

router.delete("/:id", authProtected, removeQuestionsById);

export default router;
