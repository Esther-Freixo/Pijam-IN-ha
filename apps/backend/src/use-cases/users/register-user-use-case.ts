import { hash } from 'bcryptjs';
import { UserAlreadyExists } from '../../errors/user-already-exists-error.ts';
import type { UsersRepository } from '../../repositories/users-repository.ts';

interface RegisterUseCaseRequest {
    name: string,
    email: string,
    username: string,
    password: string
}


export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        name,
        email,
        username,
        password
    }: RegisterUseCaseRequest) {

        const lowerCaseEmail = email.toLowerCase();
        const lowerCaseUsername = username.toLowerCase();

        const userWithSameEmail = await this.usersRepository.findByEmail(lowerCaseEmail)
    
        if (userWithSameEmail) {
            throw new UserAlreadyExists();
        }
    
        const password_hash = await hash(password, 6);
        
        await this.usersRepository.create({
            name,
            email: lowerCaseEmail,
            username: lowerCaseUsername,
            password: password_hash,
        })

        console.log("criado com sucesso")
    }
}
