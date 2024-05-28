import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';

@Controller('units')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  async create(@Body() body: CreateUnitDto) {
    return this.unitService.create(body);
  }

  @Get()
  async read() {
    return this.unitService.read();
  }

  @Get(':id')
  async readById(@Param('id') id: string) {
    return this.unitService.readById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: CreateUnitDto) {
    return this.unitService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.unitService.delete(id);
  }
}
