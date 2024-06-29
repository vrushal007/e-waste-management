import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController, AuthUserController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Recycler } from 'src/recycler/entities/recycler.entity';
import { Collector } from 'src/collectors/entities/collector.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Auth, Role, User, Recycler, Collector])],
  controllers: [AuthController, AuthUserController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
