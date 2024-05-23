import { Module } from "@nestjs/common";

import { AdressController } from "./adress.controller";
import { AdressService } from "./adress.service";
import { AuthModule } from "src/auth/auth.module";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [
        PrismaModule,
        AuthModule
    ],
    controllers: [AdressController],
    providers: [AdressService]
})
export class AdressModule {
    
}