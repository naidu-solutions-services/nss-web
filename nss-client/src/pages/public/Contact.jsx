import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const contactTranslations = {
  en: { title: "Contact Us", subtitle: "Talk to our team for factory machine work.", talk: "Get in touch", call: "Call Us", email: "Email Us", addressTitle: "Address", addressDesc: "Target MIDC Locations: Pune, Bhosari, Chakan, Nanded", whatsapp: "Message on WhatsApp", formTitle: "Send a Request", fName: "Your Name", fPhone: "Phone Number", fService: "Type of Work", fCapacity: "Machine Weight or Capacity (Tons/Size)", fIssue: "Details of Work or Problem", submit: "Send Request", success: "Request sent successfully.", opt1: "Crane Service", opt2: "Roof Machine Work", opt3: "Electric Panel Work", opt4: "Other Work" },
  hi: { title: "संपर्क करें", subtitle: "फैक्ट्री मशीन के काम के लिए हमारी टीम से बात करें।", talk: "हमसे जुड़ें", call: "कॉल करें", email: "ईमेल करें", addressTitle: "पता", addressDesc: "MIDC क्षेत्र: पुणे, भोसरी, चाकण, नांदेड़", whatsapp: "व्हाट्सएप पर मैसेज करें", formTitle: "अनुरोध भेजें", fName: "आपका नाम", fPhone: "फोन नंबर", fService: "काम का प्रकार", fCapacity: "मशीन का वजन या आकार", fIssue: "काम या समस्या का विवरण", submit: "अनुरोध भेजें", success: "अनुरोध भेज दिया गया।", opt1: "क्रेन का काम", opt2: "छत की मशीन का काम", opt3: "इलेक्ट्रिक पैनल का काम", opt4: "अन्य काम" },
  mr: { title: "संपर्क करा", subtitle: "फॅक्टरी मशीनच्या कामासाठी आमच्या टीमशी बोला.", talk: "आमच्याशी जोडा", call: "कॉल करा", email: "ईमेल करा", addressTitle: "पत्ता", addressDesc: "MIDC क्षेत्र: पुणे, भोसरी, चाकण, नांदेड", whatsapp: "व्हॉट्सॲपवर मेसेज करा", formTitle: "विनंती पाठवा", fName: "तुमचे नाव", fPhone: "फोन नंबर", fService: "कामाचा प्रकार", fCapacity: "मशीनचे वजन किंवा आकार", fIssue: "काम किंवा समस्येची माहिती", submit: "विनंती पाठवा", success: "विनंती पाठवली.", opt1: "क्रेनचे काम", opt2: "छताच्या मशीनचे काम", opt3: "इलेक्ट्रिक पॅनेलचे काम", opt4: "इतर काम" },
  te: { title: "సంప్రదించండి", subtitle: "ఫ్యాక్టరీ యంత్రాల పని కోసం మా బృందంతో మాట్లాడండి.", talk: "మమ్మల్ని కలవండి", call: "కాల్ చేయండి", email: "ఇమెయిల్ చేయండి", addressTitle: "చిరునామా", addressDesc: "MIDC ప్రాంతాలు: పూణే, భోసారి, చకన్, నాందేడ్", whatsapp: "వాట్సాప్‌లో సందేశం పంపండి", formTitle: "అభ్యర్థన పంపండి", fName: "మీ పేరు", fPhone: "ఫోన్ నంబర్", fService: "పని రకం", fCapacity: "యంత్రం బరువు లేదా పరిమాణం", fIssue: "పని లేదా సమస్య వివరాలు", submit: "పంపండి", success: "పంపబడింది.", opt1: "క్రేన్ పని", opt2: "రూఫ్ యంత్రం పని", opt3: "ఎలక్ట్రిక్ ప్యానెల్ పని", opt4: "ఇతర పని" },
  ta: { title: "தொடர்பு கொள்ள", subtitle: "தொழிற்சாலை இயந்திர வேலைக்காக எங்கள் குழுவிடம் பேசவும்.", talk: "தொடர்பு கொள்ளவும்", call: "அழைக்க", email: "மின்னஞ்சல்", addressTitle: "முகவரி", addressDesc: "MIDC இடங்கள்: புனே, போசாரி, சக்கன், நாந்தேட்", whatsapp: "வாட்ஸ்அப் செய்தி", formTitle: "கோரிக்கை அனுப்ப", fName: "உங்கள் பெயர்", fPhone: "போன் எண்", fService: "வேலை வகை", fCapacity: "இயந்திர எடை அல்லது அளவு", fIssue: "வேலை அல்லது பிரச்சனை விவரம்", submit: "அனுப்பு", success: "அனுப்பப்பட்டது.", opt1: "கிரேன் வேலை", opt2: "கூரையின் இயந்திர வேலை", opt3: "மின்சார பேனல் வேலை", opt4: "மற்ற வேலை" },
  kn: { title: "ಸಂಪರ್ಕಿಸಿ", subtitle: "ಕಾರ್ಖಾನೆ ಯಂತ್ರದ ಕೆಲಸಕ್ಕಾಗಿ ನಮ್ಮ ತಂಡದೊಂದಿಗೆ ಮಾತನಾಡಿ.", talk: "ಸಂಪರ್ಕದಲ್ಲಿರಿ", call: "ಕರೆ ಮಾಡಿ", email: "ಇಮೇಲ್ ಮಾಡಿ", addressTitle: "ವಿಳಾಸ", addressDesc: "MIDC ಸ್ಥಳಗಳು: ಪುಣೆ, ಭೋಸರಿ, ಚಕನ್, ನಾಂದೇಡ್", whatsapp: "ವಾಟ್ಸಾಪ್ ಸಂದೇಶ", formTitle: "ವಿನಂತಿ ಕಳುಹಿಸಿ", fName: "ನಿಮ್ಮ ಹೆಸರು", fPhone: "ಫೋನ್ ಸಂಖ್ಯೆ", fService: "ಕೆಲಸದ ಪ್ರಕಾರ", fCapacity: "ಯಂತ್ರದ ತೂಕ ಅಥವಾ ಗಾತ್ರ", fIssue: "ಕೆಲಸ ಅಥವಾ ಸಮಸ್ಯೆಯ ವಿವರ", submit: "ಕಳುಹಿಸಿ", success: "ಕಳುಹಿಸಲಾಗಿದೆ.", opt1: "ಕ್ರೇನ್ ಕೆಲಸ", opt2: "ಛಾವಣಿಯ ಯಂತ್ರದ ಕೆಲಸ", opt3: "ಎಲೆಕ್ಟ್ರಿಕ್ ಪ್ಯಾನಲ್ ಕೆಲಸ", opt4: "ಇತರ ಕೆಲಸ" },
  ml: { title: "ബന്ധപ്പെടുക", subtitle: "ഫാക്ടറി മെഷീൻ ജോലിക്കായി ഞങ്ങളുടെ ടീമുമായി സംസാരിക്കുക.", talk: "ബന്ധപ്പെടുക", call: "വിളിക്കുക", email: "ഇമെയിൽ ചെയ്യുക", addressTitle: "വിലാസം", addressDesc: "MIDC സ്ഥലങ്ങൾ: പൂനെ, ഭോസാരി, ചകൻ, നന്ദേഡ്", whatsapp: "വാട്സാപ്പ് മെസ്സേജ്", formTitle: "അഭ്യർത്ഥന അയയ്ക്കുക", fName: "നിങ്ങളുടെ പേര്", fPhone: "ഫോൺ നമ്പർ", fService: "ജോലിയുടെ തരം", fCapacity: "മെഷീൻ ഭാരം അല്ലെങ്കിൽ വലുപ്പം", fIssue: "ജോലി അല്ലെങ്കിൽ പ്രശ്നത്തിന്റെ വിവരങ്ങൾ", submit: "അയയ്ക്കുക", success: "അയച്ചു.", opt1: "ക്രെയിൻ ജോലി", opt2: "റൂഫ് മെഷീൻ ജോലി", opt3: "ഇലക്ട്രിക് പാനൽ ജോലി", opt4: "മറ്റ് ജോലികൾ" },
  gu: { title: "સંપર્ક કરો", subtitle: "ફેક્ટરી મશીનના કામ માટે અમારી ટીમ સાથે વાત કરો.", talk: "અમારો સંપર્ક કરો", call: "કૉલ કરો", email: "ઇમેઇલ કરો", addressTitle: "સરનામું", addressDesc: "MIDC વિસ્તારો: પુણે, ભોસરી, ચાકણ, નાંદેડ", whatsapp: "વોટ્સએપ પર મેસેજ કરો", formTitle: "વિનંતી મોકલો", fName: "તમારું નામ", fPhone: "ફોન નંબર", fService: "કામનો પ્રકાર", fCapacity: "મશીનનું વજન અથવા કદ", fIssue: "કામ અથવા સમસ્યાની વિગતો", submit: "મોકલો", success: "મોકલાઈ ગયું.", opt1: "ક્રેનનું કામ", opt2: "છતની મશીનનું કામ", opt3: "ઇલેક્ટ્રિક પેનલનું કામ", opt4: "અન્ય કામ" },
  pa: { title: "ਸੰਪਰਕ ਕਰੋ", subtitle: "ਫੈਕਟਰੀ ਮਸ਼ੀਨ ਦੇ ਕੰਮ ਲਈ ਸਾਡੀ ਟੀਮ ਨਾਲ ਗੱਲ ਕਰੋ.", talk: "ਸਾਡੇ ਨਾਲ ਜੁੜੋ", call: "ਕਾਲ ਕਰੋ", email: "ਈਮੇਲ ਕਰੋ", addressTitle: "ਪਤਾ", addressDesc: "MIDC ਖੇਤਰ: ਪੁਣੇ, ਭੋਸਰੀ, ਚਾਕਣ, ਨਾਂਦੇੜ", whatsapp: "ਵਟਸਐਪ ਤੇ ਸੁਨੇਹਾ ਭੇਜੋ", formTitle: "ਬੇਨਤੀ ਭੇਜੋ", fName: "ਤੁਹਾਡਾ ਨਾਂ", fPhone: "ਫੋਨ ਨੰਬਰ", fService: "ਕੰਮ ਦੀ ਕਿਸਮ", fCapacity: "ਮਸ਼ੀਨ ਦਾ ਭਾਰ ਜਾਂ ਆਕਾਰ", fIssue: "ਕੰਮ ਜਾਂ ਸਮੱਸਿਆ ਦਾ ਵੇਰਵਾ", submit: "ਭੇਜੋ", success: "ਭੇਜ ਦਿੱਤਾ ਗਿਆ.", opt1: "ਕਰੇਨ ਦਾ ਕੰਮ", opt2: "ਛੱਤ ਦੀ ਮਸ਼ੀਨ ਦਾ ਕੰਮ", opt3: "ਇਲੈਕਟ੍ਰਿਕ ਪੈਨਲ ਦਾ ਕੰਮ", opt4: "ਹੋਰ ਕੰਮ" },
  bn: { title: "যোগাযোগ করুন", subtitle: "কারখানার মেশিনের কাজের জন্য আমাদের টিমের সাথে কথা বলুন।", talk: "যোগাযোগ করুন", call: "কল করুন", email: "ইমেইল করুন", addressTitle: "ঠিকানা", addressDesc: "MIDC এলাকা: পুনে, ভোসারি, চাকন, নান্দেড", whatsapp: "হোয়াটসঅ্যাপে বার্তা পাঠান", formTitle: "অনুরোধ পাঠান", fName: "আপনার নাম", fPhone: "ফোন নম্বর", fService: "কাজের ধরন", fCapacity: "মেশিনের ওজন বা আকার", fIssue: "কাজ বা সমস্যার বিবরণ", submit: "পাঠান", success: "পাঠানো হয়েছে।", opt1: "ক্রেনের কাজ", opt2: "ছাদের মেশিনের কাজ", opt3: "ইলেকট্রিক প্যানেলের কাজ", opt4: "অন্যান্য কাজ" },
  or: { title: "ଯୋଗାଯୋଗ କରନ୍ତୁ", subtitle: "କାରଖାନା ମେସିନ୍ କାମ ପାଇଁ ଆମ ଟିମ୍ ସହିତ କଥା ହୁଅନ୍ତୁ.", talk: "ସମ୍ପର୍କ କରନ୍ତୁ", call: "କଲ୍ କରନ୍ତୁ", email: "ଇମେଲ୍ କରନ୍ତୁ", addressTitle: "ଠିକଣା", addressDesc: "MIDC ଅଞ୍ଚଳ: ପୁନେ, ଭୋସାରି, ଚାକନ୍, ନାନ୍ଦେଡ୍", whatsapp: "ହ୍ୱାଟସ୍ଆପ୍ ରେ ମେସେଜ୍ କରନ୍ତୁ", formTitle: "ଅନୁରୋଧ ପଠାନ୍ତୁ", fName: "ଆପଣଙ୍କ ନାମ", fPhone: "ଫୋନ୍ ନମ୍ବର", fService: "କାମର ପ୍ରକାର", fCapacity: "ମେସିନ୍ ଓଜନ କିମ୍ବା ଆକାର", fIssue: "କାମ କିମ୍ବା ସମସ୍ୟାର ବିବରଣୀ", submit: "ପଠାନ୍ତୁ", success: "ପଠାଗଲା.", opt1: "କ୍ରେନ୍ କାମ", opt2: "ଛାତ ମେସିନ୍ କାମ", opt3: "ଇଲେକ୍ଟ୍ରିକ୍ ପ୍ୟାନେଲ୍ କାମ", opt4: "ଅନ୍ୟ କାମ" },
  ur: { title: "رابطہ کریں", subtitle: "فیکٹری مشین کے کام کے لیے ہماری ٹیم سے بات کریں۔", talk: "ہم سے جڑیں", call: "کال کریں", email: "ای میل کریں", addressTitle: "پتہ", addressDesc: "MIDC علاقے: پونے، بھوسری، چاکن، ناندیڑ", whatsapp: "واٹس ایپ پر پیغام بھیجیں", formTitle: "درخواست بھیجیں", fName: "آپ کا نام", fPhone: "فون نمبر", fService: "کام کی قسم", fCapacity: "مشین کا وزن یا سائز", fIssue: "کام یا مسئلے کی تفصیل", submit: "بھیجیں", success: "بھیج دیا گیا۔", opt1: "کرین کا کام", opt2: "چھت کی مشین کا کام", opt3: "الیکٹرک پینل کا کام", opt4: "دیگر کام" },
  as: { title: "যোগাযোগ কৰক", subtitle: "কাৰখানাৰ মেচিনৰ কামৰ বাবে আমাৰ দলৰ সৈতে কথা পাতক.", talk: "যোগাযোগ কৰক", call: "কল কৰক", email: "ইমেইল কৰক", addressTitle: "ঠিকনা", addressDesc: "MIDC অঞ্চল: পুনে, ভোচৰি, চাকন, নান্দেড়", whatsapp: "হোৱাটছএপত মেছেজ কৰক", formTitle: "অনুৰোধ পঠাওক", fName: "আপোনাৰ নাম", fPhone: "ফোন নম্বৰ", fService: "কামৰ প্ৰকাৰ", fCapacity: "মেচিনৰ ওজন বা আকাৰ", fIssue: "কাম বা সমস্যাৰ বিৱৰণ", submit: "পঠাওক", success: "পঠোৱা হ'ল.", opt1: "ক্ৰেনৰ কাম", opt2: "ছাদৰ মেচিনৰ কাম", opt3: "ইলেক্ট্ৰিক পেনেলৰ কাম", opt4: "অন্য কাম" },
  bho: { title: "संपर्क करीं", subtitle: "फैक्टरी मशीन के काम खातिर हमनी के टीम से बात करीं।", talk: "हमनी से जुड़ीं", call: "कॉल करीं", email: "ईमेल करीं", addressTitle: "पता", addressDesc: "MIDC क्षेत्र: पुणे, भोसरी, चाकण, नांदेड़", whatsapp: "व्हाट्सएप पर मैसेज करीं", formTitle: "अनुरोध भेजीं", fName: "रउआ नाम", fPhone: "फोन नंबर", fService: "काम के प्रकार", fCapacity: "मशीन के वजन भा आकार", fIssue: "काम भा दिक्कत के जानकारी", submit: "भेजीं", success: "भेज दिहल गइल।", opt1: "क्रेन के काम", opt2: "छत के मशीन के काम", opt3: "इलेक्ट्रिक पैनल के काम", opt4: "अउरी काम" }
};

export const Contact = () => {
  const [language, setLanguage] = useState(localStorage.getItem('nss_lang') || 'en');
  const [formState, setFormState] = useState({ name: '', phone: '', service: 'Crane Service', capacity: '', issue: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const handleLangChange = (e) => setLanguage(e.detail);
    window.addEventListener('languageChanged', handleLangChange);
    return () => window.removeEventListener('languageChanged', handleLangChange);
  }, []);

  const t = contactTranslations[language] || contactTranslations['en'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'serviceRequests'), {
        category: formState.service,
        ...formState,
        timestamp: new Date().toISOString(),
        status: 'Submitted'
      });
      setFormState({ name: '', phone: '', service: 'Crane Service', capacity: '', issue: '' });
      setStatus(t.success);
      setTimeout(() => setStatus(''), 4000);
    } catch (err) {
      console.error(err);
      setStatus("Error saving record.");
    }
  };

  const handleWhatsApp = () => {
    const text = `Hello NSS. I need help with factory services.`;
    window.open(`https://wa.me/919049994500?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="w-full bg-white font-sans text-gray-900 pb-16 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12 border-b border-gray-200 pb-6">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tight leading-tight">
            {t.title}
          </h1>
          <p className="text-lg text-gray-700 mt-4 font-semibold">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Contact Details & WhatsApp - Stacked Cards */}
          <div className="flex flex-col space-y-6">
            <div className="bg-gray-50 border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-2xl text-gray-900 mb-6">{t.talk}</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#0035A0] rounded-sm flex items-center justify-center mr-4 shrink-0">
                    <Phone className="text-white h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-gray-900 mb-1">{t.call}</p>
                    <p className="text-gray-700 font-semibold">+91 90499 94500</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#0035A0] rounded-sm flex items-center justify-center mr-4 shrink-0">
                    <Mail className="text-white h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-gray-900 mb-1">{t.email}</p>
                    <p className="text-gray-700 font-semibold">help.nss@gmail.com & achandrashekharnaidu@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#0035A0] rounded-sm flex items-center justify-center mr-4 shrink-0">
                    <MapPin className="text-white h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-gray-900 mb-1">{t.addressTitle}</p>
                    <p className="text-gray-700 font-semibold">{t.addressDesc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Integration Button */}
            <div className="bg-white border border-gray-200 p-6 shadow-sm flex flex-col items-start">
              <button onClick={handleWhatsApp} className="w-full bg-[#25D366] text-white font-black py-4 hover:bg-[#1DA851] transition text-lg flex items-center justify-center">
                <MessageCircle className="mr-2 h-6 w-6" /> {t.whatsapp} <ArrowUpRight className="ml-2 h-6 w-6 stroke-[3]" />
              </button>
            </div>
          </div>

          {/* Specialized Inquiry Form */}
          <div className="bg-white border border-gray-200 p-8 shadow-sm">
            <h3 className="text-3xl font-black mb-6 text-gray-900">{t.formTitle}</h3>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-900">{t.fName}</label>
                <input type="text" required value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} className="w-full p-3 border border-gray-300 outline-none focus:border-[#0035A0] bg-gray-50" />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-900">{t.fPhone}</label>
                <input type="tel" required value={formState.phone} onChange={(e) => setFormState({...formState, phone: e.target.value})} className="w-full p-3 border border-gray-300 outline-none focus:border-[#0035A0] bg-gray-50" />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-gray-900">{t.fService}</label>
                <select required value={formState.service} onChange={(e) => setFormState({...formState, service: e.target.value})} className="w-full p-3 border border-gray-300 outline-none focus:border-[#0035A0] bg-gray-50 font-semibold">
                  <option value="Crane Service">{t.opt1}</option>
                  <option value="Roof Machine Work">{t.opt2}</option>
                  <option value="Electric Panel Work">{t.opt3}</option>
                  <option value="Other Work">{t.opt4}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-gray-900">{t.fCapacity}</label>
                <input type="text" required value={formState.capacity} onChange={(e) => setFormState({...formState, capacity: e.target.value})} className="w-full p-3 border border-gray-300 outline-none focus:border-[#0035A0] bg-gray-50" />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-900">{t.fIssue}</label>
                <textarea required rows="4" value={formState.issue} onChange={(e) => setFormState({...formState, issue: e.target.value})} className="w-full p-3 border border-gray-300 outline-none focus:border-[#0035A0] bg-gray-50"></textarea>
              </div>
              
              <button type="submit" className="bg-[#0035A0] text-white font-black py-4 hover:bg-blue-900 transition text-lg mt-4 flex items-center justify-center">
                {t.submit} <ArrowUpRight className="ml-2 h-6 w-6 stroke-[3]" />
              </button>
              {status && <p className="text-green-700 font-bold text-sm mt-2">{status}</p>}
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};