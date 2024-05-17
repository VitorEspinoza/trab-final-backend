import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { UserDTO } from "./dto/user.dto";
import { UserService } from "./user.service";
import { ParamId } from "src/decorators/param-id.decorator";

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
    async readById(@ParamId() id: number) {
        return this.userService.readById(id);
    }

    @Put(':id') 
    async update(@Body() body : UserDTO, @ParamId() id: number) {
        return this.userService.update(id, body);
    }

    @Delete(':id')
    async delete(@ParamId() id: number) {
        return this.userService.delete(id);
    }
    
    
}