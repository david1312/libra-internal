import { ENDPOINT } from "@/interfaces";
import useSWR from "swr";
import { apiFetcher, api } from "./api";

export async function getListTransactions(payload?: any) {
  return await api.request<any, any>({
    url: ENDPOINT.LIST_TRANSACTIONS,
    data: JSON.stringify(payload),
    method: "POST",
  });
}

export function getTransactions() {
  const { data, error } = useSWR(ENDPOINT.LIST_TRANSACTIONS, apiFetcher);
  return {
    dataTransactions: data,
    isLoading: !error && !data,
    isError: error,
  };
}
