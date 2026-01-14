import axios from "axios";
import { HTTP_URL } from "../config";

export const apiClient = axios.create({
  baseURL: HTTP_URL,
  withCredentials: true,
})

apiClient.interceptors.response.use((response) => response, (error) => {
  if(error.response?.status === 401) {
    //todo: redirect to login
  }
  throw new Error(error.response?.message ?? 'Auth error')
})