import { Controller, Post, Body } from "@nestjs/common";
import { DoctorService } from "./doctor.service";
import { CreateDoctorDTO } from "./dto/create-doctor.dto";


@Controller('doctors')
export class DoctorController {
    constructor(private readonly doctorService: DoctorService) {}

    @Post()
    async create(@Body() body: CreateDoctorDTO) {
        return this.doctorService.create(body);
    }

}