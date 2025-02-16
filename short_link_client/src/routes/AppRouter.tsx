import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage.tsx';
import AnalyticsPage from '../pages/AnalyticsPage.tsx';
import NotFoundPage from '../pages/NotFoundPage.tsx';

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default AppRouter;
