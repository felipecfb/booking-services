import { api } from '@/lib/axios'

interface SignInBody {
  email: string
  password: string
}

interface SignInResponse {
  access_token: string
}

export async function signIn({ email, password }: SignInBody) {
  const response = await api.post<SignInResponse>('/sessions', {
    email,
    password,
  })

  return response.data
}
