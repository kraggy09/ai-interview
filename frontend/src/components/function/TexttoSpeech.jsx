import { useState } from "react";

const TextToSpeech = () => {
  const [text, setText] = useState("Explain me states and props in reactjs");

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <h1>Text to Speech Example</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={speak}>Speak</button>
    </div>
  );
};

export default TextToSpeech;
