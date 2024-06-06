import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { DoctorDTO } from './dto/doctor.dto';
import { UnitService } from 'src/unit/unit.service';

@Injectable()
export class DoctorService {
  constructor(private prismaService: PrismaService, private unitService: UnitService ) {}

  async create(data: DoctorDTO) {
    const existingDoctor = await this.prismaService.doctor.findFirst({
      where: {
        document: data.document,
      },
    });

    if (existingDoctor) {
      throw new BadRequestException('Este doutor já está vinculado no plano');
    }

    await this.unitService.validateUnitExistence(data.unitId);
    
    return this.createDoctor(data);
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
    return this.prismaService.doctor.findUnique({
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
  await this.unitService.validateUnitExistence(data.unitId);

  try {
    await this.deleteDoctorSpecialties(id);
    const updateResponse = await this.updateDoctor(id, data, data.specialties);
    return updateResponse;
  } catch(e) {
      throw new BadRequestException('Não foi possível fazer a alteração', e);
  }
}


  async delete(id: string) {
   await this.exists(id);

  try {
    await this.deleteDoctorSpecialties(id);
    const deleteDoctorResponse = await this.deleteDoctor(id);
    return deleteDoctorResponse;
  } catch(e) {
      throw new BadRequestException('Não foi possível fazer a exclusão', e);
  }

  }

  async exists(id: string) {
    if (
      !(await this.prismaService.doctor.count({
        where: {
          doctorId: id,
        },
      }))
    ) {
        throw new NotFoundException('O doutor informado não existe no plano');
    }
  }


  private async deleteDoctorSpecialties(doctorId: string) {
  return this.prismaService.doctorHasSpecialty.deleteMany({
    where: {
      doctorId: doctorId,
    },
  });
}

private async updateDoctor(doctorId: string, data: DoctorDTO, specialties: any) {
  const { unitId, ...dataWithoutUnitId } = data;
  return this.prismaService.doctor.update({
    where: {
      doctorId: doctorId,
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
}

private async deleteDoctor(doctorId: string) {
  return this.prismaService.doctor.delete({
    where: {
      doctorId: doctorId,
    },
  });
}


private async createDoctor(data: DoctorDTO) {
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
}
