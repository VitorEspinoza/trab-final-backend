import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { AddressService } from 'src/Address/address.service';

@Injectable()
export class UnitService {
  constructor(
    private prismaService: PrismaService,
    private addressService: AddressService,
  ) {}

  async create(data: CreateUnitDto) {
    const existingUnit = await this.prismaService.unit.findFirst({
      where: {
        name: data.name,
        displayName: data.displayName,
      },
    });

    if (existingUnit) {
      throw new BadRequestException(
        'Essa unidade já existe, verifique o nome e o nome de exibição',
      );
    }

    const existingAddress = await this.addressService.verifyExistenceAddress(
      data.address.zipCode,
      data.address.number,
    );

    if (existingAddress) {
      throw new BadRequestException('Este endereço já existe no plano');
    }

    return this.prismaService.unit.create({
      data: {
        ...data,
        address: { create: data.address },
        specialties: {
          create: data.specialties,
        },
      },
    });
  }

  async read() {
    const units = await this.prismaService.unit.findMany({
      select: {
        unitId: true,
        name: true,
        displayName: true,
        address: true,
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

    return units.map(unit => ({
    ...unit,
    specialties: unit.specialties.map(specialty => ({
      specialtyId: specialty.specialtyDetail.specialtyId,
      isPrincipalSpecialty: specialty.isPrincipalSpecialty,
      name: specialty.specialtyDetail.name
    }))
  }));
  }

  async readById(id: string) {
    const unit = await this.prismaService.unit.findUnique({
      where: { unitId: id },
      select: {
      unitId: true,
      name: true,
      displayName: true,
      address: true,
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
    
    if (!unit) {
      throw new BadRequestException('Unidade não encontrada');
    }
    
    return {
    ...unit,
    specialties: unit.specialties.map(specialty => ({
      isPrincipalSpecialty: specialty.isPrincipalSpecialty,
      specialtyId: specialty.specialtyDetail.specialtyId,
      name: specialty.specialtyDetail.name
    }))
  };
  }

  async update(id: string, data: CreateUnitDto) {
    const unit = await this.prismaService.unit.findUnique({
      where: { unitId: id },
      include: { address: true },
    });

    if (!unit) {
      throw new BadRequestException('Unidade não encontrada');
    }

    const addressChanged = unit.address.zipCode !== data.address.zipCode ||
      unit.address.number !== data.address.number;

    const updateData: any = { ...data, specialties: { create: data.specialties } };


    if (addressChanged) {
      const existingAddress = await this.addressService.verifyExistenceAddress(
        data.address.zipCode,
        data.address.number,
      );
  
    updateData.address = { create: data.address };

      if (existingAddress) {
        throw new BadRequestException('Este endereço já existe no plano');
      }
    }

    if(!addressChanged)
      delete updateData.address;

    const deletePromise = this.prismaService.unitHasSpecialty.deleteMany({
      where: {
        unitId: id,
      },
    });

    const updatePromise = this.prismaService.unit.update({
      where: {
        unitId: id,
      },
      data: updateData,
    });

    const [deleteResponse, updateResponse] =
      await this.prismaService.$transaction([deletePromise, updatePromise]);

    if (deleteResponse.count === 0) {
      throw new BadRequestException('Não foi possível fazer a alteração');
    }

    return updateResponse;
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
