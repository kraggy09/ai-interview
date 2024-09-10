import PropTypes from "prop-types";
import PercentageBox from "./PercentageBox";
const QuestionStrap = ({ question }) => {
  const diffColor =
    question.difficulty === "easy"
      ? "bg-green-300 text-green-800"
      : question.difficulty === "medium"
      ? "bg-yellow-300 text-yellow-800"
      : "bg-red-300 text-red-800";
  return (
    <div className="relative  shadow-xl  rounded-lg flex flex-col gap-y-3  pt-3">
      <span
        className={`absolute right-4 text-sm uppercase font-semibold px-2 rounded-lg  ${diffColor}`}
      >
        {question.difficulty}{" "}
      </span>
      <h4 className="mt-6 pl-3 ">{question.question}</h4>
      <div className="bg-slate-100 mt-2 pl-3 pb-16">
        <p className="my-3">Response: {question.answer}</p>
        <div id="feedback" className=" flex  flex-col items-start gap-y-2">
          <p className="" id="pos">
            <span className="bg-green-300 text-green-800 pl-2 pr-1 mr-4 rounded-lg">
              Positive:
            </span>
            {question?.feedback?.positive ?? "N/A"}
          </p>
          <p id="neg">
            <span className="bg-red-300 text-red-800 pl-2 pr-1 mr-4  rounded-lg">
              Negative:
            </span>
            {question?.feedback?.negative ?? "N/A"}
          </p>
        </div>
      </div>
      <div className="absolute flex right-5 gap-x-5 bottom-2">
        <PercentageBox
          name={"Clarity"}
          percentage={
            (question.rating.clarity * 10) % 1 != 0
              ? (question.rating.clarity * 10).toFixed(2)
              : question.rating.clarity * 10
          }
        />
        <PercentageBox
          name={"Relev"}
          percentage={
            (question.rating.relevance * 10) % 1 != 0
              ? (question.rating.relevance * 10).toFixed(2)
              : question.rating.relevance * 10
          }
        />
        <PercentageBox
          name={"Compl"}
          percentage={
            (question.rating.completeness * 10) % 1 != 0
              ? (question.rating.completeness * 10).toFixed(2)
              : question.rating.completeness * 10
          }
        />
        <PercentageBox
          name={"Avg"}
          percentage={
            (question.rating.average * 10) % 1 != 0
              ? (question.rating.average * 10).toFixed(2)
              : question.rating.average * 10
          }
        />
      </div>
    </div>
  );
};

QuestionStrap.propTypes = {
  question: PropTypes.object.isRequired,
};
export default QuestionStrap;
