import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCollectorDto } from './create-collector.dto';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateCollectorDto  {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    conatctNumber : string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    address : string

    @ApiProperty()
    @IsBoolean()
    @Transform(({value})=> {
        return (value == true || value == 'true') ? true : false
    })
    @IsNotEmpty()
    availability : boolean
}
