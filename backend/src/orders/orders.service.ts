import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { Repository } from 'typeorm';
import { ResponseBody } from 'src/common/utils/helper';
import { Recycler } from 'src/recycler/entities/recycler.entity';
import { VerifyOrderDto } from './dto/verify-order.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Recycler)
    private readonly recyclerRepository: Repository<Recycler>,
    private readonly cloudinaryService: CloudinaryService
  ) { }
  async create(createOrderDto: CreateOrderDto, userId: string, file: Express.Multer.File) {
    try {
      const { address, description, expectedPickupDate, itemName, quantities, recyclerId } = createOrderDto
      // create the new order
      let image = file
      let newOrder = this.orderRepository.create({
        address, description, expectedPickupDate, itemName, quantities, recyclerId, userId
      })

      const cloudinaryData = await this.cloudinaryService.uploadImage(image.path);
      newOrder = { ...newOrder, imageUrl: cloudinaryData.secure_url }

      // save the order
      const createdOrder = await this.orderRepository.save(newOrder)

      return new ResponseBody(201, "Order created successfully", createdOrder, true)
    } catch (error) {
      throw error
    }
  }

  async updateOrder(id: string, payload: UpdateOrderDto) {
    try {
      // find the order
      const order = await this.orderRepository.findOne({ where: { id } })
      if (!order) throw new Error('Order not found')
      if (payload.file) {
        const newFileUrl = await this.cloudinaryService.uploadImage(payload.file.path)
        order.imageUrl = newFileUrl.secure_url
      }
      // update the order
      const updatedOrder = await this.orderRepository.save({ ...order, ...payload })
      return new ResponseBody(200, "Order updated successfully", updatedOrder, true)
    } catch (error) {
      throw error
    }
  }

  async verifyOrder(id: string, payload: VerifyOrderDto) {
    try {
      const { orderFinalPrice, orderId, orderStatus, collectorId, expectedPickupDate } = payload
      // find the order
      const order = await this.orderRepository.findOne({ where: { id: orderId } })
      if (!order) throw new Error('Order not found')
      // update the order
      await this.orderRepository.update({ id: orderId }, { orderFinalPrice, orderStatus, collectorId, expectedPickupDate })
      const findOrder = await this.orderRepository.findOne({ where: { id: orderId } })
      return new ResponseBody(200, "Order verified successfully", findOrder, true)
    } catch (error) {
      throw error
    }
  }

  // razorpay integration for payment to user
  async collectOrder(payload: VerifyOrderDto) {
    try {
      const { orderId, orderStatus, collectorId } = payload
      // find the order
      const order = await this.orderRepository.findOne({ where: { id: orderId } })
      if (!order) throw new Error('Order not found')
      // update the order
      await this.orderRepository.update({ id: orderId }, { orderStatus, collectorId })
      const findOrder = await this.orderRepository.findOne({ where: { id: orderId } })
      return new ResponseBody(200, "Order collected successfully", findOrder, true)
    } catch (error) {
      throw error
    }
  }


  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
