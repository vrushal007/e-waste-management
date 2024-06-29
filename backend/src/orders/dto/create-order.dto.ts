import { ApiConsumes, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsDateString, IsOptional, IsUUID, IsNumber } from 'class-validator';

export class CreateOrderDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    itemName: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    quantities: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    orderPrice: string;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    expectedPickupDate: Date;

    @ApiProperty()
    @IsString()
    @IsOptional()
    recyclerId?: string;

    @ApiProperty({
        type: 'file',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
        description: 'Attachment',
      })
    image: string;
}
