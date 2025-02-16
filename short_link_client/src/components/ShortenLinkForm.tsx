import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { createShortLink } from '../api/linkApi.ts';

interface ShortenLinkFormProps {
    onSuccess: (shortUrl: string) => void;
    onError: (errMsg: string) => void;
}

export default function ShortenLinkForm({ onSuccess, onError }: ShortenLinkFormProps) {
    const [originalUrl, setOriginalUrl] = useState('');
    const [alias, setAlias] = useState('');
    const [expiresAt, setExpiresAt] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const expiresDate = expiresAt ? new Date(expiresAt) : undefined;
            const shortUrl = await createShortLink(originalUrl, alias, expiresDate);
            if (!shortUrl) {
                throw new Error('Не удалось создать короткую ссылку');
            }
            onSuccess(shortUrl);
            setOriginalUrl('');
            setAlias('');
            setExpiresAt('');
        } catch (error: any) {
            onError(error.toString());
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <TextField
                    label="Оригинальная ссылка"
                    variant="outlined"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    required
                />
                <TextField
                    label="Алиас (необязательно)"
                    variant="outlined"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                />
                <TextField
                    label="Дата истечения (необязательно)"
                    variant="outlined"
                    type="date"
                    value={expiresAt}
                    onChange={(e) => setExpiresAt(e.target.value)}
                    slotProps={{
                        input: {
                            onClick: (e) => (e.target as HTMLInputElement).showPicker(), // Открывает календарь при клике на поле
                        },
                        inputLabel: {
                            shrink: true, // Чтобы лейбл не накладывался на текст
                        }
                    }}

                />

                <Button type="submit" variant="contained">
                    Создать короткую ссылку
                </Button>
            </Stack>
        </form>
    );
}
