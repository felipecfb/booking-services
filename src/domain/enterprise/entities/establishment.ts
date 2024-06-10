import { Optional } from '@/core/types/optional'
import { Entity } from '../../../core/entities/entity'
import { UniqueEntityID } from '../../../core/entities/unique-entity-id'
import { Slug } from './value-objects/slug'
import { User } from './user'

export interface EstablishmentProps {
  name: string
  slug: Slug
  description: string
  createdAt: Date
  users?: User[]
}

export class Establishment extends Entity<EstablishmentProps> {
  get name() {
    return this.props.name
  }

  get slug() {
    return this.props.slug
  }

  get description() {
    return this.props.description
  }

  get users() {
    return this.props.users
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<EstablishmentProps, 'users' | 'slug' | 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const establishment = new Establishment(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.name),
        users: props.users ?? [],
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return establishment
  }
}
