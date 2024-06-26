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

export async function getDetailTransactions(payload?: any) {
  return await api.request<any, any>({
    url: ENDPOINT.DETAIL_TRANSACTION,
    data: JSON.stringify(payload),
    method: "POST",
  });
}

export async function getJubelioReportTest(payload?: any) {
  return await api.request<any, any>({
    url: ENDPOINT.JUBELIO_TEST,
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

export async function updateStatusTransactions(payload?: any) {
  return await api.request<any, any>({
    url: ENDPOINT.UPDATE_STATUS_TRANSACTIONS,
    data: JSON.stringify(payload),
    method: "POST",
  });
}

export async function getListAllSales(payload?: any) {
  return await api.request<any, any>({
    url: ENDPOINT.GET_ALL_SALES,
    data: JSON.stringify(payload),
    method: "POST",
  });
}

export async function getSalesByInvoice(payload?: any) {
  return await api.request<any, any>({
    url: ENDPOINT.GET_SALES_BY_INVOICE,
    data: JSON.stringify(payload),
    method: "POST",
  });
}

export async function getListAllLossSales(payload?: any) {
  return await api.request<any, any>({
    url: ENDPOINT.GET_ALL_LOSS_SALES,
    data: JSON.stringify(payload),
    method: "POST",
  });
}
