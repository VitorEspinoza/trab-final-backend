import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorDTO } from './dto/doctor.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { RoleGuard } from 'src/guards/role.guard';

@Roles(Role.ADMIN, Role.ASSOCIATE)
@UseGuards(AuthGuard, RoleGuard)
@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() body: DoctorDTO) {
    return this.doctorService.create(body);
  }

  @Get()
  async read() {
    return this.doctorService.read();
  }

  @Get(':id')
  async readById(@Param('id') id: string) {
    return this.doctorService.readById(id);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  async update(@Body() body: DoctorDTO, @Param('id') id: string) {
    return this.doctorService.update(id, body);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.doctorService.delete(id);
  }
}
