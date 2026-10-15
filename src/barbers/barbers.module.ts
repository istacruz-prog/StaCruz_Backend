import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarbersService } from './barbers.service';
import { BarbersController } from './barbers.controller';
import { Barber } from './barbers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Barber])],
  providers: [BarbersService],
  controllers: [BarbersController],
})
export class BarbersModule {}