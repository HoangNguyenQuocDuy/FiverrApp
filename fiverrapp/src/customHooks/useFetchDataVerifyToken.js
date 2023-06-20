import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";
import axiosJWT from "../utils/requestRefreshToken";

export default function useFetchDataVerifyToken(key, param) {
  const source = axios.CancelToken.source();

  const { isLoading, error, data, refetch } = useQuery(
    {
      queryKey: [...key],
      queryFn: () =>
        axiosJWT
          .get(param, { cancelToken: source.token })
          .then((res) => res.data),
      keepPreviousData: true,
    },
    {
      enabled: false,
      staleTime: Infinity,
    }
  );

//   useEffect(() => {
//     return () => {
//       source.cancel("Component unmounted");
//     };
//   }, []);

  return [isLoading, error, data, refetch];
}
