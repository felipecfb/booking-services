import { Optional } from '@/core/types/optional'
import { Entity } from '../../../core/entities/entity'
import { UniqueEntityID } from '../../../core/entities/unique-entity-id'

export interface UserProps {
  name: string
  email: string
  password: string
  establishmentId: string
  establishmentRole?: string
  createdAt: Date
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get establishmentId() {
    return this.props.establishmentId
  }

  get establishmentRole() {
    return this.props.establishmentRole
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<UserProps, 'establishmentRole' | 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const client = new User(
      {
        ...props,
        establishmentRole: props.establishmentRole ?? 'MEMBER',
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return client
  }
}
