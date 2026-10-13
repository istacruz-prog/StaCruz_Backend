import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BarbersService } from './barbers.service';
import { Barber } from './barbers.entity';

@Controller('barbers')
export class BarbersController {
  constructor(private readonly barbersService: BarbersService) {}

  @Get()
  findAll() {
    return this.barbersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.barbersService.findOne(id);
  }

  @Post()
  create(@Body() barber: Partial<Barber>) {
    return this.barbersService.create(barber);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() barber: Partial<Barber>) {
    return this.barbersService.update(id, barber);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.barbersService.remove(id);
  }
}