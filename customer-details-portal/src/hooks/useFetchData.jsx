import { useState, useEffect, useCallback } from "react";

function useFetchData(api, intervalTime = null) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
  const fetchData = useCallback(async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await fetch(api);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  }, [intervalTime, api]);

  useEffect(() => {
    fetchData();

    if (intervalTime) {
      const interval = setInterval(fetchData, intervalTime); // Polling interval
      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [api, fetchData, intervalTime]);

  return { data, loading, error }; // Return both data and loading state
}

export default useFetchData;
