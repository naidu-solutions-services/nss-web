import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layout and UI Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CookieBanner } from './components/ui/CookieBanner';
import { FloatingChat } from './components/ui/FloatingChat';

// Public Pages
import { Home } from './pages/public/Home';
import { Services } from './pages/public/Services';
import { EotCranes } from './pages/public/EotCranes';
import { RoofProfile } from './pages/public/RoofProfile';
import { Automation } from './pages/public/Automation';
import { Knowledge } from './pages/public/Knowledge';
import { Contact } from './pages/public/Contact';

// Note: Ensure you have basic Login and Dashboard components created in your pages folder.
// If they do not exist yet, create simple placeholder files for them to prevent import errors.
import { Login } from './pages/auth/Login'; 
import { Dashboard } from './pages/secure/Dashboard'; 

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-[#0035A0] font-black text-xl">
        Loading...
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-white font-sans text-gray-900">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/eot-cranes" element={<EotCranes />} />
              <Route path="/roof-profile" element={<RoofProfile />} />
              <Route path="/automation" element={<Automation />} />
              <Route path="/knowledge" element={<Knowledge />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Auth Route */}
              <Route path="/login" element={<Login />} />
              
              {/* Secure Dashboard Routes */}
              <Route 
                path="/dashboard/*" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Fallback Catch-All Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
          <CookieBanner />
          <FloatingChat />
        </div>
      </Router>
    </AuthProvider>
  );
}