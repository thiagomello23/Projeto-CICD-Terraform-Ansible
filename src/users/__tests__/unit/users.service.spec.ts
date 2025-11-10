import { Test } from '@nestjs/testing';
import { UsersService } from '../../users.service';
import { Users } from '../../users.entity';
import { randomUUID } from 'node:crypto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from '../../dto/create-user.dto';
import { BadRequestException } from '@nestjs/common';

describe('UsersService', () => {
    let usersService: UsersService;

    const mockQueryBuild = {
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn(),
    };

    const mockUsersRepository = {
        find: jest.fn(),
        createQueryBuilder: jest.fn(() => mockQueryBuild),
        save: jest.fn(),
    };

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(Users),
                    useValue: mockUsersRepository,
                },
            ],
        }).compile();

        usersService = moduleRef.get<UsersService>(UsersService);
    });

    describe('create', () => {
        it('Deve criar um usuário com sucesso', async () => {
            const mockCreateUserDto = new CreateUserDto();
            mockCreateUserDto.email = 'user@gmail.com';
            mockCreateUserDto.firstName = 'Test';
            mockCreateUserDto.lastName = 'Test';

            const mockUser = new Users();
            mockUser.id = randomUUID();
            mockUser.email = mockCreateUserDto.email;
            mockUser.firstName = mockCreateUserDto.firstName;
            mockUser.lastName = mockCreateUserDto.lastName;
            mockUser.createdAt = new Date();
            mockUser.updatedAt = new Date();

            mockQueryBuild.getMany.mockReturnValue([]);
            mockUsersRepository.save.mockReturnValue(mockUser);

            const result = await usersService.create(mockCreateUserDto);

            expect(result).toEqual(mockUser);
            expect(mockQueryBuild.getMany).toHaveBeenCalledTimes(1);
            expect(mockUsersRepository.save).toHaveBeenCalledTimes(1);
        });

        it('Deve retornar um erro se o usuário já existir', async () => {
            const mockCreateUserDto = new CreateUserDto();
            mockCreateUserDto.email = 'user@gmail.com';
            mockCreateUserDto.firstName = 'Test';
            mockCreateUserDto.lastName = 'Test';

            mockQueryBuild.getMany.mockReturnValue([mockCreateUserDto]);

            await expect(() =>
                usersService.create(mockCreateUserDto),
            ).rejects.toThrow(BadRequestException);
        });
    });

    describe('getAll', () => {
        it('Deve retornar um array de usuários', async () => {
            const expected: Array<Users> = [
                {
                    id: randomUUID().toString(),
                    firstName: 'Teste',
                    lastName: 'Test',
                    email: 'Teste',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: new Date(),
                },
            ];

            mockUsersRepository.find.mockReturnValue(expected);

            const result = await usersService.getAll();

            expect(result).toEqual(expected);
            expect(mockUsersRepository.find).toHaveBeenCalledTimes(1);
        });
    });
});
