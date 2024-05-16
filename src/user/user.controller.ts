import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { UserDTO } from "./dto/user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() body: UserDTO) {
      return this.userService.create(body);
    }

    @Get() 
    async read() {
        return this.userService.read();
    }

    @Get(':id') 
    async readById(@Param('id', ParseIntPipe) id) {
        return this.userService.readById(id);
    }

    @Put(':id') 
    async update(@Body() body : UserDTO, @Param('id', ParseIntPipe) id) {
        return this.userService.update(id, body);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id) {
        return this.userService.delete(id);
    }
    
    
}