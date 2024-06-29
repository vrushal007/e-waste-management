import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    name : string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    contactDetails : string
}
