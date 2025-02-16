import { BadRequestException, Injectable } from '@nestjs/common';
import { Click } from './models/click.model';
import { Link } from './models/link.model';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateShortLinkDto } from './dto/createShortLink.dto';
import * as crypto from 'crypto';
import { LinkAnalytics } from './dto/linkAnalistics.dto';

@Injectable()
export class LinkService {
    constructor(
        @InjectModel(Link)
        private linkModel: typeof Link,
        @InjectModel(Click)
        private clickModel: typeof Click,
    ) {}
    async createShortLink(dto: CreateShortLinkDto): Promise<Link> {
        try {
            let shortUrl = dto.alias;
            if (!shortUrl) {
                shortUrl = this.generateShortUrl(8); // возможна коллизия. можно добавить тайм метку или увеличить длину
                // можно добавить проверку и если из за коллизии не удалось создать ссылку, то сгенерировать еще раз(если не хочется удлинять ссылку)
            }
            const existing = await this.linkModel.findOne({
                where: { shortUrl },
            });
            if (existing) {
                throw new BadRequestException(`Алиас "${shortUrl}" уже занят.`);
            }

            let expiresAt = dto.expiresAt;
            if (!expiresAt) {
                const oneWeekFromNow = new Date();
                oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 365); // 365 дней жизнь ссылки
                expiresAt = oneWeekFromNow;
            }
            return await this.linkModel.create({
                shortUrl: shortUrl,
                originalUrl: dto.originalUrl,
                alias: dto.alias || null,
                expiresAt: expiresAt,
            });
        } catch (error) {
            throw new BadRequestException(
                error || 'Ошибка при создании ссылки.',
            );
        }
    }
    async findLinkAndRegisterClick(
        shortUrl: string,
        ipAddress: string,
    ): Promise<Link | null> {
        const now = new Date();

        const link = await this.linkModel.findOne({
            where: {
                shortUrl,
                [Op.or]: [
                    { expiresAt: { [Op.gt]: now } }, // expiresAt > now
                ],
            },
        });

        if (!link) {
            return null;
        }
        await this.clickModel.create({
            linkId: link.id,
            ipAddress,
        });
        return link;
    }
    async getLinkInfo(shortUrl: string): Promise<{
        originalUrl: string;
        createdAt: Date;
        clickCount: number;
        shortUrl: string;
    } | null> {
        const link = await this.linkModel.findOne({
            where: { shortUrl },
        });

        if (!link) {
            return null;
        }

        return {
            originalUrl: link.originalUrl,
            createdAt: link.createdAt,
            clickCount: link.clickCount,
            shortUrl: link.shortUrl,
        };
    }

    async deleteLink(shortUrl: string): Promise<boolean> {
        //каскадное удаление кликов включено в модели
        const deletedLinks = await this.linkModel.destroy({
            where: { shortUrl },
        });

        return deletedLinks > 0;
    }

    async getAnalytics(shortUrl: string): Promise<LinkAnalytics | null> {
        const linkData = await this.linkModel.findOne({
            where: { shortUrl },
            attributes: ['clickCount'],
            include: [
                {
                    model: Click,
                    attributes: ['ipAddress', 'clickedAt'],
                    order: [['clickedAt', 'DESC']],
                    limit: 5,
                },
            ],
        });
        if (!linkData) {
            return null; // ссылка не найдена
        }

        if (linkData.clickCount === 0) {
            return {
                clickCount: 0,
                clicks: [],
            };
        }

        return linkData;
    }

    private generateShortUrl(length: number): string {
        return crypto
            .randomBytes(length)
            .toString('base64')
            .replace(/[^a-zA-Z0-9]/g, '')
            .substring(0, length);
    }
}
