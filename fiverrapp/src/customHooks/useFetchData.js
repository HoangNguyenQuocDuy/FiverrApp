import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export default function useFetchData(key, param) {

  const [_isLoading, set_isLoading] = useState()
  const [ _error, set_error] = useState()
  const [_data, set_data] = useState()
  const [_refetch, set_refetch] = useState()

  const source = axios.CancelToken.source()

  console.log(source)

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: [...key],
    queryFn: () => newRequest.get(param, { cancelToken: source.token }).then((res) => res.data),
    keepPreviousData: true
  });

  useEffect(() => {

    // return () => {
    //   source.cancel('Component unmounted');
    // }
  }, [])
  

  return [ isLoading, error, data, refetch];
}
