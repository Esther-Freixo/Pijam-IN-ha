import { type UsersRepository} from '../../repositories/users-repository.ts'
import { type User } from '@prisma/client'

interface GetUsersUseCaseResponse {
  users: User[];
}

export class GetUsersUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(): Promise<GetUsersUseCaseResponse> {
    const users = await this.usersRepository.getAll();


    return { users: users };
  }
}
