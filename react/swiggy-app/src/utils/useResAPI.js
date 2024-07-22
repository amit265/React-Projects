import { useEffect, useState } from "react";

const useResAPI = (api) => {
  const [resInfo, setResInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(api);
        const json = await data.json();
        console.log("coming from useResApi");
        console.log(json);
        setResInfo(json);
      } catch (error) {
        console.error("Failed to fetch data: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [api]);

  return { resInfo, loading, error };
};

export default useResAPI;
