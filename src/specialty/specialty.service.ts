import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SpecialtyDTO } from "./dto/specialty.dto";

@Injectable()
export class SpecialtyService {
    constructor(private prismaService: PrismaService) {}

    async create(data: SpecialtyDTO) {
        const existingSpecialty = await this.prismaService.specialty.findFirst({
            where: {
                name: data.name
            }
        });

        if(existingSpecialty) {
            throw new BadRequestException('Essa especialidade já existe');
        } 

        return await this.prismaService.specialty.create({
                data
            },
        );          
    }

    async delete(id: string) {
        this.exists(id);

        return await this.prismaService.specialty.delete({
            where: {
                specialtyId: id
            }
        });   
        
    }

    async read() {
        return this.prismaService.specialty.findMany()
    }

    async readById(id: string) {
        this.exists(id);

        return this.prismaService.specialty.findUnique({
            where: {
                specialtyId: id
            }
        });
    }

    async update(id: string, data: SpecialtyDTO) {
        this.exists(id);

        return this.prismaService.specialty.update({
            data,
            where: {
                specialtyId: id
            }
        });
    }

     async exists(id: string) {
        const hasSpecialty = await this.prismaService.specialty.count({
            where: {
                specialtyId: id
            }
        }); 

        if(!hasSpecialty) {
            return new NotFoundException(`A especialidade com o ${id} não existe.`);
        }
    }
}

