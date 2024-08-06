import { useState } from "react";
import PropTypes from "prop-types";

const ProfileTab = ({ setOpen }) => {
  const [current, setCurrent] = useState(0);
  return (
    <section className="mx-2 lg:mx-36">
      <header className="border-b-2 border-gray-600">
        <nav className="flex items-center gap-x-8">
          <a
            href="#requested"
            onClick={() => {
              setCurrent(0);
            }}
            className={`${
              current === 0 ? "bg-gray-800  text-white" : "text-gray-700"
            } rounded-t-lg p-2`}
          >
            Requested
          </a>
          <a
            href="#completed"
            onClick={() => {
              setCurrent(1);
            }}
            className={`${
              current === 1 ? "bg-gray-800  text-white" : "text-gray-700"
            } rounded-t-lg p-2`}
          >
            Completed
          </a>
          <a
            href="#badges"
            onClick={() => {
              setCurrent(2);
            }}
            className={`${
              current === 2 ? "bg-gray-800  text-white" : "text-gray-700"
            } rounded-t-lg p-2`}
          >
            Badges
          </a>
        </nav>
      </header>
      <div
        id="content"
        className="flex items-center justify-center gap-y-6 flex-col my-9"
      >
        {current == 0 ? (
          <>
            <img
              src="https://www.intervue.io/assets/mock-interviews/mock-interviews-zero.svg"
              alt="No upcoming interviews illustration"
              role="presentation"
            />
            <h2 className="text-md font-semibold">
              You have no upcoming interviews
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
        ) : current == 1 ? (
          <>Completed</>
        ) : (
          <>Badges</>
        )}
      </div>
    </section>
  );
};
ProfileTab.propTypes = {
  setOpen: PropTypes.func,
};
export default ProfileTab;
