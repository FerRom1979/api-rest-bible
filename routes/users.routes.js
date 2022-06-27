import { Router } from "express";
import {
  getUsers,
  getUser,
  removeUser,
  updateUser,
} from "../controllers/users.controllers.js";
import { authProtected } from "../middlewares/authProtected.js";
import { checkRol } from "../middlewares/rol.js";

const router = Router();

router.get("/", authProtected, checkRol(["admin"]), getUsers);

router.get("/:id", authProtected, getUser);

router.delete("/:id", authProtected, checkRol(["admin"]), removeUser);

router.put("/:id", authProtected, updateUser);

export default router;
