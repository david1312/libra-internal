import { ENDPOINT } from "@/interfaces";
import { api } from "./api";

export async function postLogin(payload: any) {
  return await api.request<any, any>({
    url: ENDPOINT.LOGIN,
    data: payload,
    method: "POST",
  });
}
