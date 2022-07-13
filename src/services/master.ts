import { ENDPOINT } from "@/interfaces";
import useSWR from "swr";
import { apiFetcher } from "./api";

export function getMasterBrand() {
  const { data, error } = useSWR(ENDPOINT.BRAND_MOTOR, apiFetcher);
  return {
    dataMasterBrand: data,
    isLoading: !error && !data,
    isError: error,
  };
}
