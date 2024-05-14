import { IsEmail, IsEnum, IsString, IsStrongPassword } from "class-validator";
import { Role } from "src/enums/role.enum";

export class UserDTO {
    @IsString()
    name: string;

    @IsEmail()
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
    role: Role.ASSOCIATE | Role.ADMIN = Role.ASSOCIATE;
}