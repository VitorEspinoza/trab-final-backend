import { IsEmail, IsEnum, IsString, IsStrongPassword } from "class-validator";
import { Role } from "src/enums/role.enum";

export class CreateUserDTO {
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

    @IsEnum([Role[Role.Associate], Role[Role.Admin]], {
        message: 'Valid role required'
    })
    role: 'Associate' | 'Admin' = 'Associate';
}