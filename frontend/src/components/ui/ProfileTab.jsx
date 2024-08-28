import { useState, Suspense, lazy } from "react";
import PropTypes from "prop-types";

// Lazy load the components
const RequestedTab = lazy(() => import("./RequestedTab"));
const CompletedTab = lazy(() => import("./CompletedTab"));
const BadgesTab = lazy(() => import("./BadgesTab"));

const ProfileTab = ({ setOpen }) => {
  const [current, setCurrent] = useState(0);

  return (
    <section className="mx-2 lg:mx-36">
      <header className="border-b-2 border-gray-600">
        <nav className="flex items-center gap-x-8">
          <a
            href="#requested"
            onClick={() => setCurrent(0)}
            className={`${
              current === 0 ? "bg-gray-800 text-white" : "text-gray-700"
            } rounded-t-lg p-2`}
          >
            Requested
          </a>
          <a
            href="#completed"
            onClick={() => setCurrent(1)}
            className={`${
              current === 1 ? "bg-gray-800 text-white" : "text-gray-700"
            } rounded-t-lg p-2`}
          >
            Completed
          </a>
          <a
            href="#badges"
            onClick={() => setCurrent(2)}
            className={`${
              current === 2 ? "bg-gray-800 text-white" : "text-gray-700"
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
        <Suspense fallback={<div>Loading...</div>}>
          {current === 0 && <RequestedTab setOpen={setOpen} />}
          {current === 1 && <CompletedTab />}
          {current === 2 && <BadgesTab setOpen={setOpen} />}
        </Suspense>
      </div>
    </section>
  );
};

ProfileTab.propTypes = {
  setOpen: PropTypes.func,
};

export default ProfileTab;
