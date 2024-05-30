import { UserService } from 'src/user/user.service';
import { BadRequestException, Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { CreateAssociateDto } from "./dto/create-associate.dto";
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/enums/role.enum';

import { FileService } from 'src/file/file.service';

@Injectable()
export class AssociateService{
    constructor(
      private prismaService: PrismaService,
      private UserService: UserService,
      private authService: AuthService,
      private fileService: FileService
) {}
    private azureUrl = 'trabweb1.blob.core.windows.net/user-photos/';

    async create(data: CreateAssociateDto, photo: Express.Multer.File) {
        await this.UserService.verifyEmailExists(data.user.email);

        const existingAssociate = await this.prismaService.associate.findFirst({
            where: {
                document: data.document,
            }
        })

        if(existingAssociate) {
            throw new BadRequestException('Este associado já está vinculado ao plano');
        }
        let photo_url = null;
        let photoUploadError = null;
        
        if(photo)
        try {
            const { fileName } = await this.fileService.uploadUserPhoto(photo);
            photo_url = this.azureUrl + fileName;
        } catch (error) {
            photoUploadError = 'Falha ao enviar a foto';
        }

        data.user.role = Role.ASSOCIATE;

        const user = {...data.user, photo_url: photo_url};
        const associate = 
            {...data, 
                user: { create: user},
                address: {
                    connectOrCreate: {
                        where: {
                            zipCode_number: {
                                zipCode: data.address.zipCode,
                                number: data.address.number
                            }
                        },
                        create: data.address
                    }
                },       
                healthInsuranceIdentifier: this.generateInsuranceIdentifierString(),
            } 

        const savedAssociate = await this.prismaService.associate.create({ data: associate} );
        const { accessToken } = await this.authService.createToken(savedAssociate.userId);
        return {
            accessToken,
            photoUploadError,
            associate: savedAssociate
        }
                

    }

    generateInsuranceIdentifierString() {
        let result = '';
        while(result.length < 20){
            result += Math.floor(Math.random() * 10); 
        }
        return result;
    }



}
