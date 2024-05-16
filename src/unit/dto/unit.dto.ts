import { IsArray, IsString } from "class-validator";

export class UnitDTO{
    @IsString()
    name: string;

    @IsString()
    adress: string;

    @IsArray()
    specialties: string[];
}