import Man from "../components/svg/Man";
import { FaAngleDown } from "react-icons/fa";
import ProfileTab from "../components/ui/ProfileTab";
import { useState } from "react";
import Category from "../components/modal/Category";
import { useSelector } from "react-redux";
import RoleSelection from "../components/ui/RoleSelection";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(false);
  const interview = useSelector((store) => store.interview);
  console.log(interview);
  return (
    <main className="min-h-[100vh] ">
      {/* Navigation */}
      <nav
        className="bg-black flex items-center justify-between px-6 min-h-[8vh] text-white"
        aria-label="Main Navigation"
      >
        <img
          className="h-6"
          src="https://dersyb7nfifdf.cloudfront.net/public/assets/intervue-logo-dark.svg"
          alt="Intervue Logo"
        />
        <ul className="flex items-center gap-x-6 justify-center">
          <li>
            <a href="#contact" className="hover:underline">
              Contact Us
            </a>
          </li>
          <li
            onClick={() => {
              setModal((prev) => !prev);
            }}
            className="flex cursor-pointer relative items-center justify-center gap-x-2"
          >
            <div className="bg-green-200  text-green-700 font-bold rounded-full p-1 border-green-800 border-2">
              KS
            </div>
            <p className="flex items-center justify-center gap-x-1">
              <span className="md:block hidden">Kaif Shaikh</span>
              <FaAngleDown aria-label="Dropdown Menu" />
            </p>
            {modal && (
              <ul className="absolute  top-11 min-w-[150px] right-0 bg-gray-100 rounded-lg flex flex-col overflow-hidden   justify-center">
                <li className="text-black h-full lg:hidden hover:bg-gray-200 py-2 min-w-full pl-2">
                  Kaif Shaikh
                </li>
                <li className="border-b-2 border-gray-300 min-w-full "></li>
                <li className="text-black h-full hover:bg-gray-200 py-2 min-w-full pl-2">
                  Settings
                </li>
                <li className="border-b-2 border-gray-300 min-w-full "></li>
                <li className="text-red-500 h-full hover:bg-gray-200 py-2 min-w-full pl-2">
                  Logout
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <section
        className="flex items-center justify-between my-6 lg:px-36"
        aria-labelledby="dashboard-heading"
      >
        <div className="flex items-center justify-center">
          <Man />
          <div className="ml-6">
            <h1
              id="dashboard-heading"
              className="lg:text-2xl text-lg  font-bold"
            >
              Hi, Kaif
            </h1>
            <h3 className="lg:max-w-[700px] mt-2 text-sm lg:text-md">
              Welcome to your mock interviews dashboard. Here you will find the
              scheduled interviews along with a detailed history of the ones you
              have completed.
            </h3>
          </div>
        </div>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="bg-black lg:flex hidden text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
        >
          Book Interview &gt;
        </button>
      </section>

      <ProfileTab setOpen={setOpen} />
      {interview.role === null && (
        <Category
          setOpen={setOpen}
          open={open}
          selected={selected}
          setSelected={setSelected}
          interview={interview}
        />
      )}
      {interview.role != null && <RoleSelection />}
    </main>
  );
};

export default Profile;
