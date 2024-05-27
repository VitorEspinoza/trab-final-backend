import { DoctorStatus } from '@prisma/client';
import {
  MaxLength,
  IsString,
  IsArray,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class PatchDoctorDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(11)
  document?: string;

  @IsOptional()
  @IsString()
  @MaxLength(9)
  medicalRegistrationNumber?: string;

  @IsOptional()
  @IsArray()
  specialties?: { specialtyId: string; isPrincipalSpecialty: boolean }[];

  @IsOptional()
  @IsString()
  unitId?: string;

  @IsOptional()
  @IsEnum(Object.values(DoctorStatus), {
    message: 'Valid status required',
  })
  status: DoctorStatus;
}
