
import axios from "axios";
import SummaryApi, { baseURL } from "../common/SummaryApi";

const Axios = axios.create({
  baseURL,
  withCredentials: true ,  
});

// ------- Request interceptor: أرفق الـ accessToken -------
Axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken"); // 
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ------- Refresh Helpers -------
let isRefreshing = false;
let pending = []; // 

function onRefreshed(newToken) {
  pending.forEach((cb) => cb(newToken));
  pending = [];
}

const raw = axios.create({ baseURL, withCredentials: true });

async function refreshAccessToken() {
  try {
    const refreshToken = localStorage.getItem("refreshToken"); 
    const cfg = refreshToken
      ? {
          ...SummaryApi.refreshToken,
          headers: { Authorization: `Bearer ${refreshToken}` },
        }
      : { ...SummaryApi.refreshToken };

    const { data } = await raw(cfg);
    const newToken =
      data?.data?.accessToken || data?.accessToken || data?.token;

    if (newToken) {
      localStorage.setItem("accessToken", newToken);
      return newToken;
    }
    throw new Error("No accessToken in refresh response");
  } catch (err) {

    localStorage.removeItem("accessToken");

    localStorage.removeItem("refreshToken");
    throw err;
  }
}

// ------- Response interceptor: جدِّد عند 401 -------
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;


    if (!error.response) return Promise.reject(error);

    const status = error.response.status;
    const msg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "";


    if (status === 401 && !original._retry) {
      if (isRefreshing) {

        return new Promise((resolve) => {
          pending.push((newToken) => {
            if (newToken) {
              original.headers.Authorization = `Bearer ${newToken}`;
            } else {
              delete original.headers.Authorization;
            }
            resolve(Axios(original));
          });
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken();
        isRefreshing = false;
        onRefreshed(newToken);

        if (newToken) {
          original.headers.Authorization = `Bearer ${newToken}`;
        } else {
          delete original.headers.Authorization;
        }
        return Axios(original); // إ
      } catch (e) {
        isRefreshing = false;
        pending = [];

        try {
          if (SummaryApi.logout) await raw(SummaryApi.logout);
        // eslint-disable-next-line no-empty
        } catch (_) {}
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        if (typeof window !== "undefined") {
          window.location.href = "/login?reason=session_expired";
        }
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default Axios;