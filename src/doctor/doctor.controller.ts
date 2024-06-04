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

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.doctorService.delete(id);
  }
}
