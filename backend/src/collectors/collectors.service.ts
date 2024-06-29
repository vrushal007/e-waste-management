import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCollectorDto } from './dto/create-collector.dto';
import { UpdateCollectorDto } from './dto/update-collector.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus } from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';
import { ResponseBody } from 'src/common/utils/helper';
import { Collector } from './entities/collector.entity';
import { Auth, RoleEnum } from 'src/auth/entities/auth.entity';

@Injectable()
export class CollectorsService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Collector)
    private readonly collectorRepository: Repository<Collector>,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>
  ){}
  create(createCollectorDto: CreateCollectorDto) {
    return 'This action adds a new collector';
  }

  async findAll(userId : string) {
    try {
      // get all th ordes which are assigned
      const getAllOrders = await this.orderRepository.find({
        where : {
          collectorId : userId,
          orderStatus : OrderStatus.ASSIGNED
        }
      })
      return new ResponseBody(200, 'all orders fetched successfully', getAllOrders,  true)
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string, userId : string) {
    try {
      const findAssignedOrder = await this.orderRepository.findOne({
        where : {
          id,
          collectorId : userId
        }
      })
      return new ResponseBody(200, 'order fetched successfully', findAssignedOrder,  true)
    } catch (error) {
      throw error
    }
  }

  async update(id: string, updateCollectorDto: UpdateCollectorDto, userId : string) {
    try {
      const findCollector = await this.authRepository.findOne({
        where : {
          id,
          role : RoleEnum.COLLECTOR
        }
      })
      if(!findCollector) throw new ConflictException('Collector not found')
      // now check in the collector table
      const collector = await this.collectorRepository.findOne({
        where : {
          authUserId : userId
        }
      })
      if(collector){
        await this.collectorRepository.update({id : collector.id}, {...updateCollectorDto})
        const updatedCollector = await this.collectorRepository.findOne({
          where : {
            id : collector.id
          }
        })
        return new ResponseBody(201, "Collector updated successfully", updatedCollector, true)
      }
      const createCollectorDetails = this.collectorRepository.create({
        ...updateCollectorDto
      })
      const updatedCollector = await this.collectorRepository.save(createCollectorDetails)
      return new ResponseBody(200, "Collector updated successfully", updatedCollector, true)
      
    } catch (error) {
      throw error
    }
  }

  async getAllCollectors() {
    try {
      const getAllCollectors = await this.collectorRepository.find()
      return new ResponseBody(200, 'all collectors fetched successfully', getAllCollectors,  true)
    } catch (error) {
      throw error
    }
  }

  remove(id: number) {
    return `This action removes a #${id} collector`;
  }
}
