import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  age: {
    type: Number,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: ["user", "admin"],
    default: "user",
  },
  tokenConfirm: {
    type: String,
    default: null,
  },
  accountConfirm: {
    type: Boolean,
    default: false,
  },
  file: [
    {
      type: Schema.Types.ObjectId,
      ref: "Upload",
    },
  ],
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next;
  try {
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password, salt);
    next();
  } catch (error) {
    console.log(error);
    throw new Error("bad hash password");
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcryptjs.compare(candidatePassword, this.password);
};

export const User = model("User", userSchema);
