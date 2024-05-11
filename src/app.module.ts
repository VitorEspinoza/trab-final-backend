import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './user/entity/user.entity';
import { DoctorEntity } from './doctor/entity/doctor.entity';
import { unitEntity } from './unit/entity/unit.entity';
import { specialtyEntity } from './specialty/entity/specialty.entity';
import { AssociateEntity } from './associate/entity/associate.entity';

@Module({
  imports: [
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
        unitEntity,
        specialtyEntity,
        AssociateEntity,
      ],
      synchronize: process.env.ENV === 'development',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
