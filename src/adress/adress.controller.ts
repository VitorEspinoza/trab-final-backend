import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AdressDTO } from "./dto/adress.dto";
import { AdressService } from "./adress.service";


@Controller('adresses')
export class AdressController {
    constructor(private readonly adressService: AdressService) {}

    @Post()
    async create(@Body() body: AdressDTO) {
        return this.adressService.create(body);
    }

    @Get()
    async read() {
    return this.adressService.read();
    }

    @Get(':id')
    async readById(@Param('id') id: string) {
        return this.adressService.readById(id);
    }

    @Put(':id')
    async update(@Body() body: AdressDTO, @Param('id') id: string) {
        return this.adressService.update(id, body);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.adressService.delete(id);
    }
}