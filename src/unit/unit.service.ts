import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddressService } from 'src/Address/address.service';
import { UnitDTO } from './dto/unit.dto';
import { Unit } from '@prisma/client';

@Injectable()
export class UnitService {
  constructor(
    private prismaService: PrismaService,
    private addressService: AddressService,
  ) {}

  unitNotExistError() {
    throw new NotFoundException('A unidade informada não existe');
  }

  async create(data: UnitDTO) {
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

     return units.map(this.mapUnit);
  }

  async readById(id: string) {
    const unit = await this.prismaService.unit.findUnique({
      where: { unitId: id },
      select: {
      unitId: true,
      displayName: true,
      name: true,
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
       this.unitNotExistError();
    }
    
    return this.mapUnit(unit);

  }

  async update(id: string, data: UnitDTO) {
    const unit = await this.prismaService.unit.findUnique({
      where: { unitId: id },
      include: { address: true },
    });

    if (!unit) {
      this.unitNotExistError();
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
      this.unitNotExistError();
    }

    try {
      const transaction =
        await this.prismaService.$transaction([
          this.deleteUnitSpecialties(id),
          this.deleteUnit(id),
          this.deleteAdress(unit)
        ]);

      return transaction[1];
    }
    catch (e) {
      console.log("ERRO", e)
      throw new BadRequestException('Não foi possível deletar a unidade', e);
    }
  }

  async validateUnitExistence(id: string) {
    const notExist = !(await this.prismaService.unit.count({
      where: {
        unitId: id,
      },
    })); 
    if(notExist)
      this.unitNotExistError();
  }

  private mapSpecialty = (specialty) => {
    return {
      isPrincipalSpecialty: specialty.isPrincipalSpecialty,
      specialtyId: specialty.specialtyDetail.specialtyId,
      name: specialty.specialtyDetail.name
    };
  }

  private mapUnit = (unit) => {
    return {
      ...unit,
      specialties: unit.specialties.map(this.mapSpecialty)
    };
  }

  
  private deleteUnitSpecialties(unitId: string){
    return this.prismaService.unitHasSpecialty.deleteMany({
      where: {
        unitId
      },
    });
  }

  private deleteAdress(unit: Unit){
      return this.prismaService.address.deleteMany({
        where: {
          addressId: unit.addressId
        },
      });
    }


  private deleteUnit(unitId: string){
    return this.prismaService.unit.delete({
      where: {
        unitId
      },
    });
  }
}