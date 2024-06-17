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
  const doctors = await this.prismaService.doctor.findMany({
    select: {
      doctorId: true,
      document: true,
      medicalRegistrationNumber: true,
      name: true,
      unit: {
        select: {
          address: true,
          displayName: true,
        }
      },
      specialties: {
        select: {
          isPrincipalSpecialty: true,
          specialtyDetail: {
            select: {
              specialtyId: true,
              name: true
            }
          }
        }
      }
    },
  });

  return doctors.map(this.mapDoctor);
}

  async readById(id: string) {
    await this.exists(id);
    const doctor = await this.prismaService.doctor.findUnique({
      where: {
        doctorId: id,
      },
      select: {
        doctorId: true,
        document: true,
        medicalRegistrationNumber: true,
        name: true,
        unit: {
          select: {
            unitId: true,
            address: true,
            displayName: true,
          }
        },
        specialties: {
        select: {
          isPrincipalSpecialty: true,
          specialtyDetail: {
            select: {
              specialtyId: true,
              name: true
              }
            }
          }
        }
      },
    });

    return this.mapDoctor(doctor);
  }

  async update(id: string, data: DoctorDTO) {
  await this.exists(id);
  await this.unitService.validateUnitExistence(data.unitId);

  try {
    const transaction = await this.prismaService.$transaction([
      this.deleteDoctorSpecialties(id),
      this.updateDoctor(id, data)
    ]);

    return transaction[1];
  } catch(e) {
    throw new BadRequestException('Não foi possível fazer a alteração', e);
  }
}

  async delete(id: string) {
   await this.exists(id);

  try {
    const transaction = await this.prismaService.$transaction([
      this.deleteDoctorSpecialties(id),
      this.deleteDoctor(id)
    ]);

    return transaction[1];
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


  private deleteDoctorSpecialties(doctorId: string) {
    return this.prismaService.doctorHasSpecialty.deleteMany({
    where: {
      doctorId: doctorId,
    },
  });
}

  private updateDoctor(doctorId: string, data: DoctorDTO){
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
          create: data.specialties,
        },
      },
    });
  }

  private deleteDoctor(doctorId: string) {
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

  private mapDoctorSpecialty = (specialty) => {
    return {
      isPrincipalSpecialty: specialty.isPrincipalSpecialty,
      specialtyId: specialty.specialtyDetail.specialtyId,
      name: specialty.specialtyDetail.name
    };
  }

  private mapDoctor = (doctor) => {
    return {
      ...doctor,
      specialties: doctor.specialties.map(this.mapDoctorSpecialty)
    };
  }
}
