import { IsEmail, IsEnum, IsString, IsStrongPassword, MaxLength } from "class-validator";
import { Role } from "src/enums/role.enum";

export class UserDTO {
    @IsString()
    @MaxLength(255)
    name: string;

    @IsEmail()
    @MaxLength(127)
    email: string;

    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
        minLowercase: 0,
    })
    password: string;

    @IsEnum(Object.values(Role), {
        message: 'Valid role required'
    })
    role?: Role = Role.ASSOCIATE;
}