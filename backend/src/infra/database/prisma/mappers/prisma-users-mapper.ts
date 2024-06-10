import { User as PrismaUser, Prisma, Role } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/enterprise/entities/user'

export class PrismaUsersMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        establishmentId: raw.establishmentId,
        establishmentRole: raw.establishmentRole || 'MEMBER',
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      establishmentId: user.establishmentId,
      establishmentRole: user.establishmentRole as Role,
      createdAt: user.createdAt,
    }
  }
}
