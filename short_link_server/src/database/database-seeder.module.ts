import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Click } from '../link/models/click.model';
import { Link } from '../link/models/link.model';
import { DatabaseSeederService } from './database-seeder.service';
import { LinksSeeder } from './seeds/links.seeder';
import { ClicksSeeder } from './seeds/clicks.seeder';

@Module({
    imports: [SequelizeModule.forFeature([Click, Link])],
    providers: [DatabaseSeederService, LinksSeeder, ClicksSeeder],
    exports: [DatabaseSeederService],
})
export class DatabaseSeederModule {}
