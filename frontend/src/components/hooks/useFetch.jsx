import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetch = (url = null, options = null, autoFetch = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (fetchUrl = url, fetchOptions = options) => {
      setLoading(true);

      // Retrieve token from localStorage
      const token = localStorage.getItem("token");

      try {
        let response;

        // Prepare the request configuration
        const config = {
          headers: {
            ...fetchOptions?.headers, // Merge any custom headers passed in options
          },
          withCredentials: true,
        };

        // Prepare the request data by adding the token to the body
        let data = {
          ...fetchOptions?.data, // Include any existing data from fetchOptions
          token, // Add the token to the data body
        };

        // Choose the request method (POST or GET)
        if (fetchOptions && fetchOptions.method === "POST") {
          response = await axios.post(fetchUrl, data, config);
        } else {
          // For GET requests, we still send the token in the data object
          response = await axios.get(fetchUrl, {
            ...config,
            params: data, // Add the token to GET requests as query params
          });
        }

        setData(response.data);
      } catch (err) {
        console.log(err);

        let error = err?.response?.data?.msg || err.message;
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [url, options]
  );

  useEffect(() => {
    if (autoFetch && url) {
      fetchData();
    }
  }, [fetchData, autoFetch, url]);

  return { data, loading, error, fetchData };
};

export default useFetch;
