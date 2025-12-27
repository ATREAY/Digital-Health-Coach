import axios from "axios";
import { getToken } from "./auth";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
});

// add token automatically
API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// services/api.ts
export const submitLog = (data: any) => API.post("/logs/", data);

export const signup = (data: any) => API.post("/auth/signup", data);
export const login = (data: any) => API.post("/auth/login", data);

export const saveProfile = (data: any) => API.post("/profile/", data);
export const saveLog = (data: any) => API.post("/logs/", data);
export const analyze = () => API.post("/analyze/");
export const fetchProgress = () => API.get("/progress/");
