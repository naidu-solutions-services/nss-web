import React, { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronUp, MapPin, Globe, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const switcherTranslations = {
  en: { title: "Select Language", office: "Our Office Location", state: "Maharashtra", address: "121 Kissan Nagar, 1st Floor, CIDCO, Nanded, Maharashtra 431603", global: "Global website", close: "Close" },
  hi: { title: "भाषा चुनें", office: "हमारा ऑफिस", state: "महाराष्ट्र", address: "121 किसान नगर, पहली मंजिल, सिडको, नांदेड़, महाराष्ट्र 431603", global: "ग्लोबल वेबसाइट", close: "बंद करें" },
  mr: { title: "भाषा निवडा", office: "आमचे कार्यालय", state: "महाराष्ट्र", address: "121 किसान नगर, पहिला मजला, सिडको, नांदेड, महाराष्ट्र 431603", global: "ग्लोबल वेबसाइट", close: "बंद करा" },
  te: { title: "భాషను ఎంచుకోండి", office: "మా కార్యాలయం", state: "మహారాష్ట్ర", address: "121 కిసాన్ నగర్, 1వ అంతస్తు, సిడ్కో, నాందేడ్, మహారాష్ట్ర 431603", global: "గ్లోబల్ వెబ్‌సైట్", close: "మూసివేయండి" },
  ta: { title: "மொழியைத் தேர்ந்தெடுக்கவும்", office: "எங்கள் அலுவலகம்", state: "மகாராஷ்டிரா", address: "121 கிசான் நகர், 1வது தளம், சிட்கோ, நாந்தேட், மகாராஷ்டிரா 431603", global: "உலகளாவிய வலைத்தளம்", close: "மூடு" },
  kn: { title: "ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ", office: "ನಮ್ಮ ಕಚೇರಿ", state: "ಮಹಾರಾಷ್ಟ್ರ", address: "121 ಕಿಸಾನ್ ನಗರ, 1 ನೇ ಮಹಡಿ, ಸಿಡ್ಕೋ, ನಾಂದೇಡ್, ಮಹಾರಾಷ್ಟ್ರ 431603", global: "ಜಾಗತಿಕ ವೆಬ್‌ಸೈಟ್", close: "ಮುಚ್ಚಿ" },
  ml: { title: "ഭാഷ തിരഞ്ഞെടുക്കുക", office: "ഞങ്ങളുടെ ഓഫീസ്", state: "മഹാരാഷ്ട്ര", address: "121 കിസാൻ നഗർ, ഒന്നാം നില, സിഡ്‌കോ, നന്ദേഡ്, മഹാരാഷ്ട്ര 431603", global: "ആഗോള വെബ്സൈറ്റ്", close: "അടയ്ക്കുക" },
  gu: { title: "ભાષા પસંદ કરો", office: "અમારી ઓફિસ", state: "મહારાષ્ટ્ર", address: "121 કિસાન નગર, પહેલો માળ, સિડકો, નાંદેડ, મહારાષ્ટ્ર 431603", global: "વૈશ્વિક વેબસાઇટ", close: "બંધ કરો" },
  pa: { title: "ਭਾਸ਼ਾ ਚੁਣੋ", office: "ਸਾਡਾ ਦਫ਼ਤਰ", state: "ਮਹਾਰਾਸ਼ਟਰ", address: "121 ਕਿਸਾਨ ਨਗਰ, ਪਹਿਲੀ ਮੰਜ਼ਿਲ, ਸਿਡਕੋ, ਨਾਂਦੇੜ, ਮਹਾਰਾਸ਼ਟਰ 431603", global: "ਗਲੋਬਲ ਵੈੱਬਸਾਈਟ", close: "ਬੰਦ ਕਰੋ" },
  bn: { title: "ভাষা নির্বাচন করুন", office: "আমাদের অফিস", state: "মহারাষ্ট্র", address: "১২১ কিসান নগর, ১ম তলা, সিডকো, নান্দেড, মহারাষ্ট্র ৪৩১৬০৩", global: "গ্লোবাল ওয়েবসাইট", close: "বন্ধ করুন" },
  or: { title: "ଭାଷା ବାଛନ୍ତୁ", office: "ଆମର ଅଫିସ୍", state: "ମହାରାଷ୍ଟ୍ର", address: "121 କିସାନ୍ ନଗର, ପ୍ରଥମ ମହଲା, ସିଡକୋ, ନାନ୍ଦେଡ୍, ମହାରାଷ୍ଟ୍ର 431603", global: "ଗ୍ଲୋବାଲ୍ ୱେବସାଇଟ୍", close: "ବନ୍ଦ କରନ୍ତୁ" },
  ur: { title: "زبان منتخب کریں", office: "ہمارا دفتر", state: "مہاراشٹر", address: "121 کسان نگر، پہلی منزل، سڈکو، ناندیڑ، مہاراشٹر 431603", global: "عالمی ویب سائٹ", close: "بند کریں" },
  as: { title: "ভাষা বাছক", office: "আমাৰ অফিচ", state: "মহাৰাষ্ট্ৰ", address: "১২১ কিষাণ নগৰ, ১ম মহলা, চিডকো, নান্দেড়, মহাৰাষ্ট্ৰ ৪৩১৬০৩", global: "গ্ল'বেল ৱেবছাইট", close: "বন্ধ কৰক" },
  bho: { title: "भाषा चुनीं", office: "हमनी के ऑफिस", state: "महाराष्ट्र", address: "121 किसान नगर, पहिला मंजिल, सिडको, नांदेड़, महाराष्ट्र 431603", global: "ग्लोबल वेबसाइट", close: "बंद करीं" }
};

const availableLanguages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी (Hindi)' },
  { code: 'mr', label: 'मराठी (Marathi)' },
  { code: 'te', label: 'తెలుగు (Telugu)' },
  { code: 'ta', label: 'தமிழ் (Tamil)' },
  { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
  { code: 'ml', label: 'മലയാളം (Malayalam)' },
  { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'bn', label: 'বাংলা (Bengali)' },
  { code: 'or', label: 'ଓଡ଼ିଆ (Odia)' },
  { code: 'ur', label: 'اردو (Urdu)' },
  { code: 'as', label: 'অসমীয়া (Assamese)' },
  { code: 'bho', label: 'भोजपुरी (Bhojpuri)' }
];

export const LanguageSwitcher = ({ isOpen, onClose }) => {
  const [language, setLanguage] = useState(localStorage.getItem('nss_lang') || 'en');
  const [isOfficeExpanded, setIsOfficeExpanded] = useState(false);
  const [isStateExpanded, setIsStateExpanded] = useState(false);

  useEffect(() => {
    const handleLangChange = (e) => setLanguage(e.detail);
    window.addEventListener('languageChanged', handleLangChange);
    return () => window.removeEventListener('languageChanged', handleLangChange);
  }, []);

  const handleLanguageSelect = (langCode) => {
    setLanguage(langCode);
    localStorage.setItem('nss_lang', langCode);
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: langCode }));
    onClose();
  };

  const handleGlobalClick = () => {
    window.open('https://nssind.web.app', '_blank');
  };

  const t = switcherTranslations[language] || switcherTranslations['en'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed inset-0 z-50 bg-white flex flex-col font-sans text-gray-900 w-full h-full sm:w-96 sm:left-auto sm:right-0 shadow-2xl border-l border-gray-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center">
              <Globe className="mr-3 h-6 w-6 text-[#0035A0]" /> {t.title}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 transition rounded-sm focus:outline-none" aria-label={t.close}>
              <X className="h-7 w-7 text-gray-900" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto">
            
            {/* Expandable Office Location Section */}
            <div className="border-b border-gray-200">
              <button 
                onClick={() => setIsOfficeExpanded(!isOfficeExpanded)}
                className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition"
              >
                <span className="font-bold text-lg">India - {t.office}</span>
                {isOfficeExpanded ? <ChevronUp className="h-6 w-6 text-gray-500" /> : <ChevronDown className="h-6 w-6 text-gray-500" />}
              </button>
              
              <AnimatePresence>
                {isOfficeExpanded && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-gray-50 border-t border-gray-100"
                  >
                    <button 
                      onClick={() => setIsStateExpanded(!isStateExpanded)}
                      className="w-full flex items-center justify-between px-8 py-4 hover:bg-gray-100 transition border-b border-gray-200"
                    >
                      <span className="font-bold text-gray-800">{t.state}</span>
                      {isStateExpanded ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
                    </button>

                    <AnimatePresence>
                      {isStateExpanded && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-8 py-6 bg-white flex flex-col space-y-4"
                        >
                          <div className="flex items-start">
                            <MapPin className="h-6 w-6 text-[#0035A0] shrink-0 mr-3 mt-1" />
                            <p className="text-gray-700 font-semibold leading-relaxed">
                              {t.address}
                            </p>
                          </div>
                          
                          <a 
                            href="https://maps.app.goo.gl/7W6EcsgG1PJVtKgg6?g_st=ac" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-[#0035A0] hover:underline font-bold"
                          >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                            View on Google Maps
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language Selection List */}
            <div className="p-6">
              <div className="grid grid-cols-1 gap-2">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`text-left px-4 py-4 rounded-sm font-bold transition flex justify-between items-center ${
                      language === lang.code 
                        ? 'bg-[#0035A0] text-white' 
                        : 'bg-white text-gray-900 border border-gray-200 hover:border-[#0035A0]'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Sticky Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <button 
              onClick={handleGlobalClick}
              className="w-full bg-[#0035A0] text-white font-black py-4 hover:bg-blue-900 transition flex items-center justify-center text-lg"
            >
              {t.global} <ArrowUpRight className="ml-2 h-6 w-6 stroke-[3]" />
            </button>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};