import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();
  return (
    <nav className="flex fixed top-0 right-0 z-20 bg-white min-w-full  items-center min-h-[10vh] justify-around shadow-md shadow-gray-300">
      <img
        className="h-5 lg:h-7"
        src="https://d2b1cooxpkirg1.cloudfront.net/publicAssets/intervue.svg"
      />
      <ul className="flex gap-x-6">
        {!auth.isAuthenticated ? (
          <>
            <li
              onClick={() => {
                navigate("/login");
              }}
            >
              <button className="border border-black px-4 py-1">Login</button>
            </li>
            <li
              onClick={() => {
                navigate("/signup");
              }}
            >
              <button className="px-4 py-1 border-black border bg-black text-white">
                Signup
              </button>
            </li>
          </>
        ) : (
          <li
            onClick={() => {
              navigate("/profile  ");
            }}
          >
            <button className="px-4 py-1 border-black border bg-black text-white">
              Dashboard
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
