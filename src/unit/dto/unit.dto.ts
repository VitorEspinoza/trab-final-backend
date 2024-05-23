import { Type } from "class-transformer";
import { IsArray, IsString, ValidateNested } from "class-validator";
import { AdressDTO } from "src/adress/dto/adress.dto";
import { SpecialtyDTO } from "src/specialty/dto/specialty.dto";

export class UnitDTO{
    @IsString()
    name: string;

    @ValidateNested()
    @Type(() => AdressDTO)
    adress: AdressDTO;

    @IsArray()
    @ValidateNested({ each: true})
    @Type(() => SpecialtyDTO)
    specialty: SpecialtyDTO[];
}