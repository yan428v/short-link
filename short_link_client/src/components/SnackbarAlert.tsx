import { Alert, Snackbar } from '@mui/material';

interface SnackbarAlertProps {
    open: boolean;
    message: string;
    severity?: 'success' | 'error' | 'warning' | 'info';
    onClose: () => void;
}

export default function SnackbarAlert({
                                          open,
                                          message,
                                          severity = 'success',
                                          onClose,
                                      }: SnackbarAlertProps) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <Alert
                severity={severity}
                onClose={onClose}
                variant="filled"
                sx={{
                    fontSize: '1.2rem',
                    padding: '16px 24px',
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}
