import { DoctorStatus } from '@prisma/client';
import { MaxLength, IsString, IsArray, IsEnum } from 'class-validator';

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
  specialties: { specialtyId: string; isPrincipalSpecialty: boolean }[];

  @IsString()
  unitId: string;

  @IsEnum(Object.values(DoctorStatus), {
    message: 'Valid status required',
  })
  status: DoctorStatus;
}
