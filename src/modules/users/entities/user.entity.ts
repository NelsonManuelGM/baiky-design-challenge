import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    firstName: string

    @Column({ nullable: false })
    lastName: string

    @Column({ nullable: false })
    email: string
}