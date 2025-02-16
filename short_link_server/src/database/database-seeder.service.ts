import { Injectable } from '@nestjs/common';
import { LinksSeeder } from './seeds/links.seeder';
import { ClicksSeeder } from './seeds/clicks.seeder';

@Injectable()
export class DatabaseSeederService {
    constructor(
        private readonly linksSeeder: LinksSeeder,
        private readonly clicksSeeder: ClicksSeeder,
    ) {}
    async seedAll() {
        await this.linksSeeder.createTestLinks();
        console.log('Сидирование линков завершено');

        await this.clicksSeeder.createTestClicks();
        console.log('Сидирование кликов завершено');
    }
}
