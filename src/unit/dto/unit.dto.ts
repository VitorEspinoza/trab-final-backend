import { Type } from "class-transformer";
import { IsArray, IsString, MaxLength, ValidateNested } from "class-validator";
import { AdressDTO } from "src/adress/dto/adress.dto";
import { SpecialtyDTO } from "src/specialty/dto/specialty.dto";

export class UnitDTO{
    @IsString()
    @MaxLength(120)
    name: string;

    @ValidateNested()
    @Type(() => AdressDTO)
    adress: AdressDTO;

    @IsArray()
    @ValidateNested({ each: true})
    @Type(() => SpecialtyDTO)
    specialty: SpecialtyDTO[];
}