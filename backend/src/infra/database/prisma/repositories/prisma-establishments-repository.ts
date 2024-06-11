import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { EstablishmentsRepository } from '@/domain/application/repositories/establishments-repository'
import { Establishment } from '@/domain/enterprise/entities/establishment'
import { PrismaEstablishmentsMapper } from '../mappers/prisma-establishments-mapper'

@Injectable()
export class PrismaEstablishmentsRepository
  implements EstablishmentsRepository
{
  constructor(private prisma: PrismaService) {}
  async findBySlug(slug: string): Promise<Establishment | null> {
    console.log(slug)

    const establishment = await this.prisma.establishment.findUnique({
      where: {
        slug,
      },
    })

    if (!establishment) {
      return null
    }

    return PrismaEstablishmentsMapper.toDomain(establishment)
  }

  async findEstablishmentById(
    establishmentId: string,
  ): Promise<Establishment | null> {
    const establishment = await this.prisma.establishment.findUnique({
      where: {
        id: establishmentId,
      },
    })

    if (!establishment) {
      return null
    }

    return PrismaEstablishmentsMapper.toDomain(establishment)
  }

  async create(establishment: Establishment): Promise<Establishment> {
    const data = PrismaEstablishmentsMapper.toPrisma(establishment)

    await this.prisma.establishment.create({
      data,
    })

    return establishment
  }
}
