import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {

    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>
    ){}

    async get() {
        return this.usersRepository.find()
    }

}
