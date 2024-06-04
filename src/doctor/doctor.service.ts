import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { DoctorDTO } from './dto/doctor.dto';

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
    return this.prismaService.doctor.create({
      data: {
        ...dataWithoutUnitId,
        unit: {
          connect: {
            unitId: unitId,
          },
        },
        specialties: {
          create: data.specialties,
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

    const deletePromise = this.prismaService.doctorHasSpecialty.deleteMany({
      where: {
        doctorId: id,
      },
    });

    const updatePromise = this.prismaService.doctor.update({
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
          create: data.specialties,
        },
      },
    });

    const [deleteResponse, updateResponse] =
      await this.prismaService.$transaction([deletePromise, updatePromise]);

    console.log(deleteResponse);

    if (deleteResponse.count === 0) {
      throw new BadRequestException('Não foi possível fazer a alteração');
    }

    return updateResponse;
  }

  async delete(id: string) {
    await this.exists(id);
    const deleteDoctorSpecialtiesPromise =
      this.prismaService.doctorHasSpecialty.deleteMany({
        where: {
          doctorId: id,
        },
      });

    const deleteDoctorPromise = this.prismaService.doctor.delete({
      where: {
        doctorId: id,
      },
    });

    const [deleteDoctorSpecialtiesResponse, deleteDoctorResponse] =
      await this.prismaService.$transaction([
        deleteDoctorSpecialtiesPromise,
        deleteDoctorPromise,
      ]);

    if (deleteDoctorSpecialtiesResponse.count === 0) {
      throw new BadRequestException('Não foi possível fazer a alteração');
    }
    return deleteDoctorResponse;
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
