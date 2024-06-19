
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard } from "src/guards/role.guard";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";
import { UserOwnsRouteGuard } from "src/guards/user-owns-route.guard";
import { Controller, Delete, Get, Param, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserOwnsRouteOptions } from "src/decorators/user-owns-route-options.decorator";



@Roles(Role.ADMIN)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Roles(Role.ADMIN)
    @Get() 
    async read() {
        return this.userService.read();
    }

    @Get(':id') 
    async readById(@Param('id') id: string) {
        return this.userService.readById(id);
    }

    @Roles(Role.ADMIN)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.userService.delete(id);
    }

    @UserOwnsRouteOptions({ allowAdmin: true})
    @Roles(Role.ADMIN, Role.ASSOCIATE)
    @UseGuards(AuthGuard, RoleGuard, UserOwnsRouteGuard)
    @Delete(':id/photo')
    async deletePhoto(@Param('id') id: string) {
        return this.userService.deletePhoto(id);
  }
    
    
}