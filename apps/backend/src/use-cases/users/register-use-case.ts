import { hash } from 'bcryptjs'
import { UsersRepository } from '../../repositories/users-repository.ts'

interface RegisterUseCaseRequest {
  name: string
  email: string
  username: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, username, password }: RegisterUseCaseRequest): Promise<void> {
    const passwordHash = await hash(password, 8)

    const userAlreadyExists = await this.usersRepository.findByEmail(email)
    if (userAlreadyExists) {
      throw new Error('Email já está em uso')
    }

    await this.usersRepository.create({
      name,
      email,
      username,
      password: passwordHash,
    })
  }
}
