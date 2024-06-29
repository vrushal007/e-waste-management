import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Recycler } from 'src/recycler/entities/recycler.entity';
import { Collector } from 'src/collectors/entities/collector.entity';
import { JwtService } from '@nestjs/jwt';
import { Auth } from 'src/auth/entities/auth.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports : [TypeOrmModule.forFeature([ Order, User, Recycler, Collector, Auth]), ConfigModule],
  controllers: [OrdersController],
  providers: [OrdersService, JwtService, CloudinaryService],
})
export class OrdersModule {}
