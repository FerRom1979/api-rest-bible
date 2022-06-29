import { User } from "../models/user.models.js";
import { matchedData } from "express-validator";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

const signup = async (req, res) => {
  try {
    const reqData = matchedData(req);
    const user = await User.findOne({ email: reqData.email });

    if (user) {
      return res.status(400).json({ error: "This user already exists" });
    }

    const userData = new User(reqData);
    const token = generateToken(userData._id);
    await userData.save();

    return res.status(201).json({ data: userData, token });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const accountConfirm = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ email: 2222 });
    console.log({ user });
    if (!user) {
      return res.status(400).json({ error: "This user already exists" });
    }

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = matchedData(req);

    const user = await User.findOne({ email });

    if (!user)
      return res.status(403).json({ error: "This user already exists" });

    const responsePassword = await user.comparePassword(password);

    if (!responsePassword) {
      return res.status(403).json({ error: "Email or password wrong" });
    }
    // general token
    const token = generateToken(user._id);
    // general refresh token in cookie
    generateRefreshToken(user._id, res);

    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json({ error: "Server error err" });
  }
};

const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean();
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

const authRefreshToken = async (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid);

    return res.json({ token, expiresIn });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ logout: "ok" });
};

export { login, signup, infoUser, authRefreshToken, logout, accountConfirm };
