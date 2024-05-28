import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { DoctorDTO } from './dto/doctor.dto';
import { RemoveDoctorSpecialtyDTO } from './dto/remove-doctor-specialty.dto';

@Injectable()
export class DoctorService {
  constructor(private prismaService: PrismaService) {}

  async create(data: DoctorDTO) {
    const existingDoctor = await this.prismaService.doctor.findFirst({
      where: {
        document: data.document,
      },
    });

    if (existingDoctor) {
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
      },
    });
  }
  async read() {
    return this.prismaService.doctor.findMany({
      include: {
        specialties: {
          include: {
            specialties: true,
          },
        },
      },
    });
  }

  async readById(id: string) {
    await this.exists(id);
    return await this.prismaService.doctor.findUnique({
      where: {
        doctorId: id,
      },
      include: {
        specialties: {
          include: {
            specialties: true,
          },
        },
      },
    });
  }

  async update(id: string, data: DoctorDTO) {
    await this.exists(id);
    const { unitId, ...dataWithoutUnitId } = data;

    const specialties = data.specialties.map((specialty) => ({
      specialtyId: specialty.specialtyId,
      isPrincipalSpecialty: specialty.isPrincipalSpecialty,
    }));

    await this.prismaService.doctor.update({
      where: {
        doctorId: id,
      },
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
      },
    });
    return this.exists(id);
  }

  async patch(id: string, data) {
    await this.exists(id);
    return this.prismaService.doctor.update({
      where: {
        doctorId: id,
      },
      data,
    });
  }

  async removeDoctorSpecialty(id: string, data: RemoveDoctorSpecialtyDTO) {
    await this.exists(id);
    return this.prismaService.doctorHasSpecialty.delete({
      where: {
        doctorHasSpecialtyId: data.doctorHasSpecialtyId,
      },
    });
  }

  async exists(id: string) {
    if (
      !(await this.prismaService.doctor.count({
        where: {
          doctorId: id,
        },
      }))
    ) {
      throw new NotFoundException(`O endereço ${id} não existe.`);
    }
  }
}
