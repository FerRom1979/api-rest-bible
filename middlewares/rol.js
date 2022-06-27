import { User } from "../models/user.models.js";

export const checkRol = (roles) => async (req, res, next) => {
  try {
    const { uid } = req;

    const { role } = await User.findById(uid).lean();
    const checkValueRol = roles.some((rol) => role.includes(rol));
    if (!checkValueRol) {
      return res.status(403).json({ error: "user not permission" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};
