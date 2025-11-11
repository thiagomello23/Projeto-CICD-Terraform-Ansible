import { randomUUID } from "crypto";
import { CreateUserDto } from "../../../src/users/dto/create-user.dto"
import { Users } from "../../../src/users/users.entity";
import { faker } from '@faker-js/faker';

// Pelo DTO do create-user
export const createUserEntityFactoryByDto = (createUserDto: CreateUserDto) => {
    const date = new Date()

    const mockUser = new Users();
    mockUser.id = randomUUID();
    mockUser.email = createUserDto.email;
    mockUser.firstName = createUserDto.firstName;
    mockUser.lastName = createUserDto.lastName;
    mockUser.createdAt = date
    mockUser.updatedAt = date

    return mockUser;
}

export const createUserEntityFactory = () => {
    const date = new Date()

    const mockUser = new Users();
    mockUser.id = randomUUID();
    mockUser.email = faker.internet.email();
    mockUser.firstName = faker.person.firstName();
    mockUser.lastName = faker.person.lastName();
    mockUser.createdAt = date
    mockUser.updatedAt = date

    return mockUser;
}