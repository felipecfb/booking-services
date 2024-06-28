import { api } from '@/lib/axios'

interface RegisterUserBody {
  name: string
  email: string
  password: string
}

export async function registerUser({
  name,
  email,
  password,
}: RegisterUserBody) {
  await api.post('/users', {
    name,
    email,
    password,
  })
}
