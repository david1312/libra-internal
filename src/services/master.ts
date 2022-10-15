import { ENDPOINT } from "@/interfaces";
import useSWR from "swr";
import { apiFetcher, api } from "./api";

export function getMasterBrand() {
  const { data, error, mutate } = useSWR(ENDPOINT.BRAND_MOTOR, apiFetcher);
  return {
    dataMasterBrand: data,
    isLoading: !error && !data,
    isError: error,
    mutateList: mutate,
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

export async function updateMasterTireBrand(file: any) {
  return await api.request<void, void>({
    url: ENDPOINT.UPDATE_TIRE_BRAND,
    data: file,
    method: "POST",
  });
}

export async function removeMasterMotorBrand(file: any) {
  return await api.request<void, void>({
    url: ENDPOINT.REMOVE_MOTOR_BRAND,
    data: file,
    method: "POST",
  });
}

export async function updateMasterMotorBrand(file: any) {
  return await api.request<void, void>({
    url: ENDPOINT.UPDATE_MOTOR_BRAND,
    data: file,
    method: "POST",
  });
}

export async function updateIconTireBrand(file: any) {
  return await api.request<void, void>({
    url: ENDPOINT.UPDATE_IMAGE_TIRE_BRAND,
    data: file,
    method: "POST",
  });
}

export async function updateIconMotorBrand(file: any) {
  return await api.request<void, void>({
    url: ENDPOINT.UPDATE_IMAGE_MOTOR_BRAND,
    data: file,
    method: "POST",
  });
}

export function getMasterTireType() {
  const { data, error, mutate } = useSWR(ENDPOINT.TIRE_TYPE, apiFetcher);
  return {
    dataTireType: data,
    isLoading: !error && !data,
    isError: error,
    mutateList: mutate,
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
  const { data, error, mutate } = useSWR(ENDPOINT.TIRE_BRAND, apiFetcher);
  return {
    dataTireBrand: data,
    isLoading: !error && !data,
    isError: error,
    mutateList: mutate,
  };
}

export function deleteProduct(data: any) {
  return api.request<void, void>({
    url: ENDPOINT.DELETE_PRODUCT,
    method: "POST",
    data: JSON.stringify(data),
  });
}

export async function addMasterMotor(file: any) {
  return await api.request<void, void>({
    url: ENDPOINT.ADD_MOTOR,
    data: file,
    method: "POST",
  });
}

export async function getListMotors(payload?: any) {
  return await api.request<any, any>({
    url: ENDPOINT.LIST_MOTORS,
    data: payload,
    method: "POST",
  });
}

export async function removeMasterMotors(file: any) {
  return await api.request<void, void>({
    url: ENDPOINT.REMOVE_MOTOR,
    data: file,
    method: "POST",
  });
}

export async function updateMasterMotor(file: any) {
  return await api.request<void, void>({
    url: ENDPOINT.UPDATE_MOTOR,
    data: file,
    method: "POST",
  });
}

export async function updateIconMotor(file: any) {
  return await api.request<void, void>({
    url: ENDPOINT.UPDATE_IMAGE_MOTOR,
    data: file,
    method: "POST",
  });
}

export function getMasterCategoryMotors() {
  const { data, error, mutate } = useSWR(
    ENDPOINT.LIST_CATEGORY_MOTOR,
    apiFetcher
  );
  return {
    dataMasterCategory: data,
    isLoading: !error && !data,
    isError: error,
    mutateList: mutate,
  };
}
