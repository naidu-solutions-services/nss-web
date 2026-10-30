import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const roofTranslations = {
  en: { title: "Roof Machine Services", subtitle: "We fix and check roof sheet making machines.", capTitle: "Machine Details", capDesc: "Sheet Thickness: 0.3mm to 0.8mm", capSpeed: "Speed: 15 meters per minute", servTitle: "Our Machine Work", s1: "Roller Repair", s2: "Cutter Blade Change", s3: "Defect Fixing", formTitle: "Ask for Machine Service", fName: "Your Name", fPhone: "Phone Number", fType: "Machine Type", fIssue: "Problem", submit: "Send Request", success: "Request sent successfully." },
  hi: { title: "छत की मशीन सेवाएं", subtitle: "हम छत की शीट बनाने वाली मशीनें ठीक करते हैं।", capTitle: "मशीन की जानकारी", capDesc: "शीट की मोटाई: 0.3mm से 0.8mm", capSpeed: "रफ्तार: 15 मीटर प्रति मिनट", servTitle: "हमारा मशीन का काम", s1: "रोलर की मरम्मत", s2: "कटर ब्लेड बदलना", s3: "खराबी ठीक करना", formTitle: "मशीन सेवा के लिए पूछें", fName: "आपका नाम", fPhone: "फोन नंबर", fType: "मशीन का प्रकार", fIssue: "समस्या", submit: "अनुरोध भेजें", success: "अनुरोध भेज दिया गया।" },
  mr: { title: "छताच्या मशीन सेवा", subtitle: "आम्ही छताची शीट बनवणाऱ्या मशीन दुरुस्त करतो.", capTitle: "मशीनची माहिती", capDesc: "शीटची जाडी: 0.3mm ते 0.8mm", capSpeed: "वेग: 15 मीटर प्रति मिनिट", servTitle: "आमचे मशीनचे काम", s1: "रोलर दुरुस्ती", s2: "कटर ब्लेड बदलणे", s3: "बिघाड दुरुस्त करणे", formTitle: "मशीन सेवा विचारा", fName: "तुमचे नाव", fPhone: "फोन नंबर", fType: "मशीनचा प्रकार", fIssue: "समस्या", submit: "विनंती पाठवा", success: "विनंती पाठवली." },
  te: { title: "రూఫ్ యంత్రం సేవలు", subtitle: "మేము రూఫ్ షీట్ తయారు చేసే యంత్రాలను బాగుచేస్తాము.", capTitle: "యంత్రం వివరాలు", capDesc: "షీట్ మందం: 0.3mm నుండి 0.8mm", capSpeed: "వేగం: నిమిషానికి 15 మీటర్లు", servTitle: "మా యంత్రం పని", s1: "రోలర్ మరమ్మత్తు", s2: "కట్టర్ బ్లేడ్ మార్పు", s3: "లోపం సరిచేయడం", formTitle: "యంత్రం సేవ అడగండి", fName: "మీ పేరు", fPhone: "ఫోన్ నంబర్", fType: "యంత్రం రకం", fIssue: "సమస్య", submit: "పంపండి", success: "పంపబడింది." },
  ta: { title: "கூரையின் இயந்திர சேவைகள்", subtitle: "நாங்கள் கூரை ஷீட் செய்யும் இயந்திரங்களை சரிசெய்கிறோம்.", capTitle: "இயந்திர விவரங்கள்", capDesc: "ஷீட் தடிமன்: 0.3mm முதல் 0.8mm", capSpeed: "வேகம்: நிமிடத்திற்கு 15 மீட்டர்", servTitle: "எங்கள் இயந்திர வேலை", s1: "ரோலர் பழுது", s2: "கட்டர் பிளேடு மாற்றம்", s3: "குறைபாடு சரிசெய்தல்", formTitle: "இயந்திர சேவை கேட்க", fName: "உங்கள் பெயர்", fPhone: "போன் எண்", fType: "இயந்திர வகை", fIssue: "பிரச்சனை", submit: "அனுப்பு", success: "அனுப்பப்பட்டது." },
  kn: { title: "ಛಾವಣಿಯ ಯಂತ್ರದ ಸೇವೆಗಳು", subtitle: "ನಾವು ಛಾವಣಿಯ ಶೀಟ್ ಮಾಡುವ ಯಂತ್ರಗಳನ್ನು ಸರಿಪಡಿಸುತ್ತೇವೆ.", capTitle: "ಯಂತ್ರದ ವಿವರಗಳು", capDesc: "ಶೀಟ್ ದಪ್ಪ: 0.3mm ನಿಂದ 0.8mm", capSpeed: "ವೇಗ: ನಿಮಿಷಕ್ಕೆ 15 ಮೀಟರ್", servTitle: "ನಮ್ಮ ಯಂತ್ರದ ಕೆಲಸ", s1: "ರೋಲರ್ ದುರಸ್ತಿ", s2: "ಕಟ್ಟರ್ ಬ್ಲೇಡ್ ಬದಲಾವಣೆ", s3: "ದೋಷ ಸರಿಪಡಿಸುವುದು", formTitle: "ಯಂತ್ರದ ಸೇವೆ ಕೇಳಿ", fName: "ನಿಮ್ಮ ಹೆಸರು", fPhone: "ಫೋನ್ ಸಂಖ್ಯೆ", fType: "ಯಂತ್ರದ ಪ್ರಕಾರ", fIssue: "ಸಮಸ್ಯೆ", submit: "ಕಳುಹಿಸಿ", success: "ಕಳುಹಿಸಲಾಗಿದೆ." },
  ml: { title: "റൂഫ് മെഷീൻ സേവനങ്ങൾ", subtitle: "ഞങ്ങൾ റൂഫ് ഷീറ്റ് ഉണ്ടാക്കുന്ന മെഷീനുകൾ ശരിയാക്കുന്നു.", capTitle: "മെഷീൻ വിവരങ്ങൾ", capDesc: "ഷീറ്റ് കനം: 0.3mm മുതൽ 0.8mm", capSpeed: "വേഗത: മിനിറ്റിൽ 15 മീറ്റർ", servTitle: "ഞങ്ങളുടെ മെഷീൻ ജോലി", s1: "റോളർ അറ്റകുറ്റപ്പണി", s2: "കട്ടർ ബ്ലേഡ് മാറ്റം", s3: "തകരാർ പരിഹരിക്കൽ", formTitle: "മെഷീൻ സേവനം ചോദിക്കുക", fName: "നിങ്ങളുടെ പേര്", fPhone: "ഫോൺ നമ്പർ", fType: "മെഷീൻ തരം", fIssue: "പ്രശ്നം", submit: "അയയ്ക്കുക", success: "അയച്ചു." },
  gu: { title: "છતની મશીન સેવાઓ", subtitle: "અમે છતની શીટ બનાવતી મશીનો ઠીક કરીએ છીએ.", capTitle: "મશીનની માહિતી", capDesc: "શીટની જાડાઈ: 0.3mm થી 0.8mm", capSpeed: "ઝડપ: 15 મીટર પ્રતિ મિનિટ", servTitle: "અમારું મશીનનું કામ", s1: "રોલર રિપેર", s2: "કટર બ્લેડ બદલવી", s3: "ખામી સુધારવી", formTitle: "મશીન સેવા માટે પૂછો", fName: "તમારું નામ", fPhone: "ફોન નંબર", fType: "મશીનનો પ્રકાર", fIssue: "સમસ્યા", submit: "મોકલો", success: "મોકલાઈ ગયું." },
  pa: { title: "ਛੱਤ ਦੀ ਮਸ਼ੀਨ ਸੇਵਾਵਾਂ", subtitle: "ਅਸੀਂ ਛੱਤ ਦੀ ਸ਼ੀਟ ਬਣਾਉਣ ਵਾਲੀਆਂ ਮਸ਼ੀਨਾਂ ਠੀਕ ਕਰਦੇ ਹਾਂ.", capTitle: "ਮਸ਼ੀਨ ਦੀ ਜਾਣਕਾਰੀ", capDesc: "ਸ਼ੀਟ ਦੀ ਮੋਟਾਈ: 0.3mm ਤੋਂ 0.8mm", capSpeed: "ਰਫਤਾਰ: 15 ਮੀਟਰ ਪ੍ਰਤੀ ਮਿੰਟ", servTitle: "ਸਾਡਾ ਮਸ਼ੀਨ ਦਾ ਕੰਮ", s1: "ਰੋਲਰ ਦੀ ਮੁਰੰਮਤ", s2: "ਕਟਰ ਬਲੇਡ ਬਦਲਣਾ", s3: "ਖਰਾਬੀ ਠੀਕ ਕਰਨਾ", formTitle: "ਮਸ਼ੀਨ ਸੇਵਾ ਮੰਗੋ", fName: "ਤੁਹਾਡਾ ਨਾਂ", fPhone: "ਫੋਨ ਨੰਬਰ", fType: "ਮਸ਼ੀਨ ਦੀ ਕਿਸਮ", fIssue: "ਸਮੱਸਿਆ", submit: "ਭੇਜੋ", success: "ਭੇਜ ਦਿੱਤਾ ਗਿਆ." },
  bn: { title: "ছাদের মেশিন পরিষেবা", subtitle: "আমরা ছাদের শিট তৈরির মেশিন ঠিক করি।", capTitle: "মেশিনের বিবরণ", capDesc: "শিটের বেধ: 0.3mm থেকে 0.8mm", capSpeed: "গতি: মিনিটে 15 মিটার", servTitle: "আমাদের মেশিনের কাজ", s1: "রোলার মেরামত", s2: "কাটার ব্লেড পরিবর্তন", s3: "ত্রুটি সংশোধন", formTitle: "মেশিন পরিষেবা চান", fName: "আপনার নাম", fPhone: "ফোন নম্বর", fType: "মেশিনের ধরন", fIssue: "সমস্যা", submit: "পাঠান", success: "পাঠানো হয়েছে।" },
  or: { title: "ଛାତ ମେସିନ୍ ସେବା", subtitle: "ଆମେ ଛାତ ସିଟ୍ ତିଆରି ମେସିନ୍ ସଜାଡୁ.", capTitle: "ମେସିନ୍ ବିବରଣୀ", capDesc: "ସିଟ୍ ମୋଟେଇ: 0.3mm ରୁ 0.8mm", capSpeed: "ଗତି: ମିନିଟ୍ ପ୍ରତି 15 ମିଟର", servTitle: "ଆମର ମେସିନ୍ କାମ", s1: "ରୋଲର୍ ମରାମତି", s2: "କଟର ବ୍ଲେଡ୍ ପରିବର୍ତ୍ତନ", s3: "ତ୍ରୁଟି ସୁଧାରିବା", formTitle: "ମେସିନ୍ ସେବା ମାଗନ୍ତୁ", fName: "ଆପଣଙ୍କ ନାମ", fPhone: "ଫୋନ୍ ନମ୍ବର", fType: "ମେସିନ୍ ପ୍ରକାର", fIssue: "ସମସ୍ୟା", submit: "ପଠାନ୍ତୁ", success: "ପଠାଗଲା." },
  ur: { title: "چھت کی مشین کی خدمات", subtitle: "ہم چھت کی شیٹ بنانے والی مشینیں ٹھیک کرتے ہیں۔", capTitle: "مشین کی معلومات", capDesc: "شیٹ کی موٹائی: 0.3mm سے 0.8mm", capSpeed: "رفتار: 15 میٹر فی منٹ", servTitle: "ہمارا مشین کا کام", s1: "رولر کی مرمت", s2: "کٹر بلیڈ کی تبدیلی", s3: "خرابی دور کرنا", formTitle: "مشین سروس طلب کریں", fName: "آپ کا نام", fPhone: "فون نمبر", fType: "مشین کی قسم", fIssue: "مسئلہ", submit: "بھیجیں", success: "بھیج دیا گیا۔" },
  as: { title: "ছাদৰ মেচিন সেৱাসমূহ", subtitle: "আমি ছাদৰ শ্বীট বনোৱা মেচিন মেৰামতি কৰোঁ.", capTitle: "মেচিনৰ বিৱৰণ", capDesc: "শ্বীটৰ ডাঠ: 0.3mm ৰ পৰা 0.8mm", capSpeed: "গতি: প্ৰতি মিনিটত 15 মিটাৰ", servTitle: "আমাৰ মেচিনৰ কাম", s1: "ৰোলাৰ মেৰামতি", s2: "কটাৰ ব্লেড পৰিৱৰ্তন", s3: "বিজুতি মেৰামতি", formTitle: "মেচিন সেৱা বিচাৰক", fName: "আপোনাৰ নাম", fPhone: "ফোন নম্বৰ", fType: "মেচিনৰ প্ৰকাৰ", fIssue: "সমস্যা", submit: "পঠাওক", success: "পঠোৱা হ'ল." },
  bho: { title: "छत के मशीन सेवा", subtitle: "हमनी के छत के शीट बनावे वाला मशीन ठीक करीले।", capTitle: "मशीन के जानकारी", capDesc: "शीट के मोटाई: 0.3mm से 0.8mm", capSpeed: "रफ्तार: 15 मीटर प्रति मिनट", servTitle: "हमनी के मशीन के काम", s1: "रोलर के मरम्मत", s2: "कटर ब्लेड बदलल", s3: "खराबी ठीक कइल", formTitle: "मशीन सेवा खातिर पूछीं", fName: "रउआ नाम", fPhone: "फोन नंबर", fType: "मशीन के प्रकार", fIssue: "दिक्कत", submit: "भेजीं", success: "भेज दिहल गइल।" }
};

export const RoofProfile = () => {
  const [language, setLanguage] = useState(localStorage.getItem('nss_lang') || 'en');
  const [formState, setFormState] = useState({ name: '', phone: '', machineType: '', issue: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const handleLangChange = (e) => setLanguage(e.detail);
    window.addEventListener('languageChanged', handleLangChange);
    return () => window.removeEventListener('languageChanged', handleLangChange);
  }, []);

  const t = roofTranslations[language] || roofTranslations['en'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'serviceRequests'), {
        category: 'Roof Profile Machine',
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