import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string;

    @Column({ length: 200 })
    @ApiProperty()
    firstName: string;

    @Column({ length: 200 })
    @ApiProperty()
    lastName: string;

    @Column({
        unique: true,
    })
    @ApiProperty()
    email: string;
}
