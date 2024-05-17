
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard } from "src/guards/role.guard";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";
import { UserOwnsRouteGuard } from "src/guards/user-owns-route.guard";
import { Body, Controller, Delete, Get, Put, UseGuards } from "@nestjs/common";
import { UserDTO } from "./dto/user.dto";
import { UserService } from "./user.service";
import { ParamId } from "src/decorators/param-id.decorator";


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