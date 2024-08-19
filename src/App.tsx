import { Suspense } from 'react';
import CCircularProgress from './components/UI/CCircularProgress/CCircularProgress';
import { Route, Routes } from 'react-router';
import ProtectedRoute from './components/PrivateRoute/PrivateRoute';
import HomePage from './pages/HomePage/HomePage';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import './App.css';
import AboutUs from './pages/AboutUs/AboutUs';
import Dashboard from './pages/Dashboard/Dashboard';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import Demande from './pages/Contenu/Demande';
import Creator from './pages/Creator/Creator';
import CreatorDetails from './pages/CreatorDetails/CreatorDetails';
import PaymentPage from './pages/PayementPage/PaymentPage';
import './App.css';
function App() {
  return (
    <Suspense fallback={<CCircularProgress />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <HomePage>
                <Suspense fallback={<CCircularProgress />}>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <ProtectedRoute redirectPath="/">
                          <LandingPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="*" element={<ErrorPage />} />
                    <Route
                      path="/parametres"
                      element={
                        <ProtectedRoute redirectPath="/">
                          <SettingsPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/aboutus" element={<AboutUs />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/createur" element={<Creator />} />
                    <Route path="/demande" element={<Demande />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/createur/:id" element={<CreatorDetails />} />
                  </Routes>
                </Suspense>
              </HomePage>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
