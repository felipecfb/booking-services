import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Client, ClientProps } from '@/domain/enterprise/entities/client'

export function makeClient(
  override: Partial<ClientProps> = {},
  id?: UniqueEntityID,
) {
  const client = Client.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return client
}
