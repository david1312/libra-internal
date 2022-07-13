import { api } from "./api";

export async function postLogin(payload: any) {
  return await api.request<any, any>({
    url: "/login",
    data: payload,
    method: "POST",
  });
}
