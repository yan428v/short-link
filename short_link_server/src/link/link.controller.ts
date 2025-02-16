import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Res,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateShortLinkDto } from './dto/createShortLink.dto';
import { RealIP } from 'nestjs-real-ip';
import { Response } from 'express';
import { Link } from './models/link.model';

@Controller()
export class LinkController {
    constructor(private readonly linkService: LinkService) {}

    @Post('shorten')
    async createShorten(@Body() createShortLinkDto: CreateShortLinkDto) {
        const newLink: Link =
            await this.linkService.createShortLink(createShortLinkDto);

        return newLink.shortUrl;
    }

    @Get(':shortUrl')
    async redirectToOriginal(
        @Param('shortUrl') shortUrl: string,
        @Res() res: Response,
        @RealIP() realIP: string,
    ) {
        const link = await this.linkService.findLinkAndRegisterClick(
            shortUrl,
            realIP,
        );

        if (!link) {
            throw new NotFoundException(
                `Ссылка "${shortUrl}" не найдена или просрочена.`,
            );
        }
        return res.redirect(link.originalUrl);
    }

    @Get('info/:shortUrl')
    async getLinkInfo(@Param('shortUrl') shortUrl: string) {
        const linkInfo = await this.linkService.getLinkInfo(shortUrl);
        if (!linkInfo) {
            throw new NotFoundException(`Ссылка "${shortUrl}" не найдена.`);
        }
        return linkInfo;
    }

    @Delete('delete/:shortUrl')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteLink(@Param('shortUrl') shortUrl: string) {
        const success = await this.linkService.deleteLink(shortUrl);
        if (!success) {
            throw new NotFoundException(
                `Ссылка "${shortUrl}" не найдена или уже удалена.`,
            );
        }
    }

    @Get('analytics/:shortUrl')
    async getLinkAnalytics(@Param('shortUrl') shortUrl: string) {
        const analytics = await this.linkService.getAnalytics(shortUrl);
        if (!analytics) {
            throw new NotFoundException(`Ссылка "${shortUrl}" не найдена.`);
        }
        return analytics;
    }
}
