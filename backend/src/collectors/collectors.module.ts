import { Module } from '@nestjs/common';
import { CollectorsService } from './collectors.service';
import { CollectorsController } from './collectors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Recycler } from 'src/recycler/entities/recycler.entity';
import { Collector } from './entities/collector.entity';
import { JwtService } from '@nestjs/jwt';
import { Auth } from 'src/auth/entities/auth.entity';

@Module({
  imports : [TypeOrmModule.forFeature([ Order, User, Recycler, Collector, Auth])],
  controllers: [CollectorsController],
  providers: [CollectorsService, JwtService],
})
export class CollectorsModule {}
