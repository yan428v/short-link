import {
    IsDate,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateShortLinkDto {
    @IsNotEmpty()
    @IsString()
    @IsUrl()
    originalUrl: string;

    @IsOptional()
    @Transform(({ value }: { value: string }) => new Date(value))
    @IsDate()
    expiresAt?: Date;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    @MinLength(3)
    @Matches(/^[a-z0-9]+$/, {
        message:
            'alias может содержать только латинские маленькие буквы и цифры',
    })
    @Transform(({ value }: { value: string }) => value.trim())
    alias?: string;
}
