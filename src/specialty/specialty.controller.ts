import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { SpecialtyService } from "./specialty.service";
import { SpecialtyDTO } from "./dto/specialty.dto";

@Controller('specialties')
export class SpecialtyController {

constructor(private readonly specialtyService: SpecialtyService) {}


  @Post()
  async create(@Body() body: SpecialtyDTO) {
    return this.specialtyService.create(body);
  }
  
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.specialtyService.delete(id);
  }

  @Get()
  async read() {
    return this.specialtyService.read();
  }

  @Get(':id')
  async readById(@Param('id') id: string) {
    return this.specialtyService.readById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: SpecialtyDTO){
    return this.specialtyService.update(id, body);
  }

}
