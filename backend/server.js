import app from "./app.js";
import moment from "moment-timezone";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Get the current date as a string in MM-DD-YYYY format for a specific timezone
const currentDate = moment().tz("America/New_York").format("DD-MM-YYYY");
console.log(currentDate);

app.get("/", (req, res) => {
  return res.status(200).json({
    msg: "Hello World!",
    success: true,
  });
});

// const apiKey = process.env.GEMINI_API_KEY;
const languages = "HTML/CSS,Javascript,ReactJs";
const role = "Frontend";
const lvl = "Fresher(0 to 1 years)";
const difficulty = "easy to medium";
const apiKey = "AIzaSyBbwUXz6S6TjIigaj-9IFb9scpa6yNvY28";
console.log(apiKey);

const prompt = `Generate 15 challenging ${role} developer interview questions suitable for a ${lvl} engineer position. The questions should delve deep into concepts such as architecture, performance optimization, testing, debugging, and problem-solving. Tailor the questions to the ${languages} and other technologies commonly used by a ${role}. They should require a comprehensive understanding of strategies, best practices, and advanced techniques relevant to the ${role} role. Ensure the questions are open-ended and encourage in-depth explanations, without requiring code examples.

the questions must be of the cateory sligtly easy to medium 

Output Format:

Provide the questions in a JSON array with each question as an object containing the following keys:

question: The actual interview question.
difficulty: A rating of the question's difficulty (e.g., "hard", "very hard").
topic: The primary topic covered by the question (e.g., "architecture", "performance optimization").
type: The type of question (e.g., "question", "conceptual discussion")

`;

try {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const response = await result.response.text();
  console.log(response);
} catch (error) {
  console.log(error, "Error");
}

app.listen(8000, () => {
  console.log("App is running at 8000");
});
