import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Auth } from 'src/auth/entities/auth.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports : [TypeOrmModule.forFeature([User, Order, Auth])],
  controllers: [UsersController],
  providers: [UsersService,JwtService],
})
export class UsersModule {}
