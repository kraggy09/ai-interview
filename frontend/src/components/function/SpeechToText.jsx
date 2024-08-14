import { useState, useEffect } from "react";

function startListening(callback) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true; // Enable continuous listening
  recognition.interimResults = false; // Optional: only return final results

  recognition.onstart = () => {
    console.log("Listening...");
  };

  recognition.onresult = (event) => {
    const transcript = event.results[event.resultIndex][0].transcript;
    console.log("Adding:", transcript);
    callback(transcript);
  };

  recognition.onerror = (event) => {
    console.error("Error occurred in recognition:", event.error);
  };

  recognition.onend = () => {
    console.log("Speech recognition ended.");
    // Restart listening only if not manually stopped
    if (recognition.started) {
      recognition.start();
    }
  };

  recognition.start();
  recognition.started = true; // Custom property to track if recognition has started

  return recognition;
}

function stopListening(recognition) {
  if (recognition) {
    recognition.started = false; // Set to false to prevent auto-restart
    recognition.stop();
    console.log("Listening stopped by user.");
  }
}

const SpeechToText = ({ transcripts, setTranscripts }) => {
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const handleListen = () => {
    if (!listening) {
      const recognitionInstance = startListening((newTranscript) => {
        setTranscripts((prevTranscripts) => [
          ...prevTranscripts,
          newTranscript,
        ]);
      });
      setRecognition(recognitionInstance);
      setListening(true);
    } else {
      stopListening(recognition);
      setListening(false);
      setRecognition(null); // Clear recognition instance when stopped
    }
  };

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      if (recognition) {
        stopListening(recognition);
      }
    };
  }, [recognition]);

  return (
    <div>
      <button onClick={handleListen}>
        {listening ? "Stop Listening" : "Start Listening"}
      </button>
      <div>
        <p>Your responses:</p>
        {transcripts.map((transcript, index) => (
          <p key={index}>{transcript}</p>
        ))}
      </div>
    </div>
  );
};

export default SpeechToText;
