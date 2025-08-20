import { hash } from 'bcryptjs'
import { type UsersRepository, type UserUpdateInput } from '../../repositories/users-repository.ts'
import { type User } from '@prisma/client'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error.ts'

interface UpdateUserUseCaseRequest {
    id: string
    data: UserUpdateInput
}

interface UpdateUserUseCaseResponse {
    user: User
}


export class UpdateUserUseCase {
    constructor(private readonly usersRepository: UsersRepository) { }

    async execute({ id, data }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
        if (data.password){
            data.password = await hash(data.password,6)
        }

        const updateUser= await this.usersRepository.update(id,data)

        if(!updateUser){
            throw new ResourceNotFoundError()
        }

        return {user: updateUser}

    }
}
