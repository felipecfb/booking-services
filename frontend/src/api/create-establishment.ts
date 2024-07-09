import { api } from '@/lib/axios'

interface CreateEstablishmentRequest {
  name: string
  description: string
  document: string
  ownerId: string
}

interface CreateEstablishmentResponse {
  id: string
  name: string
  slug: string
  ownerId: string
  description: string
  document: string
  createdAt: Date
  updatedAt: Date
}

export async function createEstablishment({
  name,
  description,
  document,
  ownerId,
}: CreateEstablishmentRequest) {
  const response = await api.post<CreateEstablishmentResponse>(
    '/establishments',
    {
      name,
      description,
      document,
      ownerId,
    },
  )

  return response.data
}
