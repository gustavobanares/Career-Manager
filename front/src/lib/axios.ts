import { accessTokenKey } from '@/context/auth-context'
import { env } from '@/env'
import axios from 'axios'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
})

api.interceptors.request.use((config) => {
  const acessToken = localStorage.getItem(accessTokenKey)

  if (acessToken) {
    config.headers.Authorization = `Bearer ${acessToken}`
  }

  return config
})
