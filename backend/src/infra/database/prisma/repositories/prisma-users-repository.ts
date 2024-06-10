import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaUsersMapper } from '../mappers/prisma-users-mapper'
import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { User } from '@/domain/enterprise/entities/user'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findUserById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUsersMapper.toDomain(user)
  }

  async findUsersByEstablishmentId(
    establishmentId: string,
    { page }: PaginationParams,
  ): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
        establishmentId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return users.map(PrismaUsersMapper.toDomain)
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUsersMapper.toDomain(user)
  }

  async create(user: User): Promise<User> {
    const data = PrismaUsersMapper.toPrisma(user)

    await this.prisma.user.create({
      data,
    })

    return user
  }
}
