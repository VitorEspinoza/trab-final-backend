import { Module } from "@nestjs/common";

import { AddressController } from "./address.controller";
import { AddressService } from "./address.service";
import { AuthModule } from "src/auth/auth.module";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [
        PrismaModule,
        AuthModule
    ],
    controllers: [AddressController],
    providers: [AddressService]
})
export class AddressModule {
    
}