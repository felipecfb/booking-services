import { api } from '@/lib/axios'

interface GetEstablishmentResponse {
  id: string
  name: string
  slug: string
  ownerId: string
  description: string
  document: string
  createdAt: Date
  updatedAt: Date
}

export async function getEstablishment() {
  const response = await api.get<GetEstablishmentResponse>('/me')

  return response.data
}
