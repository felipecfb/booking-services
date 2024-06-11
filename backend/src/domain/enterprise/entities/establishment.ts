import { Optional } from '@/core/types/optional'
import { Entity } from '../../../core/entities/entity'
import { UniqueEntityID } from '../../../core/entities/unique-entity-id'
import { Slug } from './value-objects/slug'
import { User } from './user'

export interface EstablishmentProps {
  name: string
  slug: Slug
  ownerId: string
  description: string
  document: string
  createdAt: Date
  updatedAt?: Date
  users?: User[]
}

export class Establishment extends Entity<EstablishmentProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.props.slug = Slug.createFromText(name)
    this.touch()
  }

  get slug() {
    return this.props.slug
  }

  get ownerId() {
    return this.props.ownerId
  }

  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  get document() {
    return this.props.document
  }

  get users() {
    return this.props.users
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
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
