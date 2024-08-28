import PropTypes from "prop-types";
const BadgesTab = ({ setOpen }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-xl">Coming soon!</h1>
      <h2 className="max-w-[350px] text-center my-3">
        Meanwhile, give mock interviews and get evaluated on your skills
      </h2>
      <a
        onClick={() => {
          setOpen(true);
        }}
        href="#book-interview"
        className="bg-black flex items-center justify-center gap-x-2 text-white px-3 py-1 rounded-md hover:bg-gray-800"
      >
        Book Interview &gt;
      </a>
    </div>
  );
};

BadgesTab.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

export default BadgesTab;
