import { IsEmail, IsString, MaxLength } from "class-validator";

export class UpdateUserDTO {
    @IsString()
    @MaxLength(255)
    name: string;

    @IsEmail()
    @MaxLength(127)
    email: string;
}