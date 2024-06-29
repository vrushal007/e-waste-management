import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UseFilters, UseInterceptors } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JWTAuthGuard } from 'src/auth/auth.guard';
import { ExceptionHandling } from 'src/common/utils/helper';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/roles.guard';
import { RoleDecorator, RoleEnum } from 'src/common/decorators/roles.decorator';
import { VerifyOrderDto } from './dto/verify-order.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterCustomOptions } from 'src/common/config/multer.config';


@UseFilters(ExceptionHandling)
@UseGuards(JWTAuthGuard)
@ApiBearerAuth()
@ApiTags('order apis')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @UseInterceptors(FileInterceptor('file', MulterCustomOptions))
  @Post('create')
  create(@Body() createOrderDto: CreateOrderDto, @Req() request: Request, file : Express.Multer.File) {
    return this.ordersService.create(createOrderDto, request['user'].userId, file);
  }

  @UseInterceptors(FileInterceptor('file', MulterCustomOptions))
  @Patch('update/:id')
  updateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.updateOrder(id, updateOrderDto);
  }

  // only for recyler
  @Patch('verify-order/:id')
  @UseGuards(RoleGuard)
  @RoleDecorator(RoleEnum.RECYCLER)
  verifyOrder(@Param('id') id: string, @Body() verifyOrderdto: VerifyOrderDto) {
    return this.ordersService.verifyOrder(id, verifyOrderdto);
  }

  // for collector to receiver order and change to 
  @UseGuards(RoleGuard)
  @RoleDecorator(RoleEnum.COLLECTOR, RoleEnum.RECYCLER)
  @Post('collect-order')
  collectOrder(@Body() payload: VerifyOrderDto) {
    return this.ordersService.collectOrder(payload);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
