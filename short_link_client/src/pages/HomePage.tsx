import  { useState } from 'react';
import Typography from '@mui/material/Typography';
import ShortenLinkForm from '../components/ShortenLinkForm';
import LinkInfoCard from '../components/LinkInfoCard';
import SnackbarAlert from '../components/SnackbarAlert';
import { getLinkInfo } from '../api/linkApi.ts';

export default function HomePage() {
    const [info, setInfo] = useState<{
        originalUrl: string;
        createdAt: Date;
        clickCount: number;
        shortUrl: string;
    } | null>(null);

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

    const handleSuccess = async (newShortUrl: string) => {
        setAlertMessage(`Короткая ссылка создана: ${newShortUrl}`);
        setAlertSeverity('success');
        setAlertOpen(true);
        try {
            const linkData = await getLinkInfo(newShortUrl);
            setInfo(linkData);
        } catch (error: any) {
            console.error(error);
        }
    };

    const handleError = (errMsg: string) => {
        setAlertMessage(errMsg);
        setAlertSeverity('error');
        setAlertOpen(true);
    };

    return (
        <div style={{ marginTop: '2rem' }}>
            <Typography variant="h4" gutterBottom>
                Сократить ссылку
            </Typography>

            <ShortenLinkForm onSuccess={handleSuccess} onError={handleError} />

            {info && (
                <LinkInfoCard
                    originalUrl={info.originalUrl}
                    createdAt={info.createdAt}
                    clickCount={info.clickCount}
                    shortUrl={info.shortUrl}
                />
            )}

            <SnackbarAlert
                open={alertOpen}
                message={alertMessage}
                severity={alertSeverity}
                onClose={() => setAlertOpen(false)}
            />
        </div>
    );
}
