
import { BadRequestException, Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";

import { CreateDoctorDTO } from "./dto/create-doctor.dto";


@Injectable()
export class DoctorService{
    constructor(
      private prismaService: PrismaService,
) {}

    async create(data: CreateDoctorDTO) {
        const existingDoctor = await this.prismaService.doctor.findFirst({
            where: {
                document: data.document,
            }
        })

        if(existingDoctor) {
            throw new BadRequestException('Este doutor já está vinculado no plano');
        }
    
        const { unitId, ...dataWithoutUnitId } = data;

        const specialties = data.specialties.map((specialty) => ({
                    specialtyId: specialty.specialtyId,
                    isPrincipalSpecialty: specialty.isPrincipalSpecialty,
                }));
            
            
        return this.prismaService.doctor.create({
            data: {
                    ...dataWithoutUnitId,
                        unit: {
                            connect: {
                                unitId: unitId,
                            },
                        },
                        specialties: {
                            create: specialties,
                        },
                    }
                });
    }

}
