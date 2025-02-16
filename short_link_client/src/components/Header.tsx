import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Сервис сокращения ссылок
                </Typography>
                <Button color="inherit" onClick={() => navigate('/')}>Главная</Button>
                <Button color="inherit" onClick={() => navigate('/analytics')}>Аналитика</Button>
            </Toolbar>
        </AppBar>
    );
}
