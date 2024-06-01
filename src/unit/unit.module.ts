import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { AddressModule } from 'src/Address/address.module';

@Module({
  imports: [PrismaModule, AuthModule, AddressModule],
  controllers: [UnitController],
  providers: [UnitService],
})
export class UnitModule {}
