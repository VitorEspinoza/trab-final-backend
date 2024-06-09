import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AssociateService } from './associate.service';

import { CreateAssociateDto } from './dto/create-associate.dto';


import { Roles } from 'src/decorators/role.decorator';

import { Role } from 'src/enums/role.enum';
import { UpdateAssociateDTO } from './dto/update-associate.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { UserOwnsRouteGuard } from 'src/guards/user-owns-route.guard';
import { UserOwnsRouteOptions } from 'src/decorators/user-owns-route-options.decorator';

@Controller('associates')
export class AssociateController {
  constructor(private readonly associateService: AssociateService) {}


  @Post()
  async create(@Body() body: CreateAssociateDto) {
    return this.associateService.create(body);
  }
    
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  async read() {
    return this.associateService.read();
  }

  @UserOwnsRouteOptions({ allowAdmin: true})
  @Roles(Role.ADMIN, Role.ASSOCIATE)
  @UseGuards(AuthGuard, RoleGuard, UserOwnsRouteGuard)
  @Get(':id')
  async readById(@Param('id') id: string) {
    return this.associateService.readById(id);
  }

  @UserOwnsRouteOptions({ allowAdmin: true})
  @Roles(Role.ADMIN, Role.ASSOCIATE)
  @UseGuards(AuthGuard, RoleGuard, UserOwnsRouteGuard)
  @Put(':id')
  async update(@Body() body: UpdateAssociateDTO, @Param('id') id: string) {
    return this.associateService.update(id, body);
  }

  @UserOwnsRouteOptions({ allowAdmin: true})
  @Roles(Role.ADMIN, Role.ASSOCIATE)
  @UseGuards(AuthGuard, RoleGuard, UserOwnsRouteGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.associateService.delete(id);
  }
}
