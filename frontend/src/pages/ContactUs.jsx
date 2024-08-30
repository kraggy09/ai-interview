import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { BiLogoGmail } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

import { TbBrandLeetcode } from "react-icons/tb";

const ContactUs = ({ setOpen }) => {
  const portalRoot = document.querySelector("#portal");

  if (!portalRoot) {
    console.error("Portal root element (#portal) not found in the DOM.");
    return null;
  }

  const links = {
    gmail: "mailto:kaifshaikh2013.sk@gmail.com",
    github: "https://github.com/kraggy09",
    linkedin: "https://www.linkedin.com/in/kaif-shaikh-bb2260194/",
    leetcode: "https://leetcode.com/kraggy",
  };

  return ReactDOM.createPortal(
    <main className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-md">
      <article className="bg-white flex flex-col items-center xl:min-w-[20vw] md:min-w-[30vw] rounded-lg overflow-hidden min-w-[50vw] min-h-[40vh]  relative">
        <img
          src="https://lh3.googleusercontent.com/a/ACg8ocKTZ55merox7A6INcTdRruPq0MZCRBPVhZiiEFcZym0RbjG_Q1C_Q=s360-c-no"
          alt="my-img"
          className="rounded-full max-w-20 z-50 mt-6 max-h-20 "
        />
        <div className="relative flex min-h-[30vh] text-white items-center justify-center bg-black min-w-full">
          <div className="absolute top-[-60px] bg-white rounded-full p-4 w-20 h-20 flex items-center justify-center"></div>
          <div className="flex items-center flex-col gap-y-3 min-h-">
            <h1 className="text-lg font-bold">Kaif Shaikh</h1>
            <h2 className="font-semibold">FullStack Developer</h2>
            <div
              className="links flex items-center justify-center gap-x-5 text-xl mt-6"
              aria-label="links to socials"
            >
              <a
                className="hover:cursor-pointer"
                target="_blank"
                href={links.gmail}
              >
                <BiLogoGmail />
              </a>
              <a
                className="hover:cursor-pointer"
                target="_blank"
                href={links.github}
              >
                <FaGithub />
              </a>
              <a
                className="hover:cursor-pointer"
                target="_blank"
                href={links.linkedin}
              >
                <FaLinkedin />
              </a>
              <a
                className="hover:cursor-pointer"
                target="_blank"
                href={links.leetcode}
              >
                <TbBrandLeetcode />
              </a>
            </div>
          </div>
        </div>
      </article>
      <span
        onClick={() => {
          setOpen(false);
        }}
        className="my-6 bg-white rounded-full p-3 hover:cursor-pointer"
      >
        <RxCross2 size={20} />
      </span>
    </main>,
    portalRoot
  );
};

ContactUs.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

export default ContactUs;
