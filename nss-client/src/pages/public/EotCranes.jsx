import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const craneTranslations = {
  en: { title: "EOT Crane Services", subtitle: "We fix and check single and double girder cranes.", capTitle: "Weight Capacity", capDesc: "From 1 Ton to 50 Tons", servTitle: "Our Crane Work", s1: "Hoist Check", s2: "Wire Rope Change", s3: "Brake Setting", formTitle: "Ask for Crane Service", fName: "Your Name", fPhone: "Phone Number", fWeight: "Crane Weight (Tons)", fIssue: "Problem", submit: "Send Request", success: "Request sent successfully." },
  hi: { title: "ईओटी क्रेन सेवाएं", subtitle: "हम सिंगल और डबल गर्डर क्रेन ठीक करते हैं और जांचते हैं।", capTitle: "वजन क्षमता", capDesc: "1 टन से 50 टन तक", servTitle: "हमारा क्रेन का काम", s1: "होइस्ट की जांच", s2: "तार की रस्सी बदलना", s3: "ब्रेक की सेटिंग", formTitle: "क्रेन सेवा के लिए पूछें", fName: "आपका नाम", fPhone: "फोन नंबर", fWeight: "क्रेन का वजन (टन)", fIssue: "समस्या", submit: "अनुरोध भेजें", success: "अनुरोध भेज दिया गया।" },
  mr: { title: "ईओटी क्रेन सेवा", subtitle: "आम्ही सिंगल आणि डबल गर्डर क्रेन दुरुस्त करतो आणि तपासतो.", capTitle: "वजन क्षमता", capDesc: "1 टन ते 50 टन", servTitle: "आमचे क्रेनचे काम", s1: "होइस्ट तपासणी", s2: "वायर रोप बदलणे", s3: "ब्रेक सेटिंग", formTitle: "क्रेन सेवा विचारा", fName: "तुमचे नाव", fPhone: "फोन नंबर", fWeight: "क्रेनचे वजन (टन)", fIssue: "समस्या", submit: "विनंती पाठवा", success: "विनंती पाठवली." },
  te: { title: "EOT క్రేన్ సేవలు", subtitle: "మేము సింగిల్ మరియు డబుల్ గిర్డర్ క్రేన్లను బాగుచేస్తాము.", capTitle: "బరువు సామర్థ్యం", capDesc: "1 టన్ను నుండి 50 టన్నుల వరకు", servTitle: "మా క్రేన్ పని", s1: "హోయిస్ట్ తనిఖీ", s2: "వైర్ తాడు మార్పు", s3: "బ్రేక్ సెట్టింగ్", formTitle: "క్రేన్ సేవ అడగండి", fName: "మీ పేరు", fPhone: "ఫోన్ నంబర్", fWeight: "క్రేన్ బరువు", fIssue: "సమస్య", submit: "పంపండి", success: "పంపబడింది." },
  ta: { title: "EOT கிரேன் சேவைகள்", subtitle: "நாங்கள் ஒற்றை மற்றும் இரட்டை கர்டர் கிரேன்களை சரிசெய்கிறோம்.", capTitle: "எடை திறன்", capDesc: "1 டன் முதல் 50 டன் வரை", servTitle: "எங்கள் கிரேன் வேலை", s1: "ஹாய்ஸ்ட் சோதனை", s2: "கம்பி கயிறு மாற்றம்", s3: "பிரேக் அமைப்பு", formTitle: "கிரேன் சேவை கேட்க", fName: "உங்கள் பெயர்", fPhone: "போன் எண்", fWeight: "கிரேன் எடை", fIssue: "பிரச்சனை", submit: "அனுப்பு", success: "அனுப்பப்பட்டது." },
  kn: { title: "EOT ಕ್ರೇನ್ ಸೇವೆಗಳು", subtitle: "ನಾವು ಸಿಂಗಲ್ ಮತ್ತು ಡಬಲ್ ಗಿರ್ಡರ್ ಕ್ರೇನ್‌ಗಳನ್ನು ಸರಿಪಡಿಸುತ್ತೇವೆ.", capTitle: "ತೂಕದ ಸಾಮರ್ಥ್ಯ", capDesc: "1 ಟನ್ ನಿಂದ 50 ಟನ್ ವರೆಗೆ", servTitle: "ನಮ್ಮ ಕ್ರೇನ್ ಕೆಲಸ", s1: "ಹೋಸ್ಟ್ ತಪಾಸಣೆ", s2: "ವೈರ್ ಹಗ್ಗ ಬದಲಾವಣೆ", s3: "ಬ್ರೇಕ್ ಸೆಟ್ಟಿಂಗ್", formTitle: "ಕ್ರೇನ್ ಸೇವೆ ಕೇಳಿ", fName: "ನಿಮ್ಮ ಹೆಸರು", fPhone: "ಫೋನ್ ಸಂಖ್ಯೆ", fWeight: "ಕ್ರೇನ್ ತೂಕ", fIssue: "ಸಮಸ್ಯೆ", submit: "ಕಳುಹಿಸಿ", success: "ಕಳುಹಿಸಲಾಗಿದೆ." },
  ml: { title: "EOT ക്രെയിൻ സേവനങ്ങൾ", subtitle: "ഞങ്ങൾ സിംഗിൾ, ഡബിൾ ഗിർഡർ ക്രെയിനുകൾ ശരിയാക്കുന്നു.", capTitle: "ഭാരം ശേഷി", capDesc: "1 ടൺ മുതൽ 50 ടൺ വരെ", servTitle: "ഞങ്ങളുടെ ക്രെയിൻ ജോലി", s1: "ഹോയിസ്റ്റ് പരിശോധന", s2: "വയർ കയർ മാറ്റം", s3: "ബ്രേക്ക് സെറ്റിംഗ്", formTitle: "ക്രെയിൻ സേവനം ചോദിക്കുക", fName: "നിങ്ങളുടെ പേര്", fPhone: "ഫോൺ നമ്പർ", fWeight: "ക്രെയിൻ ഭാരം", fIssue: "പ്രശ്നം", submit: "അയയ്ക്കുക", success: "അയച്ചു." },
  gu: { title: "EOT ક્રેન સેવાઓ", subtitle: "અમે સિંગલ અને ડબલ ગર્ડર ક્રેન્સ ઠીક કરીએ છીએ.", capTitle: "વજન ક્ષમતા", capDesc: "1 ટન થી 50 ટન સુધી", servTitle: "અમારું ક્રેનનું કામ", s1: "હોઇસ્ટ તપાસ", s2: "વાયર દોરડું બદલવું", s3: "બ્રેક સેટિંગ", formTitle: "ક્રેન સેવા માટે પૂછો", fName: "તમારું નામ", fPhone: "ફોન નંબર", fWeight: "ક્રેન વજન", fIssue: "સમસ્યા", submit: "મોકલો", success: "મોકલાઈ ગયું." },
  pa: { title: "EOT ਕਰੇਨ ਸੇਵਾਵਾਂ", subtitle: "ਅਸੀਂ ਸਿੰਗਲ ਅਤੇ ਡਬਲ ਗਰਡਰ ਕਰੇਨਾਂ ਨੂੰ ਠੀਕ ਕਰਦੇ ਹਾਂ.", capTitle: "ਭਾਰ ਸਮਰੱਥਾ", capDesc: "1 ਟਨ ਤੋਂ 50 ਟਨ ਤੱਕ", servTitle: "ਸਾਡਾ ਕਰੇਨ ਦਾ ਕੰਮ", s1: "ਹੋਇਸਟ ਜਾਂਚ", s2: "ਤਾਰ ਦੀ ਰੱਸੀ ਬਦਲਣਾ", s3: "ਬ੍ਰੇਕ ਸੈਟਿੰਗ", formTitle: "ਕਰੇਨ ਸੇਵਾ ਮੰਗੋ", fName: "ਤੁਹਾਡਾ ਨਾਂ", fPhone: "ਫੋਨ ਨੰਬਰ", fWeight: "ਕਰੇਨ ਦਾ ਭਾਰ", fIssue: "ਸਮੱਸਿਆ", submit: "ਭੇਜੋ", success: "ਭੇਜ ਦਿੱਤਾ ਗਿਆ." },
  bn: { title: "EOT ক্রেন পরিষেবা", subtitle: "আমরা ক্রেন মেরামত ও পরীক্ষা করি।", capTitle: "ওজন ক্ষমতা", capDesc: "1 টন থেকে 50 টন", servTitle: "আমাদের ক্রেনের কাজ", s1: "হোইস্ট পরীক্ষা", s2: "তারের দড়ি পরিবর্তন", s3: "ব্রেক সেটিং", formTitle: "ক্রেন পরিষেবা চান", fName: "আপনার নাম", fPhone: "ফোন নম্বর", fWeight: "ক্রেনের ওজন", fIssue: "সমস্যা", submit: "পাঠান", success: "পাঠানো হয়েছে।" },
  or: { title: "EOT କ୍ରେନ୍ ସେବା", subtitle: "ଆମେ କ୍ରେନ୍ ସଜାଡୁ ଏବଂ ଯାଞ୍ଚ କରୁ.", capTitle: "ଓଜନ କ୍ଷମତା", capDesc: "1 ଟନ୍ ରୁ 50 ଟନ୍", servTitle: "ଆମର କ୍ରେନ୍ କାମ", s1: "ହୋଇଷ୍ଟ୍ ଯାଞ୍ଚ", s2: "ତାର ରସି ପରିବର୍ତ୍ତନ", s3: "ବ୍ରେକ୍ ସେଟିଂ", formTitle: "କ୍ରେନ୍ ସେବା ମାଗନ୍ତୁ", fName: "ଆପଣଙ୍କ ନାମ", fPhone: "ଫୋନ୍ ନମ୍ବର", fWeight: "କ୍ରେନ୍ ଓଜନ", fIssue: "ସମସ୍ୟା", submit: "ପଠାନ୍ତୁ", success: "ପଠାଗଲା." },
  ur: { title: "EOT کرین کی خدمات", subtitle: "ہم کرینوں کی مرمت اور چیکنگ کرتے ہیں۔", capTitle: "وزن کی گنجائش", capDesc: "1 ٹن سے 50 ٹن تک", servTitle: "ہمارا کرین کا کام", s1: "ہوسٹ کی جانچ", s2: "تار کی رسی تبدیل کرنا", s3: "بریک کی سیٹنگ", formTitle: "کرین سروس طلب کریں", fName: "آپ کا نام", fPhone: "فون نمبر", fWeight: "کرین کا وزن", fIssue: "مسئلہ", submit: "بھیجیں", success: "بھیج دیا گیا۔" },
  as: { title: "EOT ক্ৰেন সেৱাসমূহ", subtitle: "আমি ক্ৰেন মেৰামতি আৰু পৰীক্ষা কৰোঁ.", capTitle: "ওজন ক্ষমতা", capDesc: "1 টনৰ পৰা 50 টনলৈ", servTitle: "আমাৰ ক্ৰেনৰ কাম", s1: "হোইষ্ট পৰীক্ষা", s2: "তাৰৰ ৰছী পৰিৱৰ্তন", s3: "ব্ৰেক ছেটিং", formTitle: "ক্ৰেন সেৱা বিচাৰক", fName: "আপোনাৰ নাম", fPhone: "ফোন নম্বৰ", fWeight: "ক্ৰেনৰ ওজন", fIssue: "সমস্যা", submit: "পঠাওক", success: "পঠোৱা হ'ল." },
  bho: { title: "EOT क्रेन सेवा", subtitle: "हमनी के क्रेन ठीक करीले अउरी जांचीले।", capTitle: "वजन क्षमता", capDesc: "1 टन से 50 टन ले", servTitle: "हमनी के क्रेन के काम", s1: "होइस्ट के जांच", s2: "तार के रस्सी बदलल", s3: "ब्रेक के सेटिंग", formTitle: "क्रेन सेवा खातिर पूछीं", fName: "रउआ नाम", fPhone: "फोन नंबर", fWeight: "क्रेन के वजन", fIssue: "दिक्कत", submit: "भेजीं", success: "भेज दिहल गइल।" }
};

export const EotCranes = () => {
  const [language, setLanguage] = useState(localStorage.getItem('nss_lang') || 'en');
  const [formState, setFormState] = useState({ name: '', phone: '', weight: '', issue: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const handleLangChange = (e) => setLanguage(e.detail);
    window.addEventListener('languageChanged', handleLangChange);
    return () => window.removeEventListener('languageChanged', handleLangChange);
  }, []);

  const t = craneTranslations[language] || craneTranslations['en'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'serviceRequests'), {
        category: 'EOT Crane',
        ...formState,
        timestamp: new Date().toISOString(),
        status: 'Submitted'
      });
      setFormState({ name: '', phone: '', weight: '', issue: '' });
      setStatus(t.success);
      setTimeout(() => setStatus(''), 4000);
    } catch (err) {
      console.error(err);
      setStatus("Error saving record.");
    }
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
          
          {/* Details & Capacities - Stacked Cards */}
          <div className="flex flex-col space-y-6">
            <div className="bg-gray-50 border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-2xl text-gray-900 mb-2">{t.capTitle}</h3>
              <p className="text-xl text-[#0035A0] font-black">{t.capDesc}</p>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-2xl text-gray-900 mb-4">{t.servTitle}</h3>
              <ul className="space-y-4">
                <li className="flex items-center text-lg font-semibold text-gray-700">
                  <ArrowUpRight className="h-6 w-6 text-[#0035A0] mr-2 stroke-[3]" /> {t.s1}
                </li>
                <li className="flex items-center text-lg font-semibold text-gray-700">
                  <ArrowUpRight className="h-6 w-6 text-[#0035A0] mr-2 stroke-[3]" /> {t.s2}
                </li>
                <li className="flex items-center text-lg font-semibold text-gray-700">
                  <ArrowUpRight className="h-6 w-6 text-[#0035A0] mr-2 stroke-[3]" /> {t.s3}
                </li>
              </ul>
            </div>
          </div>

          {/* Inquiry Form */}
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
                <label className="block text-sm font-bold mb-2 text-gray-900">{t.fWeight}</label>
                <input type="text" required value={formState.weight} onChange={(e) => setFormState({...formState, weight: e.target.value})} className="w-full p-3 border border-gray-300 outline-none focus:border-[#0035A0] bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-900">{t.fIssue}</label>
                <textarea required rows="3" value={formState.issue} onChange={(e) => setFormState({...formState, issue: e.target.value})} className="w-full p-3 border border-gray-300 outline-none focus:border-[#0035A0] bg-gray-50"></textarea>
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