import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ExceptionHandling } from 'src/common/utils/helper';
import { JWTAuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';
import { RoleDecorator } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/entities/auth.entity';

@ApiTags('user apis')
@UseFilters(ExceptionHandling)
@UseGuards(JWTAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(RoleGuard)
  @RoleDecorator(RoleEnum.USER)
  @Get('orders')
  findAll(@Req() request : Request) {
    return this.usersService.findAll(request['user'].userId);
  }

  @UseGuards(RoleGuard)
  @RoleDecorator(RoleEnum.USER)
  @Get('order/:id')
  findOne(@Param('id') id: string, @Req() request : Request) {
    return this.usersService.findOne(id, request['user'].userId);
  }

  @UseGuards(RoleGuard)
  @RoleDecorator(RoleEnum.USER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(RoleGuard)
  @RoleDecorator(RoleEnum.ADMIN)
  @Get('all')
  findAllUsers() {
    return this.usersService.getAllUser();
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
