import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { Barber } from './barbers.entity';
import { BarbersService } from './barbers.service';

@Controller('barbers')
export class BarbersController {
  constructor(private readonly barbersService: BarbersService) {}

  @Get()
  findAll() {
    return this.barbersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.barbersService.findOne(id);
  }

  @Post()
  create(@Body() barber: Partial<Barber>) {
    return this.barbersService.create(barber);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() barber: Partial<Barber>,
  ) {
    return this.barbersService.update(id, barber);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.barbersService.remove(id);
  }
}
