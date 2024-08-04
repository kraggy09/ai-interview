function startListening(callback) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.onstart = () => console.log("Listening...");

  recognition.onspeechend = () => recognition.stop();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    callback(transcript);
  };

  recognition.onerror = (event) =>
    console.error("Error occurred in recognition:", event.error);

  recognition.start();
}

// Example usage in a React component:
import { useState } from "react";

const SpeechToText = () => {
  const [transcript, setTranscript] = useState("");

  const handleListen = () => {
    startListening(setTranscript);
  };

  return (
    <div>
      <button onClick={handleListen}>Start Listening</button>
      <p>Your response: {transcript}</p>
    </div>
  );
};

export default SpeechToText;
