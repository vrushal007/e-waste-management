import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseBody } from 'src/common/utils/helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
  ){}
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  async findAll(userId : string) {
    try {
      const getAllUserOrder = await this.orderRepository.find({
        where : {
          userId 
        }
      })
      return new ResponseBody(200, 'all orders fetched successfully', getAllUserOrder,  true)
    } catch (error) {
      throw error
    }
  }

  findOne(id: string, userId : string) {
    try {
      const findUserOrder = this.orderRepository.findOne({
        where : {
          id,
          userId
        }
      })
      if(!findUserOrder) throw new NotFoundException('Order not found')
      return new ResponseBody(200, 'Order fetched successfully', findUserOrder, true)
    } catch (error) {
      throw error
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const findUser = await this.userRepository.findOne({
        where : {
          id
        }
      })
      if(!findUser) throw new NotFoundException('User not found')
      const updatedUser = await this.userRepository.save({
        ...findUser,
        ...updateUserDto
      })
      return new ResponseBody(200, 'User updated successfully', updatedUser, true)
    } catch (error) {
      throw error
    }
  }

  async getAllUser(){
    try {
      const getAllUsers = await this.userRepository.find()
      return new ResponseBody(200, 'all users fetched successfully', getAllUsers, true)
    } catch (error) {
      throw error
    }
  }
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
