import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';

import { Roles } from 'src/decorators/role.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from 'src/enums/role.enum';

@Roles(Role.ASSOCIATE, Role.ADMIN)
@UseGuards(AuthGuard, RoleGuard)
@Controller('units')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Roles(Role.ADMIN)
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

  @Roles(Role.ADMIN)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: CreateUnitDto) {
    return this.unitService.update(id, body);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.unitService.delete(id);
  }
}
