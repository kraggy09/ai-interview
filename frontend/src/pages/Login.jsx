import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
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
        <button className="border hover:scale-105 duration-200 ease-linear min-w-[350px] lg:min-w-[400px] flex items-center justify-center px-3 py-2 gap-x-6 border-sky-800 rounded-lg">
          <i className="GoogleLoginBtn__StyledGoogleIcon-sc-1a6c06f-0 kADkWx">
            <svg viewBox="0 0 512 512" width="1em" fill="currentColor">
              <path
                d="M113.47 309.408L95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"
                fill="#fbbb00"
              ></path>
              <path
                d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"
                fill="#518ef8"
              ></path>
              <path
                d="M416.253 455.624l.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"
                fill="#28b446"
              ></path>
              <path
                d="M419.404 58.936l-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"
                fill="#f14336"
              ></path>
            </svg>
          </i>
          Continue with google
        </button>
        <div className="flex items-center justify-center gap-x-7">
          <div className="border-b-2  min-w-[150px]"></div>
          <p>OR</p>
          <div className="border-b-2  min-w-[150px]"></div>
        </div>
        <form className="flex flex-col gap-y-4  lg:min-w-[400px] min-w-[350px]">
          <input
            type="text"
            placeholder="Email"
            className="px-3 py-2 text-lg border border-gray-400 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-3 py-2 text-lg border border-gray-400 rounded-lg"
          />

          <button className="bg-black hover:scale-105 duration-200 ease-linear text-white py-2 rounded-lg">
            Login
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
