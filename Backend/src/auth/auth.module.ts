/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from 'src/users/schema/user.provider';

@Module({
  imports:[DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService,...usersProviders],
})
export class AuthModule {}
