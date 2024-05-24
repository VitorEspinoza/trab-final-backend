import { Type } from 'class-transformer';
import {
  MaxLength,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { UnitDTO } from 'src/unit/dto/unit.dto';

export class DoctorDTO {
  @IsString()
  name: string;

  @IsString()
  @MaxLength(11)
  document: string;

  @IsString()
  @MaxLength(9)
  medicalRegistrationNumber: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DoctorDTO)
  specialty: DoctorDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UnitDTO)
  unit: UnitDTO[];}
