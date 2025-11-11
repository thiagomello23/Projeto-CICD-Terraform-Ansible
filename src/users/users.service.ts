import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
            throw new BadRequestException('Email já está cadastrado');
        }

        const user = new Users();
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;
        user.email = createUserDto.email;

        return this.usersRepository.save(user);
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.usersRepository
            .createQueryBuilder('users')
            .where('users.id = :userId', { userId: id })
            .getOne();

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        user.firstName = updateUserDto.firstName;
        user.lastName = updateUserDto.lastName;

        return this.usersRepository.save(user);
    }

    async getAll() {
        return this.usersRepository.find();
    }
}
