import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { RoleEnum } from "../entities/auth.entity";

export class LoginAuthDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email : string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password : string
}

export class SignUpUserDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name : string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email : string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password : string
}

export class RequestAdminDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email : string


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    role : RoleEnum
}

export class CreateAuthUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email : string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    roleId : string;
}
