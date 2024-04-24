import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Service, ServiceProps } from '@/domain/enterprise/entities/service'

export function makeService(
  override: Partial<ServiceProps> = {},
  id?: UniqueEntityID,
) {
  const service = Service.create(
    {
      clientId: new UniqueEntityID(),
      name: faker.lorem.words(3),
      description: faker.lorem.words(10),
      price: faker.number.int({
        min: 10000,
        max: 100000,
      }),
      ...override,
    },
    id,
  )

  return service
}
