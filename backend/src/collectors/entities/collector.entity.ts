import { Auth } from "src/auth/entities/auth.entity";
import { Order } from "src/orders/entities/order.entity";
import { Recycler } from "src/recycler/entities/recycler.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum CollectorStatus {
    PENDING = 'pending',
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

@Entity()
export class Collector {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type : 'varchar', length : 255, nullable : true})
    contactNumber : string;
    
    @OneToOne(()=> Auth)
    @JoinColumn({ name : 'authUserId'})

    @Column({type : 'varchar', nullable : false})
    authUserId : string

    @Column({ type : 'boolean', nullable : false, default : true})
    availability: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
