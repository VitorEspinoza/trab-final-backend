import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AddressModule } from './adress/address.module';
import { AssociateModule } from './associate/associate.module';
import { DoctorModule } from './doctor/doctor.module';
import { UnitModule } from './unit/unit.module';
import { SpecialtyModule } from './specialty/specialty.module';

@Module({
  imports: [ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => AddressModule),
    forwardRef(() => AssociateModule),
    forwardRef(() => DoctorModule),
    forwardRef(() => UnitModule),
    forwardRef(() => SpecialtyModule),
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
}],
})
export class AppModule {}

