import axios from "axios";
import { HTTP_URL } from "../config";
import { cookies } from "next/headers";

export const getServerClient = async () => {

  const cookieJar = await cookies()
  const authToken = cookieJar.get('auth_token')?.value

  const instance = axios.create({
    baseURL: HTTP_URL,
    headers: {
      Cookie: authToken ? `auth_token=${authToken}` : ''
    },
    withCredentials: true,
  })

  instance.interceptors.response.use((response) => response, (error) => {
    if(error.response?.status === 401) {
      //todo: redirect to login
    }
    throw new Error(error.response?.message ?? 'Auth error')
  })
  
  return instance 
}


