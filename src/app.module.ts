import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './user/entity/user.entity';
import { DoctorEntity } from './doctor/entity/doctor.entity';

import { AssociateEntity } from './associate/entity/associate.entity';
import { DoctorHasSpecialtyEntity } from './doctorHasSpecialty/entity/doctorHasSpecialty.entity';
import { UnitHasSpecialtyEntity } from './unitHasSpecialty/entity/unitHasSpecialty.entity';
import { AdressEntity } from './adress/entity/adress.entity';
import { SpecialtyEntity } from './specialty/entity/specialty.entity';
import { UnitEntity } from './unit/entity/unit.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
   ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        UserEntity,
        DoctorEntity,
        UnitEntity,
        SpecialtyEntity,
        AssociateEntity,
        DoctorHasSpecialtyEntity,
        UnitHasSpecialtyEntity,
        AdressEntity,
      ],
      synchronize: process.env.ENV === 'development',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
}],
})
export class AppModule {}

