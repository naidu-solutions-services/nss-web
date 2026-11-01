import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

const cookieTranslations = {
  en: { message: "We use cookies to make our website work better for you.", allow: "Allow Cookies" },
  hi: { message: "हम वेबसाइट को बेहतर बनाने के लिए कुकीज़ का उपयोग करते हैं।", allow: "कुकीज़ स्वीकार करें" },
  mr: { message: "आम्ही वेबसाइट उत्तम करण्यासाठी कुकीज वापरतो.", allow: "कुकीज स्वीकारा" },
  te: { message: "వెబ్‌సైట్‌ను మెరుగుపరచడానికి మేము కుకీలను ఉపయోగిస్తాము.", allow: "కుకీలను అనుమతించండి" },
  ta: { message: "வலைத்தளத்தை மேம்படுத்த நாங்கள் குக்கீகளைப் பயன்படுத்துகிறோம்.", allow: "குக்கீகளை அனுமதிக்கவும்" },
  kn: { message: "ವೆಬ್‌ಸೈಟ್ ಉತ್ತಮಗೊಳಿಸಲು ನಾವು ಕುಕೀಗಳನ್ನು ಬಳಸುತ್ತೇವೆ.", allow: "ಕುಕೀಗಳನ್ನು ಅನುಮತಿಸಿ" },
  ml: { message: "വെബ്സൈറ്റ് മെച്ചപ്പെടുത്താൻ ഞങ്ങൾ കുക്കികൾ ഉപയോഗിക്കുന്നു.", allow: "കുക്കികൾ അനുവദിക്കുക" },
  gu: { message: "અમે વેબસાઇટને વધુ સારી બનાવવા માટે કૂકીઝનો ઉપયોગ કરીએ છીએ.", allow: "કૂકીઝ સ્વીકારો" },
  pa: { message: "ਅਸੀਂ ਵੈੱਬਸਾਈਟ ਨੂੰ ਬਿਹਤਰ ਬਣਾਉਣ ਲਈ ਕੁਕੀਜ਼ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹਾਂ.", allow: "ਕੁਕੀਜ਼ ਸਵੀਕਾਰ ਕਰੋ" },
  bn: { message: "ওয়েবসাইট আরও ভালো করতে আমরা কুকিজ ব্যবহার করি।", allow: "কুকিজ গ্রহণ করুন" },
  or: { message: "ୱେବସାଇଟ୍ ଭଲ କରିବା ପାଇଁ ଆମେ କୁକିଜ୍ ବ୍ୟବହାର କରୁ.", allow: "କୁକିଜ୍ ଗ୍ରହଣ କରନ୍ତୁ" },
  ur: { message: "ہم ویب سائٹ کو بہتر بنانے کے لیے کوکیز کا استعمال کرتے ہیں۔", allow: "کوکیز قبول کریں" },
  as: { message: "ৱেবছাইট ভাল কৰিবলৈ আমি কুকিজ ব্যৱহাৰ কৰোঁ.", allow: "কুকিজ গ্ৰহণ কৰক" },
  bho: { message: "हमनी के वेबसाइट के बढ़िया बनावे खातिर कुकीज के इस्तेमाल करीले।", allow: "कुकीज मंजूर करीं" }
};

export const CookieBanner = () => {
  const [language, setLanguage] = useState(localStorage.getItem('nss_lang') || 'en');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('nss_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }

    const handleLangChange = (e) => setLanguage(e.detail);
    window.addEventListener('languageChanged', handleLangChange);
    return () => window.removeEventListener('languageChanged', handleLangChange);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('nss_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const t = cookieTranslations[language] || cookieTranslations['en'];

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-[#0035A0] text-white z-50 p-5 md:p-6 shadow-2xl border-t border-blue-900 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-8">
        <p className="text-base md:text-lg font-bold text-center md:text-left flex-1">
          {t.message}
        </p>
        <button 
          onClick={handleAccept} 
          className="w-full md:w-auto bg-white text-[#0035A0] font-black py-4 px-8 rounded-sm hover:bg-gray-100 transition flex items-center justify-center text-lg shrink-0"
        >
          {t.allow} <ArrowUpRight className="ml-2 h-6 w-6 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};