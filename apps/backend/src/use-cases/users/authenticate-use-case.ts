import { compare } from "bcryptjs";
import { UsersRepository } from "../../repositories/users-repository.ts";
import { InvalidCredentialsError } from "../../errors/invalid-credentials-error.ts";
import type { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
    email: string,
    password: string,
}

interface AuthenticateUseCaseResponse {
    user: User
}


export class AuthenticateUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {

        const user = await this.usersRepository.findByEmail(email)
    
        if (!user) {
            throw new InvalidCredentialsError();
        }
    
        const doesPasswordCompare = await compare(password, user.password)

        if(!doesPasswordCompare) {
            throw new InvalidCredentialsError();
        }

        return { user };
       
    }
}
