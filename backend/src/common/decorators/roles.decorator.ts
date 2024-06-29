import { SetMetadata } from "@nestjs/common";

export enum RoleEnum {
    ADMIN = 'admin',
    USER = 'user',
    RECYCLER  = 'recycler',
    COLLECTOR = 'collector'
}

export const CHECK_ROLES = 'check-roles'

export const RoleDecorator = (...roles: RoleEnum[]) => SetMetadata(CHECK_ROLES, roles)