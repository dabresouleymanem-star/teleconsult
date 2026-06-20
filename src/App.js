// App.js — Routing principal de l'application
import ObservationPage from './pages/ObservationPage';
import ConsultationPage from './pages/ConsultationPage';
import PatientPage from './pages/PatientPage';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { isAuthenticated } from './services/authService';

// Composant qui protège une page : si pas connecté, redirige vers /
function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/observation"
          element={
            <PrivateRoute>
              <ObservationPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/consultation"
          element={
            <PrivateRoute>
              <ConsultationPage />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/patient"
          element={
            <PrivateRoute>
              <PatientPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;