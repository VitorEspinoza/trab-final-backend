import { IsEmail, IsString, IsStrongPassword, MaxLength } from "class-validator";

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
}