import { Module, forwardRef } from "@nestjs/common";
import { UserController } from "./user.controller";

import { UserService } from "./user.service";
import { UserOwnsRouteGuard } from "src/guards/user-owns-route.guard";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [
        PrismaModule,
        forwardRef(() => AuthModule)
    ],
    controllers: [UserController],
    providers: [UserService, UserOwnsRouteGuard],
    exports: [UserService]
})
export class UserModule {

}


