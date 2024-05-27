import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorDTO } from './dto/doctor.dto';
import { PatchDoctorDTO } from './dto/patch-doctor.dto';
import { RemoveDoctorSpecialtyDTO } from './dto/remove-doctor-specialty.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

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

  @Put(':id')
  async update(@Body() body: DoctorDTO, @Param('id') id: string) {
    return this.doctorService.update(id, body);
  }

  @Patch(':id')
  async patch(@Body() body: PatchDoctorDTO, @Param('id') id: string) {
    return this.doctorService.patch(id, body);
  }

  @Patch('remove-specialty/:id')
  async removeDoctorSpecialty(
    @Body() body: RemoveDoctorSpecialtyDTO,
    @Param('id') id: string,
  ) {
    return this.doctorService.removeDoctorSpecialty(id, body);
  }
}
