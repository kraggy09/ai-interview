const PercentageBox = ({ name, percentage }) => {
  let color =
    percentage >= 0 && percentage <= 40
      ? {
          bg: "bg-red-200 text-red-800",
          border: "border border-red-500",
        }
      : percentage > 41 && percentage <= 70
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
      className={`rounded-lg overflow-hidden flex flex-col items-center justify-center ${color.border}`}
    >
      <div className="min-h-[30px] relative min-w-full overflow-hidden flex items-center justify-center">
        <div
          className={`absolute bottom-0 right-0 ${color.bg}  min-w-full min-h-[${percentage}%]`}
        ></div>
        {percentage}
      </div>
      <p className="text-sm  border-t-2 border-black text-gray-700 px-1">
        {name}
      </p>
    </div>
  );
};

export default PercentageBox;
