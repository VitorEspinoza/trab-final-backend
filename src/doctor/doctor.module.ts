import { Module, forwardRef } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';

import { UserModule } from 'src/user/user.module';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, UserModule, forwardRef(() => AuthModule)],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
