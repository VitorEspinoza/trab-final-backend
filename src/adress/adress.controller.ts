import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { AdressDTO } from "./dto/adress.dto";
import { ParamId } from "src/decorators/param-id.decorator";
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
    async readById(@ParamId() id: number) {
        return this.adressService.readById(id);
    }

    @Put(':id')
    async update(@Body() body: AdressDTO, @ParamId() id: number) {
        return this.adressService.update(id, body);
    }

    @Delete(':id')
    async delete(@ParamId() id: number) {
        return this.adressService.delete(id);
    }
}