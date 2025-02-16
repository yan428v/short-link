import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { DatabaseSeederService } from './database/database-seeder.service';

async function bootstrap() {
    const PORT = process.env.PORT || 5000;

    const app = await NestFactory.create(AppModule);

    const seeder = app.get(DatabaseSeederService);

    const sequelize = app.get<Sequelize>(Sequelize);

    app.useGlobalPipes(new ValidationPipe());

    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: '*',
        credentials: true,
    });
    await sequelize
        .sync({ force: true })
        .then(async () => {
            console.log('Таблицы удалены и созданы заново.');
        })
        .catch((error) => {
            console.error('Ошибка пересоздания таблиц:', error);
        });

    await seeder.seedAll();

    await app.listen(PORT, () => {
        console.log(`Сервер запущен на ${PORT} порту \n`);
    });
}
bootstrap();
