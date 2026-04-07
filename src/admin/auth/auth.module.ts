import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constant';
import { AdminAuthController } from './auth.controller';
import { AdminAuthService } from './auth.service';
import { UserEntity } from '../entities/user.entity';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1h' },
  })],
  controllers: [AdminAuthController],
  providers: [AdminAuthService, AuthGuard],
  exports: [ JwtModule],
})
export class AdminAuthModule {}
