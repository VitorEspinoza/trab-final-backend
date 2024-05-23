import { Injectable, NotFoundException } from "@nestjs/common";

import { AdressDTO } from "./dto/adress.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AdressService{
    constructor(
      private prismaService: PrismaService
) {}

async create(data: AdressDTO) {
   const adressId = await this.prismaService.adress.findFirst({
            where: {
                 zipCode: data.zipCode,
                number: data.number,
            },
            select: {
                addressId: true,
            }
        })
     if (adressId) {
      return { adressId };
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
  async update(id: string, data: AdressDTO) {
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

}
