import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import AppRouter from './routes/AppRouter.tsx';
import Header from './components/Header.tsx';


const theme = createTheme({
    palette: {
        primary: {
            main: '#0f2d5a',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Container maxWidth="md">
                    <Header />
                    <AppRouter />
                </Container>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App
