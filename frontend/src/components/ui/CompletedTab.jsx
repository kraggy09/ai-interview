import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import { apiUrl } from "../constant";
import InterviewCard from "./InterviewCard";

const CompletedTab = ({ setOpen }) => {
  const { data, loading } = useFetch(
    apiUrl + "interview/getCompletedInterviews"
  );
  console.log(data);

  if (loading) {
    return (
      <div className="flex min-w-full items-center justify-center">
        <h1 className="loader3"></h1>
      </div>
    );
  }

  return (
    <>
      {data && data.interviews.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 min-w-full  xl:grid-cols-4  gap-5 max-h-screen ">
          {data.interviews.map((i) => {
            return (
              <InterviewCard state="Completed" interview={i} key={i._id} />
            );
          })}
        </div>
      ) : (
        <>
          <img
            src="https://www.intervue.io/assets/mock-interviews/mock-interviews-zero.svg"
            alt="No upcoming interviews illustration"
            role="presentation"
          />
          <h2 className="text-md font-semibold">
            You have no completed interviews
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
        </>
      )}
    </>
  );
};

CompletedTab.propTypes = {
  setOpen: PropTypes.func.isRequired,
};
export default CompletedTab;
