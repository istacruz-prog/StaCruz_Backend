import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { BarbersModule } from './barbers/barbers.module';
import { ServicesModule } from './services/services.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    BarbersModule,
    ServicesModule,
    UsersModule,

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const caPath = configService.get<string>('DB_SSL_CA_PATH');
        const username =
          configService.get<string>('DB_USER')?.trim() ||
          configService.get<string>('DB_USERNAME')?.trim();
        const database =
          configService.get<string>('DB_NAME')?.trim() ||
          configService.get<string>('DB_DATABASE')?.trim();

        if (!username) {
          throw new Error('Database username is missing; set DB_USER or DB_USERNAME.');
        }

        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: Number(configService.get<string>('DB_PORT')),
          username,
          password: configService.get<string>('DB_PASSWORD'),
          database,

          ssl: caPath
            ? {
                ca: fs.readFileSync(path.resolve(process.cwd(), caPath)),
                rejectUnauthorized: true,
              }
            : undefined,

          autoLoadEntities: true,

          // Useful while learning locally. Disable this in production
          // and use migrations instead.
          synchronize: true,
        };
      },
    }),
  ],
})
export class AppModule {}