import { User } from "../models/user.models.js";

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(400).json({ error: "Users not found" });
    }
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Error en format id" });
    }
    return res.status(500).json({ error: "Server Error" });
  }
};

const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return res.status(200).json({ message: "User Deleted successfully" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Error en format id" });
    }
    return res.status(500).json({ error: "Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (id !== req.uid) {
      return res
        .status(400)
        .json({
          message:
            "you cannot modify this account because it does not belong to you",
        });
    }
    const { body } = req;

    const user = await User.findByIdAndUpdate(id, body);
    return res.status(200).json({ user });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Error en format id" });
    }
    return res.status(500).json({ error: "Server Error" });
  }
};

export { getUsers, getUser, removeUser, updateUser };
