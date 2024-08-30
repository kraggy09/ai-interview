import { useSelector } from "react-redux";
import TextToSpeech from "../function/TexttoSpeech";
import SpeechToText from "../function/SpeechToText";
import { useState } from "react";

export const CurrentQuestion = () => {
  const { questions, currentQuestion } = useSelector(
    (store) => store.currentInterview
  );
  console.log("Questions", questions);

  const [startListening, setStartListening] = useState(false);
  let currQues = questions[currentQuestion];

  // Ensure topic is a string (join if it's an array)
  const topicText = Array.isArray(currQues?.topic)
    ? currQues.topic.join(", ")
    : currQues?.topic;

  return (
    <div className="px-6 py-6 ">
      <TextToSpeech
        setStartListening={setStartListening}
        question={currQues?.question}
      />
      <h1 className="font-bold">
        {"Q" + (currentQuestion + 1) + ")  "}
        {currQues?.question}?
      </h1>
      <div className="lg:mt-3 flex items-center justify-end lg:justify-start gap-x-6 capitalize font-semibold">
        <span
          className={`py-1 px-2 rounded-xl ${
            currQues?.difficulty === "easy"
              ? "bg-green-300 text-green-800"
              : currQues?.difficulty === "medium"
              ? "bg-yellow-200 text-yellow-600"
              : "bg-red-300 text-red-800"
          }`}
        >
          {currQues?.difficulty}
        </span>
        <span className="py-1 text-gray-600 px-2 rounded-xl bg-gray-200">
          {topicText}
        </span>
      </div>
      <SpeechToText startListening={startListening} />
    </div>
  );
};
