import { IsString } from 'class-validator';

export class AdressDTO {
  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  street: string;

  @IsString()
  neighborhood: string;

  @IsString()
  number: string;

  @IsString()
  zipCode: string;
}
