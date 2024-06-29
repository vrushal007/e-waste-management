import { Module } from '@nestjs/common';
import { RecyclerService } from './recycler.service';
import { RecyclerController } from './recycler.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Recycler } from './entities/recycler.entity';
import { Collector } from 'src/collectors/entities/collector.entity';
import { Auth } from 'src/auth/entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/role/entities/role.entity';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports : [TypeOrmModule.forFeature([ Order, User, Recycler, Collector, Auth, Role])],
  controllers: [RecyclerController],
  providers: [RecyclerService, JwtService, AuthService, MailService],
})
export class RecyclerModule {}
