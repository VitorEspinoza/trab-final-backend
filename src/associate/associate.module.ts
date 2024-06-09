import { Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AssociateController } from './associate.controller';
import { AssociateService } from './associate.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  controllers: [AssociateController],
  providers: [AssociateService],
  exports: [AssociateService],
})
export class AssociateModule {}
