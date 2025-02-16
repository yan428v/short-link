import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Click } from '../../link/models/click.model';

@Injectable()
export class ClicksSeeder {
    constructor(
        @InjectModel(Click)
        private clickModel: typeof Click,
    ) {}
    async createTestClicks() {
        await this.clickModel.create({
            linkId: 1,
            ipAddress: '192.168.1.1',
            clickedAt: new Date(),
            updatedAt: new Date(),
        });
        await this.clickModel.create({
            linkId: 1,
            ipAddress: '144.232.23.2',
            clickedAt: new Date(),
            updatedAt: new Date(),
        });
        await this.clickModel.create({
            linkId: 1,
            ipAddress: '231.543.1.5',
            clickedAt: new Date(),
            updatedAt: new Date(),
        });
        await this.clickModel.create({
            linkId: 1,
            ipAddress: '144.543.788.888',
            clickedAt: new Date(),
            updatedAt: new Date(),
        });
    }
}
