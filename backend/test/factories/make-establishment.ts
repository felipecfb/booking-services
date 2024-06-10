import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Establishment,
  EstablishmentProps,
} from '@/domain/enterprise/entities/establishment'

export function makeEstablishment(
  override: Partial<EstablishmentProps> = {},
  id?: UniqueEntityID,
) {
  const service = Establishment.create(
    {
      name: faker.lorem.words(3),
      description: faker.lorem.words(10),
      ...override,
    },
    id,
  )

  return service
}
