import { ENDPOINT } from "@/interfaces";
import useSWR from "swr";
import { apiFetcher, api } from "./api";

// export function getListProduct() {
//   const { data, error } = useSWR(ENDPOINT.LIST_PRODUCT, apiFetcher);
//   return {
//     listProduct: data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// }

export async function getListProduct(payload?: any) {
  return await api.request<any, any>({
    url: ENDPOINT.LIST_PRODUCT,
    data: payload,
    method: "POST",
  });
}
