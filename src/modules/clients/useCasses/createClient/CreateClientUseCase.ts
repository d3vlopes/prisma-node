import { hash } from 'bcrypt'

import { prisma } from '../../../../database/prismaClient'

interface ICreateClient {
  username: string
  password: string
}

export class CreateClientUseCase {
  async execute({ username, password }: ICreateClient) {
    // verifica se o usuário existe
    const clientExist = await prisma.clients.findFirst({
      where: {
        username: {
          equals: username,
          // ignora se tem tem maiúsculo
          mode: 'insensitive',
        },
      },
    })

    if (clientExist) {
      throw new Error('Client already exists')
    }

    // criptografar a senha
    const hashPassword = await hash(password, 10)

    //salvar o cliente
    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword,
      },
    })

    return client
  }
}
