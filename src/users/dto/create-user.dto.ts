import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    lastName: string;

    @IsEmail()
    email: string;
}
