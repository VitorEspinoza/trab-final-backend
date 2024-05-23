import { IsString, MaxLength } from "class-validator";

export class SpecialtyDTO{
    @IsString()
    @MaxLength(120)
    name: string;
}
