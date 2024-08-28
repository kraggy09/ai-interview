import PropTypes from "prop-types";
const RequestedTab = ({ setOpen }) => {
  return (
    <>
      <img
        src="https://www.intervue.io/assets/mock-interviews/mock-interviews-zero.svg"
        alt="No upcoming interviews illustration"
        role="presentation"
      />
      <h2 className="text-md font-semibold">You have no ongoing interviews</h2>
      <a
        onClick={() => {
          setOpen(true);
        }}
        href="#book-interview"
        className="bg-black flex items-center justify-center gap-x-2 text-white px-3 py-1 rounded-md hover:bg-gray-800"
      >
        Book Interview &gt;
      </a>
    </>
  );
};

RequestedTab.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

export default RequestedTab;
