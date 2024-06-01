import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { AddressService } from 'src/Address/address.service';

@Injectable()
export class UnitService {
  constructor(private prismaService: PrismaService, private addressService: AddressService) {}

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

      const existingAddress = await this.addressService.verifyExistenceAddress(data.address.zipCode, data.address.number);


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

  // async update(id: string, data: CreateUnitDto) {
  //   const unit = await this.prismaService.unit.findUnique({
  //     where: { unitId: id },
  //   });
  //   if (!unit) {
  //     throw new BadRequestException('Unidade não encontrada');
  //   }

  //   const { address, ...dataWithoutAddressAndSpecialties } = data;

  //   return this.prismaService.unit.update({
  //     where: { unitId: id },
  //     data: {
  //       ...dataWithoutAddressAndSpecialties,
  //       address: { update: address },
  //       specialties: {
  //         updateMany: data.specialties,
  //       },
  //     },
  //   });
  // }

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
