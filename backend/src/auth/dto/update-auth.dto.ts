import { ApiProperty, PartialType } from '@nestjs/swagger';
import { SignUpUserDto } from './create-auth.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { RequestStatus, Status } from '../entities/auth.entity';

export class UpdateAuthDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    status : RequestStatus

}
