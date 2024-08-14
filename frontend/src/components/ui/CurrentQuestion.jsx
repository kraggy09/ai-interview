import { useSelector } from "react-redux";
import TextToSpeech from "../function/TexttoSpeech";
import { getNextQuestion } from "../../store/currentInterview";
import SpeechToText from "../function/SpeechToText";
import { useState } from "react";

export const CurrentQuestion = ({ dispatch }) => {
  const { questions, currentQuestion } = useSelector(
    (store) => store.currentInterview
  );
  const [transcript, setTranscript] = useState([]);
  return (
    <div>
      <TextToSpeech question={questions[currentQuestion]?.question} />
      {questions[currentQuestion]?.question}
      <button onClick={() => dispatch(getNextQuestion())}>Next</button>
      <SpeechToText transcripts={transcript} setTranscripts={setTranscript} />
    </div>
  );
};
