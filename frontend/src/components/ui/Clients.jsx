import { FaArrowRight } from "react-icons/fa6";

const Clients = () => {
  return (
    <main className="bg-custom-white flex flex-col py-8 gap-y-6 items-center justify-center">
      <div className="bg-custom-green mt-6   px-3 py-2 text-white rounded-lg">
        We know our audience
      </div>
      <h1 className="lg:px-80 my-8 px-6 font-semibold text-center text-2xl lg:text-3xl inline-block tracking-widest lg:tracking-normal">
        Whether you&apos;re preparing for placements or looking for a job
        switch, we got you covered
      </h1>

      <div className="max-w-[80vw] my-12 flex lg:flex-row flex-col-reverse gap-y-16  ">
        <div className="min-w-[50%] flex items-start gap-y-6 flex-col mr-8">
          <h2 className="text-3xl ">
            Increase your chances of getting placed by 80%
          </h2>
          <p className="text-xl text-custom-gray">
            After each session, receive a thorough overview of your performance,
            highlighting your strengths and offering personalized improvement
            strategies, from a senior engineer experienced in making hiring
            decisions at FAANG companies
          </p>
          <button className="bg-black flex items-center min-w-full lg:min-w-[10px]  justify-center gap-x-3 hover:scale-110 transition-all duration-200 text-white px-8 rounded-xl py-2  text-xl">
            Interview Now!
            <FaArrowRight />
          </button>
        </div>
        <img
          className="lg:max-w-[50%]"
          src="https://d2b1cooxpkirg1.cloudfront.net/publicAssets/mock-interviews/features-1.png"
          alt="features-tab"
        />
      </div>
    </main>
  );
};

export default Clients;
