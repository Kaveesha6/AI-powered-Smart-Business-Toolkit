import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Auth from './pages/Auth';
import CompetitorAnalysis from './pages/CompetitorAnalysis';
import MarketTrends from './pages/MarketTrends';
import Contact from './pages/Contact';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="auth" element={<Auth />} />
              
              {/* Protected Routes - require authentication */}
              <Route
                path="competitor-analysis"
                element={
                  <ProtectedRoute>
                    <CompetitorAnalysis />
                  </ProtectedRoute>
                }
              />
              <Route
                path="market-trends"
                element={
                  <ProtectedRoute>
                    <MarketTrends />
                  </ProtectedRoute>
                }
              />
              
              {/* Public route */}
              <Route path="contact" element={<Contact />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;