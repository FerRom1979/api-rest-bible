import { check } from "express-validator";
import { validateResults } from "../utils/handleValidator.js";

const validatorQuestion = [
  check("question").exists().notEmpty().trim().isString(),
  check("responseOne").exists().notEmpty().trim().isString(),
  check("responseTwo").exists().notEmpty().trim().isString(),
  check("responseTree").exists().notEmpty().trim().isString(),
  check("responseCorrect").exists().notEmpty().trim().isString(),
  check("type").exists().notEmpty().trim().isString(),
  check("difficulty").exists().notEmpty().trim().isString(),
  check("nameBook").exists().notEmpty().trim().isString(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export { validatorQuestion };
