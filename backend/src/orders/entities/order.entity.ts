import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Recycler } from 'src/recycler/entities/recycler.entity';
import { Collector } from "src/collectors/entities/collector.entity";
import { User } from "src/users/entities/user.entity";


export enum OrderStatus {
    PENDING = 'pending',
    ASSIGNED = 'assigned',
    COLLECTED = 'collected',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
}

export enum PaymentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    FAILED = 'failed'
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type : 'varchar', length : 255, nullable : false})
    itemName: string;

    @Column({ type : 'int', nullable : false})
    quantities: number;

    @Column({ type : 'varchar', length : 255, nullable : false})
    imageUrl : string;

    @Column({ type : 'varchar', length : 255, nullable : false})
    description: string;

    @Column({ type : 'varchar', length : 255, nullable : false})
    address: string;

    @Column({ type : 'int', nullable : false})
    orderPrice : number;

    @Column({ type : 'int', nullable : false})
    orderFinalPrice : number;
    
    @Column({ type : 'timestamp without time zone', nullable : false})
    expectedPickupDate: Date;

    @Column({ type : 'varchar', length : 255, nullable : false})
    preferredPickupDate: Date;

    @Column({ enum : OrderStatus, default : OrderStatus.PENDING})
    orderStatus: OrderStatus;

    @ManyToOne(() => Recycler)
    @JoinColumn({ name : 'recyclerId'})
    assignedRecycler: Recycler;

    @ManyToOne(() => Collector)
    @JoinColumn({ name : 'collectorId'})
    assignedCollector: Collector;

    @ManyToOne(()=> User)
    @JoinColumn({ name : 'userId'})
    user: User;

    @Column({ enum : PaymentStatus, nullable : false, default : PaymentStatus.PENDING})
    paymentStatus: PaymentStatus;

    @Column({ type : 'varchar', nullable : true})
    userId: string

    @Column({ type : 'varchar', nullable : true})
    recyclerId: string

    @Column({ type : 'varchar', nullable : true})
    collectorId: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
