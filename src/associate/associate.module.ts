import { Module } from '@nestjs/common';


import { AuthModule } from "src/auth/auth.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AssociateController } from "./associate.controller";
import { AssociateService } from "./associate.service";
import { UserModule } from "src/user/user.module";
import { FileModule } from "src/file/file.module";

@Module({
    imports: [
        PrismaModule,
        AuthModule,
        UserModule,
        FileModule
    ],
    controllers: [AssociateController],
    providers: [AssociateService]
})
export class AssociateModule {}
