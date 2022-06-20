import mongoose from "mongoose";

const { Schema, model } = mongoose;

const questionsSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    responseOne: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    responseTwo: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    responseTree: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    responseCorrect: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    difficulty: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    nameBook: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    /*   uid: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    }, */
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

export const Questions = model("Questions", questionsSchema);
