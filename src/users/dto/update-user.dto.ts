import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
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
}
