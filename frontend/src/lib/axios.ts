import axios, { isAxiosError } from 'axios'

import { env } from '@/env'
import Cookies from 'js-cookie'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 3000)),
    )

    return config
  })
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error)) {
      const status = error.response?.data.statusCode
      const code = error.response?.data.message

      if (status === 401 && code === 'Unauthorized') {
        Cookies.remove('access_token')
      } else {
        throw error
      }
    }
  },
)
