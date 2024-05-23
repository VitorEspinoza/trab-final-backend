import {
  MaxLength,
  IsString,
} from 'class-validator';

export class DoctorDTO {
  @IsString()
  name: string;

  @IsString()
  @MaxLength(11)
  Document: string;

  @IsString()
  @MaxLength(9)
  MedicalRegistrationNumber: string;

  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => DoctorHasSpecialtyEntity)
  // specialtyDto: DoctorHasSpecialtyEntity[];

  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => UnitEntity)
  // unitDto: UnitEntity[];
}
