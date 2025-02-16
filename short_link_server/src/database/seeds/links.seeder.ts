import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Link } from '../../link/models/link.model';

@Injectable()
export class LinksSeeder {
    constructor(
        @InjectModel(Link)
        private linkModel: typeof Link,
    ) {}
    async createTestLinks() {
        await this.linkModel.create({
            originalUrl: 'https://www.google.com',
            shortUrl: 'https://short.link/1',
            alias: 'alias1',
            expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            clickCount: 423,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await this.linkModel.create({
            originalUrl: 'https://www.google.com',
            shortUrl: 'https://short.link/2',
            alias: 'alias2',
            expiresAt: null,
            clickCount: 53,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await this.linkModel.create({
            originalUrl: 'https://www.google.com',
            shortUrl: 'https://short.link/3',
            alias: 'alias3',
            expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            clickCount: 424,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await this.linkModel.create({
            originalUrl: 'https://www.google.com',
            shortUrl: 'https://short.link/4',
            alias: 'alias4',
            expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            clickCount: 432,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await this.linkModel.create({
            originalUrl: 'https://www.google.com',
            shortUrl: 'https://short.link/5',
            alias: 'alias5',
            expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            clickCount: 23424,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
}
