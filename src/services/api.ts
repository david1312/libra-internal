import axios from "axios";
import { notification } from "antd";
import Cookies from "js-cookie";

const base = "https://api.libra-internal-app.com/v1";
// const base = "http://localhost:8097/v1";

const FORM_DATA = [
  "/list/brand-tire/form",
  "/list/product/form",
  "/list/brand-motor/form",
  "/list/brand-tire/form/update-icon/:id",
  "/list/brand-motor/form/update-icon/:id",
  "/list/motors/form",
];

export const api = axios.create({
  baseURL: base,
});

export const rawApi = axios.create({
  baseURL: "https://api2-lb.jubelio.com",
});

export function getAnomToken() {
  if (Cookies.get("semesta.anom.token")) return;
  return axios
    .get("https://api.sunmorisemestaban.com/v1/auth/anonymous")
    .then((res) => {
      Cookies.set("semesta.anom.token", res.data.data.anonymous_token, {
        expires: new Date(res.data.data.expired_at),
        secure: true,
      });
    });
}

export const apiFetcher = (resource: string) =>
  api.get(resource).then((res) => res.data.data);

export const apiFetcherRaw = (resource: string) =>
  rawApi.get(resource).then((res) => res.data.data);

api.interceptors.request.use(
  function (config) {
    const token =
      Cookies.get("semesta.token") || Cookies.get("semesta.anom.token");

    if (!token) return config;
    return {
      ...config,
      headers: {
        ["Authorization"]: `Bearer ${token}`,
        "Content-Type": FORM_DATA.includes(window.location.pathname)
          ? "multipart/form-data"
          : "application/json",
      },
    };
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      window.location.replace("/logout");
    }
    notification.error({
      message: "Something Went Wrong!",
      description: JSON.stringify(error.response.data.error), // TODO: mapping error mengikuti BE
    });
    return Promise.reject(error);
  }
);
