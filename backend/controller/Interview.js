import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  generateEvaluationPrompt,
  generatePrompt,
} from "../config/constant.js";
import Interview from "../model/Interview.js";
import Question from "../model/Question.js";

export const generateInterview = async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res
      .status(500)
      .json({ error: "API key is missing", success: false });
  }

  const { languages, role, level } = req.body;
  const prompt = generatePrompt(languages, role, level);

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    const responseText = await result.response.text();
    console.log("Raw API Response:", responseText);

    // Clean the response text as necessary
    const cleanedResponseText = responseText.trim().slice(7, -3);

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(cleanedResponseText);
    } catch (parseError) {
      return res
        .status(400)
        .json({ error: "Failed to parse API response", success: false });
    }

    const userId = req.userId;
    const interview = await Interview.create({
      user: userId,
      role: role,
      skills: languages,
      level: level,
    });

    console.log("Interview created with ID:", interview._id);

    for (const q of jsonResponse) {
      await Question.create({
        difficulty: q.difficulty,
        question: q.question,
        interview: interview._id,
        topic: q.topic,
        questionType: q.type,
      });
    }

    return res
      .status(201)
      .json({ data: jsonResponse, success: true, interview });
  } catch (error) {
    console.error("Error in generateInterview:", error.message);
    return res.status(500).json({ error: error.message, success: false });
  }
};

export const evaluateInterview = async (req, res) => {
  let { role, level, questions, interviewId } = req.body;

  const apiKey = process.env.GEMINI_API_KEY;

  const interview = await Interview.findById(interviewId);
  if (!interview) {
    return res.status(404).json({
      msg: "Interview not found for evaluation",
      success: false,
    });
  }

  if (!apiKey) {
    return res
      .status(500)
      .json({ error: "API key is missing", success: false });
  }

  if (!role) {
    role = interview.role;
    level = interview.level;
  }

  try {
    const prompt = generateEvaluationPrompt(questions, level, role);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    const responseText = await result.response.text();
    console.log("Evaluation Response Text:", responseText);
    const cleanedResponseText = responseText.trim().slice(7, -3);

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(cleanedResponseText);
    } catch (parseError) {
      return res
        .status(400)
        .json({ error: "Failed to parse API response", success: false });
    }
    let questionResponse =
      jsonResponse.questions_and_answers || jsonResponse.questions;
    let avgRating = 0;
    for (let i = 0; i < questionResponse.length; i++) {
      let ans = questions[i].ans;
      let saved = questionResponse[i];
      avgRating += saved.rating.average;
      let savedQuestion = await Question.findOneAndUpdate(
        {
          question: saved.question,
        },
        {
          answer: ans || "No answer",
          rating: saved.rating,
          feedback: saved.feedback,
        }
      );
    }
    avgRating /= 15;
    let finalInterview = await Interview.findByIdAndUpdate(interviewId, {
      interviewStage: "Completed",
      skills: jsonResponse.languages,
      comment: jsonResponse.comment,
      overallGrade: avgRating,
    });
    return res.status(200).json({
      msg: "Successfully Evaluated the candidate",
      success: true,
      data: finalInterview,
    });
  } catch (error) {
    console.error("Error in evaluateInterview:", error.message);
    return res.status(500).json({ error: error.message, success: false });
  }
};
export const getCompletedInterviews = async (req, res) => {
  const userId = req.userId;
  console.log(userId);
  if (!userId) {
    return res.status(404).json({
      msg: "User not found",
      success: false,
    });
  }

  const interviews = await Interview.find({
    user: userId,
    interviewStage: "Completed",
  }).sort({
    createdAt: -1,
  });

  return res.status(200).json({
    success: true,
    msg: "User found successfully",
    interviews,
  });
};

export const getOngoingInterview = async (req, res) => {
  const userId = req.userId;
  console.log(userId);
  if (!userId) {
    return res.status(404).json({
      msg: "User not found",
      success: false,
    });
  }

  const interviews = await Interview.find({
    user: userId,
    interviewStage: "Interviewing",
  }).sort({
    createdAt: -1,
  });

  return res.status(200).json({
    success: true,
    msg: "User found successfully",
    interviews,
  });
};

export const getSingleInterview = async (req, res) => {
  const interviewId = req.params.id;
  console.log(interviewId);

  try {
    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({
        success: false,
        msg: "Unable to find the interview! You are looking for",
      });
    }
    const questions = await Question.find({ interview: interviewId }).sort({
      createdAt: 1,
    });

    let question = [];
    for (let q of questions) {
      let newObj = {
        difficulty: q.difficulty,
        question: q.question,
        topic: q.topic,
        type: q.questionType,
      };
      question.push(newObj);
    }
    return res.status(200).json({
      success: true,
      msg: "We have got the interview",
      data: question,
      interview,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
};

export const getInterviewReport = async (req, res) => {
  const interviewId = req.params.id;
  console.log(interviewId);
  if (!interviewId) {
    return res.status(400).json({
      msg: "No interview provided",
      success: false,
    });
  }

  try {
    let interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({
        msg: "No interview found",
        success: false,
      });
    }

    let questions = await Question.find({ interview: interviewId });
    if (!questions) {
      return res.status(404).json({
        success: false,
        msg: "No questions found for this interview",
      });
    }
    let report = {
      interview,
      questions,
    };

    return res.status(200).json({
      success: true,
      data: report,
      msg: "Successfully found the interview report card",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message || "Server Error",
    });
  }
};
