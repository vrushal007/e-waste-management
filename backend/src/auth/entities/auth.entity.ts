import { Recycler } from "src/recycler/entities/recycler.entity";
import { Role } from "src/role/entities/role.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export enum Status{
    ACTIVE = 'active',
    DELETED = 'deleted',
}

export enum RequestStatus{
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected'
}

export enum RoleEnum{
    ADMIN = 'admin',
    USER = 'user',
    RECYCLER = 'recycler',
    COLLECTOR = 'collector'
}

@Entity()
export class Auth {
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column({ type : 'varchar', length : 255, nullable : true})
    name : string

    @Column({ type : 'varchar', length : 255, nullable : false, unique : true})
    email : string

    @Column({ type : 'varchar', length : 255, nullable : false, select : false})
    password : string

    // @ManyToMany(()=> Role)
    // @JoinTable({
    //     inverseJoinColumn : {name : 'role_id', referencedColumnName : 'id'},
    //     joinColumn : {name : 'auth_user_id', referencedColumnName : 'id'},
    // })
    // roles : Role[]

    @ManyToOne(() => Recycler)
    @JoinColumn({ name: 'parentRecyclerId' })
    recycler: Recycler;

    @Column({ enum : RoleEnum, type : 'enum', default : RoleEnum.USER})
    role : RoleEnum

    @Column({ type : 'varchar', nullable : true})
    parentRecyclerId : string

    @Column({ enum : Status, type : 'enum', default : Status.ACTIVE})
    status : Status

    @Column({ enum : RequestStatus, type : 'enum', default : RequestStatus.PENDING})
    requestStatus : RequestStatus

    @Column({ type : 'boolean', default : false})
    isVerified : boolean

    @Column({ type : 'varchar', nullable : true})
    verificationToken : string

    @Column({type : 'timestamp with time zone', nullable : true})
    verificationTokenExpires : Date
    
    @Column({ type : 'varchar', nullable : true})
    refreshToken : string

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date

}
