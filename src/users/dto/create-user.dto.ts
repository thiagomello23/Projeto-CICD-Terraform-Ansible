import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    @ApiProperty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    @ApiProperty()
    lastName: string;

    @IsEmail()
    @ApiProperty()
    email: string;
}
