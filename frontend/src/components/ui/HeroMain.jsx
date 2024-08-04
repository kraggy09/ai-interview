import InterviewCategory from "./InterviewCategory";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";

const HeroMain = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="min-h-[15vh] flex items-center justify-center min-w-full"></div>
      <h1 className="text-xl px-6 lg:px-2 font-bold my-8 text-center md:text-2xl lg:text-3xl xl:text-4xl">
        Ace Your Next Interview with AI-Powered{" "}
        <TypeAnimation
          sequence={[
            "Precision",
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            "Confidence",

            1000,
            "Expertise",
            1000,
            "Insights",
            1000,
            1000,
            "Success",
            1000,
          ]}
          wrapper="span"
          speed={50}
          style={{ fontSize: "1em", display: "inline-block" }}
          repeat={Infinity}
        />
      </h1>
      <h2 className="text-xl px-8 font-semibbold lg:text-3xl text-center">
        1:1 AI-powered Mock Interview
      </h2>
      <h3 className="text-center lg:text-xl my-3 text-gray-800">
        Crack your next tech-interview with us
      </h3>

      <InterviewCategory open={open} setOpen={setOpen} />
    </div>
  );
};

export default HeroMain;
