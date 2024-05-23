
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    JwtModule.register({
      secret: String(process.env.JWT_SECRET),
    }),
    forwardRef(() => UserModule),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, RoleGuard],
  exports: [AuthService],
})
export class AuthModule { }
