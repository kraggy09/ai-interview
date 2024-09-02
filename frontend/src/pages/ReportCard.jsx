import { useLocation } from "react-router-dom";
import { getDateAndTime } from "../components/constant";
import ProgressBar from "../components/ui/ProgressBar";
import QuestionStrap from "../components/ui/QuestionStrap";

const ReportCard = () => {
  const location = useLocation();
  const interview = location.state?.interview;
  const questions = location.state?.questions;
  const skills = Object.keys(interview?.skills || {});

  const { currentDate, currentTime } = getDateAndTime(
    interview?.updatedAt || ""
  );

  return (
    <main className="max-h-full flex flex-col overflow-scroll scrollbar-hide mx-3 lg:px-16 xl:px-36">
      <header className="text-center my-4">
        <h1 className="text-lg font-bold bg-white inline-block shadow-xl px-4 py-1 rounded-lg">
          Report Card for {interview.role}
        </h1>
      </header>

      <section className="grid gap-x-6 lg:grid-cols-2 rounded-lg my-3">
        <article className="flex-col flex gap-y-1 rounded-lg overflow-hidden shadow-lg px-3 py-2">
          <h2 className="text-md font-semibold">Interview Details</h2>
          <p>Level: {interview.level}</p>
          <p>Date: {currentDate}</p>
          <p>Time: {currentTime}</p>
        </article>

        <article className="rounded-lg overflow-hidden shadow-lg px-3 py-2">
          <h2 className="font-semibold text-center">Skills</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 items-center gap-2">
            {skills.map((s) => {
              const percentage = interview.skills[s] * 10;
              return <ProgressBar key={s} percentage={percentage} skill={s} />;
            })}
          </div>
        </article>
      </section>

      <section>
        <h2 className="font-semibold">Rating</h2>
        <div className="grid gap-y-6 grid-cols-1">
          {questions.map((ques) => (
            <QuestionStrap key={ques._id} question={ques} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ReportCard;
