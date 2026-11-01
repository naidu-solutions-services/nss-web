import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const automationTranslations = {
  en: { title: "Automation Work", subtitle: "We make your factory machines work automatically.", capTitle: "Panel Details", capDesc: "PLC and Drive Setup", capSpeed: "Sensors and Motors", servTitle: "Our Automation Work", s1: "Control Panel Making", s2: "Machine Wiring", s3: "Fault Finding", formTitle: "Ask for Automation", fName: "Your Name", fPhone: "Phone Number", fType: "Machine Name", fIssue: "What do you need?", submit: "Send Request", success: "Request sent successfully." },
  hi: { title: "ऑटोमेशन का काम", subtitle: "हम आपकी फैक्ट्री की मशीनों को आटोमेटिक बनाते हैं।", capTitle: "पैनल की जानकारी", capDesc: "पीएलसी और ड्राइव सेट करना", capSpeed: "सेंसर और मोटर", servTitle: "हमारा ऑटोमेशन का काम", s1: "कंट्रोल पैनल बनाना", s2: "मशीन की वायरिंग", s3: "खराबी खोजना", formTitle: "ऑटोमेशन के लिए पूछें", fName: "आपका नाम", fPhone: "फोन नंबर", fType: "मशीन का नाम", fIssue: "आपको क्या चाहिए?", submit: "अनुरोध भेजें", success: "अनुरोध भेज दिया गया।" },
  mr: { title: "ऑटोमेशनचे काम", subtitle: "आम्ही तुमच्या फॅक्टरीच्या मशीन ऑटोमॅटिक बनवतो.", capTitle: "पॅनेलची माहिती", capDesc: "पीएलसी आणि ड्राइव्ह सेटअप", capSpeed: "सेन्सर आणि मोटर", servTitle: "आमचे ऑटोमेशनचे काम", s1: "कंट्रोल पॅनेल बनवणे", s2: "मशीनचे वायरिंग", s3: "बिघाड शोधणे", formTitle: "ऑटोमेशनसाठी विचारा", fName: "तुमचे नाव", fPhone: "फोन नंबर", fType: "मशीनचे नाव", fIssue: "तुम्हाला काय हवे आहे?", submit: "विनंती पाठवा", success: "विनंती पाठवली." },
  te: { title: "ఆటోమేషన్ పని", subtitle: "మేము మీ ఫ్యాక్టరీ యంత్రాలను ఆటోమేటిక్ చేస్తాము.", capTitle: "ప్యానెల్ వివరాలు", capDesc: "PLC మరియు డ్రైవ్ సెటప్", capSpeed: "సెన్సార్లు మరియు మోటార్లు", servTitle: "మా ఆటోమేషన్ పని", s1: "కంట్రోల్ ప్యానెల్ తయారీ", s2: "యంత్రం వైరింగ్", s3: "లోపం కనుగొనడం", formTitle: "ఆటోమేషన్ అడగండి", fName: "మీ పేరు", fPhone: "ఫోన్ నంబర్", fType: "యంత్రం పేరు", fIssue: "మీకు ఏమి కావాలి?", submit: "పంపండి", success: "పంపబడింది." },
  ta: { title: "ஆட்டோமேஷன் வேலை", subtitle: "உங்கள் தொழிற்சாலை இயந்திரங்களை தானியங்கியாக மாற்றுகிறோம்.", capTitle: "பேனல் விவரங்கள்", capDesc: "PLC மற்றும் டிரைவ் அமைப்பு", capSpeed: "சென்சார்கள் மற்றும் மோட்டார்கள்", servTitle: "எங்கள் ஆட்டோமேஷன் வேலை", s1: "கட்டுப்பாட்டு பேனல் தயாரித்தல்", s2: "இயந்திர வயரிங்", s3: "குறைபாடு கண்டுபிடித்தல்", formTitle: "ஆட்டோமேஷன் கேட்க", fName: "உங்கள் பெயர்", fPhone: "போன் எண்", fType: "இயந்திர பெயர்", fIssue: "உங்களுக்கு என்ன தேவை?", submit: "அனுப்பு", success: "அனுப்பப்பட்டது." },
  kn: { title: "ಆಟೊಮೇಷನ್ ಕೆಲಸ", subtitle: "ನಾವು ನಿಮ್ಮ ಕಾರ್ಖಾನೆಯ ಯಂತ್ರಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತಗೊಳಿಸುತ್ತೇವೆ.", capTitle: "ಪ್ಯಾನಲ್ ವಿವರಗಳು", capDesc: "ಪಿಎಲ್ಸಿ ಮತ್ತು ಡ್ರೈವ್ ಸೆಟಪ್", capSpeed: "ಸಂವೇದಕಗಳು ಮತ್ತು ಮೋಟಾರ್‌ಗಳು", servTitle: "ನಮ್ಮ ಆಟೊಮೇಷನ್ ಕೆಲಸ", s1: "ನಿಯಂತ್ರಣ ಪ್ಯಾನಲ್ ತಯಾರಿಕೆ", s2: "ಯಂತ್ರದ ವೈರಿಂಗ್", s3: "ದೋಷ ಹುಡುಕುವುದು", formTitle: "ಆಟೊಮೇಷನ್ ಕೇಳಿ", fName: "ನಿಮ್ಮ ಹೆಸರು", fPhone: "ಫೋನ್ ಸಂಖ್ಯೆ", fType: "ಯಂತ್ರದ ಹೆಸರು", fIssue: "ನಿಮಗೆ ಏನು ಬೇಕು?", submit: "ಕಳುಹಿಸಿ", success: "ಕಳುಹಿಸಲಾಗಿದೆ." },
  ml: { title: "ഓട്ടോമേഷൻ ജോലി", subtitle: "ഞങ്ങൾ നിങ്ങളുടെ ഫാക്ടറി മെഷീനുകൾ ഓട്ടോമാറ്റിക് ആക്കുന്നു.", capTitle: "പാനൽ വിവരങ്ങൾ", capDesc: "PLC, ഡ്രൈവ് സജ്ജീകരണം", capSpeed: "സെൻസറുകളും മോട്ടോറുകളും", servTitle: "ഞങ്ങളുടെ ഓട്ടോമേഷൻ ജോലി", s1: "കൺട്രോൾ പാനൽ നിർമ്മാണം", s2: "മെഷീൻ വയറിംഗ്", s3: "തകരാർ കണ്ടെത്തൽ", formTitle: "ഓട്ടോമേഷൻ ചോദിക്കുക", fName: "നിങ്ങളുടെ പേര്", fPhone: "ഫോൺ നമ്പർ", fType: "മെഷീന്റെ പേര്", fIssue: "നിങ്ങൾക്ക് എന്താണ് വേണ്ടത്?", submit: "അയയ്ക്കുക", success: "അയച്ചു." },
  gu: { title: "ઓટોમેશનનું કામ", subtitle: "અમે તમારી ફેક્ટરીની મશીનોને ઓટોમેટિક બનાવીએ છીએ.", capTitle: "પેનલની માહિતી", capDesc: "PLC અને ડ્રાઇવ સેટઅપ", capSpeed: "સેન્સર અને મોટર", servTitle: "અમારું ઓટોમેશનનું કામ", s1: "કંટ્રોલ પેનલ બનાવવું", s2: "મશીન વાયરિંગ", s3: "ખામી શોધવી", formTitle: "ઓટોમેશન માટે પૂછો", fName: "તમારું નામ", fPhone: "ફોન નંબર", fType: "મશીનનું નામ", fIssue: "તમારે શું જોઈએ છે?", submit: "મોકલો", success: "મોકલાઈ ગયું." },
  pa: { title: "ਆਟੋਮੇਸ਼ਨ ਦਾ ਕੰਮ", subtitle: "ਅਸੀਂ ਤੁਹਾਡੀ ਫੈਕਟਰੀ ਦੀਆਂ ਮਸ਼ੀਨਾਂ ਨੂੰ ਆਟੋਮੈਟਿਕ ਬਣਾਉਂਦੇ ਹਾਂ.", capTitle: "ਪੈਨਲ ਦੀ ਜਾਣਕਾਰੀ", capDesc: "PLC ਅਤੇ ਡਰਾਈਵ ਸੈੱਟਅੱਪ", capSpeed: "ਸੈਂਸਰ ਅਤੇ ਮੋਟਰ", servTitle: "ਸਾਡਾ ਆਟੋਮੇਸ਼ਨ ਦਾ ਕੰਮ", s1: "ਕੰਟਰੋਲ ਪੈਨਲ ਬਣਾਉਣਾ", s2: "ਮਸ਼ੀਨ ਵਾਇਰਿੰਗ", s3: "ਖਰਾਬੀ ਲੱਭਣਾ", formTitle: "ਆਟੋਮੇਸ਼ਨ ਮੰਗੋ", fName: "ਤੁਹਾਡਾ ਨਾਂ", fPhone: "ਫੋਨ ਨੰਬਰ", fType: "ਮਸ਼ੀਨ ਦਾ ਨਾਂ", fIssue: "ਤੁਹਾਨੂੰ ਕੀ ਚਾਹੀਦਾ ਹੈ?", submit: "ਭੇਜੋ", success: "ਭੇਜ ਦਿੱਤਾ ਗਿਆ." },
  bn: { title: "অটোমেশনের কাজ", subtitle: "আমরা আপনার কারখানার মেশিনগুলি স্বয়ংক্রিয় করি।", capTitle: "প্যানেলের বিবরণ", capDesc: "পিএলসি এবং ড্রাইভ সেটআপ", capSpeed: "সেন্সর এবং মোটর", servTitle: "আমাদের অটোমেশনের কাজ", s1: "কন্ট্রোল প্যানেল তৈরি", s2: "মেশিন ওয়্যারিং", s3: "ত্রুটি খোঁজা", formTitle: "অটোমেশন চান", fName: "আপনার নাম", fPhone: "ফোন নম্বর", fType: "মেশিনের নাম", fIssue: "আপনার কী দরকার?", submit: "পাঠান", success: "পাঠানো হয়েছে।" },
  or: { title: "ଅଟୋମେସନ୍ କାମ", subtitle: "ଆମେ ଆପଣଙ୍କ କାରଖାନା ମେସିନ୍ ଗୁଡିକୁ ଅଟୋମେଟିକ୍ କରୁ.", capTitle: "ପ୍ୟାନେଲ୍ ବିବରଣୀ", capDesc: "ପିଏଲସି ଏବଂ ଡ୍ରାଇଭ୍ ସେଟଅପ୍", capSpeed: "ସେନ୍ସର ଏବଂ ମୋଟର", servTitle: "ଆମର ଅଟୋମେସନ୍ କାମ", s1: "କଣ୍ଟ୍ରୋଲ୍ ପ୍ୟାନେଲ୍ ତିଆରି", s2: "ମେସିନ୍ ୱାରିଂ", s3: "ତ୍ରୁଟି ଖୋଜିବା", formTitle: "ଅଟୋମେସନ୍ ମାଗନ୍ତୁ", fName: "ଆପଣଙ୍କ ନାମ", fPhone: "ଫୋନ୍ ନମ୍ବର", fType: "ମେସିନ୍ ନାମ", fIssue: "ଆପଣଙ୍କୁ କଣ ଦରକାର?", submit: "ପଠାନ୍ତୁ", success: "ପଠାଗଲା." },
  ur: { title: "آٹومیشن کا کام", subtitle: "ہم آپ کی فیکٹری کی مشینوں کو خودکار بناتے ہیں۔", capTitle: "پینل کی معلومات", capDesc: "پی ایل سی اور ڈرائیو سیٹ اپ", capSpeed: "سینسر اور موٹر", servTitle: "ہمارا آٹومیشن کا کام", s1: "کنٹرول پینل بنانا", s2: "مشین کی وائرنگ", s3: "خرابی تلاش کرنا", formTitle: "آٹومیشن طلب کریں", fName: "آپ کا نام", fPhone: "فون نمبر", fType: "مشین کا نام", fIssue: "آپ کو کیا چاہیے؟", submit: "بھیجیں", success: "بھیج دیا گیا۔" },
  as: { title: "অটোমেচনৰ কাম", subtitle: "আমি আপোনাৰ কাৰখানাৰ মেচিন স্বয়ংক্ৰিয় কৰোঁ.", capTitle: "পেনেলৰ বিৱৰণ", capDesc: "পিএলচি আৰু ড্ৰাইভ ছেটআপ", capSpeed: "ছেন্সৰ আৰু মটৰ", servTitle: "আমাৰ অটোমেচনৰ কাম", s1: "কণ্ট্ৰল পেনেল নিৰ্মাণ", s2: "মেচিন ৱায়াৰিং", s3: "বিজুতি বিচৰা", formTitle: "অটোমেচন বিচাৰক", fName: "আপোনাৰ নাম", fPhone: "ফোন নম্বৰ", fType: "মেচিনৰ নাম", fIssue: "আপোনাক কি লাগে?", submit: "পঠাওক", success: "পঠোৱা হ'ল." },
  bho: { title: "ऑटोमेशन के काम", subtitle: "हमनी के रउआ फैक्टरी के मशीन के ऑटोमेटिक बनावेनी जा।", capTitle: "पैनल के जानकारी", capDesc: "पीएलसी अउरी ड्राइव सेटअप", capSpeed: "सेंसर अउरी मोटर", servTitle: "हमनी के ऑटोमेशन के काम", s1: "कंट्रोल पैनल बनावल", s2: "मशीन के वायरिंग", s3: "खराबी खोजल", formTitle: "ऑटोमेशन खातिर पूछीं", fName: "रउआ नाम", fPhone: "फोन नंबर", fType: "मशीन के नाम", fIssue: "रउआ का चाहीं?", submit: "भेजीं", success: "भेज दिहल गइल।" }
};

export const Automation = () => {
  const [language, setLanguage] = useState(localStorage.getItem('nss_lang') || 'en');
  const [formState, setFormState] = useState({ name: '', phone: '', machineType: '', issue: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const handleLangChange = (e) => setLanguage(e.detail);
    window.addEventListener('languageChanged', handleLangChange);
    return () => window.removeEventListener('languageChanged', handleLangChange);
  }, []);

  const t = automationTranslations[language] || automationTranslations['en'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'serviceRequests'), {
        category: 'Automation Work',
        ...formState,
        timestamp: new Date().toISOString(),
        status: 'Submitted'
      });
      setFormState({ name: '', phone: '', machineType: '', issue: '' });
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
        
        <div className="mb-12 border-b border-gray-200 pb-6">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tight leading-tight">
            {t.title}
          </h1>
          <p className="text-lg text-gray-700 mt-4 font-semibold">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          <div className="flex flex-col space-y-6">
            <div className="bg-gray-50 border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-2xl text-gray-900 mb-2">{t.capTitle}</h3>
              <p className="text-xl text-[#0035A0] font-black mb-1">{t.capDesc}</p>
              <p className="text-xl text-[#0035A0] font-black">{t.capSpeed}</p>
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
                <label className="block text-sm font-bold mb-2 text-gray-900">{t.fType}</label>
                <input type="text" required value={formState.machineType} onChange={(e) => setFormState({...formState, machineType: e.target.value})} className="w-full p-3 border border-gray-300 outline-none focus:border-[#0035A0] bg-gray-50" />
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