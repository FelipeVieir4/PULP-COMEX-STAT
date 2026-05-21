import { Navigate, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { HomePage } from './features/home/HomePage';
import { ReportsPage } from './features/reports/ReportsPage';
import { LoginPage } from './features/auth/LoginPage';
import { AuthCallbackPage } from './features/auth/AuthCallbackPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <div className="login-spinner login-spinner--lg" aria-hidden="true" />
      </div>
    );
  }

  if (!session) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <ReportsPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
