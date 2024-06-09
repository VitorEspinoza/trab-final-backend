import { IsString, MaxLength, Length } from 'class-validator';

export class AddressDTO {
  @IsString()
  @MaxLength(40)
  city: string;

  @IsString()
  @MaxLength(30)
  state: string;

  @IsString()
  @MaxLength(100)
  street: string;

  @IsString()
  @MaxLength(40)
  neighborhood: string;

  @IsString()
  @MaxLength(5)
  number: string;

  @IsString()
  @Length(8, 8)
  zipCode: string;
}
