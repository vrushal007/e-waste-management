import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCollectorDto } from './dto/create-recycler.dto';
import { UpdateRecyclerDto } from './dto/update-recycler.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Collector, CollectorStatus } from 'src/collectors/entities/collector.entity';
import { Repository } from 'typeorm';
import { Recycler } from './entities/recycler.entity';
import { Auth, RoleEnum } from 'src/auth/entities/auth.entity';
import { generate } from 'generate-password';
import { ResponseBody } from 'src/common/utils/helper';
import { Order } from 'src/orders/entities/order.entity';

@Injectable()
export class RecyclerService {
  constructor(
    @InjectRepository(Collector)
    private readonly collectorRepository: Repository<Collector>,
    @InjectRepository(Recycler)
    private readonly recyclerRepository: Repository<Recycler>,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    @InjectRepository(Order)
    private readonly orderRepository : Repository<Order>
  ) { }
  async create(payload: CreateCollectorDto, userId: string) {
    try {
      const { email, name } = payload
      // check if the collector is already exists
      const isCollectorExists = this.authRepository.findOne({ where: { email, isVerified: true, role : RoleEnum.COLLECTOR }})
      if (isCollectorExists) throw new ConflictException('Collector already exists')

      const password = await this.generatePassword()
      // if the collector is not there then create one
      const newCollector = this.authRepository.create({
        email,
        name,
        password, 
        parentRecyclerId : userId
      })
      // send the mail
      return new ResponseBody(201, "Collector created successfully", newCollector, true)

    } catch (error) {
      throw error
    }
  }

  async findAll(userId : string) {
    try {
      // get all the order of the recyler respectively
      const getAllOrders = await this.orderRepository.find({
        where : {
          recyclerId : userId
        }
      })
      return new ResponseBody(200, 'all orders fetched successfully', getAllOrders,  true)
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string, userId : string) {
    try {
      const getOrder = await this.orderRepository.findOne({
        where : {
          id,
          recyclerId : userId
        }
      })
      return new ResponseBody(200, 'Order fetched successfully', getOrder, true)
    } catch (error) {
      throw error
    }
  }

  async update(id: string, updateRecyclerDto: UpdateRecyclerDto) {
    try {
      const updateRecyler = await this.recyclerRepository.update({ id }, {...updateRecyclerDto})
      return new ResponseBody(201, "user updated successfully", updateRecyler, true)
    } catch (error) {
      throw error
    }
  }

  async getAllRecylers(){
    try {
      const getAllRecylers = await this.recyclerRepository.find()
      return new ResponseBody(201, "all recylers fetched successfully", getAllRecylers, true)
    } catch (error) {
      throw error
    }
  }

  private async generatePassword() {
    const password = generate({
      length: 10,
      numbers: true
    });
    return password
  }
}
