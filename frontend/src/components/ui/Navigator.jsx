import { apiUrl } from "../constant";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Navigator = () => {
  const location = useLocation();
  const state = location.state;

  console.log(state);

  const { data } = useFetch(apiUrl + "interview/" + state);
  const navigate = useNavigate();
  if (data?.data) {
    navigate(`/interview/${data.interview._id}`, { state: data });
  }
  console.log(data);

  //   const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center min-w-full">
      <h1 className="loader3"></h1>
    </div>
  );
};

export default Navigator;
