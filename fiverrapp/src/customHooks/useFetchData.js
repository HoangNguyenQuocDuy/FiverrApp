import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import { useEffect } from "react";
import axios from "axios";

export default function useFetchData(key, param) {

  const source = axios.CancelToken.source();

  const { isLoading, error, data, refetch } = useQuery(
    {
      queryKey: [...key],
      queryFn: () =>
        newRequest
          .get(param, { cancelToken: source.token })
          .then((res) => res.data),
      keepPreviousData: true,
    },
    {
      enabled: false,
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    return () => {
      source.cancel('Component unmounted');
    }
  }, []);

  return [isLoading, error, data, refetch];
}
