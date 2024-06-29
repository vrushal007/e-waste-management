import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "./entities/auth.entity";
import { Repository } from "typeorm";

export class JWTAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(Auth) 
        private readonly authRepository : Repository<Auth>
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request?.headers['authorization']

        if (!token) return false;
        // verify the token
        const authorizationToken = token.split(' ')[1]
        const verifyUser = this.jwtService.verify(authorizationToken, { secret: process.env.ACCESS_TOKEN_SECRET })

        if (!verifyUser) return false;
        request.user = verifyUser;
        return true
        
    }
}