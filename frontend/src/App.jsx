import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthWrapper from "./pages/AuthWrapper";
import toast, { Toaster } from "react-hot-toast";
import { apiUrl } from "./components/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "./store/authSlice";
import "regenerator-runtime/runtime";

// Lazy load the components
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Profile = lazy(() => import("./pages/Profile"));
const Interview = lazy(() => import("./pages/Interview"));

const App = () => {
  const dispatch = useDispatch();
  const checkAuth = async () => {
    let res;
    try {
      res = await axios.get(apiUrl + "/user/checkAuth", {
        withCredentials: true,
      });
      console.log(res.data);
      if (res.data.success) {
        dispatch(login(res.data.user));
        toast.success(res.data.msg);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    checkAuth();
  });

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={
              <AuthWrapper>
                <Profile />
              </AuthWrapper>
            }
          />
          <Route
            path="/interview/:id"
            element={
              <AuthWrapper>
                <Interview />
              </AuthWrapper>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
