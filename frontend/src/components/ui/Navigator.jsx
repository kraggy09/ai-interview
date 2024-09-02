import { apiUrl } from "../constant";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Navigator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  // Define URLs based on the type of the state
  const fetchUrl =
    state?.type === "Interviewing"
      ? `${apiUrl}interview/${state.id}`
      : `${apiUrl}interview/report/${state.id}`;

  const { data, error, loading } = useFetch(fetchUrl);
  console.log(data?.data);

  // Conditional navigation based on data availability
  if (!loading && data) {
    if (error) {
      console.error("Error fetching data:", error);
      // Optionally, handle errors with a user-friendly message or redirect
    } else {
      if (state.type === "Interviewing") {
        navigate(`/interview/${data?.interview?._id}`, { state: data });
      } else {
        navigate(`/report/${data?.data?.interview?._id}`, {
          state: data?.data,
        });
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center min-w-full">
      {loading ? (
        <h1 className="loader3">Loading...</h1>
      ) : error ? (
        <h1>Error loading data</h1>
      ) : (
        <h1>Redirecting...</h1>
      )}
    </div>
  );
};

export default Navigator;
