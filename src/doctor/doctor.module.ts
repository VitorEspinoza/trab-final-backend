import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';


import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from 'src/user/user.service';
import { UnitModule } from 'src/unit/unit.module';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [PrismaModule, AuthModule, UnitModule],
  controllers: [DoctorController],
  providers: [DoctorService, FileService, UserService],
})
export class DoctorModule {}
