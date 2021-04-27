import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UserModule, 
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
