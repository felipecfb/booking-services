import { api } from '@/lib/axios'

interface GetEstablishmentRequest {
  establishmentId: string
}

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

export async function getEstablishment({
  establishmentId,
}: GetEstablishmentRequest) {
  const response = await api.get<GetEstablishmentResponse>(
    `/establishments/${establishmentId}`,
  )

  return response.data
}
