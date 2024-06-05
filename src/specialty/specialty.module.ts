import { Module } from "@nestjs/common";
import { SpecialtyService } from "./specialty.service";
import { SpecialtyController } from "./specialty.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [PrismaModule, AuthModule, UserModule],
    controllers: [SpecialtyController],
    providers: [SpecialtyService]
})
export class SpecialtyModule{}