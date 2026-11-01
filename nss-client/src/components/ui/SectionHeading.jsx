import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const headingTranslations = {
  en: { services: "Our Work", contact: "Talk to Us", projects: "Our Projects", about: "About Us", default: "Section" },
  hi: { services: "हमारा काम", contact: "हमसे बात करें", projects: "हमारे प्रोजेक्ट", about: "हमारे बारे में", default: "भाग" },
  mr: { services: "आमचे काम", contact: "आमच्याशी बोला", projects: "आमचे प्रकल्प", about: "आमच्याबद्दल", default: "विभाग" },
  te: { services: "మా పని", contact: "మాతో మాట్లాడండి", projects: "మా ప్రాజెక్టులు", about: "మా గురించి", default: "విభాగం" },
  ta: { services: "எங்கள் வேலை", contact: "எங்களிடம் பேசுங்கள்", projects: "எங்கள் திட்டங்கள்", about: "எங்களை பற்றி", default: "பகுதி" },
  kn: { services: "ನಮ್ಮ ಕೆಲಸ", contact: "ನಮ್ಮೊಂದಿಗೆ ಮಾತನಾಡಿ", projects: "ನಮ್ಮ ಯೋಜನೆಗಳು", about: "ನಮ್ಮ ಬಗ್ಗೆ", default: "ವಿಭಾಗ" },
  ml: { services: "ഞങ്ങളുടെ ജോലി", contact: "ഞങ്ങളോട് സംസാരിക്കുക", projects: "ഞങ്ങളുടെ പ്രോജക്റ്റുകൾ", about: "ഞങ്ങളെക്കുറിച്ച്", default: "വിഭാഗം" },
  gu: { services: "અમારું કામ", contact: "અમારી સાથે વાત કરો", projects: "અમારા પ્રોજેક્ટ્સ", about: "અમારા વિશે", default: "વિભાગ" },
  pa: { services: "ਸਾਡਾ ਕੰਮ", contact: "ਸਾਡੇ ਨਾਲ ਗੱਲ ਕਰੋ", projects: "ਸਾਡੇ ਪ੍ਰੋਜੈਕਟ", about: "ਸਾਡੇ ਬਾਰੇ", default: "ਭਾਗ" },
  bn: { services: "আমাদের কাজ", contact: "আমাদের সাথে কথা বলুন", projects: "আমাদের প্রকল্প", about: "আমাদের সম্পর্কে", default: "বিভাগ" },
  or: { services: "ଆମର କାମ", contact: "ଆମ ସହ କଥା ହୁଅନ୍ତୁ", projects: "ଆମର ପ୍ରକଳ୍ପ", about: "ଆମ ବିଷୟରେ", default: "ବିଭାଗ" },
  ur: { services: "ہمارا کام", contact: "ہم سے بات کریں", projects: "ہمارے پروجیکٹس", about: "ہمارے بارے میں", default: "حصہ" },
  as: { services: "আমাৰ কাম", contact: "আমাৰ সৈতে কথা পাতক", projects: "আমাৰ প্ৰকল্প", about: "আমাৰ বিষয়ে", default: "অংশ" },
  bho: { services: "हमनी के काम", contact: "हमनी से बात करीं", projects: "हमनी के प्रोजेक्ट", about: "हमनी के बारे में", default: "हिस्सा" }
};

export const SectionHeading = ({ translationKey, customText, subtitle }) => {
  const [language, setLanguage] = useState(localStorage.getItem('nss_lang') || 'en');

  useEffect(() => {
    const handleLangChange = (e) => setLanguage(e.detail);
    window.addEventListener('languageChanged', handleLangChange);
    return () => window.removeEventListener('languageChanged', handleLangChange);
  }, []);

  const t = headingTranslations[language] || headingTranslations['en'];
  const titleText = customText || t[translationKey] || t['default'];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="mb-12 border-b border-gray-200 pb-6 w-full"
    >
      <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tight leading-tight">
        {titleText}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-700 mt-4 font-semibold max-w-3xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};