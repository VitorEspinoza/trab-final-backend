import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AssociateService } from './associate.service';

import { CreateAssociateDto } from './dto/create-associate.dto';
import { AssociateDto } from './dto/associate.dto';

import { Roles } from 'src/decorators/role.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from 'src/enums/role.enum';

@Roles(Role.ADMIN, Role.ASSOCIATE)
@UseGuards(AuthGuard, RoleGuard)
@Controller('associates')
export class AssociateController {
  constructor(private readonly associateService: AssociateService) {}

  @Post()
  async create(@Body() body: CreateAssociateDto) {
    return this.associateService.create(body);
  }
    
  @Roles(Role.ADMIN)
  @Get()
  async read() {
    return this.associateService.read();
  }

  @Get(':id')
  async readById(@Param('id') id: string) {
    return this.associateService.readById(id);
  }

  @Put(':id')
  async update(@Body() body: AssociateDto, @Param('id') id: string) {
    return this.associateService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.associateService.delete(id);
  }
}
