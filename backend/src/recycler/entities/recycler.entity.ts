import { Auth } from "src/auth/entities/auth.entity";
import { Collector } from "src/collectors/entities/collector.entity";
import { Order } from "src/orders/entities/order.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, OneToOne } from "typeorm";

@Entity()
export class Recycler {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    companyName: string;

    @OneToOne(()=> Auth)
    @JoinColumn({ name : 'authUserId'})

    @Column({type : 'varchar', nullable : false})
    authUserId : string

    @Column({ type : 'varchar', length : 255, nullable : false})
    contactNumber: string;

    @Column({ type : 'varchar', length : 255, nullable : false})
    address: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

