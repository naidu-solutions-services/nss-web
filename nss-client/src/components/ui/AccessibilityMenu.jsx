import React, { useState, useEffect } from 'react';
import { Accessibility, Moon, Sun, Type, Link as LinkIcon, RotateCcw, X, Contrast } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const accessTranslations = {
  en: { title: "Accessibility Menu", dark: "Dark Mode", contrast: "High Contrast", bigText: "Large Text", font: "Readable Font", links: "Highlight Links", reset: "Reset All", close: "Close Menu" },
  hi: { title: "पहुंच मेनू", dark: "डार्क मोड", contrast: "हाई कंट्रास्ट", bigText: "बड़ा टेक्स्ट", font: "सरल फ़ॉन्ट", links: "लिंक दिखाएं", reset: "सब रीसेट करें", close: "मेनू बंद करें" },
  mr: { title: "प्रवेशयोग्यता मेनू", dark: "डार्क मोड", contrast: "हाय कंट्रास्ट", bigText: "मोठा मजकूर", font: "वाचनीय फॉन्ट", links: "लिंक हायलाइट करा", reset: "सर्व रीसेट करा", close: "मेनू बंद करा" },
  te: { title: "యాక్సెసిబిలిటీ మెను", dark: "డార్క్ మోడ్", contrast: "హై కాంట్రాస్ట్", bigText: "పెద్ద టెక్స్ట్", font: "సులభమైన ఫాంట్", links: "లింక్‌లను చూపించు", reset: "అన్నీ రీసెట్ చేయండి", close: "మెను మూసివేయి" },
  ta: { title: "அணுகல்தன்மை மெனு", dark: "டார்க் மோட்", contrast: "அதிக மாறுபாடு", bigText: "பெரிய உரை", font: "எளிய எழுத்துரு", links: "இணைப்புகளை காட்டு", reset: "அனைத்தையும் மீட்டமை", close: "மெனுவை மூடு" },
  kn: { title: "ಪ್ರವೇಶಿಸುವಿಕೆ ಮೆನು", dark: "ಡಾರ್ಕ್ ಮೋಡ್", contrast: "ಹೈ ಕಾಂಟ್ರಾಸ್ಟ್", bigText: "ದೊಡ್ಡ ಪಠ್ಯ", font: "ಓದಬಲ್ಲ ಫಾಂಟ್", links: "ಲಿಂಕ್‌ಗಳನ್ನು ಹೈಲೈಟ್ ಮಾಡಿ", reset: "ಎಲ್ಲವನ್ನೂ ಮರುಹೊಂದಿಸಿ", close: "ಮೆನು ಮುಚ್ಚಿ" },
  ml: { title: "പ്രവേശനക്ഷമത മെനു", dark: "ഡാർക്ക് മോഡ്", contrast: "ഹൈ കോൺട്രാസ്റ്റ്", bigText: "വലിയ വാചകം", font: "വായിക്കാവുന്ന ഫോണ്ട്", links: "ലിങ്കുകൾ കാണിക്കുക", reset: "എല്ലാം പുനഃസജ്ജമാക്കുക", close: "മെനു അടയ്ക്കുക" },
  gu: { title: "સુલભતા મેનુ", dark: "ડાર્ક મોડ", contrast: "હાઇ કોન્ટ્રાસ્ટ", bigText: "મોટું લખાણ", font: "સરળ ફોન્ટ", links: "લિંક્સ બતાવો", reset: "બધું રીસેટ કરો", close: "મેનુ બંધ કરો" },
  pa: { title: "ਪਹੁੰਚਯੋਗਤਾ ਮੀਨੂ", dark: "ਡਾਰਕ ਮੋਡ", contrast: "ਹਾਈ ਕੰਟਰਾਸਟ", bigText: "ਵੱਡਾ ਟੈਕਸਟ", font: "ਪੜ੍ਹਨਯੋਗ ਫੌਂਟ", links: "ਲਿੰਕ ਦਿਖਾਓ", reset: "ਸਭ ਰੀਸੈਟ ਕਰੋ", close: "ਮੀਨੂ ਬੰਦ ਕਰੋ" },
  bn: { title: "অ্যাক্সেসিবিলিটি মেনু", dark: "ডার্ক মোড", contrast: "হাই কন্ট্রাস্ট", bigText: "বড় টেক্সট", font: "পঠনযোগ্য ফন্ট", links: "লিঙ্ক দেখান", reset: "সব রিসেট করুন", close: "মেনু বন্ধ করুন" },
  or: { title: "ଆକ୍ସେସିବିଲିଟି ମେନୁ", dark: "ଡାର୍କ ମୋଡ୍", contrast: "ହାଇ କଣ୍ଟ୍ରାଷ୍ଟ", bigText: "ବଡ଼ ଟେକ୍ସଟ୍", font: "ସହଜ ଫଣ୍ଟ", links: "ଲିଙ୍କ୍ ଦେଖାନ୍ତୁ", reset: "ସବୁ ରିସେଟ୍ କରନ୍ତୁ", close: "ମେନୁ ବନ୍ଦ କରନ୍ତୁ" },
  ur: { title: "رسائی مینو", dark: "ڈارک موڈ", contrast: "ہائی کنٹراسٹ", bigText: "بڑا متن", font: "پڑھنے کے قابل فونٹ", links: "لنکس دکھائیں", reset: "سب ری سیٹ کریں", close: "مینو بند کریں" },
  as: { title: "এক্সেচিবিলিটি মেনু", dark: "ডাৰ্ক মোড", contrast: "হাই কন্ট্ৰাষ্ট", bigText: "ডাঙৰ টেক্সট", font: "সহজ ফন্ট", links: "লিংক দেখুৱাওক", reset: "সকলো ৰিছেট কৰক", close: "মেনু বন্ধ কৰক" },
  bho: { title: "एक्सेसिबिलिटी मेनू", dark: "डार्क मोड", contrast: "हाई कंट्रास्ट", bigText: "बड़हन टेक्स्ट", font: "पढ़े लायक फॉन्ट", links: "लिंक देखाईं", reset: "सब रीसेट करीं", close: "मेनू बंद करीं" }
};

export const AccessibilityMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem('nss_lang') || 'en');
  
  // States for 5 distinct accessibility features
  const [settings, setSettings] = useState({
    dark: localStorage.getItem('nss_access_dark') === 'true',
    contrast: localStorage.getItem('nss_access_contrast') === 'true',
    largeText: localStorage.getItem('nss_access_largeText') === 'true',
    font: localStorage.getItem('nss_access_font') === 'true',
    links: localStorage.getItem('nss_access_links') === 'true'
  });

  // Handle Language changes across the app
  useEffect(() => {
    const handleLangChange = (e) => setLanguage(e.detail);
    window.addEventListener('languageChanged', handleLangChange);
    return () => window.removeEventListener('languageChanged', handleLangChange);
  }, []);

  // Apply DOM modifications globally based on active settings
  useEffect(() => {
    const htmlNode = document.documentElement;

    // Feature 1: Dark Mode
    if (settings.dark) {
      htmlNode.classList.add('dark');
    } else {
      htmlNode.classList.remove('dark');
    }
    localStorage.setItem('nss_access_dark', settings.dark);

    // Feature 2: High Contrast
    if (settings.contrast) {
      htmlNode.classList.add('access-high-contrast');
    } else {
      htmlNode.classList.remove('access-high-contrast');
    }
    localStorage.setItem('nss_access_contrast', settings.contrast);

    // Feature 3: Large Text
    if (settings.largeText) {
      htmlNode.classList.add('access-large-text');
    } else {
      htmlNode.classList.remove('access-large-text');
    }
    localStorage.setItem('nss_access_largeText', settings.largeText);

    // Feature 4: Readable / Dyslexia Font
    if (settings.font) {
      htmlNode.classList.add('access-readable-font');
    } else {
      htmlNode.classList.remove('access-readable-font');
    }
    localStorage.setItem('nss_access_font', settings.font);

    // Feature 5: Highlight Links
    if (settings.links) {
      htmlNode.classList.add('access-highlight-links');
    } else {
      htmlNode.classList.remove('access-highlight-links');
    }
    localStorage.setItem('nss_access_links', settings.links);

  }, [settings]);

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const resetSettings = () => {
    setSettings({
      dark: false,
      contrast: false,
      largeText: false,
      font: false,
      links: false
    });
  };

  const t = accessTranslations[language] || accessTranslations['en'];

  return (
    <div className="fixed bottom-28 right-6 z-[70] font-sans flex flex-col items-end">
      
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#0035A0] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-800 transition focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label={t.title}
      >
        <Accessibility className="w-7 h-7" />
      </button>

      {/* Slide-out Menu - Expanding from Right */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            className="absolute bottom-16 right-0 w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-sm overflow-hidden flex flex-col"
          >
            <div className="bg-[#0035A0] text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">{t.title}</h3>
              <button onClick={() => setIsOpen(false)} aria-label={t.close} className="text-white hover:text-gray-200 focus:outline-none">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 flex flex-col space-y-3 max-h-[60vh] overflow-y-auto">
              
              {/* Feature 1: Dark Mode Toggle */}
              <button 
                onClick={() => toggleSetting('dark')}
                className={`flex items-center w-full p-3 border font-semibold transition ${settings.dark ? 'bg-[#0035A0] text-white border-[#0035A0]' : 'bg-gray-50 text-gray-900 border-gray-200 hover:border-[#0035A0] dark:bg-gray-800 dark:text-white dark:border-gray-600'}`}
              >
                {settings.dark ? <Sun className="w-5 h-5 mr-3" /> : <Moon className="w-5 h-5 mr-3" />}
                {t.dark}
              </button>

              {/* Feature 2: High Contrast Toggle */}
              <button 
                onClick={() => toggleSetting('contrast')}
                className={`flex items-center w-full p-3 border font-semibold transition ${settings.contrast ? 'bg-[#0035A0] text-white border-[#0035A0]' : 'bg-gray-50 text-gray-900 border-gray-200 hover:border-[#0035A0] dark:bg-gray-800 dark:text-white dark:border-gray-600'}`}
              >
                <Contrast className="w-5 h-5 mr-3" />
                {t.contrast}
              </button>

              {/* Feature 3: Large Text Toggle */}
              <button 
                onClick={() => toggleSetting('largeText')}
                className={`flex items-center w-full p-3 border font-semibold transition ${settings.largeText ? 'bg-[#0035A0] text-white border-[#0035A0]' : 'bg-gray-50 text-gray-900 border-gray-200 hover:border-[#0035A0] dark:bg-gray-800 dark:text-white dark:border-gray-600'}`}
              >
                <Type className="w-5 h-5 mr-3" />
                {t.bigText}
              </button>

              {/* Feature 4: Readable Font Toggle */}
              <button 
                onClick={() => toggleSetting('font')}
                className={`flex items-center w-full p-3 border font-semibold transition ${settings.font ? 'bg-[#0035A0] text-white border-[#0035A0]' : 'bg-gray-50 text-gray-900 border-gray-200 hover:border-[#0035A0] dark:bg-gray-800 dark:text-white dark:border-gray-600'}`}
              >
                <Type className="w-5 h-5 mr-3" />
                {t.font}
              </button>

              {/* Feature 5: Highlight Links Toggle */}
              <button 
                onClick={() => toggleSetting('links')}
                className={`flex items-center w-full p-3 border font-semibold transition ${settings.links ? 'bg-[#0035A0] text-white border-[#0035A0]' : 'bg-gray-50 text-gray-900 border-gray-200 hover:border-[#0035A0] dark:bg-gray-800 dark:text-white dark:border-gray-600'}`}
              >
                <LinkIcon className="w-5 h-5 mr-3" />
                {t.links}
              </button>

            </div>

            {/* Feature 6: Reset Settings */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <button 
                onClick={resetSettings}
                className="flex items-center justify-center w-full p-3 bg-red-600 text-white font-bold hover:bg-red-700 transition"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                {t.reset}
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};