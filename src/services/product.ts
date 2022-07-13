import { ENDPOINT } from "@/interfaces";
import useSWR from "swr";
import { apiFetcher, api } from "./api";

export async function getListProduct(payload?: any) {
  return await api.request<any, any>({
    url: ENDPOINT.LIST_PRODUCT,
    data: payload,
    method: "POST",
  });
}

export function getDetailProduct(id: any) {
  const { data, error } = useSWR(
    `${ENDPOINT.DETAIL_PRODUCT}?id=${id}`,
    apiFetcher
  );
  return {
    detailProduct: data,
    isLoading: !error && !data,
    isError: error,
  };
}
