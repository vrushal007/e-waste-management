import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseFilters, Req } from '@nestjs/common';
import { RecyclerService } from './recycler.service';
import { CreateCollectorDto } from './dto/create-recycler.dto';
import { UpdateRecyclerDto } from './dto/update-recycler.dto';
import { ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/roles.guard';
import { RoleDecorator, RoleEnum } from 'src/common/decorators/roles.decorator';
import { ExceptionHandling } from 'src/common/utils/helper';
import { request } from 'http';
import { JWTAuthGuard } from 'src/auth/auth.guard';


@ApiTags('recycler apis')
@UseFilters(ExceptionHandling)
@UseGuards(JWTAuthGuard)
@Controller('recycler')
export class RecyclerController {
  constructor(private readonly recyclerService: RecyclerService) {}

  @UseGuards(RoleGuard)
  @RoleDecorator(RoleEnum.RECYCLER, RoleEnum.ADMIN)
  @Post('create-collector')
  create(@Body() payload: CreateCollectorDto, @Req() request : Request) {
    return this.recyclerService.create(payload, request['user'].userId);
  }

  @UseGuards(RoleGuard)
  @RoleDecorator(RoleEnum.RECYCLER)
  @Get('all-orders')
  findAll(@Req() request : Request) {
    return this.recyclerService.findAll(request['user'].userId);
  }

  @UseGuards(RoleGuard)
  @RoleDecorator(RoleEnum.RECYCLER)
  @Get('order/:id')
  findOne(@Param('id') id: string, @Req() request : Request) {
    return this.recyclerService.findOne(id, request['user'].userId);
  }

  @UseGuards(RoleGuard)
  @RoleDecorator(RoleEnum.RECYCLER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecyclerDto: UpdateRecyclerDto) {
    return this.recyclerService.update(id, updateRecyclerDto);
  }

  @UseGuards(RoleGuard)
  @RoleDecorator(RoleEnum.ADMIN)
  @Get('all')
  findAllRecycler() {
    return this.recyclerService.getAllRecylers();
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.recyclerService.remove(+id);
  // }
}
