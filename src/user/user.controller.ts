import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put, UseGuards } from "@nestjs/common";
import { UserDTO } from "./dto/user.dto";
import { UserService } from "./user.service";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard } from "src/guards/role.guard";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";
import { UserOwnsRouteGuard } from "src/guards/user-owns-route.guard";


@Roles(Role.ADMIN, Role.ASSOCIATE)
@UseGuards(AuthGuard, RoleGuard, UserOwnsRouteGuard)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Roles(Role.ADMIN)
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