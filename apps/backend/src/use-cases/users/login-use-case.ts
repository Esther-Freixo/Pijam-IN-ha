import { compare } from "bcryptjs";
import { UsersRepository } from "../../repositories/users-repository.ts";
import { InvalidCredentialsError } from "../../errors/invalid-credentials-error.ts";
import type { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
    email?: string,
    username?: string,
    password: string,
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({ email, username, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {

        const identifier = email ?? username;

        if (!identifier) {
            throw new InvalidCredentialsError();
        }
        const lowerCaseIdentifier = identifier.toLowerCase();

        const user = await this.usersRepository.findByEmailOrUsername(lowerCaseIdentifier);


        if (!user) {
            throw new InvalidCredentialsError();
        }

        const doesPasswordCompare = await compare(password, user.password)

        if (!doesPasswordCompare) {
            throw new InvalidCredentialsError();
        }

        return { user };

    }
}
