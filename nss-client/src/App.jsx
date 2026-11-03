import React, { useState, useEffect } from 'react';
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
import { About } from './pages/public/About';
import { EotCranes } from './pages/public/EotCranes';
import { RoofProfile } from './pages/public/RoofProfile';
import { Automation } from './pages/public/Automation';
import { Knowledge } from './pages/public/Knowledge';
import { Contact } from './pages/public/Contact';

// Newly Created Pages
import { Search } from './pages/public/Search';
import { Buildings } from './pages/public/Buildings';
import { StructuralSteel } from './pages/public/StructuralSteel';
import { Maintenance } from './pages/public/Maintenance';
import { Consulting } from './pages/public/Consulting';

// Auth and Secure Pages
import { Login } from './pages/auth/Login'; 
import { Dashboard } from './pages/secure/Dashboard'; 

// Simple business language translations for the loading screen
const appTranslations = {
  en: { loading: "Loading system..." },
  hi: { loading: "सिस्टम लोड हो रहा है..." },
  mr: { loading: "सिस्टम लोड होत आहे..." },
  te: { loading: "సిస్టమ్ లోడ్ అవుతోంది..." },
  ta: { loading: "சிஸ்டம் ஏற்றப்படுகிறது..." },
  kn: { loading: "ಸಿಸ್ಟಮ್ ಲೋಡ್ ಆಗುತ್ತಿದೆ..." },
  ml: { loading: "സിസ്റ്റം ലോഡ് ചെയ്യുന്നു..." },
  gu: { loading: "સિસ્ટમ લોડ થઈ રહ્યું છે..." },
  pa: { loading: "ਸਿਸਟਮ ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ..." },
  bn: { loading: "সিস্টেম লোড হচ্ছে..." },
  or: { loading: "ସିଷ୍ଟମ୍ ଲୋଡ୍ ହେଉଛି..." },
  ur: { loading: "سسٹم لوڈ ہو رہا ہے..." },
  as: { loading: "চিষ্টেম ল'ড হৈ আছে..." },
  bho: { loading: "सिस्टम लोड हो रहल बा..." }
};

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [language, setLanguage] = useState(localStorage.getItem('nss_lang') || 'en');

  useEffect(() => {
    const handleLangChange = (e) => setLanguage(e.detail);
    window.addEventListener('languageChanged', handleLangChange);
    return () => window.removeEventListener('languageChanged', handleLangChange);
  }, []);

  const t = appTranslations[language] || appTranslations['en'];
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-[#0035A0] font-black text-xl">
        {t.loading}
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
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/eot-cranes" element={<EotCranes />} />
              <Route path="/roof-profile" element={<RoofProfile />} />
              <Route path="/automation" element={<Automation />} />
              <Route path="/knowledge" element={<Knowledge />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Newly Added Routes */}
              <Route path="/search" element={<Search />} />
              <Route path="/buildings" element={<Buildings />} />
              <Route path="/structural-steel" element={<StructuralSteel />} />
              <Route path="/maintenance" element={<Maintenance />} />
              <Route path="/consulting" element={<Consulting />} />
              
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