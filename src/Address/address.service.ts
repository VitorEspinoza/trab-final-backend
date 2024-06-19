import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";

import { AddressDTO } from "./dto/address.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Address } from "@prisma/client";

@Injectable()
export class AddressService{
    constructor(
      private prismaService: PrismaService
) {}

async create(data: AddressDTO) {
   const existingAdress = await this.verifyExistenceAddress(data.zipCode, data.number);
     if (existingAdress) {
      throw new BadRequestException('Esse endereço já existe');
    }
  
    return this.prismaService.address.create({
      data,
      select: {
        addressId: true,
      }
    });
}

async read() {
     return this.prismaService.address.findMany();
}

async readById(id: string) {
    await this.exists(id);
   return this.prismaService.address.findUnique({
            where: {
                addressId: id,
            }
        })
  }
  async update(id: string, data: AddressDTO) {
    await this.exists(id);
    await this.prismaService.address.update({
      data, 
      where: {
        addressId: id,
      },
    });
    return this.exists(id);
  }

  async delete(id: string) {
    await this.exists(id);
    return this.prismaService.address.delete({
      where: { 
        addressId: id 
      },
    });
  }

  async exists(id: string) {
        if (!(await this.prismaService.address.count({
            where: {
               addressId: id,
            }
        }))) {
            throw new NotFoundException(`O endereço ${id} não existe.`);
        }
    }

    verifyExistenceAddress(zipCode: string, number: string): Promise<Address> {
        return this.prismaService.address.findFirst({
            where: {
                 zipCode: zipCode,
                number: number,
            }
        })
    }

}
