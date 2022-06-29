import mongoose from "mongoose";

const { Schema, model } = mongoose;

const uploadSchema = new Schema(
  {
    url: {
      type: String,
    },
    filename: {
      type: String,
    },
    uid: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Upload = model("Upload", uploadSchema);
