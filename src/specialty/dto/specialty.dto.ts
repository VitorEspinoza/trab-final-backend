import { IsString } from "class-validator";

export class SpecialtyDTO{
    @IsString()
    name: string;
}
