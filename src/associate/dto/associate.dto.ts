import { Type } from 'class-transformer';
import {
  IsDate,
  IsMobilePhone,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { AdressDTO } from 'src/adress/dto/adress.dto';
import { UserDTO } from 'src/user/dto/user.dto';

export class AssociateDto {
  @IsMobilePhone('pt-BR')
  @Length(11)
  phone: string;

  @IsDate()
  birthAt: Date;

  @IsString()
  @Length(20)
  healthInsuranceIdentifier: string;

  @ValidateNested()
  @Type(() => UserDTO)
  user: UserDTO;

  @ValidateNested()
  @Type(() => AdressDTO)
  address: AdressDTO;

  @IsString()
  @Length(11)
  document: string;
}
