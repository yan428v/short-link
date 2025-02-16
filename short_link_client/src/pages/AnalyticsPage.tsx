import { useState } from 'react';
import { TextField, Button, Typography, Stack } from '@mui/material';
import { getLinkAnalytics } from '../api/linkApi.ts';

interface LinkAnalytics {
    clickCount: number;
    clicks: ClickData[];
}

interface ClickData {
    ipAddress: string;
    clickedAt: string;
}

export default function AnalyticsPage() {
    const [fullUrl, setFullUrl] = useState('');
    const [analytics, setAnalytics] = useState<LinkAnalytics | null>(null);
    const [error, setError] = useState('');

    const getLastSegment = (url: string): string => {
        return url.split('/').filter(Boolean).pop() || '';
    };

    const handleFetchAnalytics = async () => {
        setError('');
        setAnalytics(null);
        const shortUrl = getLastSegment(fullUrl);

        try {
            const data = await getLinkAnalytics(shortUrl);
            setAnalytics(data);
        } catch (err: any) {
            setError(err.message || 'Ошибка получения данных');
        }
    };

    return (
        <div style={{ marginTop: '2rem' }}>
            <Typography variant="h4" gutterBottom>
                Аналитика
            </Typography>

            <Stack direction="row" spacing={2} sx={{ marginBottom: 2, width: '100%' }}>
                <TextField
                    label="URL"
                    variant="outlined"
                    value={fullUrl}
                    onChange={(e) => setFullUrl(e.target.value)}
                    sx={{ flex: 4 }}
                />
                <Button variant="contained" onClick={handleFetchAnalytics} sx={{ flex: 2 }}>
                    Показать аналитику
                </Button>
            </Stack>

            {error && <Typography color="error">Ошибка: {error}</Typography>}

            {analytics && (
                <div>
                    <Typography variant="h6">Общее количество кликов: {analytics.clickCount}</Typography>

                    {analytics.clicks.length > 0 ? (
                        <>
                            <Typography variant="h6" sx={{ marginTop: 2 }}>
                                Последние 5 кликов:
                            </Typography>
                            <ul>
                                {analytics.clicks.map((click, index) => (
                                    <li key={index}>
                                        IP: {click.ipAddress}, Дата: {new Date(click.clickedAt).toLocaleString()}
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <Typography>Аналитика отсутствует (кликов ещё не было).</Typography>
                    )}
                </div>
            )}
        </div>
    );
}
