import { Module, forwardRef } from "@nestjs/common";
import { UserController } from "./user.controller";

import { UserService } from "./user.service";
import { UserOwnsRouteGuard } from "src/guards/user-owns-route.guard";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthModule } from "src/auth/auth.module";
import { FileModule } from "src/file/file.module";

@Module({
    imports: [
         PrismaModule,
        forwardRef(() => AuthModule),
        forwardRef(() => FileModule) // use forwardRef here
    ],
    controllers: [UserController],
    providers: [UserService, UserOwnsRouteGuard],
    exports: [UserService]
})
export class UserModule {

}


