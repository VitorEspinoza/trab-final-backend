import { UserService } from 'src/user/user.service';
import { BadRequestException, Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { CreateAssociateDto } from "./dto/create-associate.dto";
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/enums/role.enum';


@Injectable()
export class AssociateService{
    constructor(
      private prismaService: PrismaService,
      private UserService: UserService,
      private authService: AuthService
) {}

    async create(data: CreateAssociateDto) {
        await this.UserService.verifyEmailExists(data.user.email);

        const existingAssociate = await this.prismaService.associate.findFirst({
            where: {
                document: data.document,
            }
        })

        if(existingAssociate) {
            throw new BadRequestException('Este associado já está vinculado ao plano');
        }
    
        data.user.role = Role.ASSOCIATE;
        const associate = 
            {...data, 
                user: { create: data.user},
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
                healthInsuranceIdentifier: this.generateInsuranceIdentifierString()
            } 

        const savedAssociate = await this.prismaService.associate.create({ data: associate} );

        return this.authService.createToken(savedAssociate.userId);
    }

    generateInsuranceIdentifierString() {
        let result = '';
        while(result.length < 20){
            result += Math.floor(Math.random() * 10); 
        }
        return result;
    }



}
