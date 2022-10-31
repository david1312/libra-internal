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
  const { data, error, mutate } = useSWR(
    `${ENDPOINT.DETAIL_PRODUCT}?id=${id}`,
    apiFetcher
  );
  return {
    detailProduct: data,
    isLoading: !error && !data,
    isError: error,
    mutateList: mutate,
  };
}

export async function updateProduct(file: any) {
  return await api.request<void, void>({
    url: ENDPOINT.UPDATE_PRODUCT,
    data: file,
    method: "POST",
  });
}

export async function imageProduct(type: any, file: any) {
  var urlType = ENDPOINT.ADD_IMAGE_PRODUCT;

  switch (type) {
    case "UPDATE":
      urlType = ENDPOINT.UPDATE_IMAGE_PRODUCT;
      break;
    case "DELETE":
      urlType = ENDPOINT.DELETE_IMAGE_PRODUCT;
      break;
    default:
      urlType = ENDPOINT.ADD_IMAGE_PRODUCT;
      break;
  }

  return await api.request<void, void>({
    url: urlType,
    data: file,
    method: "POST",
  });
}
