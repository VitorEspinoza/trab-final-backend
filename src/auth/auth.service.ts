import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserDTO } from "src/user/dto/user.dto";
import { UserService } from "src/user/user.service";
import { Role } from "src/enums/role.enum";
import * as bcrypt from 'bcrypt';
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class AuthService {
private issuer = 'login';
private audience = 'users';

constructor(private readonly jwtService: JwtService, private prismaService: PrismaService, private userService: UserService) {}

 createToken(userId: string) {
  return {
    accessToken: this.jwtService.sign(
      {
      id: userId,
      },
      {
        expiresIn: '2 days',
        subject: userId,
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
            },
            select: {
                userId: true,
                name: true,
                password: true,
                email: true,
                role: true
            }
        });

    if (!user) 
      throw new UnauthorizedException('E-mail e/ou senha incorretos.');
    
  
    const incorrectPassword = !await bcrypt.compare(password, user.password);

    if(incorrectPassword) 
      throw new UnauthorizedException('E-mail e/ou senha incorretos.');

    const token = this.createToken(user.userId);
    return  { user: user, accessToken: token.accessToken};
 
}


  async registerAdmin(data: UserDTO)
  {
      const userData = {
          ...data,
          role: Role.ADMIN
      };
    
      return this.userService.create(userData);
  }
}
