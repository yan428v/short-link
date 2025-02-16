import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Link } from './models/link.model';
import { Click } from './models/click.model';

@Module({
    imports: [SequelizeModule.forFeature([Link, Click])],
    providers: [LinkService],
    controllers: [LinkController],
    exports: [LinkService],
})
export class LinkModule {}
