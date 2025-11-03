import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 200 })
    firstName: string;

    @Column({ length: 200 })
    lastName: string;

    @Column({
        unique: true,
    })
    email: string;
}
