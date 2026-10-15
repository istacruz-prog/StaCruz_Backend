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

import { Service } from './service.entity';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.servicesService.findOne(id);
  }

  @Post()
  create(@Body() service: Partial<Service>) {
    return this.servicesService.create(service);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() service: Partial<Service>,
  ) {
    return this.servicesService.update(id, service);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.servicesService.remove(id);
  }
}
