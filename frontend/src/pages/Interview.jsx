import { useLocation, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setQuestions } from "../store/currentInterview";
import { CurrentQuestion } from "../components/ui/CurrentQuestion";

const Interview = () => {
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  // Access the data passed via navigate
  const data = location.state;

  // Logging the received data
  console.log(data.data);

  useEffect(() => {
    // Function to start the camera stream
    const startCamera = async () => {
      try {
        // Request access to the camera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        // Assign the video stream to the video element's source
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        dispatch(
          setQuestions({
            questions: data?.data,
            totalQuestion: data?.data.length - 1,
          })
        );
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    };

    startCamera();

    // Cleanup: Stop the camera stream when the component is unmounted
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        let tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <main className="flex flex-col lg:flex-row">
      <section
        className="min-w-[70vw] lg:min-h-[100vh]"
        aria-label="Interview Details"
      >
        <CurrentQuestion dispatch={dispatch} />
      </section>
      <section
        className="grid lg:grid-cols-1 px-4 py-3 grid-cols-2 gap-6 max-h-[90vh] my-auto mr-6"
        aria-label="Interview and Camera Feed"
      >
        <div
          className="min-w-[90%] lg:min-h-[45vh] flex bg-gray-200 py-5 rounded-lg items-center justify-center"
          aria-label="AI Interview Assistant"
        >
          <span className="p-6 bg-gray-400 rounded-full text-xl font-bold">
            AI
          </span>
        </div>
        <div
          className="min-w-[90%] lg:min-h-[45vh] flex bg-gray-200 py-5 rounded-lg items-center justify-center"
          aria-label="Camera Feed"
        >
          <video
            className="max-w-[90%] rounded-lg"
            ref={videoRef}
            autoPlay
            playsInline
          ></video>
        </div>
      </section>
    </main>
  );
};

export default Interview;
