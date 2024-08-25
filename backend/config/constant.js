const experienceLevels = [
  {
    level: "Entry Level",
    range: "0-1 yrs of experience",
    difficulty: "easy to slightly medium",
    questionFocus: "fundamental concepts and basic understanding",
    ratingCriteria: {
      clarity:
        "The answer should clearly demonstrate an understanding of basic concepts.",
      completeness:
        "The answer should cover fundamental aspects of the question.",
      relevance:
        "The answer should be directly related to the question with no off-topic information.",
    },
  },
  {
    level: "Intermediate",
    range: "1-3 yrs of experience",
    difficulty: "medium",
    questionFocus:
      "intermediate concepts, practical application, and problem-solving",
    ratingCriteria: {
      clarity:
        "The answer should be clear and demonstrate practical application of concepts.",
      completeness:
        "The answer should include practical examples and address intermediate-level complexity.",
      relevance:
        "The answer should relate to real-world scenarios and practical problem-solving.",
    },
  },
  {
    level: "Mid-senior",
    range: "3-5 yrs of experience",
    difficulty: "medium to hard",
    questionFocus:
      "in-depth understanding of strategies, design patterns, and optimization",
    ratingCriteria: {
      clarity:
        "The answer should provide a clear explanation of strategies and design patterns.",
      completeness:
        "The answer should include in-depth analysis, examples, and considerations for optimization.",
      relevance:
        "The answer should demonstrate a comprehensive understanding of advanced concepts and their application.",
    },
  },
  {
    level: "Senior",
    range: "5-8 yrs of experience",
    difficulty: "hard",
    questionFocus:
      "advanced techniques, leadership, and industry best practices",
    ratingCriteria: {
      clarity:
        "The answer should be detailed and provide advanced insights into techniques and practices.",
      completeness:
        "The answer should cover advanced concepts, demonstrate leadership qualities, and include best practices.",
      relevance:
        "The answer should reflect deep industry knowledge and practical experience.",
    },
  },
  {
    level: "Senior+",
    range: "8-10 yrs of experience",
    difficulty: "hard to very hard",
    questionFocus:
      "comprehensive understanding, architectural decisions, and complex problem-solving",
    ratingCriteria: {
      clarity:
        "The answer should be highly detailed, with a focus on architectural decisions and complex problem-solving.",
      completeness:
        "The answer should include comprehensive understanding and strategic insights.",
      relevance:
        "The answer should address complex scenarios and reflect extensive experience and leadership.",
    },
  },
  {
    level: "Staff",
    range: "10+ yrs of experience",
    difficulty: "very hard",
    questionFocus:
      "strategic decision-making, system-wide impact, and mentorship",
    ratingCriteria: {
      clarity:
        "The answer should be exceptionally clear and articulate, focusing on strategic and system-wide impacts.",
      completeness:
        "The answer should include strategic decision-making, mentorship insights, and system-wide impact analysis.",
      relevance:
        "The answer should demonstrate high-level strategic thinking and mentorship abilities.",
    },
  },
];
export function generatePrompt(languages, role, level) {
  // console.log();

  const expLevel = experienceLevels.find((el) => {
    return el.level === level;
  });
  // console.log(expLevel);
  // console.log("Languages", languages);
  const langaugeNames = languages.map((lang) => lang.name).join(",");

  const prompt = `Generate 15 ${expLevel.difficulty} ${role} developer interview questions suitable for a ${expLevel.level} position (${expLevel.range}). The questions should delve into ${expLevel.questionFocus} related to ${role} development. Tailor the questions to ${langaugeNames} and other technologies commonly used by a ${role}.
      
      Output Format:
      
      Provide the questions in a JSON array with each question as an object containing the following keys:
      
      question: The actual interview question.
      difficulty: A rating of the question's difficulty (e.g., "easy", "medium", "hard", "very hard").
      topic: The primary topic covered by the question (e.g., "architecture", "performance optimization").
      type: The type of question (e.g., "question", "conceptual discussion").
      `;

  return prompt;
}

export const generateEvaluationPrompt = (questions, level, role) => {
  // Find the experience level details
  const expLevel = experienceLevels.find((el) => el.level === level);

  const prompt = `Evaluate the following interview answers for a ${role} Developer interview suitable for a ${
    expLevel.level
  } position (${
    expLevel.range
  }) with this level of experience. The evaluation should focus on the content and conceptual understanding demonstrated in the answers, particularly in relation to ${
    expLevel.questionFocus
  } within ${role} Development. Please consider the following guidelines:

1. **Ignore code snippets**: This is a voice-based interview that has been transcribed to text. The absence of code snippets should not affect the evaluation or rating.
2. **Disregard language formality**: Do not penalize the candidate for informal language, the use of filler words like "like," or similar expressions, as these are common in spoken language.
3. **Ignore grammatical and spelling errors**: Since the answers were converted from voice to text, do not downgrade the evaluation based on grammar or spelling.
4. **Consider experience level**: For candidates with higher experience, answers should be more elaborative and detailed. Penalize if the answers lack depth or thorough explanations for such candidates. For less experienced candidates, it is not necessary for the answers to be as detailed, and their evaluations should reflect their level of expertise.

Questions:
${questions
  .map(
    (q) => `
  Question: ${q.question}
  Answer: ${q.ans || "No answer provided"}
`
  )
  .join("\n")}

For each question and answer pair, provide the following evaluation in JSON format:

{
  "question": "Question text",
  "feedback": {
    "positive": "Provide what is good about the answer, such as clear explanations, accurate details, or relevant examples.",
    "negative": "Provide what could be improved, focusing on missing details, unclear explanations, or lack of relevance to the question. For experienced candidates, also consider whether the answer is sufficiently detailed."
  },
  "rating": {
    "clarity": 1-10,
    "completeness": 1-10 (for experienced candidates, penalize if the answer lacks detail or depth),
    "relevance": 1-10,
    "average": 1-10
  }
}

- **Clarity**: Rate from 1 to 10 based on how clearly the answer demonstrates an understanding of the relevant concepts for the given level, without considering language formality or grammar.
- **Completeness**: Rate from 1 to 10 based on how thoroughly the answer addresses the question, including appropriate depth and examples for the given level. For experienced candidates, penalize if the answer lacks sufficient detail.
- **Relevance**: Rate from 1 to 10 based on how well the answer relates to the question and meets the expectations for the experience level.
- **Average Rating**: Calculate the average rating based on the scores for clarity, completeness, and relevance.

Ensure that the JSON response is accurate, includes all necessary details, and reflects real-world interview standards for the specified experience level.In the json there should also be the ratings for the languages seperately this should not be included in each one but in the final answer. and also add a comment in the json
`;

  return prompt;
};
