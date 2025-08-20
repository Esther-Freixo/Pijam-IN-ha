import { type UsersRepository, type UserUpdateInput } from '../../repositories/users-repository.ts'
import { type User } from '@prisma/client'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error.ts'

interface DeleteUserUseCaseRequest {
    id: string 
}

interface DeleteUserUseCaseResponse {
    user: User
}


export class DeleteUserUseCase {
    constructor(private readonly usersRepository: UsersRepository) { }

    async execute({ id }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
       const deleteUser= await this.usersRepository.delete(id)

        if(!deleteUser){
            throw new ResourceNotFoundError()
        }

        return {user: deleteUser}

    }
}
