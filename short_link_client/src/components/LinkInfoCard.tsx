import { Card, CardContent, Typography } from '@mui/material';

interface LinkInfoCardProps {
    originalUrl: string;
    createdAt: Date;
    clickCount: number;
    shortUrl: string;
}

export default function LinkInfoCard({ originalUrl, createdAt, clickCount, shortUrl }: LinkInfoCardProps) {
    return (
        <Card sx={{ marginTop: 2 }}>
            <CardContent>
                <Typography>Оригинальная ссылка: {originalUrl}</Typography>
                <Typography>Дата создания: {new Date(createdAt).toLocaleString()}</Typography>
                <Typography>Число кликов: {clickCount}</Typography>
                <Typography variant={'h5'} >Твоя короткая ссылка: {`http://localhost:3000/${shortUrl}`}</Typography>
            </CardContent>
        </Card>
    );
}
