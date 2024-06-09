import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { AddressModule } from 'src/Address/address.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [PrismaModule, AuthModule, AddressModule],
  controllers: [UnitController],
  providers: [UnitService, UserService],
  exports: [UnitService]
})
export class UnitModule {}
