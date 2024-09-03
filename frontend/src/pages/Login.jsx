import { useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { apiUrl } from "../components/constant";
import useFetch from "../components/hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_EMAIL":
        return { ...state, email: action.payload };
      case "UPDATE_PASS":
        return { ...state, password: action.payload };
      default:
        return state;
    }
  };

  const navigate = useNavigate();
  const dispatchR = useDispatch();
  const [state, dispatch] = useReducer(reducer, initialState);
  const auth = useSelector((store) => store.auth);

  const { fetchData, loading, data, error } = useFetch(null, null, false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      data: state,
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetchData(apiUrl + "user/login", options);
  };

  const handleChange = (type, val) => {
    type = "UPDATE_" + type.toUpperCase();
    dispatch({ type: type, payload: val });
  };

  useEffect(() => {
    if (data && data.success) {
      navigate("/profile");
      toast.success("Login success!");
      console.log("Navigating ");
      console.log(data, "Data");
      localStorage.setItem("token", data.token);

      dispatchR(login(data.user));
    } else if (error) {
      console.log(error);
      toast.error(error);
    }
  }, [data, error]);

  if (auth.isAuthenticated) {
    return <Navigate to={"/profile"} />;
  }
  return (
    <main className="flex md:flex-row flex-col-reverse">
      <section className="min-w-[50vw] bg-custom-white flex py-16 flex-col gap-y-6 items-start pl-6 pr-6 lg:pr-36 justify-center">
        <h1 className="text-3xl">Our clients</h1>
        <h3 className="text-custom-gray text-xl">
          We are already working with teams that want to hire the best engineers
        </h3>
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8">
          <img
            src="https://uploads-ssl.webflow.com/608e9cc36cbcc089f0998643/661fd1802a069ac6804331d2_htc-logo-w.svg"
            alt="htc"
            className="h-8"
          />
          <img
            src="https://uploads-ssl.webflow.com/608e9cc36cbcc089f0998643/661fdc415a15832a27d1f9d1_ANSR-Logo-Suite-Final2%20(2).png"
            alt="ansr"
            className="h-8"
          />
          <img
            src="https://uploads-ssl.webflow.com/608e9cc36cbcc089f0998643/661fdff4aa88917ebdc896a1_firstmeridian_owler_20190425_180047_original.png"
            alt="first-meridian"
            className="h-8"
          />
          <img
            src="https://www.intervue.io/publicAssets/company_logos/rakuten.svg"
            alt="rakuten"
            className="h-8"
          />
          <img
            src="https://www.intervue.io/publicAssets/company_logos/allegis.svg"
            alt="allegis"
            className="h-8"
          />
        </div>
      </section>
      <section className="flex items-center justify-center min-h-[100vh]  min-w-[50vw] gap-y-8 flex-col">
        <img
          onClick={() => {
            navigate("/");
          }}
          src="https://d2b1cooxpkirg1.cloudfront.net/publicAssets/intervue.svg"
          className="h-8 hover:cursor-pointer"
          alt="logo"
        />
        <h3 className="text-2xl font-bold">Login as Candidate</h3>

        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="flex flex-col gap-y-4  lg:min-w-[400px] min-w-[350px]"
        >
          <input
            type="text"
            value={state.email}
            onChange={(e) => {
              handleChange("email", e.target.value);
            }}
            placeholder="a@a.com"
            className="px-3 py-2 text-lg border border-gray-400 rounded-lg"
          />
          <input
            type="password"
            value={state.password}
            onChange={(e) => {
              handleChange("pass", e.target.value);
            }}
            placeholder="aaaaaa"
            className="px-3 py-2 text-lg border border-gray-400 rounded-lg"
          />

          <button className="bg-black hover:scale-105 duration-200 ease-linear text-white py-2 rounded-lg">
            {loading ? <span>Loading</span> : "Login"}
          </button>
        </form>
        <button
          onClick={() => {
            navigate("/signup");
          }}
          className="underline hover:text-blue-700"
        >
          New Here? Join Now
        </button>
      </section>
    </main>
  );
};

export default Login;
