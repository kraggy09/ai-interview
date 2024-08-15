import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { getNextQuestion, setAnswers } from "../../store/currentInterview";
import PropTypes from "prop-types";

const SpeechToText = ({ startListening }) => {
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState("");

  const { questions, currentQuestion } = useSelector(
    (store) => store.currentInterview
  );
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    setAnswer(transcript);
  }, [transcript]);

  useEffect(() => {
    if (startListening) {
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    } else {
      SpeechRecognition.stopListening();
      resetTranscript();
    }
  }, [startListening, resetTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return <div>Your browser does not support Speech recognition</div>;
  }

  return (
    <div className="flex flex-col gap-y-6">
      <div className="my-3">
        <h2 className="font-semibold">Your Response:</h2>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="max-h-[30vh] md:min-h-[50vh] lg:min-h-[60vh] border-none outline-none min-h-[30vh] min-w-full"
          name="answer"
          id="answer"
          aria-label="Your Response"
        ></textarea>
      </div>
      <div className="flex gap-x-6">
        <button
          onClick={() => {
            SpeechRecognition.startListening({
              continuous: true,
              language: "en-IN",
            });
          }}
          className="bg-green-300 text-green-800 py-2 px-4 rounded-md font-bold"
          aria-label="Start Listening"
        >
          Start Listening
        </button>
        <button
          onClick={() => {
            SpeechRecognition.stopListening();
          }}
          className="bg-red-300 text-red-800 py-2 px-4 rounded-md font-bold"
          aria-label="Stop Listening"
        >
          Stop Listening
        </button>
        <button
          onClick={() => {
            dispatch(
              setAnswers({
                quest: questions[currentQuestion]?.question,
                ans: answer,
              })
            );
            dispatch(getNextQuestion());
          }}
          className="text-white bg-black px-4 py-2 rounded-md font-bold"
          aria-label="Next Question"
        >
          Next
        </button>
      </div>
    </div>
  );
};

SpeechToText.propTypes = {
  startListening: PropTypes.bool.isRequired,
};

export default SpeechToText;
