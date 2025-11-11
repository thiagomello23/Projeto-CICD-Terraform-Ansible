import { Test } from '@nestjs/testing';
import { UsersService } from '../../users.service';
import { Users } from '../../users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { mockRepository } from '../../../../test/mocks/repository.mock';
import { mockQueryBuild } from '../../../../test/mocks/query-builder.mock';
import { createUserDtoFactory } from '../../../../test/factories/users/create-user.dto.factory';
import { createUserEntityFactory, createUserEntityFactoryByDto } from '../../../../test/factories/users/create-user.entity.factory';

describe('UsersService', () => {
    let usersService: UsersService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(Users),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        usersService = moduleRef.get<UsersService>(UsersService);
    });

    describe('create', () => {
        it('Deve criar um usuário com sucesso', async () => {
            const mockCreateUserDto = createUserDtoFactory()

            const mockUser = createUserEntityFactoryByDto(mockCreateUserDto)

            mockQueryBuild.getMany.mockReturnValue([]);
            mockRepository.save.mockReturnValue(mockUser);

            const result = await usersService.create(mockCreateUserDto);

            expect(result).toEqual(mockUser);
            expect(mockQueryBuild.getMany).toHaveBeenCalledTimes(1);
            expect(mockRepository.save).toHaveBeenCalledTimes(1);
        });

        it('Deve retornar um erro se o usuário já existir', async () => {
            const mockCreateUserDto = createUserDtoFactory()

            mockQueryBuild.getMany.mockReturnValue([mockCreateUserDto]);

            await expect(() =>
                usersService.create(mockCreateUserDto),
            ).rejects.toThrow(BadRequestException);
        });
    });

    describe('getAll', () => {
        it('Deve retornar um array de usuários', async () => {
            const expected: Array<Users> = [
                createUserEntityFactory(),
                createUserEntityFactory()
            ];

            mockRepository.find.mockReturnValue(expected);

            const result = await usersService.getAll();

            expect(result).toEqual(expected);
            expect(mockRepository.find).toHaveBeenCalledTimes(1);
        });
    });
});
