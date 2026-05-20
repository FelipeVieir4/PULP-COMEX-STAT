import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { HomePage } from './features/home/HomePage';
import { ReportsPage } from './features/reports/ReportsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}