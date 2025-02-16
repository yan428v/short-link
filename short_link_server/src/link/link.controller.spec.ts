import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';

describe('LinkController', () => {
    let app: INestApplication;
    const mockLinkService = {
        createShortLink: jest.fn(),
        findLinkAndRegisterClick: jest.fn(),
    };

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [LinkController],
            providers: [
                {
                    provide: LinkService,
                    useValue: mockLinkService,
                },
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('POST /shorten - Создание ссылки с уникальным alias', () => {
        it('должен создать ссылку с уникальным alias и вернуть shortUrl', async () => {
            const createShortLinkDto = {
                originalUrl: 'https://example.com',
                alias: 'uniquealias',
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            };

            const returnedLink = {
                id: 1,
                originalUrl: createShortLinkDto.originalUrl,
                alias: createShortLinkDto.alias,
                shortUrl: createShortLinkDto.alias,
                expiresAt: createShortLinkDto.expiresAt,
                createdAt: new Date(),
                clickCount: 0,
            };

            mockLinkService.createShortLink.mockResolvedValue(returnedLink);

            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            const response = await request(app.getHttpServer())
                .post('/shorten')
                .send(createShortLinkDto)
                .expect(HttpStatus.CREATED);

            expect(response.text).toEqual(returnedLink.shortUrl);
            expect(mockLinkService.createShortLink).toHaveBeenCalledWith(
                expect.objectContaining({
                    alias: 'uniquealias',
                    originalUrl: 'https://example.com',
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    expiresAt: expect.any(String),
                }),
            );
        });
    });

    describe('GET /:shortUrl - Переадресация на оригинальный URL', () => {
        it('должен перенаправить на оригинальный URL', async () => {
            const shortUrl = 'uniquealias';
            const originalUrl = 'https://example.com';

            const link = {
                id: 1,
                originalUrl,
                shortUrl,
                clickCount: 0,
                createdAt: new Date(),
            };

            mockLinkService.findLinkAndRegisterClick.mockResolvedValue(link);

            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            const response = await request(app.getHttpServer())
                .get(`/${shortUrl}`)
                .expect(HttpStatus.FOUND); // 302 Found

            expect(response.headers.location).toEqual(originalUrl);
            expect(
                mockLinkService.findLinkAndRegisterClick,
            ).toHaveBeenCalledWith(shortUrl, expect.any(String));
        });
    });
});
