import { Type } from "class-transformer";
import { IsArray, IsString, MaxLength, ValidateNested } from "class-validator";
import { AddressDTO } from "src/adress/dto/address.dto";
import { SpecialtyDTO } from "src/specialty/dto/specialty.dto";

export class UnitDTO{
    @IsString()
    @MaxLength(120)
    name: string;

    @IsString()
    @MaxLength(120)
    displayName: string;

    @ValidateNested()
    @Type(() => AddressDTO)
    adress: AddressDTO;

    @IsArray()
    @ValidateNested({ each: true})
    @Type(() => SpecialtyDTO)
    specialty: SpecialtyDTO[];
}