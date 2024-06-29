import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator"
import { OrderStatus } from "../entities/order.entity"

export class VerifyOrderDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    orderId : string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    orderFinalPrice : number

    @ApiProperty()
    @IsNotEmpty()
    orderStatus : OrderStatus

    @ApiProperty()
    @IsString()
    @ValidateIf(o => o.orderStatus == OrderStatus.ASSIGNED)
    @IsNotEmpty()
    collectorId : string

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    expectedPickupDate : Date

}