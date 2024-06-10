import { InMemoryServicesRepository } from 'test/repositories/in-memory-services-repository'
import { FetchServiceUseCase } from './fetch-services'
import { makeService } from 'test/factories/make-service'

let inMemoryServicesRepository: InMemoryServicesRepository
let sut: FetchServiceUseCase

describe('Create Service Use Case', () => {
  beforeEach(() => {
    inMemoryServicesRepository = new InMemoryServicesRepository()
    sut = new FetchServiceUseCase(inMemoryServicesRepository)
  })

  it('should be able to fetch services', async () => {
    await inMemoryServicesRepository.create(makeService())
    await inMemoryServicesRepository.create(makeService())
    await inMemoryServicesRepository.create(makeService())

    const result = await sut.execute({
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.services).toHaveLength(3)
  })

  it('should be able to fetch paginated services', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryServicesRepository.create(makeService())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.services).toHaveLength(2)
  })
})
