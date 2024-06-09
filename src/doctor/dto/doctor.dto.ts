import { MaxLength, IsString, IsArray } from 'class-validator';
import { IsCPF } from 'src/validators/cpf.validator';

export class DoctorDTO {
  @IsString()
  name: string;

  @IsCPF({ message: 'invalid document' })
  document: string;

  @IsString()
  @MaxLength(9)
  medicalRegistrationNumber: string;

  @IsArray()
  specialties: { specialtyId: string; isPrincipalSpecialty: boolean }[];

  @IsString()
  unitId: string;
}
