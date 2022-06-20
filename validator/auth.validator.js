import { check } from "express-validator";
import { validateResults } from "../utils/handleValidator.js";

const validatorRegister = [
  check("name").exists().notEmpty().trim().isLength({ min: 3, max: 99 }),
  check("lastName").exists().notEmpty().trim().isLength({ min: 3, max: 99 }),
  check("age").exists().notEmpty().trim().isNumeric(),
  check("email").exists().notEmpty().trim().isEmail().normalizeEmail(),
  check("password").exists().notEmpty().isLength({ min: 8, max: 15 }),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorLogin = [
  check("email").exists().notEmpty().trim().isEmail().normalizeEmail(),
  check("password").exists().notEmpty().isLength({ min: 8, max: 15 }),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export { validatorLogin, validatorRegister };
