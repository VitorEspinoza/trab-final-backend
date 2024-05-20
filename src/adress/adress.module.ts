import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdressEntity } from "./entity/adress.entity";
import { AdressController } from "./adress.controller";
import { AdressService } from "./adress.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([AdressEntity]),
    ],
    controllers: [AdressController],
    providers: [AdressService]
})
export class AdressModule {
    
}