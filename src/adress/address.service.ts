import { Injectable, NotFoundException } from "@nestjs/common";

import { AddressDTO } from "./dto/address.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Adress } from "@prisma/client";

@Injectable()
export class AddressService{
    constructor(
      private prismaService: PrismaService
) {}

async create(data: AddressDTO) {
   const { addressId } = await this.verifyExistenceAddress(data.zipCode, data.number);
     if (addressId) {
      return { addressId };
    }
  
    return this.prismaService.adress.create({
      data,
      select: {
        addressId: true,
      }
    });
}

async read() {
     return this.prismaService.adress.findMany();
}

async readById(id: string) {
    await this.exists(id);
   return this.prismaService.adress.findUnique({
            where: {
                addressId: id,
            }
        })
  }
  async update(id: string, data: AddressDTO) {
    await this.exists(id);
    await this.prismaService.adress.update({
      data, 
      where: {
        addressId: id,
      },
    });
    return this.exists(id);
  }

  async delete(id: string) {
    await this.exists(id);
    return this.prismaService.adress.delete({
      where: { 
        addressId: id 
      },
    });
  }

  async exists(id: string) {
        if (!(await this.prismaService.adress.count({
            where: {
               addressId: id,
            }
        }))) {
            throw new NotFoundException(`O endereço ${id} não existe.`);
        }
    }

    verifyExistenceAddress(zipCode: string, number: string): Promise<Adress> {
        return this.prismaService.adress.findFirst({
            where: {
                 zipCode: zipCode,
                number: number,
            }
        })
    }

}
