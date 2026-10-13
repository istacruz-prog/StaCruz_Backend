import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from './service.entity';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.servicesService.findOne(id);
  }

  @Post()
  create(@Body() service: Partial<Service>) {
    return this.servicesService.create(service);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() service: Partial<Service>) {
    return this.servicesService.update(id, service);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.servicesService.remove(id);
  }
}