import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const knowledgeTranslations = {
  en: { title: "Knowledge Base", subtitle: "Simple guides for factory machine care and safety.", g1Title: "Crane Safety Guide", g1Desc: "How to safely operate 1 Ton to 50 Ton EOT Cranes. Daily check routines for wire ropes and hoists.", g2Title: "Roof Machine Care", g2Desc: "Keeping your 0.3mm to 0.8mm sheet making machines running at 15 meters per minute without jams.", g3Title: "Panel Wiring Basics", g3Desc: "Simple steps to keep electrical panels safe from dust and heat in the factory.", readMore: "Read Full Guide", formTitle: "Ask a Question", fName: "Your Name", fPhone: "Phone Number", fTopic: "Topic", fIssue: "Your Question", submit: "Send Question", success: "Question sent successfully." },
  hi: { title: "ज्ञान केंद्र", subtitle: "फैक्ट्री मशीन की देखभाल और सुरक्षा के आसान तरीके।", g1Title: "क्रेन सुरक्षा गाइड", g1Desc: "1 टन से 50 टन क्रेन को सुरक्षित कैसे चलाएं। तार और होइस्ट की रोज की जांच।", g2Title: "छत मशीन की देखभाल", g2Desc: "0.3mm से 0.8mm शीट बनाने वाली मशीन को बिना रुके 15 मीटर प्रति मिनट कैसे चलाएं।", g3Title: "पैनल वायरिंग के नियम", g3Desc: "फैक्ट्री में बिजली के पैनल को धूल और गर्मी से बचाने के आसान तरीके।", readMore: "पूरा पढ़ें", formTitle: "सवाल पूछें", fName: "आपका नाम", fPhone: "फोन नंबर", fTopic: "विषय", fIssue: "आपका सवाल", submit: "सवाल भेजें", success: "सवाल भेज दिया गया।" },
  mr: { title: "ज्ञान केंद्र", subtitle: "फॅक्टरी मशीनची काळजी आणि सुरक्षेसाठी सोप्या पद्धती.", g1Title: "क्रेन सुरक्षा माहिती", g1Desc: "1 टन ते 50 टन क्रेन सुरक्षित कशी चालवायची. वायर आणि होइस्टची रोजची तपासणी.", g2Title: "छताच्या मशीनची काळजी", g2Desc: "0.3mm ते 0.8mm शीट बनवणारी मशीन न थांबता 15 मीटर प्रति मिनिट कशी चालवायची.", g3Title: "पॅनेल वायरिंग नियम", g3Desc: "फॅक्टरीत विजेच्या पॅनेलला धूळ आणि उष्णतेपासून वाचवण्याचे सोपे उपाय.", readMore: "पूर्ण वाचा", formTitle: "प्रश्न विचारा", fName: "तुमचे नाव", fPhone: "फोन नंबर", fTopic: "विषय", fIssue: "तुमचा प्रश्न", submit: "प्रश्न पाठवा", success: "प्रश्न पाठवला." },
  te: { title: "జ్ఞాన కేంద్రం", subtitle: "ఫ్యాక్టరీ యంత్రాల సంరక్షణ మరియు భద్రత కోసం సులభమైన పద్ధతులు.", g1Title: "క్రేన్ భద్రతా గైడ్", g1Desc: "1 టన్ను నుండి 50 టన్నుల క్రేన్‌ను సురక్షితంగా ఎలా నడపాలి. రోజూ వైర్ తనిఖీ.", g2Title: "రూఫ్ యంత్రం సంరక్షణ", g2Desc: "0.3mm నుండి 0.8mm షీట్ యంత్రాన్ని నిమిషానికి 15 మీటర్ల వేగంతో ఎలా నడపాలి.", g3Title: "ప్యానెల్ వైరింగ్ నియమాలు", g3Desc: "ఎలక్ట్రిక్ ప్యానెల్‌ను దుమ్ము మరియు వేడి నుండి రక్షించడానికి సులభమైన దశలు.", readMore: "పూర్తిగా చదవండి", formTitle: "ప్రశ్న అడగండి", fName: "మీ పేరు", fPhone: "ఫోన్ నంబర్", fTopic: "అంశం", fIssue: "మీ ప్రశ్న", submit: "ప్రశ్న పంపండి", success: "ప్రశ్న పంపబడింది." },
  ta: { title: "அறிவு மையம்", subtitle: "தொழிற்சாலை இயந்திர பராமரிப்பு மற்றும் பாதுகாப்பிற்கான எளிய வழிகாட்டிகள்.", g1Title: "கிரேன் பாதுகாப்பு வழிகாட்டி", g1Desc: "1 டன் முதல் 50 டன் கிரேனை எவ்வாறு பாதுகாப்பாக இயக்குவது. தினசரி கம்பி சோதனை.", g2Title: "கூரை இயந்திர பராமரிப்பு", g2Desc: "0.3mm முதல் 0.8mm ஷீட் இயந்திரத்தை நிமிடத்திற்கு 15 மீட்டர் வேகத்தில் இயக்குவது எப்படி.", g3Title: "பேனல் வயரிங் விதிகள்", g3Desc: "மின்சார பேனல்களை தூசி மற்றும் வெப்பத்திலிருந்து பாதுகாக்க எளிய வழிகள்.", readMore: "முழுமையாக படிக்க", formTitle: "கேள்வி கேட்க", fName: "உங்கள் பெயர்", fPhone: "போன் எண்", fTopic: "தலைப்பு", fIssue: "உங்கள் கேள்வி", submit: "கேள்வியை அனுப்பு", success: "கேள்வி அனுப்பப்பட்டது." },
  kn: { title: "ಜ್ಞಾನ ಕೇಂದ್ರ", subtitle: "ಕಾರ್ಖಾನೆ ಯಂತ್ರದ ಆರೈಕೆ ಮತ್ತು ಸುರಕ್ಷತೆಗಾಗಿ ಸರಳ ಮಾರ್ಗದರ್ಶಿಗಳು.", g1Title: "ಕ್ರೇನ್ ಸುರಕ್ಷತಾ ಮಾರ್ಗದರ್ಶಿ", g1Desc: "1 ಟನ್ ನಿಂದ 50 ಟನ್ ಕ್ರೇನ್ ಅನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಹೇಗೆ ಓಡಿಸುವುದು. ದೈನಂದಿನ ತಂತಿ ತಪಾಸಣೆ.", g2Title: "ಛಾವಣಿ ಯಂತ್ರದ ಆರೈಕೆ", g2Desc: "0.3mm ನಿಂದ 0.8mm ಶೀಟ್ ಯಂತ್ರವನ್ನು ನಿಮಿಷಕ್ಕೆ 15 ಮೀಟರ್ ವೇಗದಲ್ಲಿ ಹೇಗೆ ಓಡಿಸುವುದು.", g3Title: "ಪ್ಯಾನಲ್ ವೈರಿಂಗ್ ನಿಯಮಗಳು", g3Desc: "ವಿದ್ಯುತ್ ಪ್ಯಾನಲ್‌ಗಳನ್ನು ಧೂಳು ಮತ್ತು ಶಾಖದಿಂದ ರಕ್ಷಿಸಲು ಸರಳ ಮಾರ್ಗಗಳು.", readMore: "ಸಂಪೂರ್ಣವಾಗಿ ಓದಿ", formTitle: "ಪ್ರಶ್ನೆ ಕೇಳಿ", fName: "ನಿಮ್ಮ ಹೆಸರು", fPhone: "ಫೋನ್ ಸಂಖ್ಯೆ", fTopic: "ವಿಷಯ", fIssue: "ನಿಮ್ಮ ಪ್ರಶ್ನೆ", submit: "ಪ್ರಶ್ನೆ ಕಳುಹಿಸಿ", success: "ಪ್ರಶ್ನೆ ಕಳುಹಿಸಲಾಗಿದೆ." },
  ml: { title: "വിവര കേന്ദ്രം", subtitle: "ഫാക്ടറി മെഷീൻ സംരക്ഷണത്തിനും സുരക്ഷയ്ക്കുമുള്ള ലളിതമായ വഴികാട്ടികൾ.", g1Title: "ക്രെയിൻ സുരക്ഷാ ഗൈഡ്", g1Desc: "1 ടൺ മുതൽ 50 ടൺ വരെയുള്ള ക്രെയിൻ എങ്ങനെ സുരക്ഷിതമായി പ്രവർത്തിപ്പിക്കാം.", g2Title: "റൂഫ് മെഷീൻ സംരക്ഷണം", g2Desc: "0.3mm മുതൽ 0.8mm വരെയുള്ള ഷീറ്റ് മെഷീൻ മിനിറ്റിൽ 15 മീറ്റർ വേഗതയിൽ എങ്ങനെ പ്രവർത്തിപ്പിക്കാം.", g3Title: "പാനൽ വയറിംഗ് നിയമങ്ങൾ", g3Desc: "ഇലക്ട്രിക് പാനലുകളെ പൊടിയിൽ നിന്നും ചൂടിൽ നിന്നും സംരക്ഷിക്കാൻ ലളിതമായ വഴികൾ.", readMore: "പൂർണ്ണമായി വായിക്കുക", formTitle: "ചോദ്യം ചോദിക്കുക", fName: "നിങ്ങളുടെ പേര്", fPhone: "ഫോൺ നമ്പർ", fTopic: "വിഷയം", fIssue: "നിങ്ങളുടെ ചോദ്യം", submit: "ചോദ്യം അയയ്ക്കുക", success: "ചോദ്യം അയച്ചു." },
  gu: { title: "જ્ઞાન કેન્દ્ર", subtitle: "ફેક્ટરી મશીનની સંભાળ અને સુરક્ષા માટે સરળ માર્ગદર્શિકા.", g1Title: "ક્રેન સુરક્ષા માર્ગદર્શિકા", g1Desc: "1 ટન થી 50 ટન ક્રેન સુરક્ષિત રીતે કેવી રીતે ચલાવવી. દૈનિક વાયર તપાસ.", g2Title: "છત મશીનની સંભાળ", g2Desc: "0.3mm થી 0.8mm શીટ મશીનને પ્રતિ મિનિટ 15 મીટરની ઝડપે કેવી રીતે ચલાવવી.", g3Title: "પેનલ વાયરિંગ નિયમો", g3Desc: "ઇલેક્ટ્રિક પેનલ્સને ધૂળ અને ગરમીથી બચાવવા માટેના સરળ રસ્તાઓ.", readMore: "સંપૂર્ણ વાંચો", formTitle: "પ્રશ્ન પૂછો", fName: "તમારું નામ", fPhone: "ફોન નંબર", fTopic: "વિષય", fIssue: "તમારો પ્રશ્ન", submit: "પ્રશ્ન મોકલો", success: "પ્રશ્ન મોકલાઈ ગયો." },
  pa: { title: "ਗਿਆਨ ਕੇਂਦਰ", subtitle: "ਫੈਕਟਰੀ ਮਸ਼ੀਨ ਦੀ ਸੰਭਾਲ ਅਤੇ ਸੁਰੱਖਿਆ ਲਈ ਆਸਾਨ ਤਰੀਕੇ.", g1Title: "ਕਰੇਨ ਸੁਰੱਖਿਆ ਗਾਈਡ", g1Desc: "1 ਟਨ ਤੋਂ 50 ਟਨ ਕਰੇਨ ਨੂੰ ਸੁਰੱਖਿਅਤ ਕਿਵੇਂ ਚਲਾਉਣਾ ਹੈ. ਰੋਜ਼ਾਨਾ ਤਾਰ ਦੀ ਜਾਂਚ.", g2Title: "ਛੱਤ ਮਸ਼ੀਨ ਦੀ ਸੰਭਾਲ", g2Desc: "0.3mm ਤੋਂ 0.8mm ਸ਼ੀਟ ਬਣਾਉਣ ਵਾਲੀ ਮਸ਼ੀਨ ਨੂੰ 15 ਮੀਟਰ ਪ੍ਰਤੀ ਮਿੰਟ ਦੀ ਰਫਤਾਰ ਨਾਲ ਕਿਵੇਂ ਚਲਾਉਣਾ ਹੈ.", g3Title: "ਪੈਨਲ ਵਾਇਰਿੰਗ ਦੇ ਨਿਯਮ", g3Desc: "ਬਿਜਲੀ ਦੇ ਪੈਨਲ ਨੂੰ ਧੂੜ ਅਤੇ ਗਰਮੀ ਤੋਂ ਬਚਾਉਣ ਦੇ ਆਸਾਨ ਤਰੀਕੇ.", readMore: "ਪੂਰਾ ਪੜ੍ਹੋ", formTitle: "ਸਵਾਲ ਪੁੱਛੋ", fName: "ਤੁਹਾਡਾ ਨਾਂ", fPhone: "ਫੋਨ ਨੰਬਰ", fTopic: "ਵਿਸ਼ਾ", fIssue: "ਤੁਹਾਡਾ ਸਵਾਲ", submit: "ਸਵਾਲ ਭੇਜੋ", success: "ਸਵਾਲ ਭੇਜ ਦਿੱਤਾ ਗਿਆ." },
  bn: { title: "জ্ঞান কেন্দ্র", subtitle: "কারখানার মেশিনের যত্ন এবং নিরাপত্তার জন্য সহজ গাইড।", g1Title: "ক্রেন নিরাপত্তা গাইড", g1Desc: "কিভাবে নিরাপদে 1 টন থেকে 50 টন ক্রেন চালাবেন। প্রতিদিনের তার পরীক্ষা।", g2Title: "ছাদের মেশিনের যত্ন", g2Desc: "0.3mm থেকে 0.8mm শিট মেশিনটি মিনিটে 15 মিটার বেগে কীভাবে চালাবেন।", g3Title: "প্যানেল ওয়্যারিং নিয়ম", g3Desc: "বৈদ্যুতিক প্যানেলগুলিকে ধুলো এবং তাপ থেকে রক্ষা করার সহজ উপায়।", readMore: "সম্পূর্ণ পড়ুন", formTitle: "প্রশ্ন জিজ্ঞাসা করুন", fName: "আপনার নাম", fPhone: "ফোন নম্বর", fTopic: "বিষয়", fIssue: "আপনার প্রশ্ন", submit: "প্রশ্ন পাঠান", success: "প্রশ্ন পাঠানো হয়েছে।" },
  or: { title: "ଜ୍ଞାନ କେନ୍ଦ୍ର", subtitle: "କାରଖାନା ମେସିନ୍ ଯତ୍ନ ଏବଂ ସୁରକ୍ଷା ପାଇଁ ସହଜ ଗାଇଡ୍.", g1Title: "କ୍ରେନ୍ ସୁରକ୍ଷା ଗାଇଡ୍", g1Desc: "1 ଟନ୍ ରୁ 50 ଟନ୍ କ୍ରେନ୍ କିପରି ସୁରକ୍ଷିତ ଭାବରେ ଚଲାଇବେ. ଦୈନିକ ତାର ଯାଞ୍ଚ.", g2Title: "ଛାତ ମେସିନ୍ ଯତ୍ନ", g2Desc: "0.3mm ରୁ 0.8mm ସିଟ୍ ମେସିନ୍ କୁ ମିନିଟ୍ ପ୍ରତି 15 ମିଟର ବେଗରେ କିପରି ଚଲାଇବେ.", g3Title: "ପ୍ୟାନେଲ୍ ୱାରିଂ ନିୟମ", g3Desc: "ଇଲେକ୍ଟ୍ରିକ୍ ପ୍ୟାନେଲ୍ କୁ ଧୂଳି ଏବଂ ଉତ୍ତାପରୁ ରକ୍ଷା କରିବା ପାଇଁ ସହଜ ଉପାୟ.", readMore: "ସମ୍ପୂର୍ଣ୍ଣ ପଢନ୍ତୁ", formTitle: "ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ", fName: "ଆପଣଙ୍କ ନାମ", fPhone: "ଫୋନ୍ ନମ୍ବର", fTopic: "ବିଷୟ", fIssue: "ଆପଣଙ୍କ ପ୍ରଶ୍ନ", submit: "ପ୍ରଶ୍ନ ପଠାନ୍ତୁ", success: "ପ୍ରଶ୍ନ ପଠାଗଲା." },
  ur: { title: "معلوماتی مرکز", subtitle: "فیکٹری مشین کی دیکھ بھال اور حفاظت کے لیے آسان گائیڈ۔", g1Title: "کرین کی حفاظت کی گائیڈ", g1Desc: "1 ٹن سے 50 ٹن کرین کو محفوظ طریقے سے کیسے چلائیں۔ روزانہ تار کی جانچ۔", g2Title: "چھت کی مشین کی دیکھ بھال", g2Desc: "0.3mm سے 0.8mm شیٹ بنانے والی مشین کو 15 میٹر فی منٹ کی رفتار سے کیسے چلائیں۔", g3Title: "پینل وائرنگ کے اصول", g3Desc: "بجلی کے پینل کو دھول اور گرمی سے بچانے کے آسان طریقے۔", readMore: "پورا پڑھیں", formTitle: "سوال پوچھیں", fName: "آپ کا نام", fPhone: "فون نمبر", fTopic: "موضوع", fIssue: "آپ کا سوال", submit: "سوال بھیجیں", success: "سوال بھیج دیا گیا۔" },
  as: { title: "জ্ঞান কেন্দ্ৰ", subtitle: "কাৰখানাৰ মেচিনৰ যত্ন আৰু নিৰাপত্তাৰ বাবে সহজ গাইড.", g1Title: "ক্ৰেন নিৰাপত্তা গাইড", g1Desc: "1 টনৰ পৰা 50 টন ক্ৰেন কেনেকৈ নিৰাপদে চলাব লাগে. দৈনিক তাঁৰৰ পৰীক্ষা.", g2Title: "ছাদৰ মেচিনৰ যত্ন", g2Desc: "0.3mm ৰ পৰা 0.8mm শ্বীট মেচিনটো প্ৰতি মিনিটত 15 মিটাৰ বেগত কেনেকৈ চলাব লাগে.", g3Title: "পেনেল ৱায়াৰিং নিয়ম", g3Desc: "বৈদ্যুতিক পেনেলবোৰ ধূলি আৰু গৰমৰ পৰা ৰক্ষা কৰাৰ সহজ উপায়.", readMore: "সম্পূৰ্ণ পঢ়ক", formTitle: "প্ৰশ্ন সোধক", fName: "আপোনাৰ নাম", fPhone: "ফোন নম্বৰ", fTopic: "বিষয়", fIssue: "আপোনাৰ প্ৰশ্ন", submit: "প্ৰশ্ন পঠাওক", success: "প্ৰশ্ন পঠোৱা হ'ল." },
  bho: { title: "ज्ञान केंद्र", subtitle: "फैक्टरी मशीन के देखभाल अउरी सुरक्षा खातिर आसान तरीका।", g1Title: "क्रेन सुरक्षा गाइड", g1Desc: "1 टन से 50 टन क्रेन के सुरक्षित कइसे चलावल जाव। रोज के तार जांच।", g2Title: "छत मशीन के देखभाल", g2Desc: "0.3mm से 0.8mm शीट बनावे वाला मशीन के 15 मीटर प्रति मिनट के रफ्तार से कइसे चलावल जाव।", g3Title: "पैनल वायरिंग के नियम", g3Desc: "फैक्टरी में बिजली के पैनल के धूर अउरी गरमी से बचावे के आसान तरीका।", readMore: "पूरा पढ़ीं", formTitle: "सवाल पूछीं", fName: "रउआ नाम", fPhone: "फोन नंबर", fTopic: "विषय", fIssue: "रउआ सवाल", submit: "सवाल भेजीं", success: "सवाल भेज दिहल गइल।" }
};

export const Knowledge = () => {
  const [language, setLanguage] = useState(localStorage.getItem('nss_lang') || 'en');
  const [formState, setFormState] = useState({ name: '', phone: '', topic: '', issue: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const handleLangChange = (e) => setLanguage(e.detail);
    window.addEventListener('languageChanged', handleLangChange);
    return () => window.removeEventListener('languageChanged', handleLangChange);
  }, []);

  const t = knowledgeTranslations[language] || knowledgeTranslations['en'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'serviceRequests'), {
        category: 'Knowledge Question',
        ...formState,
        timestamp: new Date().toISOString(),
        status: 'Submitted'
      });
      setFormState({ name: '', phone: '', topic: '', issue: '' });
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
            
            <div className="bg-gray-50 border border-gray-200 p-6 flex flex-col justify-between items-start shadow-sm transition-shadow hover:shadow-md">
              <div>
                <h3 className="font-bold text-2xl text-gray-900 mb-3">{t.g1Title}</h3>
                <p className="text-base text-gray-700 leading-relaxed font-semibold">{t.g1Desc}</p>
              </div>
              <button className="text-[#0035A0] font-bold inline-flex items-center mt-6 hover:underline text-lg">
                {t.readMore} <ArrowUpRight className="ml-1 h-6 w-6 stroke-[3]" />
              </button>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-6 flex flex-col justify-between items-start shadow-sm transition-shadow hover:shadow-md">
              <div>
                <h3 className="font-bold text-2xl text-gray-900 mb-3">{t.g2Title}</h3>
                <p className="text-base text-gray-700 leading-relaxed font-semibold">{t.g2Desc}</p>
              </div>
              <button className="text-[#0035A0] font-bold inline-flex items-center mt-6 hover:underline text-lg">
                {t.readMore} <ArrowUpRight className="ml-1 h-6 w-6 stroke-[3]" />
              </button>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-6 flex flex-col justify-between items-start shadow-sm transition-shadow hover:shadow-md">
              <div>
                <h3 className="font-bold text-2xl text-gray-900 mb-3">{t.g3Title}</h3>
                <p className="text-base text-gray-700 leading-relaxed font-semibold">{t.g3Desc}</p>
              </div>
              <button className="text-[#0035A0] font-bold inline-flex items-center mt-6 hover:underline text-lg">
                {t.readMore} <ArrowUpRight className="ml-1 h-6 w-6 stroke-[3]" />
              </button>
            </div>

          </div>

          <div className="bg-white border border-gray-200 p-8 shadow-sm h-fit sticky top-24">
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
                <label className="block text-sm font-bold mb-2 text-gray-900">{t.fTopic}</label>
                <input type="text" required value={formState.topic} onChange={(e) => setFormState({...formState, topic: e.target.value})} className="w-full p-3 border border-gray-300 outline-none focus:border-[#0035A0] bg-gray-50" />
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