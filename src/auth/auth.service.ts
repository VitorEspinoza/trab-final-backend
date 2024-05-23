import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserDTO } from "src/user/dto/user.dto";
import { UserService } from "src/user/user.service";
import { Role } from "src/enums/role.enum";
import * as bcrypt from 'bcrypt';
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
private issuer = 'login';
private audience = 'users';

constructor(private readonly jwtService: JwtService, private prismaService: PrismaService, private userService: UserService) {}

 createToken(user: User) {
  return {
    accessToken: this.jwtService.sign(
      {
      id: user.userId,
      },
      {
        expiresIn: '2 days',
        subject: String(user.userId),
        issuer: this.issuer,
        audience: this.audience
      }
    )
  }
}

 checkToken(token: string) {
  try {
    const data = this.jwtService.verify(token, {
        audience: this.audience,
        issuer: this.issuer
    })

  return data;
  } catch(e) {
    throw new BadRequestException(e);
  }

}

isValidToken(token: string) {
  try {
    this.checkToken(token);
    return true;
  }
  catch(e) {
    return false;
  }
}

async login(email: string, password: string){
   const user = await this.prismaService.user.findFirst({
            where: {
                email
            }
        });

    if (!user) 
      throw new UnauthorizedException('E-mail e/ou senha incorretos.');
    

    const incorrectPassword = !await bcrypt.compare(password, user.password);

    if(incorrectPassword) 
      throw new UnauthorizedException('E-mail e/ou senha incorretos.');
    
    return this.createToken(user);
 
}


async register(data: UserDTO, isAdmin = false)
{
    isAdmin ? data.role = Role.ADMIN : data.role = Role.ASSOCIATE;
  
    const user = await this.userService.create(data);

    return this.createToken(user);
}

}