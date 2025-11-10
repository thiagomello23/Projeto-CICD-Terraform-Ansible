import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../database/base-entity';

@Entity()
export class Users extends BaseEntity {
    // @PrimaryGeneratedColumn('uuid')
    // @ApiProperty()
    // id: string;

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
