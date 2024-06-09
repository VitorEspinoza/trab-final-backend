import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsMobilePhone,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { AddressDTO } from 'src/Address/dto/address.dto';
import { UserDTO } from 'src/user/dto/user.dto';

export class CreateAssociateDto {
  @IsMobilePhone('pt-BR')
  @Length(11)
  phone: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  birthAt: Date;

  @ValidateNested()
  @Type(() => UserDTO)
  user: UserDTO;

  @ValidateNested()
  @Type(() => AddressDTO)
  address: AddressDTO;

  @IsString()
  @Length(11)
  document: string;
}
