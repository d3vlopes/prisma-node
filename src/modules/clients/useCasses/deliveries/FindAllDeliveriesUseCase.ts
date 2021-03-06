import { prisma } from '../../../../database/prismaClient'

export class FindAllDeliveriesUseCase {
  async execute(id_client: string) {
    const deliveries = await prisma.clients.findMany({
      where: {
        id: id_client,
      },
      // informa quais informações devem ser incluidas
      select: {
        deliveries: true,
        id: true,
        username: true,
      },
    })

    return deliveries
  }
}
