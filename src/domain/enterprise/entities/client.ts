import { Optional } from '@/core/types/optional'
import { Entity } from '../../../core/entities/entity'
import { UniqueEntityID } from '../../../core/entities/unique-entity-id'

export interface ClientProps {
  name: string
  email: string
  password: string
  role: string
  createdAt: Date
}

export class Client extends Entity<ClientProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get role() {
    return this.props.role
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<ClientProps, 'role' | 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const client = new Client(
      {
        ...props,
        role: props.role ?? 'REGULAR',
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return client
  }
}
