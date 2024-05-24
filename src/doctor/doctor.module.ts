import { Module } from "@nestjs/common";


import { PrismaModule } from "src/prisma/prisma.module";

import { UserModule } from "src/user/user.module";
import { DoctorController } from "./doctor.controller";
import { DoctorService } from "./doctor.service";

@Module({
    imports: [
        PrismaModule,
        UserModule
    ],
    controllers: [DoctorController],
    providers: [DoctorService]
})
export class DoctorModule {
    
}