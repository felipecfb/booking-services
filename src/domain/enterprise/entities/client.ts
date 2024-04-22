import { Entity } from '../../../core/entity'
import { UniqueEntityID } from '../../../core/unique-entity-id'

export interface ClientProps {
  name: string
  email: string
  password: string
}

export class Client extends Entity<ClientProps> {
  static create(props: ClientProps, id?: UniqueEntityID) {
    const client = new Client(props, id)

    return client
  }
}
