import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const TextToSpeech = ({ question, setStartListening, setList }) => {
  const [voice, setVoice] = useState(null);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  useEffect(() => {
    // Function to handle voice selection
    const selectVoice = (voices) => {
      const selectedVoice = voices.find(
        (voice) => voice.name === "Google UK English Female"
      );

      if (selectedVoice) {
        setVoice(selectedVoice);
      } else if (voices.length > 0) {
        // If the desired voice is not found, use the first available voice
        setVoice(voices[0]);
      }
    };

    // Function to handle speech synthesis
    const speak = () => {
      if (voice && question) {
        const utterance = new SpeechSynthesisUtterance(question);
        utterance.voice = voice;

        // Set the `onend` event listener
        utterance.onend = () => {
          setStartListening(true);
          setList(false);
          toast.success("Start Speaking"); // Set `setStartListening` to true when speech ends
        };

        window.speechSynthesis.speak(utterance);
      } else {
        console.log("Voice not selected or question is empty");
      }
    };

    // Check if voices are loaded
    const checkVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        selectVoice(voices);
        setVoicesLoaded(true);
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          const updatedVoices = window.speechSynthesis.getVoices();
          selectVoice(updatedVoices);
          setVoicesLoaded(true);
        };
      }
    };

    checkVoices();

    if (voicesLoaded) {
      speak();
    }

    // Cleanup function to stop speech synthesis if the component unmounts
    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel(); // Cancel all ongoing speech
      }
      setStartListening(false);
    };
  }, [question, voice, voicesLoaded, setStartListening]);

  return <div></div>;
};

TextToSpeech.propTypes = {
  question: PropTypes.string,
  setStartListening: PropTypes.func.isRequired,
  setList: PropTypes.func.isRequired,
};

export default TextToSpeech;
