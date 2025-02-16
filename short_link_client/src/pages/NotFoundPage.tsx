import { Typography } from '@mui/material';

export default function NotFoundPage() {
    return (
        <div style={{ marginTop: '2rem' }}>
            <Typography variant="h3" gutterBottom>
                404
            </Typography>
            <Typography variant="h5">
                Страница не найдена.
            </Typography>
        </div>
    );
}
