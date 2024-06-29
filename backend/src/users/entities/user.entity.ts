import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn } from "typeorm"
import { Recycler } from "src/recycler/entities/recycler.entity";
import { Order } from "src/orders/entities/order.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type : 'varchar', length : 255, nullable : true})
    name: string;

    @Column({ type : 'varchar', length : 255, nullable : false, select : false})
    password: string;

    @Column({ unique: true, type : 'varchar', length : 255, nullable : false})
    email: string;

    @Column({ type : 'varchar', length : 255, nullable : true})
    contactDetails: string;

    @Column({type :'varchar', nullable : true})
    refreshToken : string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
