import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET') ?? 'default_secret',
        signOptions: {
          expiresIn: (config.get<string>('JWT_EXPIRES_IN') ?? '1d') as `1d` | `${number}${'s' | 'm' | 'h' | 'd' | 'w' | 'y'}` ,
        },
      }),
    }),
  ],
  exports: [JwtModule],
})
export class AuthModule {}