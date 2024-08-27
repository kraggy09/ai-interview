import { IoMdSearch } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";
import { useState } from "react";
import PropTypes from "prop-types";
import Category from "../modal/Category";
import { useNavigate } from "react-router-dom";

const InterviewCategory = ({ open, setOpen }) => {
  // console.log(open);
  const navigate = useNavigate();

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
  ];

  const [selected, setSelected] = useState(null);
  return (
    <main className="flex flex-col items-center justify-center">
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="pl-6 gap-x-3  my-6 flex hover:cursor-pointer items-center w-[90vw] lg:w-96 lg:pl-12 bg-gray-100 hover:bg-gray-200 rounded-lg  text-xl py-2"
      >
        <IoMdSearch size={25} />
        <p> Search Profile</p>
      </div>
      <div className="grid my-6 grid-cols-3 md:grid-cols-4  gap-y-6 gap-x-6">
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
              <p className="capitalize">{item.name}</p>
            </div>
          );
        })}
      </div>
      <div className="my-8">
        <button
          onClick={() => {
            navigate("/profile");
          }}
          className="bg-black flex items-center justify-center gap-x-3 hover:scale-110 transition-all duration-200 text-white px-8 rounded-xl py-2  text-xl"
        >
          Start Now!
          <FaArrowRight />
        </button>
      </div>
      {
        <Category
          open={open}
          setOpen={setOpen}
          selected={selected}
          setSelected={setSelected}
        />
      }
    </main>
  );
};

InterviewCategory.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
export default InterviewCategory;
