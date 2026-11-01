import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const footerTranslations = {
  en: { explore: "Explore more about NSS", quickLinks: "Quick links", about: "About us", solutions: "Solutions", projects: "Projects", contact: "Contact", career: "Career", subscribeText: "Subscribe to our newsletters", enterEmail: "Enter your email address", subscribeBtn: "Subscribe", connect: "Connect with us", sitemap: "Sitemap", privacy: "Privacy Policy", tagline: "ENGINEERED BUILDING SOLUTIONS", locations: "Target MIDC Locations: Pune, Bhosari, Chakan, Nanded", copyright: "Copyright NSS Naidu Solutions & Services. All rights reserved.", success: "Subscribed successfully." },
  hi: { explore: "NSS के बारे में और जानें", quickLinks: "ज़रूरी लिंक", about: "हमारे बारे में", solutions: "सेवाएं", projects: "काम", contact: "संपर्क करें", career: "करियर", subscribeText: "नई जानकारी पाएं", enterEmail: "अपना ईमेल भरें", subscribeBtn: "सब्सक्राइब", connect: "हमसे जुड़ें", sitemap: "साइटमैप", privacy: "प्राइवेसी पॉलिसी", tagline: "औद्योगिक इंजीनियरिंग समाधान", locations: "MIDC क्षेत्र: पुणे, भोसरी, चाकण, नांदेड़", copyright: "कॉपीराइट NSS नायडू सॉल्यूशंस. सर्वाधिकार सुरक्षित.", success: "सब्सक्राइब हो गया." },
  mr: { explore: "NSS बद्दल अधिक जाणून घ्या", quickLinks: "महत्वाच्या लिंक", about: "आमच्याबद्दल", solutions: "सेवा", projects: "काम", contact: "संपर्क करा", career: "करिअर", subscribeText: "नवीन माहिती मिळवा", enterEmail: "तुमचा ईमेल लिहा", subscribeBtn: "सबस्क्राईब", connect: "आमच्याशी जोडा", sitemap: "साइटमॅप", privacy: "प्रायव्हसी", tagline: "औद्योगिक अभियांत्रिकी उपाय", locations: "MIDC क्षेत्र: पुणे, भोसरी, चाकण, नांदेड", copyright: "कॉपीराइट NSS नायडू सोल्युशन्स. सर्व हक्क राखीव.", success: "सबस्क्राईब झाले." },
  te: { explore: "NSS గురించి మరింత తెలుసుకోండి", quickLinks: "ముఖ్యమైన లింకులు", about: "మా గురించి", solutions: "సేవలు", projects: "పనులు", contact: "సంప్రదించండి", career: "కెరీర్", subscribeText: "కొత్త సమాచారం పొందండి", enterEmail: "మీ ఈమెయిల్ ఇవ్వండి", subscribeBtn: "సబ్‌స్క్రైబ్", connect: "మమ్మల్ని కలవండి", sitemap: "సైట్‌మ్యాప్", privacy: "ప్రైవసీ", tagline: "పారిశ్రామిక ఇంజనీరింగ్ సేవలు", locations: "MIDC ప్రాంతాలు: పూణే, భోసారి, చకన్, నాందేడ్", copyright: "కాపీరైట్ NSS నాయుడు సొల్యూషన్స్. సర్వ హక్కులు ప్రత్యేకించబడ్డాయి.", success: "సబ్‌స్క్రైబ్ అయింది." },
  ta: { explore: "NSS பற்றி மேலும் அறிய", quickLinks: "முக்கிய இணைப்புகள்", about: "எங்களை பற்றி", solutions: "சேவைகள்", projects: "பணிகள்", contact: "தொடர்பு கொள்ள", career: "வேலைவாய்ப்பு", subscribeText: "புதிய தகவல் பெற", enterEmail: "உங்கள் மின்னஞ்சல்", subscribeBtn: "சந்தா", connect: "எங்களுடன் இணையுங்கள்", sitemap: "தளவரைபடம்", privacy: "தனியுரிமை", tagline: "தொழில்துறை பொறியியல் சேவைகள்", locations: "MIDC இடங்கள்: புனே, போசாரி, சக்கன், நாந்தேட்", copyright: "பதிப்புரிமை NSS நாயுடு சொல்யூஷன்ஸ். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.", success: "சந்தா செய்யப்பட்டது." },
  kn: { explore: "NSS ಬಗ್ಗೆ ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ", quickLinks: "ಪ್ರಮುಖ ಲಿಂಕ್‌ಗಳು", about: "ನಮ್ಮ ಬಗ್ಗೆ", solutions: "ಸೇವೆಗಳು", projects: "ಕೆಲಸಗಳು", contact: "ಸಂಪರ್ಕಿಸಿ", career: "ವೃತ್ತಿ", subscribeText: "ಹೊಸ ಮಾಹಿತಿ ಪಡೆಯಿರಿ", enterEmail: "ನಿಮ್ಮ ಇಮೇಲ್ ಬರೆಯಿರಿ", subscribeBtn: "ಸಬ್‌ಸ್ಕ್ರೈಬ್", connect: "ನಮ್ಮೊಂದಿಗೆ ಸೇರಿ", sitemap: "ಸೈಟ್‌ಮ್ಯಾಪ್", privacy: "ಗೌಪ್ಯತೆ", tagline: "ಕೈಗಾರಿಕಾ ಎಂಜಿನಿಯರಿಂಗ್ ಸೇವೆಗಳು", locations: "MIDC ಸ್ಥಳಗಳು: ಪುಣೆ, ಭೋಸರಿ, ಚಕನ್, ನಾಂದೇಡ್", copyright: "ಕೃತಿಸ್ವಾಮ್ಯ NSS ನಾಯ್ಡು ಸಲ್ಯೂಷನ್ಸ್. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.", success: "ಸಬ್‌ಸ್ಕ್ರೈಬ್ ಆಗಿದೆ." },
  ml: { explore: "NSS നെക്കുറിച്ച് കൂടുതൽ അറിയുക", quickLinks: "പ്രധാന ലിങ്കുകൾ", about: "ഞങ്ങളെക്കുറിച്ച്", solutions: "സേവനങ്ങൾ", projects: "ജോലികൾ", contact: "ബന്ധപ്പെടുക", career: "കരിയർ", subscribeText: "പുതിയ വിവരങ്ങൾ നേടുക", enterEmail: "നിങ്ങളുടെ ഇമെയിൽ നൽകുക", subscribeBtn: "സബ്സ്ക്രൈബ്", connect: "ഞങ്ങളോടൊപ്പം ചേരുക", sitemap: "സൈറ്റ്മാപ്പ്", privacy: "സ്വകാര്യത", tagline: "വ്യാവസായിക എഞ്ചിനീയറിംഗ് സേവനങ്ങൾ", locations: "MIDC സ്ഥലങ്ങൾ: പൂനെ, ഭോസാരി, ചകൻ, നന്ദേഡ്", copyright: "പകർപ്പവകാശം NSS നായിഡു സൊല്യൂഷൻസ്. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.", success: "സബ്സ്ക്രൈബ് ചെയ്തു." },
  gu: { explore: "NSS વિશે વધુ જાણો", quickLinks: "જરૂરી લિંક્સ", about: "અમારા વિશે", solutions: "સેવાઓ", projects: "કામ", contact: "સંપર્ક કરો", career: "કારકિર્દી", subscribeText: "નવી માહિતી મેળવો", enterEmail: "તમારું ઈમેલ લખો", subscribeBtn: "સબ્સ્ક્રાઇબ", connect: "અમારી સાથે જોડાઓ", sitemap: "સાઇટમેપ", privacy: "ગોપનીયતા", tagline: "ઔદ્યોગિક ઇજનેરી સેવાઓ", locations: "MIDC વિસ્તારો: પુણે, ભોસરી, ચાકણ, નાંદેડ", copyright: "કૉપિરાઇટ NSS નાયડુ સોલ્યુશન્સ. સર્વાધિકાર સુરક્ષિત.", success: "સબ્સ્ક્રાઇબ થઈ ગયું." },
  pa: { explore: "NSS ਬਾਰੇ ਹੋਰ ਜਾਣੋ", quickLinks: "ਜ਼ਰੂਰੀ ਲਿੰਕ", about: "ਸਾਡੇ ਬਾਰੇ", solutions: "ਸੇਵਾਵਾਂ", projects: "ਕੰਮ", contact: "ਸੰਪਰਕ ਕਰੋ", career: "ਕਰੀਅਰ", subscribeText: "ਨਵੀਂ ਜਾਣਕਾਰੀ ਲਵੋ", enterEmail: "ਆਪਣੀ ਈਮੇਲ ਲਿਖੋ", subscribeBtn: "ਸਬਸਕ੍ਰਾਈਬ", connect: "ਸਾਡੇ ਨਾਲ ਜੁੜੋ", sitemap: "ਸਾਈਟਮੈਪ", privacy: "ਪਰਦੇਦਾਰੀ", tagline: "ਉਦਯੋਗਿਕ ਇੰਜੀਨੀਅਰਿੰਗ ਸੇਵਾਵਾਂ", locations: "MIDC ਖੇਤਰ: ਪੁਣੇ, ਭੋਸਰੀ, ਚਾਕਣ, ਨਾਂਦੇੜ", copyright: "ਕਾਪੀਰਾਈਟ NSS ਨਾਇਡੂ ਸਲਿਊਸ਼ਨਜ਼. ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ.", success: "ਸਬਸਕ੍ਰਾਈਬ ਹੋ ਗਿਆ." },
  bn: { explore: "NSS সম্পর্কে আরও জানুন", quickLinks: "জরুরী লিংক", about: "আমাদের সম্পর্কে", solutions: "পরিষেবা", projects: "কাজ", contact: "যোগাযোগ করুন", career: "ক্যারিয়ার", subscribeText: "নতুন তথ্য পান", enterEmail: "আপনার ইমেইল লিখুন", subscribeBtn: "সাবস্ক্রাইব", connect: "আমাদের সাথে যুক্ত হন", sitemap: "সাইটম্যাপ", privacy: "গোপনীয়তা", tagline: "শিল্প প্রকৌশল পরিষেবা", locations: "MIDC এলাকা: পুনে, ভোসারি, চাকন, নান্দেড", copyright: "কপিরাইট NSS নাইডু সলিউশনস. সর্বস্বত্ব সংরক্ষিত.", success: "সাবস্ক্রাইব হয়েছে." },
  or: { explore: "NSS ବିଷୟରେ ଅଧିକ ଜାଣନ୍ତୁ", quickLinks: "ଦରକାରୀ ଲିଙ୍କ୍", about: "ଆମ ବିଷୟରେ", solutions: "ସେବା", projects: "କାମ", contact: "ଯୋଗାଯୋଗ କରନ୍ତୁ", career: "କ୍ୟାରିୟର", subscribeText: "ନୂଆ ଖବର ପାଆନ୍ତୁ", enterEmail: "ଆପଣଙ୍କର ଇମେଲ୍ ଲେଖନ୍ତୁ", subscribeBtn: "ସବସ୍କ୍ରାଇବ୍", connect: "ଆମ ସହ ଯୋଡି ହୁଅନ୍ତୁ", sitemap: "ସାଇଟମ୍ୟାପ୍", privacy: "ଗୋପନୀୟତା", tagline: "ଶିଳ୍ପ ଇଞ୍ଜିନିୟରିଂ ସେବା", locations: "MIDC ଅଞ୍ଚଳ: ପୁନେ, ଭୋସାରି, ଚାକନ୍, ନାନ୍ଦେଡ୍", copyright: "କପିରାଇଟ୍ NSS ନାଇଡୁ ସୋଲ୍ୟୁସନ୍ସ. ସର୍ବସ୍ୱତ୍ୱ ସଂରକ୍ଷିତ.", success: "ସବସ୍କ୍ରାଇବ୍ ହୋଇଗଲା." },
  ur: { explore: "NSS کے بارے میں مزید جانیں", quickLinks: "اہم لنکس", about: "ہمارے بارے میں", solutions: "خدمات", projects: "کام", contact: "رابطہ کریں", career: "کیریئر", subscribeText: "نئی معلومات حاصل کریں", enterEmail: "اپنا ای میل لکھیں", subscribeBtn: "سبسکرائب", connect: "ہم سے جڑیں", sitemap: "سائٹ میپ", privacy: "پرائیویسی", tagline: "صنعتی انجینئرنگ خدمات", locations: "MIDC علاقے: پونے، بھوسری، چاکن، ناندیڑ", copyright: "کاپی رائٹ NSS نائیڈو سلوشنز۔ جملہ حقوق محفوظ ہیں۔", success: "سبسکرائب ہو گیا۔" },
  as: { explore: "NSS ৰ বিষয়ে অধিক জানক", quickLinks: "দৰকাৰী লিংক", about: "আমাৰ বিষয়ে", solutions: "সেৱাসমূহ", projects: "কাম", contact: "যোগাযোগ কৰক", career: "কেৰিয়াৰ", subscribeText: "নতুন তথ্য পাওক", enterEmail: "আপোনাৰ ইমেইল লিখক", subscribeBtn: "চাবস্ক্ৰাইব", connect: "আমাৰ সৈতে সংযোগ কৰক", sitemap: "চাইটমেপ", privacy: "গোপনীয়তা", tagline: "ঔদ্যোগিক অভিযান্ত্ৰিক সেৱা", locations: "MIDC অঞ্চল: পুনে, ভোচৰি, চাকন, নান্দেড়", copyright: "কপিৰাইট NSS নাইডু ছলিউচনছ. সকলো অধিকাৰ সংৰক্ষিত.", success: "চাবস্ক্ৰাইব কৰা হ'ল." },
  bho: { explore: "NSS के बारे में अउरी जानीं", quickLinks: "जरूरी লিংক", about: "हमनी के बारे में", solutions: "सेवा", projects: "काम", contact: "संपर्क करीं", career: "करियर", subscribeText: "नया जानकारी पाईं", enterEmail: "आपन ईमेल लिखीं", subscribeBtn: "सब्सक्राइब", connect: "हमनी से जुड़ीं", sitemap: "साइटमैप", privacy: "प्राइवेसी", tagline: "औद्योगिक इंजीनियरिंग सेवा", locations: "MIDC क्षेत्र: पुणे, भोसरी, चाकण, नांदेड़", copyright: "कॉपीराइट NSS नायडू सॉल्यूशंस. सब अधिकार सुरक्षित बा.", success: "सब्सक्राइब हो गइल." }
};

export const Footer = () => {
  const [language, setLanguage] = useState(localStorage.getItem('nss_lang') || 'en');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const handleLangChange = (e) => setLanguage(e.detail);
    window.addEventListener('languageChanged', handleLangChange);
    return () => window.removeEventListener('languageChanged', handleLangChange);
  }, []);

  const t = footerTranslations[language] || footerTranslations['en'];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await addDoc(collection(db, 'newsletterSubscriptions'), { 
        email, 
        timestamp: new Date().toISOString() 
      });
      setEmail('');
      setMsg(t.success);
      setTimeout(() => setMsg(''), 4000);
    } catch (err) {
      console.error("Subscription failed due to database rules.", err);
    }
  };

  return (
    <footer className="w-full font-sans">
      <div className="relative w-full h-48 sm:h-64 bg-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0035A0] opacity-80 mix-blend-multiply"></div>
        <Link to="/about" className="relative z-10 text-white text-2xl sm:text-4xl font-bold flex items-center hover:text-gray-200 transition px-4 text-center">
          {t.explore} <ArrowUpRight className="ml-2 h-6 w-6 sm:h-8 sm:w-8" />
        </Link>
      </div>

      <div className="bg-[#0035A0] text-white pt-10 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-10">
            <div className="flex flex-col space-y-5">
              <img src="https://i.postimg.cc/QMHqk6NF/ft.png" alt="NSS Logo" className="h-14 w-auto p-2 rounded-sm object-contain self-start" />
              <div>
                <p className="text-sm font-bold mb-3">{t.connect}</p>
                <div className="flex space-x-4">
                  {/* Valid SVG Replacements for missing Lucide Icons */}
                  <a href="#" className="hover:text-gray-300 transition" aria-label="Facebook">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                  </a>
                  <a href="#" className="hover:text-gray-300 transition" aria-label="LinkedIn">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a href="#" className="hover:text-gray-300 transition" aria-label="YouTube">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="#" className="hover:text-gray-300 transition" aria-label="Instagram">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-sm font-bold mb-4">{t.quickLinks}</p>
              <nav className="flex flex-col space-y-3 text-sm">
                <Link to="/about" className="hover:underline">{t.about}</Link>
                <Link to="/services" className="hover:underline">{t.solutions}</Link>
                <Link to="/projects" className="hover:underline">{t.projects}</Link>
                <Link to="/about" className="hover:underline">Become a Builder</Link>
                <Link to="/contact" className="hover:underline">{t.contact}</Link>
                <Link to="/about" className="hover:underline">{t.career}</Link>
              </nav>
            </div>

            <div className="flex flex-col">
              <p className="text-sm font-bold mb-4">{t.subscribeText}</p>
              <form onSubmit={handleSubscribe} className="flex flex-col">
                <div className="relative border-b border-white pb-2 flex items-center justify-between">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.enterEmail}
                    className="bg-transparent w-full outline-none text-sm placeholder-white text-white"
                  />
                  <button type="submit" className="text-sm font-bold flex items-center hover:text-gray-300 transition pl-2">
                    {t.subscribeBtn} <ArrowUpRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
                {msg && <span className="text-xs text-green-300 mt-2 font-semibold">{msg}</span>}
              </form>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6 flex flex-col space-y-3">
            <p className="font-bold text-sm tracking-wider uppercase">{t.tagline}</p>
            <p className="text-xs text-blue-100 flex items-center">
              <MapPin className="h-3.5 w-3.5 mr-1" /> {t.locations}
            </p>
          </div>

          <div className="border-t border-white/20 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-blue-100 space-y-4 md:space-y-0">
            <p>{t.copyright}</p>
            <div className="flex items-center space-x-4">
              <span className="bg-[#4CAF50] text-white px-2 py-0.5 rounded-sm font-bold text-[10px] border border-white">DMCA PROTECTED</span>
              <Link to="/sitemap" className="hover:underline">{t.sitemap}</Link>
              <Link to="/privacy" className="hover:underline">{t.privacy}</Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};