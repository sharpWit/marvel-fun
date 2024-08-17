import { useState, useEffect } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";

import axiosInstance from "./axios-instance";

interface UseApiReturnType<T> {
  data: T | null;
  loading: boolean;
  error: any;
}

const useApi = <T>(
  url: string,
  options: AxiosRequestConfig = {}
): UseApiReturnType<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await axiosInstance.get<T>(
          url,
          options
        );
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, options]);

  return { data, loading, error };
};

export default useApi;
