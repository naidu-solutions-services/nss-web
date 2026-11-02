import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Phone, Globe, Menu, X, ChevronRight, ChevronDown, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

// Simple business language translations for 13+ Indian languages
const navTranslations = {
  en: { home: "Home", aboutUs: "About Us", ourStory: "Our Story", team: "Executive Team", solutions: "Solutions", eotCranes: "EOT Cranes", roofProfile: "Roof Profile", automation: "Factory Automation", knowledge: "Knowledge Base", news: "News & Media", projects: "Projects", contact: "Contact", login: "Sign In", logout: "Sign Out", selectLang: "Select Language", close: "Close", callUs: "Call Us" },
  hi: { home: "होम", aboutUs: "हमारे बारे में", ourStory: "हमारी कहानी", team: "हमारी टीम", solutions: "सेवाएं", eotCranes: "क्रेन का काम", roofProfile: "छत मशीन", automation: "ऑटोमेशन", knowledge: "ज्ञान केंद्र", news: "समाचार", projects: "हमारे काम", contact: "संपर्क करें", login: "लॉग इन", logout: "लॉग आउट", selectLang: "भाषा चुनें", close: "बंद करें", callUs: "हमें कॉल करें" },
  mr: { home: "मुख्यपृष्ठ", aboutUs: "आमच्याबद्दल", ourStory: "आमची कहाणी", team: "आमची टीम", solutions: "सेवा", eotCranes: "क्रेन काम", roofProfile: "छत मशीन", automation: "ऑटोमेशन", knowledge: "ज्ञान केंद्र", news: "बातम्या", projects: "आमचे काम", contact: "संपर्क", login: "लॉग इन", logout: "बाहेर पडा", selectLang: "भाषा निवडा", close: "बंद करा", callUs: "आम्हाला कॉल करा" },
  te: { home: "హోమ్", aboutUs: "మా గురించి", ourStory: "మా కథ", team: "మా బృందం", solutions: "సేవలు", eotCranes: "క్రేన్ పని", roofProfile: "రూఫ్ యంత్రాలు", automation: "ఆటోమేషన్", knowledge: "జ్ఞాన కేంద్రం", news: "వార్తలు", projects: "మా పనులు", contact: "సంప్రదించండి", login: "లాగిన్", logout: "లాగ్అవుట్", selectLang: "భాషను ఎంచుకోండి", close: "మూసివేయి", callUs: "మాకు కాల్ చేయండి" },
  ta: { home: "முகப்பு", aboutUs: "எங்களைப் பற்றி", ourStory: "எங்கள் கதை", team: "எங்கள் குழு", solutions: "சேவைகள்", eotCranes: "கிரேன் வேலை", roofProfile: "கூரை இயந்திரங்கள்", automation: "ஆட்டோமேஷன்", knowledge: "அறிவு மையம்", news: "செய்திகள்", projects: "எங்கள் பணிகள்", contact: "தொடர்பு கொள்ள", login: "உள்நுழைக", logout: "வெளியேறு", selectLang: "மொழியைத் தேர்ந்தெடுக்கவும்", close: "மூடு", callUs: "எங்களை அழைக்கவும்" },
  kn: { home: "ಮುಖಪುಟ", aboutUs: "ನಮ್ಮ ಬಗ್ಗೆ", ourStory: "ನಮ್ಮ ಕಥೆ", team: "ನಮ್ಮ ತಂಡ", solutions: "ಸೇವೆಗಳು", eotCranes: "ಕ್ರೇನ್ ಕೆಲಸ", roofProfile: "ಛಾವಣಿ ಯಂತ್ರಗಳು", automation: "ಆಟೊಮೇಷನ್", knowledge: "ಜ್ಞಾನ ಕೇಂದ್ರ", news: "ಸುದ್ದಿ", projects: "ನಮ್ಮ ಕೆಲಸಗಳು", contact: "ಸಂಪರ್ಕಿಸಿ", login: "ಲಾಗಿನ್", logout: "ಲಾಗ್ ಔಟ್", selectLang: "ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ", close: "ಮುಚ್ಚಿ", callUs: "ನಮಗೆ ಕರೆ ಮಾಡಿ" },
  ml: { home: "ഹോം", aboutUs: "ഞങ്ങളെക്കുറിച്ച്", ourStory: "ഞങ്ങളുടെ കഥ", team: "ഞങ്ങളുടെ ടീം", solutions: "സേവനങ്ങൾ", eotCranes: "ക്രെയിൻ ജോലി", roofProfile: "റൂഫ് മെഷീനുകൾ", automation: "ഓട്ടോമേഷൻ", knowledge: "വിവര കേന്ദ്രം", news: "വാർത്തകൾ", projects: "ഞങ്ങളുടെ ജോലികൾ", contact: "ബന്ധപ്പെടുക", login: "ലോഗിൻ", logout: "ലോഗൗട്ട്", selectLang: "ഭാഷ തിരഞ്ഞെടുക്കുക", close: "അടയ്ക്കുക", callUs: "ഞങ്ങളെ വിളിക്കുക" },
  gu: { home: "હોમ", aboutUs: "અમારા વિશે", ourStory: "અમારી વાર્તા", team: "અમારી ટીમ", solutions: "સેવાઓ", eotCranes: "ક્રેનનું કામ", roofProfile: "છતની મશીનો", automation: "ઓટોમેશન", knowledge: "જ્ઞાન કેન્દ્ર", news: "સમાચાર", projects: "અમારા કામ", contact: "સંપર્ક કરો", login: "લૉગ ઇન", logout: "લૉગ આઉટ", selectLang: "ભાષા પસંદ કરો", close: "બંધ કરો", callUs: "અમને કૉલ કરો" },
  pa: { home: "ਹੋਮ", aboutUs: "ਸਾਡੇ ਬਾਰੇ", ourStory: "ਸਾਡੀ ਕਹਾਣੀ", team: "ਸਾਡੀ ਟੀਮ", solutions: "ਸੇਵਾਵਾਂ", eotCranes: "ਕਰੇਨ ਦਾ ਕੰਮ", roofProfile: "ਛੱਤ ਦੀਆਂ ਮਸ਼ੀਨਾਂ", automation: "ਆਟੋਮੇਸ਼ਨ", knowledge: "ਗਿਆਨ ਕੇਂਦਰ", news: "ਖ਼ਬਰਾਂ", projects: "ਸਾਡੇ ਕੰਮ", contact: "ਸੰਪਰਕ ਕਰੋ", login: "ਲਾਗਇਨ", logout: "ਲਾਗ ਆਉਟ", selectLang: "ਭਾਸ਼ਾ ਚੁਣੋ", close: "ਬੰਦ ਕਰੋ", callUs: "ਸਾਨੂੰ ਕਾਲ ਕਰੋ" },
  bn: { home: "হোম", aboutUs: "আমাদের সম্পর্কে", ourStory: "আমাদের গল্প", team: "আমাদের দল", solutions: "পরিষেবা", eotCranes: "ক্রেনের কাজ", roofProfile: "ছাদের মেশিন", automation: "অটোমেশন", knowledge: "জ্ঞান কেন্দ্র", news: "খবর", projects: "আমাদের কাজ", contact: "যোগাযোগ করুন", login: "লগ ইন", logout: "লগ আউট", selectLang: "ভাষা নির্বাচন করুন", close: "বন্ধ করুন", callUs: "আমাদের কল করুন" },
  or: { home: "ହୋମ୍", aboutUs: "ଆମ ବିଷୟରେ", ourStory: "ଆମର କାହାଣୀ", team: "ଆମର ଟିମ୍", solutions: "ସେବା", eotCranes: "କ୍ରେନ୍ କାମ", roofProfile: "ଛାତ ମେସିନ୍", automation: "ଅଟୋମେସନ୍", knowledge: "ଜ୍ଞାନ କେନ୍ଦ୍ର", news: "ଖବର", projects: "ଆମର କାମ", contact: "ଯୋଗାଯୋଗ କରନ୍ତୁ", login: "ଲଗଇନ୍", logout: "ଲଗଆଉଟ୍", selectLang: "ଭାଷା ବାଛନ୍ତୁ", close: "ବନ୍ଦ କରନ୍ତୁ", callUs: "ଆମକୁ କଲ୍ କରନ୍ତୁ" },
  ur: { home: "ہوم", aboutUs: "ہمارے بارے میں", ourStory: "ہماری کہانی", team: "ہماری ٹیم", solutions: "خدمات", eotCranes: "کرین کا کام", roofProfile: "چھت کی مشینیں", automation: "آٹومیشن", knowledge: "معلوماتی مرکز", news: "خبریں", projects: "ہمارے کام", contact: "رابطہ کریں", login: "لاگ ان", logout: "لاگ آؤٹ", selectLang: "زبان منتخب کریں", close: "بند کریں", callUs: "ہمیں کال کریں" },
  as: { home: "হোম", aboutUs: "আমাৰ বিষয়ে", ourStory: "আমাৰ কাহিনী", team: "আমাৰ দল", solutions: "সেৱাসমূহ", eotCranes: "ক্ৰেনৰ কাম", roofProfile: "ছাদৰ মেচিন", automation: "অটোমেচন", knowledge: "জ্ঞান কেন্দ্ৰ", news: "খবৰ", projects: "আমাৰ কাম", contact: "যোগাযোগ কৰক", login: "লগ ইন", logout: "লগ আউট", selectLang: "ভাষা বাছক", close: "বন্ধ কৰক", callUs: "আমালৈ কল কৰক" },
  bho: { home: "होम", aboutUs: "हमनी के बारे में", ourStory: "हमनी के कहानी", team: "हमनी के टीम", solutions: "सेवा", eotCranes: "क्रेन के काम", roofProfile: "छत के मशीन", automation: "ऑटोमेशन", knowledge: "ज्ञान केंद्र", news: "खबर", projects: "हमनी के काम", contact: "संपर्क करीं", login: "लॉग इन", logout: "लॉग आउट", selectLang: "भाषा चुनीं", close: "बंद करीं", callUs: "हमनी के कॉल करीं" }
};

const languagesList = [
  { code: 'en', label: 'English' }, { code: 'hi', label: 'हिंदी' },
  { code: 'mr', label: 'मराठी' }, { code: 'te', label: 'తెలుగు' },
  { code: 'ta', label: 'தமிழ்' }, { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'മലയാളം' }, { code: 'gu', label: 'ગુજરાતી' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' }, { code: 'bn', label: 'বাংলা' },
  { code: 'or', label: 'ଓଡ଼ିଆ' }, { code: 'ur', label: 'اردو' },
  { code: 'as', label: 'অসমীয়া' }, { code: 'bho', label: 'भोजपुरी' }
];

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [language, setLanguage] = useState(localStorage.getItem('nss_lang') || 'en');

  // UI Modal States
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [isGlobeOpen, setIsGlobeOpen] = useState(false);

  const handleLanguageSelect = (code) => {
    setLanguage(code);
    localStorage.setItem('nss_lang', code);
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: code }));
    setIsGlobeOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const toggleMobileExpand = (menu) => {
    if (mobileExpanded === menu) {
      setMobileExpanded(null);
    } else {
      setMobileExpanded(menu);
    }
  };

  const handleSearchNavigation = () => {
    setIsMobileMenuOpen(false);
    navigate('/search');
  };

  const t = navTranslations[language] || navTranslations['en'];

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 w-full shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left: NSS Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <img src="https://i.postimg.cc/DfbqzJ0Y/download.png" alt="NSS Logo" className="h-12 w-auto" />
              </Link>
            </div>

            {/* Center: Desktop Links with Dropdowns */}
            <nav className="hidden md:flex space-x-6 lg:space-x-8 items-center justify-center flex-1">
              
              <Link to="/" className="text-gray-900 font-semibold hover:text-[#0035A0] transition">{t.home}</Link>

              {/* About Us Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('about')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center text-gray-900 font-semibold hover:text-[#0035A0] transition h-20">
                  {t.aboutUs} 
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'about' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 top-20 w-48 bg-white border border-gray-200 shadow-lg py-2 z-50"
                    >
                      <Link to="/about" className="block px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:text-[#0035A0]">{t.ourStory}</Link>
                      <Link to="/about" className="block px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:text-[#0035A0]">{t.team}</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Solutions Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('solutions')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center text-gray-900 font-semibold hover:text-[#0035A0] transition h-20">
                  {t.solutions} 
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'solutions' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 top-20 w-56 bg-white border border-gray-200 shadow-lg py-2 z-50"
                    >
                      <Link to="/eot-cranes" className="block px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:text-[#0035A0]">{t.eotCranes}</Link>
                      <Link to="/roof-profile" className="block px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:text-[#0035A0]">{t.roofProfile}</Link>
                      <Link to="/automation" className="block px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:text-[#0035A0]">{t.automation}</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/knowledge" className="text-gray-900 font-semibold hover:text-[#0035A0] transition">{t.knowledge}</Link>
              <Link to="/projects" className="text-gray-900 font-semibold hover:text-[#0035A0] transition">{t.projects}</Link>

            </nav>

            {/* Right: Desktop Icons & Contact Button */}
            <div className="hidden md:flex items-center space-x-6">
              <button onClick={handleSearchNavigation} className="focus:outline-none">
                <Search className="h-5 w-5 text-gray-700 hover:text-[#0035A0] transition" />
              </button>
              
              <button onClick={() => setIsGlobeOpen(true)} className="flex items-center text-gray-700 group focus:outline-none">
                <Globe className="h-5 w-5 mr-1 group-hover:text-[#0035A0] transition" />
                <span className="text-sm font-semibold uppercase group-hover:text-[#0035A0] transition">{language}</span>
              </button>

              <Link to="/contact" className="bg-[#0035A0] text-white px-6 py-2.5 font-bold rounded-sm hover:bg-blue-800 transition">
                {t.contact}
              </Link>
            </div>

            {/* Mobile: Right Aligned Icon Cluster */}
            <div className="flex md:hidden items-center space-x-5">
              <button onClick={handleSearchNavigation} className="focus:outline-none"><Search className="h-6 w-6 text-gray-900" /></button>
              <button onClick={() => setIsPhoneOpen(true)} className="focus:outline-none"><Phone className="h-6 w-6 text-gray-900" /></button>
              <button onClick={() => setIsGlobeOpen(true)} className="focus:outline-none"><Globe className="h-6 w-6 text-gray-900" /></button>
              <button onClick={() => setIsMobileMenuOpen(true)} className="text-gray-900 focus:outline-none">
                <Menu className="h-7 w-7" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* --- OVERLAYS AND MODALS --- */}

      {/* 1. Contact Phone Modal */}
      <AnimatePresence>
        {isPhoneOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white w-full max-w-lg shadow-xl"
            >
              <div className="bg-[#0035A0] text-white p-4 md:p-6 flex justify-between items-center">
                <h3 className="text-2xl font-black flex items-center"><PhoneCall className="mr-3 h-6 w-6" /> {t.callUs}</h3>
                <button onClick={() => setIsPhoneOpen(false)} className="text-white hover:text-gray-200"><X className="h-6 w-6" /></button>
              </div>
              <div className="p-4 md:p-6 flex flex-col space-y-4">
                
                <a href="tel:+919049994500" className="flex flex-col p-4 bg-gray-50 border border-gray-200 hover:border-[#0035A0] transition group">
                  <span className="text-sm font-bold text-gray-500 mb-1">Founder & Chairman</span>
                  <span className="text-lg font-black text-gray-900 mb-2">Chandrashekhar Laxmanaidu Ammisetty</span>
                  <span className="text-[#0035A0] font-bold text-xl group-hover:underline">+91 90499 94500</span>
                </a>
                
                <a href="tel:+918329004424" className="flex flex-col p-4 bg-gray-50 border border-gray-200 hover:border-[#0035A0] transition group">
                  <span className="text-sm font-bold text-gray-500 mb-1">CTO & Lead Developer</span>
                  <span className="text-lg font-black text-gray-900 mb-2">Arun Chandrashekhar Ammisetty</span>
                  <span className="text-[#0035A0] font-bold text-xl group-hover:underline">+91 83290 04424</span>
                </a>

                <a href="tel:+919049994500" className="flex flex-col p-4 bg-gray-50 border border-gray-200 hover:border-[#0035A0] transition group">
                  <span className="text-sm font-bold text-gray-500 mb-1">Co-Founder & Director</span>
                  <span className="text-lg font-black text-gray-900 mb-2">Akshit Chandrashekhar Ammisetty</span>
                  <span className="text-[#0035A0] font-bold text-xl group-hover:underline">+91 90499 94500</span>
                </a>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Globe Language Modal */}
      <AnimatePresence>
        {isGlobeOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white w-full max-w-3xl shadow-xl flex flex-col max-h-[90vh]"
            >
              <div className="border-b border-gray-200 p-4 md:p-6 flex justify-between items-center">
                <h3 className="text-2xl font-black text-gray-900 flex items-center"><Globe className="mr-3 h-6 w-6 text-[#0035A0]" /> {t.selectLang}</h3>
                <button onClick={() => setIsGlobeOpen(false)} className="text-gray-900 hover:bg-gray-100 p-2 rounded-sm"><X className="h-6 w-6" /></button>
              </div>
              <div className="p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 overflow-y-auto">
                {languagesList.map((lang) => (
                  <button 
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`p-4 border font-bold transition text-center ${language === lang.code ? 'border-[#0035A0] bg-[#0035A0] text-white' : 'border-gray-200 bg-gray-50 text-gray-900 hover:border-[#0035A0] hover:text-[#0035A0]'}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Mobile Full Screen Dropdown Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white flex flex-col"
          >
            {/* Mobile Drawer Header */}
            <div className="flex items-center justify-between h-20 px-4 border-b border-gray-200">
              <div className="flex-shrink-0">
                <img src="https://i.postimg.cc/DfbqzJ0Y/download.png" alt="NSS Logo" className="h-10 w-auto" />
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-900 focus:outline-none bg-gray-100 p-2 rounded-sm">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile Drawer Links with Accordions */}
            <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col space-y-2">
              
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between py-4 text-xl font-bold text-gray-900 border-b border-gray-100">
                {t.home} <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>

              {/* About Accordion */}
              <div>
                <button onClick={() => toggleMobileExpand('about')} className="flex items-center justify-between w-full py-4 text-xl font-bold text-gray-900 border-b border-gray-100">
                  {t.aboutUs} <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${mobileExpanded === 'about' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileExpanded === 'about' && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-gray-50 px-4">
                      <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 font-semibold text-gray-700">{t.ourStory}</Link>
                      <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 font-semibold text-gray-700">{t.team}</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Solutions Accordion */}
              <div>
                <button onClick={() => toggleMobileExpand('solutions')} className="flex items-center justify-between w-full py-4 text-xl font-bold text-gray-900 border-b border-gray-100">
                  {t.solutions} <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${mobileExpanded === 'solutions' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileExpanded === 'solutions' && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-gray-50 px-4">
                      <Link to="/eot-cranes" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 font-semibold text-gray-700">{t.eotCranes}</Link>
                      <Link to="/roof-profile" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 font-semibold text-gray-700">{t.roofProfile}</Link>
                      <Link to="/automation" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 font-semibold text-gray-700">{t.automation}</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/knowledge" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between py-4 text-xl font-bold text-gray-900 border-b border-gray-100">
                {t.knowledge} <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              
              <Link to="/projects" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between py-4 text-xl font-bold text-gray-900 border-b border-gray-100">
                {t.projects} <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>

              <div className="py-6">
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); setIsGlobeOpen(true); }}
                  className="w-full bg-[#0035A0] text-white font-bold p-4 rounded-sm outline-none flex items-center justify-center transition"
                >
                  <Globe className="h-5 w-5 mr-2" /> {t.selectLang}
                </button>
              </div>

            </div>

            {/* Mobile Drawer Bottom Contact Button */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
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