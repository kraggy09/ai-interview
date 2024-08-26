import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetch = (url = null, options = null, autoFetch = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (fetchUrl = url, fetchOptions = options) => {
      setLoading(true);
      try {
        let response;
        const config = {
          headers: fetchOptions?.headers || {},
          withCredentials: true,
        };

        if (fetchOptions && fetchOptions.method === "POST") {
          response = await axios.post(fetchUrl, fetchOptions.data, config);
        } else {
          response = await axios.get(fetchUrl, config);
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
