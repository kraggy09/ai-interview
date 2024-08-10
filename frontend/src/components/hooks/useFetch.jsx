import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url, options = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response;
        if (options && options.method === "POST") {
          response = await axios.post(url, options.data, {
            headers: options.headers,
          });
        } else {
          response = await axios.get(url, { headers: options?.headers });
        }
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, loading, error };
};

export default useFetch;
