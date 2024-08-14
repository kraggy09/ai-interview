import { useEffect, useState } from "react";

const TextToSpeech = ({ question }) => {
  const [voice, setVoice] = useState(null);

  useEffect(() => {
    const voices = window.speechSynthesis.getVoices();

    // Set the voice you want, e.g., by name
    const selectedVoice = voices.find(
      (voice) => voice.name === "Google UK English Female"
    );
    setVoice(selectedVoice);

    // Function to speak the text
    const speak = () => {
      if (voice) {
        const utterance = new SpeechSynthesisUtterance(question);
        utterance.voice = voice;
        window.speechSynthesis.speak(utterance);
      }
    };

    speak();

    // Cleanup function to stop speech synthesis if the component unmounts
    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel(); // Cancel all ongoing speech
      }
    };
  }, [question, voice]); // Re-run effect when `question` or `voice` changes

  return <div></div>;
};

export default TextToSpeech;
