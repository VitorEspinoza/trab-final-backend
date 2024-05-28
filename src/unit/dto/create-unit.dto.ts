import { IsArray, IsString, MaxLength, ValidateNested } from 'class-validator';
import { AddressDTO } from 'src/adress/dto/address.dto';
import { Type } from 'class-transformer';

export class CreateUnitDto {
  @IsString()
  @MaxLength(120)
  name: string;

  @IsString()
  @MaxLength(120)
  displayName: string;

  @ValidateNested()
  @Type(() => AddressDTO)
  address: AddressDTO;

  @IsArray()
  specialties: { specialtyId: string; isPrincipalSpecialty: boolean }[];
}
