import { Router } from "express";
import {
  infoUser,
  login,
  signup,
  authRefreshToken,
  logout,
  accountConfirm,
} from "../controllers/auth.controllers.js";
import { authProtected } from "../middlewares/authProtected.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import {
  validatorLogin,
  validatorRegister,
} from "../validator/auth.validator.js";

const router = Router();

router.post("/login", validatorLogin, login);

router.post("/signup", validatorRegister, signup);

router.get("/account-confirm/:token", accountConfirm);

router.get("/protected", authProtected, infoUser);

router.get("/logout", logout);

router.get("/refresh", requireRefreshToken, authRefreshToken);

export default router;
