import PropTypes from "prop-types";
import { useState } from "react";
import ReactDOM from "react-dom";
import { FaArrowRight } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setInterviewDetails } from "../../store/interviewSlice";

const Category = ({ open, setOpen, setSelected, interview }) => {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [currentSelection, setCurrentSelection] = useState(null);
  let dispatch = useDispatch();
  const interviews = [
    {
      img: "https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/frontend.svg",
      name: "Frontend",
    },
    {
      img: "https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/backend.svg",
      name: "Backend",
    },
    {
      img: "https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/fullstack.svg",
      name: "Fullstack",
    },
    {
      img: "https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/android.svg",
      name: "Android",
    },
    {
      img: "https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/data-science.svg",
      name: "Data Science",
    },
    {
      img: "https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/ml-ai.svg",
      name: "ML/AI",
    },
    {
      img: "https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/react.svg",
      name: "React Native",
    },
    {
      img: "https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/flutter.svg",
      name: "Flutter",
    },
    {
      img: "https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/ios.svg",
      name: "IOS",
    },
    {
      img: "https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/data-engineering.svg",
      name: "Data Engineering",
    },
  ];

  if (!open) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed top-0 right-0 bg-white min-w-full min-h-full z-30">
      <div className="relative flex-col flex items-center justify-center">
        <h1 className="md:pt-16 pt-6 text-2xl px-6 font-semibold text-center">
          Practice 1:1 interviews with AI
        </h1>
        <h2 className="text-center my-2">
          Crack your next tech-interview with us
        </h2>
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder="Search for profile"
          className="pl-6 gap-x-2 my-6 flex hover:cursor-pointer items-center w-[90vw] lg:w-96 lg:pl-12 bg-gray-100 hover:bg-gray-200 rounded-lg text-xl py-2"
        />
        <div className="grid lg:my-6 grid-cols-3 md:grid-cols-4 max-h-[50vh] overflow-y-scroll lg:grid-cols-5 gap-y-3 gap-x-4 px-6">
          {interviews.map((item) => (
            <div
              key={item.name}
              onClick={() => {
                setCurrentSelection(item.name);
                setSubmitted(false); // Reset the error message when a profile is selected
              }}
              className={`flex flex-col px-2 py-3 rounded-lg gap-y-2 hover:cursor-pointer min-h-16 items-center justify-center ${
                currentSelection === item.name && "bg-gray-200"
              }`}
            >
              <img src={item.img} alt={item.name} className="h-12" />
              <p className="capitalize text-center">{item.name}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => setOpen(false)}
          className="absolute lg:top-8 lg:right-8 top-2 right-2"
        >
          <IoMdCloseCircleOutline size={40} />
        </button>
        <div className="my-8 md:my-16 flex items-center justify-center flex-col gap-y-2 lg:my-18">
          {submitted && !currentSelection && (
            <p className="text-red-500">Please select a profile</p>
          )}
          <button
            onClick={() => {
              if (!currentSelection) {
                setSubmitted(true); // Show error message if no profile is selected
              } else {
                dispatch(
                  setInterviewDetails({ ...interview, role: currentSelection })
                );
                setSelected(currentSelection);
              }
            }}
            className="bg-black flex items-center justify-center gap-x-3 hover:scale-110 transition-all duration-200 text-white px-8 rounded-xl py-2 text-xl"
          >
            Start Now!
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

Category.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  selected: PropTypes.string,
  setSelected: PropTypes.func.isRequired,
  interview: PropTypes.object,
};

export default Category;
