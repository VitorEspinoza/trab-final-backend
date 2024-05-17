import { Type } from 'class-transformer';
import {
  IsArray,
  MaxLength,
  ValidateNested,
  IsString,
  maxLength,
} from 'class-validator';
import { DoctorHasSpecialtyEntity } from 'src/doctorHasSpecialty/entity/doctorHasSpecialty.entity';
import { UnitEntity } from 'src/unit/entity/unit.entity';

export class DoctorDTO {
  @IsString()
  name: string;

  @IsString()
  @MaxLength(11)
  Document: string;

  @IsString()
  @MaxLength(9)
  MedicalRegistrationNumber: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DoctorHasSpecialtyEntity)
  specialtyDto: DoctorHasSpecialtyEntity[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UnitEntity)
  unitDto: UnitEntity[];
}
