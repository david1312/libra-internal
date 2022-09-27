import { ENDPOINT } from "@/interfaces";
import useSWR from "swr";
import { apiFetcher, api } from "./api";

export function getMasterBrand() {
  const { data, error } = useSWR(ENDPOINT.BRAND_MOTOR, apiFetcher);
  return {
    dataMasterBrand: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export async function addMasterBrand(file: any) {
  return await api.request<void, void>({
    url: ENDPOINT.UPLOAD_BRAND,
    data: file,
    method: "POST",
  });
}

export async function addMasterTireBrand(file: any) {
  return await api.request<void, void>({
    url: ENDPOINT.ADD_TIRE_BRAND,
    data: file,
    method: "POST",
  });
}

export async function removeMasterTireBrand(file: any) {
  return await api.request<void, void>({
    url: ENDPOINT.REMOVE_TIRE_BRAND,
    data: file,
    method: "POST",
  });
}

export function getMasterTireType() {
  const { data, error } = useSWR(ENDPOINT.TIRE_TYPE, apiFetcher);
  return {
    dataTireType: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export async function addMasterProduct(file: any) {
  return await api.request<void, void>({
    url: ENDPOINT.UPLOAD_PRODUCT,
    data: file,
    method: "POST",
  });
}

export function getMasterTireSize() {
  const { data, error } = useSWR(ENDPOINT.TIRE_SIZE, apiFetcher);
  return {
    dataTireSize: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function getMasterTireBrand() {
  const { data, error } = useSWR(ENDPOINT.TIRE_BRAND, apiFetcher);
  return {
    dataTireBrand: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function deleteProduct(data: any) {
  return api.request<void, void>({
    url: ENDPOINT.DELETE_PRODUCT,
    method: "POST",
    data: JSON.stringify(data),
  });
}
