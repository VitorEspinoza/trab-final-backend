
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAssociateDto } from './dto/create-associate.dto';
import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcrypt';
import { FileService } from 'src/file/file.service';
import { AddressDTO } from 'src/Address/dto/address.dto';
import { UpdateUserDTO } from 'src/user/dto/update-user.dto';
import { UserService } from 'src/user/user.service';
import { UpdateAssociateDTO } from './dto/update-associate.dto';
import { UserDTO } from 'src/user/dto/user.dto';

@Injectable()
export class AssociateService{
    constructor(
      private prismaService: PrismaService,
      private userService: UserService,
      private authService: AuthService,
      private fileService: FileService
) {}
    private azureUrl = 'trabweb1.blob.core.windows.net/user-photos/';

    async create(data: CreateAssociateDto, photo: Express.Multer.File) {
        await this.userService.verifyEmailExists(data.user.email);

    const existingAssociate = await this.prismaService.associate.findFirst({
      where: {
        document: data.document,
      },
    });

    if (existingAssociate) {
      throw new BadRequestException(
        'Este associado já está vinculado ao plano',
      );
    }
    
    this.removeRoleFromUser(data.user);
    
    const salt = await bcrypt.genSalt();
    data.user.password =  await bcrypt.hash(data.user.password, salt);

    const photoConfig = {
      url: null,
      uploadError: null,
    }

    if(photo)
    try {
        const { fileName } = await this.fileService.uploadUserPhoto(photo);
        photoConfig.url = this.azureUrl + fileName;
    } catch (error) {
        photoConfig.uploadError = 'Falha ao enviar a foto';
    }

    const user = {...data.user, photo_url: photoConfig.url};
    const associate = {
      ...data,
      user: { create: user },
      address: {
        connectOrCreate: {
          where: {
            zipCode_number: {
              zipCode: data.address.zipCode,
              number: data.address.number,
            },
          },
          create: data.address,
        },
      },
      healthInsuranceIdentifier: this.generateInsuranceIdentifierString(),
    };

 const savedAssociate = await this.prismaService.associate.create({ data: associate} );
        const { accessToken } = await this.authService.createToken(savedAssociate.userId);
        return {
            accessToken,
            uploadError: photoConfig.uploadError,
            associate: savedAssociate
        }
  }

  generateInsuranceIdentifierString() {
    let result = '';
    while (result.length < 20) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  }

async read() {
  const associates = await this.prismaService.associate.findMany({
    select: {
      associateId: true,
      phone: true,
      birthAt: true,
      document: true,
      healthInsuranceIdentifier: true,
      address: {
        select: {
          street: true,
          number: true,
          neighborhood: true,
          city: true,
          state: true,
          zipCode: true,
        }
      },
      user: {
        select: {
          email: true,
          name: true,
        }
      },
    },
  });

  return associates;
}

  async readById(id: string) {
    await this.exists(id);

    return this.prismaService.associate.findUnique({
      where: {
        associateId: id,
      },
      select: {
      associateId: true,
      phone: true,
      birthAt: true,
      document: true,
      healthInsuranceIdentifier: true,
      address: {
        select: {
          street: true,
          number: true,
          neighborhood: true,
          city: true,
          state: true,
          zipCode: true,
        }
      },
      user: {
        select: {
          email: true,
          name: true,
        }
      },
    },
    });
  }
  
async update(id: string, data: UpdateAssociateDTO, photo: Express.Multer.File) {
  const associate = await this.prismaService.associate.findUnique({
    where: { associateId: id },
    include: { address: true, user: true },
  });

  if (!associate) {
    this.associateNotExistError(id);
  }
  let updateData: any = { ...data };

  
  
  const photoConfig = {
    url: null,
    uploadError: null,
  }

  if(photo)
    try {
        const { fileName } = await this.fileService.uploadUserPhoto(photo);
      
        await this.fileService.deleteUserPhoto(associate.user.photo_url);
        photoConfig.url = this.azureUrl + fileName;
    } catch (error) {
        photoConfig.uploadError = 'Falha ao enviar a foto';
    }


  updateData = {...await this.updateUserIfChanged(associate.user, updateData, photoConfig.url)};
  updateData = {...await this.updateAddressIfChanged(associate.address, updateData)};

  return this.prismaService.associate.update({
    where: {
      associateId: id,
    },
    data: updateData,
  });
}

private async updateUserIfChanged(oldUser: UserDTO, updateData: UpdateAssociateDTO, photoUrl: string) {

  const userChanged = this.hasUserChanged(oldUser, updateData.user, photoUrl);
  if (userChanged) {
    return this.updateUser(oldUser, updateData, photoUrl);
  }

  const { user, ...newUpdatedData } = updateData;
  return newUpdatedData;
}

private async updateUser(oldUser: UserDTO, updateData: UpdateAssociateDTO, photoUrl: string) {
    if(oldUser.email !== updateData.user.email)
      await this.userService.verifyEmailExists(updateData.user.email);
    this.removeRoleFromUser(updateData.user);
    const user = {...updateData.user, password: oldUser.password, photo_url: photoUrl};
    return { ...updateData, user: { update: user } };
}

  private updateAddressIfChanged(oldAddress: AddressDTO, updateData: UpdateAssociateDTO) {
    const addressChanged = this.hasAddressChanged(oldAddress, updateData.address);

    if (addressChanged) {
      return {...updateData,
        address: {
            connectOrCreate: {
              where: {
                zipCode_number: {
                  zipCode: updateData.address.zipCode,
                  number: updateData.address.number,
                },
              },
              create: updateData.address,
            },
          }
        };

    } 
    
    const { address, ...newUpdatedData } = updateData;
    return newUpdatedData;
  }


  private hasAddressChanged(oldAddress, newAddress) {
    return oldAddress.zipCode !== newAddress.zipCode || oldAddress.number !== newAddress.number;
  }

  private hasUserChanged(oldUser, newUser, photoUrl) {
    return oldUser.email !== newUser.email || oldUser.name !== newUser.name || photoUrl; 
  }

  async delete(id: string) {
    await this.exists(id);
    return this.prismaService.associate.delete({
      where: { associateId: id },
    });
  }

  async exists(id: string) {
    const count = await this.prismaService.associate.count({
      where: {
        associateId: id,
      },
    });

    if (count === 0) {
      this.associateNotExistError(id);
    }
  }

  private associateNotExistError(id: string) {
      throw new NotFoundException(`O associado com o id ${id} não existe.`);
  }

  private removeRoleFromUser(user: any) {
    if ('role' in user) 
      delete user.role;
  }
}
