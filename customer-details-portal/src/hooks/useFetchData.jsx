import { useState, useEffect, useCallback } from "react";

function useFetchData(api, intervalTime = null) {
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(api);
      const jsonData = await response.json();
      // setData(data.map((photo) => photo.urls.small));
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [api]);

  useEffect(() => {
    fetchData();
    if (intervalTime) {
      const interval = setInterval(fetchData, intervalTime); // Polling interval
      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [api, fetchData, intervalTime]);

  return data;
}

export default useFetchData;
