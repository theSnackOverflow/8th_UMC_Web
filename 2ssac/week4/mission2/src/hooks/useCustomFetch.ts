import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`;

export function useCustomFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const { data } = await axios.get<T>(url, {
          headers: {
            Authorization: API_KEY,
          },
        });
        if (isMounted) {
          setData(data);
        }
      } catch (err) {
        console.error("Fetch Error... : ", err);
        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}