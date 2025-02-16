import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Dialect } from 'sequelize/types';
import { SequelizeModule } from '@nestjs/sequelize';
import { Click } from './link/models/click.model';
import { Link } from './link/models/link.model';
import { DatabaseSeederModule } from './database/database-seeder.module';
import { LinkModule } from './link/link.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        SequelizeModule.forRoot({
            dialect: process.env.DATABASE_DIALECT as Dialect,
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            models: [Link, Click],
            autoLoadModels: true,
            logging: false,
        }),
        DatabaseSeederModule,
        LinkModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
