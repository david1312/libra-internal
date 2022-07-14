import { ENDPOINT } from "@/interfaces";
import useSWR from "swr";
import { apiFetcher } from "./api";

export function getProfile() {
  const { data, error } = useSWR(ENDPOINT.PROFILE, apiFetcher);
  return {
    dataProfile: data,
    isLoading: !error && !data,
    isError: error,
  };
}
