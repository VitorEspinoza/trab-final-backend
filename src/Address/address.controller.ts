import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AddressService } from "./address.service";
import { AddressDTO } from "./dto/address.dto";



@Controller('addresses')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Post()
    async create(@Body() body: AddressDTO) {
        return this.addressService.create(body);
    }

    @Get()
    async read() {
    return this.addressService.read();
    }

    @Get(':id')
    async readById(@Param('id') id: string) {
        return this.addressService.readById(id);
    }

    @Put(':id')
    async update(@Body() body: AddressDTO, @Param('id') id: string) {
        return this.addressService.update(id, body);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.addressService.delete(id);
    }
}