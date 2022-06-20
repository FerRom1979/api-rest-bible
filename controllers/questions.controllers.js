import { Questions } from "../models/questions.models.js";
import { matchedData } from "express-validator";

const createQuestions = async (req, res) => {
  try {
    const reqData = matchedData(req);
    const question = await new Questions(reqData);

    await question.save();

    return res.status(201).json({ question });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

const getQuestions = async (req, res) => {
  try {
    const questions = await Questions.find();
    if (!questions.length > 0) return res.json({ error: "Not Questions" });

    return res.status(200).json({ questions });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

const getQuestionsById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Questions.findById(id);
    if (!question) return res.json({ error: "Not Question" });

    return res.status(200).json({ question });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Error en format id" });
    }
    return res.status(500).json({ error: "Server Error" });
  }
};

const updateQuestionsById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Questions.findByIdAndUpdate(id, req.body);

    if (!question) return res.json({ error: "Not Question" });

    return res.status(200).json({ message: "Questions update" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Error en format id" });
    }
    return res.status(500).json({ error: "Server Error" });
  }
};

const removeQuestionsById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Questions.findById(id);

    if (!question) return res.json({ error: "Not Question" });

    await question.remove();

    return res.status(200).json({ question });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Error en format id" });
    }
    return res.status(500).json({ error: "Server Error" });
  }
};

export {
  createQuestions,
  getQuestions,
  getQuestionsById,
  updateQuestionsById,
  removeQuestionsById,
};
