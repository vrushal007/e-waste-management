import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { IsOrderPending } from 'src/common/decorators/validate.decorator';

export class UpdateOrderDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @ValidateIf(o=> o.orderStatus == 'pending')
    @IsOrderPending({message: "order status must be pending"})
    itemName: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @ValidateIf(o=> o.orderStatus == 'pending')
    @IsOrderPending({message: "order status must be pending"})
    quantities: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @ValidateIf(o=> o.orderStatus == 'pending')
    @IsOrderPending({message: "order status must be pending"})
    description: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @ValidateIf(o=> o.orderStatus == 'pending')
    @IsOrderPending({message: "order status must be pending"})
    address: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @ValidateIf(o=> o.orderStatus == 'pending')
    @IsOrderPending({message: "order status must be pending"})
    orderPrice: number;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    @ValidateIf(o=> o.orderStatus == 'pending')
    @IsOrderPending({message: "order status must be pending"})
    expectedPickupDate: Date;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @ValidateIf(o => o.orderStatus == 'pending')
    @IsOrderPending({message: "order status must be pending"})
    recyclerId?: string;

    @ApiProperty({ type  : 'file', format : 'binary'})
    @IsString()
    @IsOptional()
    @ValidateIf(o => o.orderStatus == 'pending')
    @IsOrderPending({message: "order status must be pending"})
    file : Express.Multer.File;

}
