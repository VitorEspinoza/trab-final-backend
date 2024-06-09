import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsMobilePhone,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { AddressDTO } from 'src/Address/dto/address.dto';
import { UpdateUserDTO } from 'src/user/dto/update-user.dto';
import { UserDTO } from 'src/user/dto/user.dto';
import { IsCPF } from 'src/validators/cpf.validator';

export class UpdateAssociateDTO {
  @IsMobilePhone('pt-BR')
  @Length(11)
  phone: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  birthAt: Date;

  @ValidateNested()
  @Type(() => UserDTO)
  user: UpdateUserDTO;

  @ValidateNested()
  @Type(() => AddressDTO)
  address: AddressDTO;

  @IsCPF({ message: 'invalid document' })
  document: string;
}
