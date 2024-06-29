import { APP_FILTER } from "@nestjs/core";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class VerifyAuthDto {

    @ApiProperty()
    @IsString()
    email : string
}


export class ChangePasswordDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email : string

    @ApiProperty()
    @IsString()
    password : string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    oldPassword : string
}