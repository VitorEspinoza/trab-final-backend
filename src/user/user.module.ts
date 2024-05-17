import { Module, forwardRef } from "@nestjs/common";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { UserService } from "./user.service";
import { AuthModule } from "src/auth/auth.module";
import { UserOwnsRouteGuard } from "src/guards/user-owns-route.guard";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        forwardRef(() => AuthModule),
    ],
    controllers: [UserController],
    providers: [UserService, UserOwnsRouteGuard],
    exports: [UserService]
})
export class UserModule {

}


