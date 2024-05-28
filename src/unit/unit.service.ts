import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUnitDto } from './dto/create-unit.dto';

@Injectable()
export class UnitService {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateUnitDto) {
    try {
      const existingUnit = await this.prismaService.unit.findFirst({
        where: {
          name: data.name,
        },
      });

      if (existingUnit) {
        throw new BadRequestException('Esta unidade já existe no plano');
      }

      const existingAddress = await this.prismaService.unit.findFirst({
        where: {
          address: data.address,
        },
      });

      if (existingAddress) {
        throw new BadRequestException('Este endereço já existe no plano');
      }

      const existingDisplayName = await this.prismaService.unit.findFirst({
        where: {
          displayName: data.displayName,
        },
      });

      if (existingDisplayName) {
        throw new BadRequestException(
          'Este nome de exibição já está em uso no plano',
        );
      }

      const { address, specialties, ...dataWithoutAddressAndSpecialties } =
        data;

      const formattedSpecialties = specialties.map((specialty) => ({
        specialtyId: specialty.specialtyId,
        isPrincipalSpecialty: specialty.isPrincipalSpecialty,
      }));

      return this.prismaService.unit.create({
        data: {
          ...dataWithoutAddressAndSpecialties,
          displayName: data.displayName,
          address: { create: address },
          specialties: {
            create: formattedSpecialties,
          },
        },
      });
    } catch (error) {
      throw new BadRequestException('Falha ao criar a unidade');
    }
  }

  async read() {
    return this.prismaService.unit.findMany();
  }

  async readById(id: string) {
    const unit = await this.prismaService.unit.findUnique({
      where: { unitId: id },
    });
    if (!unit) {
      throw new BadRequestException('Unidade não encontrada');
    }
    return unit;
  }

  async update(id: string, data: CreateUnitDto) {
    const unit = await this.prismaService.unit.findUnique({
      where: { unitId: id },
    });
    if (!unit) {
      throw new BadRequestException('Unidade não encontrada');
    }

    const { address, specialties, ...dataWithoutAddressAndSpecialties } = data;

    const formattedSpecialties = specialties.map((specialty) => ({
      where: { specialtyId: specialty.specialtyId },
      data: {
        isPrincipalSpecialty: specialty.isPrincipalSpecialty,
      },
    }));

    return this.prismaService.unit.update({
      where: { unitId: id },
      data: {
        ...dataWithoutAddressAndSpecialties,
        address: { update: address },
        specialties: {
          updateMany: formattedSpecialties,
        },
      },
    });
  }

  async delete(id: string) {
    const unit = await this.prismaService.unit.findUnique({
      where: { unitId: id },
    });
    if (!unit) {
      throw new BadRequestException('Unidade não encontrada');
    }
    return this.prismaService.unit.delete({ where: { unitId: id } });
  }
}
