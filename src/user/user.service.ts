import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UserDTO } from "./dto/user.dto";
import * as bcrypt from 'bcrypt';
import { PrismaService } from "src/prisma/prisma.service";
@Injectable()
export class UserService {
    constructor(
    private prismaService: PrismaService,
  ) {}
     
  
  async create(data: UserDTO) {
    const existUserWithSameEmail = (await this.prismaService.user.count({
        where: {
          email: data.email,
        },
      }))
    if (existUserWithSameEmail) {
      throw new BadRequestException('Este e-mail já está sendo usado.');
    }

    const salt = await bcrypt.genSalt();
    
    data.password =  await bcrypt.hash(data.password, salt);
   

    return this.prismaService.user.create({data})
  }

  async read() {
    return this.prismaService.user.findMany();
  }

  async readById(id: string) {
    await this.exists(id);

    return this.prismaService.user.findUnique({
            where: {
                userId: id,
            }
        })
  }

  async update(id: string, data: UserDTO) {
    delete data.role;
    await this.exists(id);
    await this.prismaService.user.update({
      where: {
        userId: id,
      },
      data,
    });
    return this.exists(id);
  }

  async delete(id: string) {
    await this.exists(id);
    return this.prismaService.user.delete({
      where: { userId: id },
    });
  }


  async exists(id: string) {
    if (
      !(await this.prismaService.user.count({
        where: {
          userId: id,
        },
      }))
    ) {
      throw new NotFoundException(`O usuário ${id} não existe.`);
    }
  }
}