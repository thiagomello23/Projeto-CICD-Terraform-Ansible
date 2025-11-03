import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {}
    async create(createUserDto: CreateUserDto) {
        const validUser = await this.usersRepository
            .createQueryBuilder('users')
            .where('users.email = :email', { email: createUserDto.email })
            .getMany();

        if (validUser?.length > 0) {
            throw new BadRequestException('Email já em uso!');
        }

        const user = new Users();
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;
        user.email = createUserDto.email;

        return this.usersRepository.save(user);
    }

    async getAll() {
        return this.usersRepository.find();
    }
}
