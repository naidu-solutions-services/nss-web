import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Phone, Globe, Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

// Simple business language translations for 13+ Indian languages
const navTranslations = {
  en: { home: "Home", services: "Services", dashboard: "Dashboard", contact: "Contact", login: "Sign In", logout: "Sign Out", selectLang: "Select Language" },
  hi: { home: "होम", services: "सेवाएं", dashboard: "डैशबोर्ड", contact: "संपर्क करें", login: "लॉग इन", logout: "लॉग आउट", selectLang: "भाषा चुनें" },
  mr: { home: "मुख्यपृष्ठ", services: "सेवा", dashboard: "डॅशबोर्ड", contact: "संपर्क", login: "लॉग इन", logout: "बाहेर पडा", selectLang: "भाषा निवडा" },
  te: { home: "హోమ్", services: "సేవలు", dashboard: "డాష్బోర్డ్", contact: "సంప్రదించండి", login: "లాగిన్", logout: "లాగ్అవుట్", selectLang: "భాషను ఎంచుకోండి" },
  ta: { home: "முகப்பு", services: "சேவைகள்", dashboard: "கட்டுப்பாட்டகம்", contact: "தொடர்பு கொள்ள", login: "உள்நுழைக", logout: "வெளியேறு", selectLang: "மொழியைத் தேர்ந்தெடுக்கவும்" },
  kn: { home: "ಮುಖಪುಟ", services: "ಸೇವೆಗಳು", dashboard: "ಡ್ಯಾಶ್ಬೋರ್ಡ್", contact: "ಸಂಪರ್ಕಿಸಿ", login: "ಲಾಗಿನ್", logout: "ಲಾಗ್ ಔಟ್", selectLang: "ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ" },
  ml: { home: "ഹോം", services: "സേവനങ്ങൾ", dashboard: "ഡാഷ്‌ബോർഡ്", contact: "ബന്ധപ്പെടുക", login: "ലോഗിൻ", logout: "ലോഗൗട്ട്", selectLang: "ഭാഷ തിരഞ്ഞെടുക്കുക" },
  gu: { home: "હોમ", services: "સેવાઓ", dashboard: "ડેશબોર્ડ", contact: "સંપર્ક કરો", login: "લૉગ ઇન", logout: "લૉગ આઉટ", selectLang: "ભાષા પસંદ કરો" },
  pa: { home: "ਹੋਮ", services: "ਸੇਵਾਵਾਂ", dashboard: "ਡੈਸ਼ਬੋਰਡ", contact: "ਸੰਪਰਕ ਕਰੋ", login: "ਲਾਗਇਨ", logout: "ਲਾਗ ਆਉਟ", selectLang: "ਭਾਸ਼ਾ ਚੁਣੋ" },
  bn: { home: "হোম", services: "পরিষেবা", dashboard: "ড্যাশবোর্ড", contact: "যোগাযোগ করুন", login: "লগ ইন", logout: "লগ আউট", selectLang: "ভাষা নির্বাচন করুন" },
  or: { home: "ହୋମ୍", services: "ସେବା", dashboard: "ଡାସବୋର୍ଡ", contact: "ଯୋଗାଯୋଗ କରନ୍ତୁ", login: "ଲଗଇନ୍", logout: "ଲଗଆଉଟ୍", selectLang: "ଭାଷା ବାଛନ୍ତୁ" },
  ur: { home: "ہوم", services: "خدمات", dashboard: "ڈیش بورڈ", contact: "رابطہ کریں", login: "لاگ ان", logout: "لاگ آؤٹ", selectLang: "زبان منتخب کریں" },
  as: { home: "হোম", services: "সেৱাসমূহ", dashboard: "ডেচবৰ্ড", contact: "যোগাযোগ কৰক", login: "লগ ইন", logout: "লগ আউট", selectLang: "ভাষা বাছক" },
  bho: { home: "होम", services: "सेवा", dashboard: "डैशबोर्ड", contact: "संपर्क करीं", login: "लॉग इन", logout: "लॉग आउट", selectLang: "भाषा चुनीं" }
};

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem('nss_lang') || 'en');

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    localStorage.setItem('nss_lang', lang);
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
  };

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const t = navTranslations[language] || navTranslations['en'];

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 w-full shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left: NSS Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <img src="https://i.postimg.cc/DfbqzJ0Y/download.png" alt="NSS Logo" className="h-10 w-auto" />
              </Link>
            </div>

            {/* Center: Desktop Links */}
            <nav className="hidden md:flex space-x-8 items-center justify-center flex-1">
              <Link to="/" className="text-gray-900 font-semibold hover:text-nss-blue transition">{t.home}</Link>
              <Link to="/services" className="text-gray-900 font-semibold hover:text-nss-blue transition">{t.services}</Link>
              {user && (
                <Link to="/dashboard" className="text-gray-900 font-semibold hover:text-nss-blue transition">{t.dashboard}</Link>
              )}
            </nav>

            {/* Right: Desktop Icons & Contact Button */}
            <div className="hidden md:flex items-center space-x-6">
              <Search className="h-5 w-5 text-gray-700 cursor-pointer hover:text-nss-blue" />
              
              <div className="flex items-center text-gray-700">
                <Globe className="h-5 w-5 mr-1" />
                <select 
                  value={language} 
                  onChange={handleLanguageChange}
                  className="bg-transparent text-sm font-semibold outline-none cursor-pointer hover:text-nss-blue"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                  <option value="mr">मराठी</option>
                  <option value="te">తెలుగు</option>
                  <option value="ta">தமிழ்</option>
                  <option value="kn">ಕನ್ನಡ</option>
                  <option value="ml">മലയാളം</option>
                  <option value="gu">ગુજરાતી</option>
                  <option value="pa">ਪੰਜਾਬੀ</option>
                  <option value="bn">বাংলা</option>
                  <option value="or">ଓଡ଼ିଆ</option>
                  <option value="ur">اردو</option>
                  <option value="as">অসমীয়া</option>
                  <option value="bho">भोजपुरी</option>
                </select>
              </div>

              <Link to="/contact" className="bg-[#0035A0] text-white px-6 py-2 font-bold rounded-sm hover:bg-blue-800 transition">
                {t.contact}
              </Link>

              {user ? (
                <button onClick={handleLogout} className="text-gray-900 font-semibold hover:text-red-600 transition">
                  {t.logout}
                </button>
              ) : (
                <Link to="/login" className="text-gray-900 font-semibold hover:text-nss-blue transition">
                  {t.login}
                </Link>
              )}
            </div>

            {/* Mobile: Right Aligned Icon Cluster */}
            <div className="flex md:hidden items-center space-x-4">
              <Search className="h-5 w-5 text-gray-900 cursor-pointer" />
              <a href="tel:+919049994500"><Phone className="h-5 w-5 text-gray-900" /></a>
              <Globe className="h-5 w-5 text-gray-900 cursor-pointer" />
              <button onClick={() => setIsMobileMenuOpen(true)} className="text-gray-900 focus:outline-none">
                <Menu className="h-6 w-6" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Full Screen Dropdown Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-white flex flex-col"
          >
            {/* Mobile Drawer Header */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <div className="flex-shrink-0">
                <img src="https://i.postimg.cc/DfbqzJ0Y/download.png" alt="NSS Logo" className="h-10 w-auto" />
              </div>
              <div className="flex items-center space-x-4">
                <Search className="h-5 w-5 text-gray-900" />
                <Globe className="h-5 w-5 text-gray-900" />
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-900 focus:outline-none">
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Mobile Drawer Links */}
            <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col space-y-6">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">
                {t.home} <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">
                {t.services} <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              
              {user && (
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">
                  {t.dashboard} <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
              )}

              <div className="flex flex-col space-y-2 pb-4 border-b border-gray-100">
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{t.selectLang}</label>
                <select 
                  value={language} 
                  onChange={handleLanguageChange}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-bold p-3 rounded-sm outline-none"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                  <option value="mr">मराठी</option>
                  <option value="te">తెలుగు</option>
                  <option value="ta">தமிழ்</option>
                  <option value="kn">ಕನ್ನಡ</option>
                  <option value="ml">മലയാളം</option>
                  <option value="gu">ગુજરાતી</option>
                  <option value="pa">ਪੰਜਾਬੀ</option>
                  <option value="bn">বাংলা</option>
                  <option value="or">ଓଡ଼ିଆ</option>
                  <option value="ur">اردو</option>
                  <option value="as">অসমীয়া</option>
                  <option value="bho">भोजपुरी</option>
                </select>
              </div>

              {user ? (
                <button onClick={handleLogout} className="flex items-center justify-between text-xl font-bold text-red-600 pb-4">
                  {t.logout} <ChevronRight className="h-5 w-5 text-red-400" />
                </button>
              ) : (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">
                  {t.login} <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
              )}
            </div>

            {/* Mobile Drawer Bottom Contact Button */}
            <div className="p-4 border-t border-gray-200">
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center bg-[#0035A0] text-white py-4 font-bold text-lg rounded-sm hover:bg-blue-800 transition">
                {t.contact}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};