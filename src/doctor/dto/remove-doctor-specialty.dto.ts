import { IsString } from 'class-validator';

export class RemoveDoctorSpecialtyDTO {
  @IsString()
  doctorHasSpecialtyId: string;
}
