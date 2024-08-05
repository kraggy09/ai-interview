import PropTypes from "prop-types";
import { useState } from "react";
import ReactDOM from "react-dom";
import { FaArrowRight } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Category = ({ open, setOpen, selected, setSelected }) => {
  const [text, setText] = useState("");
  const interview = [
    {
      img: "https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/frontend.svg",
      name: "frontend",
    },
    {
      img: "https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/backend.svg",
      name: "backend",
    },
    {
      img: "https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/fullstack.svg",
      name: "fullstack",
    },
    {
      img: "https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/android.svg",
      name: "android",
    },
    {
      img: "https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/data-science.svg",
      name: "data science",
    },

    {
      img: "https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/ml-ai.svg",
      name: "ML/AI",
    },

    {
      img: "https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/react.svg",
      name: "React",
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
      img: "https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/cyber-security.svg",
      name: "Cyber Security",
    },
  ];

  if (!open) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className="fixed  top-0 right-0 bg-white min-w-full min-h-full z-30">
      <div className="relative flex-col  flex items-center justify-center">
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
          placeholder={`Searh for profile`}
          className="pl-6 gap-x-2  my-6 flex hover:cursor-pointer items-center w-[90vw] lg:w-96 lg:pl-12 bg-gray-100 hover:bg-gray-200 rounded-lg  text-xl py-2"
        />
        <div className="grid lg:my-6 grid-cols-4  lg:grid-cols-5 gap-y-3 gap-x-4 px-6">
          {interview.map((item) => {
            return (
              <div
                key={item.name}
                onClick={() => {
                  setSelected(item.name);
                }}
                className={`flex flex-col   px-2 py-3 rounded-lg gap-y-2 hover:cursor-pointer min-h-16 items-center justify-center ${
                  selected === item.name && "bg-gray-200"
                }`}
              >
                <img src={item.img} alt={item.name} className="h-12" />
                <p className="capitalize text-center">{item.name}</p>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => {
            setOpen(false);
          }}
          className="absolute lg:top-8 lg:right-8 top-2 right-2 "
        >
          <IoMdCloseCircleOutline size={40} />
        </button>
        <div className="my-8 md:my-16 lg:my-18">
          <button className="bg-black flex items-center justify-center gap-x-3 hover:scale-110 transition-all duration-200 text-white px-8 rounded-xl py-2  text-xl">
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
};

export default Category;
