import { GoogleGenerativeAI } from "@google/generative-ai";
import { generatePrompt } from "../config/constant.js";

export const generateInterview = async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;

  const { languages, role, level } = req.body.data;

  const prompt = generatePrompt(languages, role, level);

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    const responseText = await result.response.text();

    const cleanedResponseText = responseText.trim().slice(7, -3);

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(cleanedResponseText);
    } catch (parseError) {
      console.error("Failed to parse response as JSON:", parseError);
    }

    return res.status(200).json({ data: jsonResponse, success: true });
  } catch (error) {
    // Send an error response
    return res.status(500).json({ error: error.message, success: false });
  }
};
