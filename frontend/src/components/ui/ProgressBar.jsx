import PropTypes from "prop-types";

const ProgressBar = ({ percentage, skill }) => {
  let color =
    percentage >= 0 && percentage <= 40
      ? {
          bg: "bg-red-200 text-red-800",
          border: "border border-red-500",
        }
      : percentage > 40 && percentage <= 70
      ? {
          bg: "bg-yellow-200 text-yellow-800",
          border: "border border-yellow-500",
        }
      : {
          bg: "bg-green-200 text-green-800",
          border: "border border-green-500",
        };

  return (
    <div
      className={`rounded-md pl-4 py-2 relative overflow-hidden ${color.border}`}
      key={skill}
    >
      <div
        style={{ width: `${percentage}%` }}
        className={`-z-10 ${color.bg} min-h-full top-0 left-0 rounded-md absolute`}
      ></div>
      <p className="capitalize">
        {skill}
        <sup className="ml-3 bg-black text-white p-[2px] rounded-full">
          {percentage}%
        </sup>
      </p>
    </div>
  );
};

ProgressBar.propTypes = {
  skill: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
};

export default ProgressBar;
