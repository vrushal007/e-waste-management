import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CollectorsService } from './collectors.service';
import { CreateCollectorDto } from './dto/create-collector.dto';
import { UpdateCollectorDto } from './dto/update-collector.dto';
import { ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';
import { RoleDecorator, RoleEnum } from 'src/common/decorators/roles.decorator';

@ApiTags('collector apis')
@UseGuards(JWTAuthGuard)
@Controller('collectors')
export class CollectorsController {
  constructor(private readonly collectorsService: CollectorsService) {}

  @Post()
  create(@Body() createCollectorDto: CreateCollectorDto) {
    return this.collectorsService.create(createCollectorDto);
  }

  @UseGuards(RoleGuard)
  @RoleDecorator(RoleEnum.COLLECTOR, RoleEnum.RECYCLER)
  @Get('all-orders')
  findAll(@Req() request : Request) {
    return this.collectorsService.findAll(request['user'].userId);
  }

  @UseGuards(RoleGuard)
  @RoleDecorator(RoleEnum.COLLECTOR, RoleEnum.RECYCLER)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() request : Request) {
    return this.collectorsService.findOne(id, request['user'].userId);
  }

  @UseGuards(RoleGuard)
  @RoleDecorator(RoleEnum.COLLECTOR)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollectorDto: UpdateCollectorDto, @Req() request : Request){
    return this.collectorsService.update(id, updateCollectorDto, request['user'].userId);
  }

  @UseGuards(RoleGuard)
  @RoleDecorator(RoleEnum.COLLECTOR)
  getAllCollectors() {
    return this.collectorsService.getAllCollectors();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectorsService.remove(+id);
  }
}
