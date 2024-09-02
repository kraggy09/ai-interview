import PropTypes from "prop-types";
import { getDateAndTime } from "../constant";
import { useNavigate } from "react-router-dom";

const InterviewCard = ({ interview, state = "Interviewing" }) => {
  console.log(interview);
  const skills = Object.keys(interview.skills);
  const navigate = useNavigate();

  const handleClick = () => {
    if (state === "Interviewing") {
      console.log("Interviewing");
      navigate("/navigator", {
        state: {
          id: interview._id,
          type: "Interviewing",
        },
      });
    } else {
      navigate("/navigator", {
        state: {
          id: interview._id,
          type: "Report Card",
        },
      });
    }
  };

  return (
    <div className="bg-white shadow-lg min-w-[150px] rounded-md overflow-hidden min-h-[200px]">
      <h1 className="bg-black flex items-center justify-center gap-x-3 text-white text-center">
        {interview.role}{" "}
        <div className="bg-white text-black text-sm rounded-sm px-1 ">
          {interview.level}
        </div>
      </h1>
      <h2 className="text-gray-600 ml-3 my-3 text-sm">
        Date: {getDateAndTime(interview.createdAt).currentDate}
      </h2>
      <h2 className="text-gray-600 ml-3 my-3 text-sm">
        Time: {getDateAndTime(interview.createdAt).currentTime}
      </h2>
      <div className="flex overflow-x-scroll mx-3 gap-x-3 scrollbar-hide">
        {state === "Interviewing" ? (
          interview.skills.map((skill) => (
            <span
              key={skill.name}
              className="bg-gray-300 px-1 my-1 min-w-fit text-[12px] rounded-sm"
            >
              {skill.name}
            </span>
          ))
        ) : (
          <>
            {skills.map((skill) => {
              return (
                <span
                  key={skill}
                  className="bg-gray-300 px-1  capitalize my-1 min-w-fit text-[12px] rounded-sm"
                >
                  {skill}
                </span>
              );
            })}
          </>
        )}
      </div>
      <div className="flex items-center justify-end mt-6 mr-3">
        {
          <button
            onClick={handleClick}
            className="bg-white border-black border px-2 py-1 text-sm rounded-md hover:bg-black hover:text-white"
          >
            {state === "Interviewing" ? "Continue" : "View Report"}
          </button>
        }
      </div>
    </div>
  );
};

InterviewCard.propTypes = {
  interview: PropTypes.object.isRequired,
  state: PropTypes.string.isRequired,
};

export default InterviewCard;
