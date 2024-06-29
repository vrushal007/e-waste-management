import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { CHECK_ROLES, RoleEnum } from 'src/common/decorators/roles.decorator'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Auth } from "./entities/auth.entity";

export class RoleGuard implements CanActivate {

    constructor(
        @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
        private reflector: Reflector) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const getRoles: RoleEnum[] = this.reflector.get<RoleEnum[]>(CHECK_ROLES, context.getClass());

            const request = context.switchToHttp().getRequest();
            let user = request.user;
            const getUserRole = await this.authRepository.findOne({ where: { id: user.id } });

            const role = getRoles.includes(getUserRole.role);
            //if the role in the user not found in the metadata we will return false
            return role
            
        } catch (error) {
            throw error
        }
    }
}
