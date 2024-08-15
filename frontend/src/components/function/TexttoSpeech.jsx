import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const TextToSpeech = ({ question, setStartListening }) => {
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

        // Set the `onend` event listener
        utterance.onend = () => {
          setStartListening(true); // Set `setStartListening` to true when speech ends
        };

        window.speechSynthesis.speak(utterance);
      }
    };

    speak();

    // Cleanup function to stop speech synthesis if the component unmounts
    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel(); // Cancel all ongoing speech
      }
      setStartListening(false);
    };
  }, [question, voice, setStartListening]); // Re-run effect when `question`, `voice`, or `setStartListening` changes

  return <div></div>;
};

TextToSpeech.propTypes = {
  question: PropTypes.string,
  setStartListening: PropTypes.func.isRequired,
};
export default TextToSpeech;
