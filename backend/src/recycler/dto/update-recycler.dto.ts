import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateRecyclerDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    address : string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    companyName : string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    contactNumber : string
}
