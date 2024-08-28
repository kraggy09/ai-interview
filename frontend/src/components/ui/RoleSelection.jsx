import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { apiUrl, experienceLevels, skills } from "../constant";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  clearInterviewDetails,
  setInterviewDetails,
} from "../../store/interviewSlice";
import useFetch from "../hooks/useFetch";
const RoleSelection = () => {
  const interview = useSelector((store) => store.interview);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState(null);
  const [lvl, setLvl] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);

  const { data, loading, error, fetchData } = useFetch(null, null, false); // Initialize with no URL
  console.log(data);

  useEffect(() => {
    if (interview && interview.role) {
      const role =
        skills.find((skill) => skill.role === interview.role) || null;
      if (role) {
        setSelectedRole({
          ...role,
          language: role.language.map((lang) => ({ ...lang, selected: false })),
        });
      } else {
        setSelectedRole(null);
      }
    }
  }, [interview]);

  const handleLanguageClick = useCallback(
    (index) => {
      if (selectedRole) {
        const updatedLanguages = selectedRole.language.map((lang, i) =>
          i === index ? { ...lang, selected: !lang.selected } : lang
        );
        setSelectedRole({ ...selectedRole, language: updatedLanguages });
      }
    },
    [selectedRole]
  );

  const handleContinueClick = () => {
    if (pageIndex === 0) {
      setPageIndex(1); // Move to the second page
    } else if (pageIndex === 1) {
      let selectedLanguages =
        selectedRole && selectedRole.language.filter((s) => s.selected);
      console.log(selectedLanguages);

      dispatch(
        setInterviewDetails({
          ...interview,
          level: lvl,
          languages: selectedLanguages,
        })
      );
      setPageIndex(2);

      const data = {
        role: interview.role,
        level: lvl,
        languages: selectedLanguages,
      };

      // Use fetchData from useFetch hook
      fetchData(apiUrl + "interview/newInterview", {
        method: "POST",
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };

  const renderThirdPage = () => (
    <div className="min-h-[100vh] text-md font-semibold items-center justify-center flex ">
      {loading ? (
        <h1 className="loader"></h1>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="flex items-center justify-center flex-col gap-y-8">
          <h1 className="text-xl">
            Your Interview is Ready for {selectedRole.role}
          </h1>
          <button
            className="bg-black px-3 py-2 text-white rounded-md"
            onClick={() => {
              navigate(`/interview/${data.interview._id}`, { state: data });
            }}
          >
            Go to Interview
          </button>
        </div>
      )}
    </div>
  );

  const renderFirstPage = () => (
    <section className="min-w-full min-h-full" aria-label="Role Selection">
      {selectedRole ? (
        <article className="mt-6">
          <header className="flex items-center ml-6 justify-start gap-x-3">
            <IoMdArrowRoundBack
              size={25}
              role="button"
              aria-label="Go back"
              onClick={() => {
                dispatch(clearInterviewDetails());
              }}
            />
            <h2 className="text-xl font-bold ">{selectedRole.role}</h2>
          </header>
          <ul
            className="grid grid-cols-3 my-7 md:grid-cols-4 max-h-[70vh] md:max-h-[80vh] overflow-y-scroll lg:grid-cols-4 gap-y-6 justify-items-start"
            aria-label="Selected Role Languages"
          >
            {selectedRole.language.map((lang, index) => (
              <li
                className={`flex flex-col items-center justify-start max-w-[80px] mx-auto`}
                key={index}
              >
                <span
                  className={`p-3 hover:cursor-pointer rounded-lg ${
                    lang.selected ? "bg-green-200" : "bg-gray-200"
                  } flex items-center justify-center`}
                  onClick={() => handleLanguageClick(index)}
                >
                  <img
                    height={50}
                    width={50}
                    src={lang.img}
                    alt={lang.name}
                    className="object-contain"
                  />
                </span>
                <p className="mt-2 text-center">{lang.name}</p>
              </li>
            ))}
          </ul>
        </article>
      ) : (
        <p>No role selected</p>
      )}
    </section>
  );

  const renderSecondPage = () => (
    <section className="min-w-full ml-6 flex-col flex md:ml-6 min-h-full">
      <header className="flex items-center mt-6 justify-start gap-x-3">
        <IoMdArrowRoundBack
          size={25}
          role="button"
          aria-label="Go back"
          onClick={() => {
            setPageIndex(0);
          }}
        />
        <h2 className="text-xl font-bold ">Select Seniority</h2>
      </header>
      <ul className="flex flex-col pt-16 max-h-[75vh] overflow-y-scroll gap-y-4 my-6 justify-center">
        {experienceLevels.map((e) => {
          return (
            <li
              className={`md:px-6 px-4 py-2 rounded-md hover:cursor-pointer max-w-[90%]  ${
                e.level === lvl ? "bg-green-200" : "bg-gray-200"
              }`}
              onClick={() => {
                setLvl(e.level);
              }}
              key={e.level}
            >
              <div className="flex gap-y-2 items-start justify-start flex-col">
                <h3 className="md:text-xl font-semibold"> {e.level}</h3>
                <h4 className="text-sm md:text-sm">{e.range}</h4>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );

  return (
    <main
      className={`fixed inset-0 z-50 bg-black ${
        pageIndex === 2 ? "backdrop-blur-md bg-opacity-50" : " bg-opacity-30"
      }`}
    >
      <aside className="right-0 absolute min-h-full bg-white md:min-w-[70vw] lg:min-w-[45vw] xl:min-w-[35vw] min-w-full">
        {pageIndex === 0
          ? renderFirstPage()
          : pageIndex == 1
          ? renderSecondPage()
          : renderThirdPage()}
        {(pageIndex === 0 || pageIndex === 1) && (
          <div className="flex absolute bottom-10 min-w-full items-center justify-center">
            <button
              className="min-w-[90%] mx-auto py-2 text-xl bg-black text-white"
              aria-label="Continue to next step"
              onClick={handleContinueClick}
            >
              {pageIndex === 0 ? "Continue" : "Generate Interview"}
            </button>
          </div>
        )}
      </aside>
    </main>
  );
};

export default RoleSelection;
