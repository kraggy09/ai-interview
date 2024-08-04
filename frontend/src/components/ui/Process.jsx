import { useState, useEffect } from "react";
import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";

const Process = () => {
  const process = [
    {
      id: 1,
      name: "Book mock interviews with our industry experts",
      img: "https://d2b1cooxpkirg1.cloudfront.net/publicAssets/mock-interviews/how-it-works-3.png",
    },
    {
      id: 2,
      name: "Go through the step by step process just like in actual interviews",
      img: "https://d2b1cooxpkirg1.cloudfront.net/publicAssets/mock-interviews/how-it-works-2.png",
    },
    {
      id: 3,
      name: "Get feedback report and increase your chances of getting placed by 80%",
      img: "https://d2b1cooxpkirg1.cloudfront.net/publicAssets/mock-interviews/how-it-works-1.png",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const duration = 10; // Duration in seconds
    const interval = 10; // Interval in milliseconds
    const increment = 100 / ((duration * 1000) / interval); // Calculate the increment value for each interval
    let progress = 0;

    const progressInterval = setInterval(() => {
      progress += increment;
      setProgressWidth(progress);

      if (progress >= 100) {
        clearInterval(progressInterval);
        next(); // Move to the next step automatically when time is up
      }
    }, interval);

    return () => clearInterval(progressInterval); // Cleanup interval on unmount or when current changes
  }, [current]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % process.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + process.length) % process.length);
  };

  return (
    <main className="text-white bg-custom-black overflow-hidden py-16">
      <h1 className="text-2xl px-16 text-center my-16">
        How to kick-off your interview prep
      </h1>
      <section className="flex justify-center lg:flex-row flex-col gap-y-8 lg:gap-x-32 items-center">
        <article
          id="left"
          className="max-w-[40vw] hidden md:flex flex-col items-center justify-center gap-y-4 lg:gap-y-2"
        >
          {process.map((p, index) => (
            <div
              key={p.id}
              onClick={() => {
                setCurrent(p.id - 1);
              }}
              className={`lg:max-w-[480px] min-w-[580px] pl-3 relative hover:cursor-pointer flex items-center justify-center rounded-lg py-6 gap-x-5 transition-transform duration-300 ${
                current === index ? "scale-x-110 bg-black" : "bg-custom-gray"
              }`}
            >
              <span className="border border-white p-2 rounded-full">
                {p.id}
              </span>
              <p className="px-4">{p.name}</p>

              {current === index && (
                <div
                  className="absolute bottom-0 left-0 bg-white h-2"
                  style={{
                    width: `${progressWidth}%`,
                    transition: "width 0.01s linear",
                  }}
                ></div>
              )}
            </div>
          ))}
        </article>
        <article className="flex items-center mb-6 justify-around md:hidden">
          <CiCircleChevLeft onClick={prev} className="mr-4" size={30} />
          <div className="bg-black py-3 px-2 relative rounded-lg black max-w-[70vw]">
            <p className="text-center">{process[current].name}</p>
            <div
              className="absolute bottom-0 left-0 bg-white h-2"
              style={{
                width: `${progressWidth}%`,
                transition: "width 0.01s linear",
              }}
            ></div>
          </div>
          <CiCircleChevRight className="ml-4" onClick={next} size={30} />
        </article>
        <article className="flex items-center justify-center">
          <img
            src={process[current].img}
            className="md:h-[400px]"
            alt={process[current].name}
          />
        </article>
      </section>
    </main>
  );
};

export default Process;
