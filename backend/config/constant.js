export function generatePrompt(languages, role, level) {
  // console.log();

  const experienceLevels = [
    {
      level: "Entry Level",
      range: "0-1 yrs of experience",
      difficulty: "easy to slightly medium",
      questionFocus: "fundamental concepts and basic understanding",
    },
    {
      level: "Intermediate",
      range: "1-3 yrs of experience",
      difficulty: "medium",
      questionFocus:
        "intermediate concepts, practical application, and problem-solving",
    },
    {
      level: "Mid-senior",
      range: "3-5 yrs of experience",
      difficulty: "medium to hard",
      questionFocus:
        "in-depth understanding of strategies, design patterns, and optimization",
    },
    {
      level: "Senior",
      range: "5-8 yrs of experience",
      difficulty: "hard",
      questionFocus:
        "advanced techniques, leadership, and industry best practices",
    },
    {
      level: "Senior+",
      range: "8-10 yrs of experience",
      difficulty: "hard to very hard",
      questionFocus:
        "comprehensive understanding, architectural decisions, and complex problem-solving",
    },
    {
      level: "Staff",
      range: "10+ yrs of experience",
      difficulty: "very hard",
      questionFocus:
        "strategic decision-making, system-wide impact, and mentorship",
    },
  ];

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
