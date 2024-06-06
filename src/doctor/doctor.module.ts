import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';


import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from 'src/user/user.service';
import { UnitModule } from 'src/unit/unit.module';

@Module({
  imports: [PrismaModule, AuthModule, UnitModule],
  controllers: [DoctorController],
  providers: [DoctorService, UserService],
})
export class DoctorModule {}
