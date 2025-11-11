import { CreateUserDto } from '../../../src/users/dto/create-user.dto';
import { faker } from '@faker-js/faker';

export const createUserDtoFactory = (): CreateUserDto => {
    return {
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
    };
};
