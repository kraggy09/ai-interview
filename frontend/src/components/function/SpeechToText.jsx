import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  clearInterview,
  getNextQuestion,
  setAnswers,
} from "../../store/currentInterview";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import { apiUrl } from "../constant";
import { useNavigate } from "react-router-dom";
import { clearInterviewDetails } from "../../store/interviewSlice";

const SpeechToText = ({ startListening }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState("");
  const { data, loading, fetchData } = useFetch(null, null, false); // Initialize with no URL

  const interview = useSelector((store) => store.interview);

  const { questions, currentQuestion, totalQuestion, interviewId } =
    useSelector((store) => store.currentInterview);
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
    <>
      {data ? (
        <div className="fixed inset-0  z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg">
          <h1 className="lg:px-12 px-3 py-6 rounded-lg bg-white">
            Your interview report is ready!!{" "}
            <button
              onClick={() => {
                dispatch(clearInterview());
                dispatch(clearInterviewDetails());
                navigate("/profile");
              }}
              className="bg-black text-white px-3 py-1"
            >
              Click Here
            </button>
          </h1>
        </div>
      ) : loading ? (
        <div className="fixed inset-0  z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div className="bg-white inline-block rounded-lg px-4 py-2">
            <h1 className=" loader2"></h1>
          </div>
        </div>
      ) : (
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
                setAnswer("");
                if (currentQuestion === totalQuestion) {
                  console.log("You have reached the last question");
                  SpeechRecognition.stopListening();

                  const data = {
                    role: interview.role,
                    level: interview.level,
                    questions,
                    interviewId,
                  };
                  fetchData(apiUrl + "interview/evaluateInterview", {
                    method: "POST",
                    data: data,
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                } else {
                  dispatch(getNextQuestion());
                }
              }}
              className="text-white bg-black px-4 py-2 rounded-md font-bold"
              aria-label="Next Question"
            >
              {currentQuestion === totalQuestion ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

SpeechToText.propTypes = {
  startListening: PropTypes.bool.isRequired,
};

export default SpeechToText;
