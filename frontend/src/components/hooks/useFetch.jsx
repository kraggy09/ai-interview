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
        if (fetchOptions && fetchOptions.method === "POST") {
          response = await axios.post(fetchUrl, fetchOptions.data, {
            headers: fetchOptions.headers,
          });
        } else {
          response = await axios.get(fetchUrl, {
            headers: fetchOptions?.headers,
          });
        }
        setData(response.data);
      } catch (err) {
        setError(err.message);
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
