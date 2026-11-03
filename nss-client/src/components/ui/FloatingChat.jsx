import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const chatTranslations = {
  en: { 
    title: "NSS Expert Chat", 
    welcome: "Hello! How can we help your factory today?", 
    chip1: "Crane Pricing", 
    chip2: "Roofing Timeline", 
    chip3: "Automation Setup", 
    placeholder: "Type your question here...", 
    send: "Send", 
    close: "Close Chat",
    ans1: "Our EOT cranes range from 1 Ton to 50 Ton capacity with custom pricing based on span and load requirements.",
    ans2: "Roof profile and metal sheet manufacturing projects are typically completed within 7 to 14 business days.",
    ans3: "Factory automation and electrical panel wiring take about 5 to 10 days depending on scale.",
    defaultAns: "Thank you for reaching out to NSS. Our team will review your query and contact you shortly."
  },
  hi: { 
    title: "NSS विशेषज्ञ चैट", 
    welcome: "नमस्ते! आज हम आपकी फैक्ट्री की क्या मदद कर सकते हैं?", 
    chip1: "क्रेन की कीमत", 
    chip2: "छत का समय", 
    chip3: "ऑटोमेशन सेटअप", 
    placeholder: "अपना सवाल यहां लिखें...", 
    send: "भेजें", 
    close: "चैट बंद करें",
    ans1: "हमारी क्रेन 1 टन से 50 टन क्षमता की होती हैं। कीमत आपके वजन और जरूरत के अनुसार तय होती है।",
    ans2: "छत और शीट बनाने का काम आमतौर पर 7 से 14 दिनों में पूरा हो जाता है।",
    ans3: "फैक्ट्री ऑटोमेशन और पैनल वायरिंग में लगभग 5 से 10 दिन लगते हैं।",
    ans4: "NSS से संपर्क करने के लिए धन्यवाद। हमारी टीम जल्द ही आपसे संपर्क करेगी।"
  },
  mr: { 
    title: "NSS तज्ञ चॅट", 
    welcome: "नमस्कार! आज आम्ही तुमच्या फॅक्टरीला कशी मदत करू शकतो?", 
    chip1: "क्रेनची किंमत", 
    chip2: "छताचा वेळ", 
    chip3: "ऑटोमेशन सेटअप", 
    placeholder: "तुमचा प्रश्न येथे लिहा...", 
    send: "पाठवा", 
    close: "चॅट बंद करा",
    ans1: "आमच्या क्रेन 1 टन ते 50 टन क्षमतेच्या आहेत. किंमत तुमच्या वजनावर आणि गरजेनुसार ठरते.",
    ans2: "छत आणि शीट बनवण्याचे काम साधारणपणे 7 ते 14 दिवसांत पूर्ण होते.",
    ans3: "फॅक्टरी ऑटोमेशन आणि पॅनेल वायरिंगसाठी सुमारे 5 ते 10 दिवस लागतात.",
    defaultAns: "NSS शी संपर्क साधल्याबद्दल धन्यवाद. आमची टीम लवकरच तुमच्याशी संपर्क साधेल."
  },
  te: { 
    title: "NSS నిపుణుల చాట్", 
    welcome: "నమస్కారం! ఈ రోజు మేము మీ ఫ్యాక్టరీకి ఎలా సహాయపడగలము?", 
    chip1: "క్రేన్ ధర", 
    chip2: "రూఫ్ సమయం", 
    chip3: "ఆటోమేషన్ సెటప్", 
    placeholder: "మీ ప్రశ్న ఇక్కడ టైప్ చేయండి...", 
    send: "పంపండి", 
    close: "చాట్ మూసివేయి",
    ans1: "మా క్రేన్లు 1 టన్ను నుండి 50 టన్నుల సామర్థ్యం కలిగి ఉంటాయి. బరువు మరియు అవసరాన్ని బట్టి ధర ఉంటుంది.",
    ans2: "రూఫ్ మరియు షీట్ తయారీ పనులు సాధారణంగా 7 నుండి 14 రోజులలో పూర్తవుతాయి.",
    ans3: "ఫ్యాక్టరీ ఆటోమేషన్ మరియు ప్యానెల్ వైరింగ్ సుమారు 5 నుండి 10 రోజులు పడుతుంది.",
    defaultAns: "NSS ని సంప్రదించినందుకు ధన్యవాదాలు. మా బృందం త్వరలో మిమ్మల్ని సంప్రదిస్తుంది."
  },
  ta: { 
    title: "NSS நிபுணர் அரட்டை", 
    welcome: "வணக்கம்! இன்று உங்கள் தொழிற்சாலைக்கு நாங்கள் எவ்வாறு உதவ முடியும்?", 
    chip1: "கிரேன் விலை", 
    chip2: "கூரை நேரம்", 
    chip3: "ஆட்டோமேஷன் அமைப்பு", 
    placeholder: "உங்கள் கேள்வியை இங்கே தட்டச்சு செய்க...", 
    send: "அனுப்பு", 
    close: "அரட்டையை மூடு",
    ans1: "எங்கள் கிரேன்கள் 1 டன் முதல் 50 டன் வரை எடை தாங்கும் திறன் கொண்டவை.",
    ans2: "கூரை மற்றும் ஷீட் தயாரிப்பு பணிகள் பொதுவாக 7 முதல் 14 நாட்களில் முடிக்கப்படும்.",
    ans3: "தொழிற்சாலை ஆட்டோமேஷன் மற்றும் வயரிங் முடிக்க 5 முதல் 10 நாட்கள் ஆகும்.",
    defaultAns: "NSS ஐத் தொடர்பு கொண்டதற்கு நன்றி. எங்கள் குழு விரைவில் உங்களைத் தொடர்பு கொள்ளும்."
  },
  kn: { 
    title: "NSS ತಜ್ಞರ ಚಾಟ್", 
    welcome: "ನಮಸ್ಕಾರ! ಇಂದು ನಾವು ನಿಮ್ಮ ಕಾರ್ಖಾನೆಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?", 
    chip1: "ಕ್ರೇನ್ ಬೆಲೆ", 
    chip2: "ಛಾವಣಿಯ ಸಮಯ", 
    chip3: "ಆಟೊಮೇಷನ್ ಸೆಟಪ್", 
    placeholder: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ...", 
    send: "ಕಳುಹಿಸಿ", 
    close: "ಚಾಟ್ ಮುಚ್ಚಿ",
    ans1: "ನಮ್ಮ ಕ್ರೇನ್‌ಗಳು 1 ಟನ್ ನಿಂದ 50 ಟನ್ ಸಾಮರ್ಥ್ಯವನ್ನು ಹೊಂದಿವೆ.",
    ans2: "ಛಾವಣಿ ಮತ್ತು ಶೀಟ್ ತಯಾರಿಕೆ ಕೆಲಸವು ಸಾಮಾನ್ಯವಾಗಿ 7 ರಿಂದ 14 ದಿನಗಳಲ್ಲಿ ಪೂರ್ಣಗೊಳ್ಳುತ್ತದೆ.",
    ans3: "ಫ್ಯಾಕ್ಟರಿ ಆಟೊಮೇಷನ್ ಮತ್ತು ವೈರಿಂಗ್‌ಗೆ ಸುಮಾರು 5 ರಿಂದ 10 ದಿನಗಳು ಬೇಕಾಗುತ್ತವೆ.",
    defaultAns: "NSS ಅನ್ನು ಸಂಪರ್ಕಿಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು. ನಮ್ಮ ತಂಡವು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತದೆ."
  },
  ml: { 
    title: "NSS വിദഗ്ദ്ധ ചാറ്റ്", 
    welcome: "നമസ്കാരം! ഇന്ന് നിങ്ങളുടെ ഫാക്ടറിയെ എങ്ങനെ സഹായിക്കാനാകും?", 
    chip1: "ക്രെയിൻ വില", 
    chip2: "റൂഫ് സമയം", 
    chip3: "ഓട്ടോമേഷൻ", 
    placeholder: "നിങ്ങളുടെ ചോദ്യം ഇവിടെ ടൈപ്പ് ചെയ്യുക...", 
    send: "അയയ്ക്കുക", 
    close: "ചാറ്റ് അടയ്ക്കുക",
    ans1: "ഞങ്ങളുടെ ക്രെയിനുകൾ 1 ടൺ മുതൽ 50 ടൺ വരെ ശേഷിയുള്ളവയാണ്.",
    ans2: "റൂഫ് നിർമ്മാണ ജോലികൾ സാധാരണയായി 7 മുതൽ 14 ദിവസത്തിനുള്ളിൽ പൂർത്തിയാകും.",
    ans3: "ഫാക്ടറി ഓട്ടോമേഷന് ഏകദേശം 5 മുതൽ 10 ദിവസം വരെ എടുക്കും.",
    defaultAns: "NSS-മായി ബന്ധപ്പെട്ടതിന് നന്ദി. ഞങ്ങളുടെ ടീം ഉടൻ തന്നെ നിങ്ങളെ ബന്ധപ്പെടും."
  },
  gu: { 
    title: "NSS નિષ્ણાત ચેટ", 
    welcome: "નમસ્કાર! આજે અમે તમારી ફેક્ટરીની કેવી રીતે મદદ કરી શકીએ?", 
    chip1: "ક્રેનની કિંમત", 
    chip2: "છતનો સમય", 
    chip3: "ઓટોમેશન સેટઅપ", 
    placeholder: "તમારો પ્રશ્ન અહીં લખો...", 
    send: "મોકલો", 
    close: "મેનુ બંધ કરો",
    ans1: "અમારી ક્રેન 1 ટનથી 50 ટન ક્ષમતાની હોય છે.",
    ans2: "છત અને શીટ બનાવવાનું કામ સામાન્ય રીતે 7 થી 14 દિવસમાં પૂરું થાય છે.",
    ans3: "ફેક્ટરી ઓટોમેશન અને વાયરિંગમાં લગભગ 5 થી 10 દિવસ લાગે છે.",
    defaultAns: "NSS નો સંપર્ક કરવા બદલ આભાર. અમારી ટીમ ટૂંક સમયમાં તમારો સંપર્ક કરશે."
  },
  pa: { 
    title: "NSS ਮਾਹਰ ਚੈਟ", 
    welcome: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਅਸੀਂ ਅੱਜ ਤੁਹਾਡੀ ਫੈਕਟਰੀ ਦੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੇ ਹਾਂ?", 
    chip1: "ਕਰੇਨ ਕੀਮਤ", 
    chip2: "ਛੱਤ ਦਾ ਸਮਾਂ", 
    chip3: "ਆਟੋਮੇਸ਼ਨ ਸੈੱਟਅੱਪ", 
    placeholder: "ਆਪਣਾ ਸਵਾਲ ਇੱਥੇ ਲਿਖੋ...", 
    send: "ਭੇਜੋ", 
    close: "ਮੀਨੂ ਬੰਦ ਕਰੋ",
    ans1: "ਸ ਸਾਡੀਆਂ کرੇਨਾਂ 1 ਟਨ ਤੋਂ 50 ਟਨ ਤੱਕ ਦੀ ਸਮਰੱਥਾ ਵਾਲੀਆਂ ਹਨ।",
    ans2: "ਛੱਤ ਅਤੇ ਸ਼ੀਟ ਬਣਾਉਣ ਦਾ ਕਮ 7 ਤੋਂ 14 ਦਿਨਾਂ ਵਿੱਚ ਪੂਰਾ ਹੋ ਜਾਂਦਾ ਹੈ।",
    ans3: "ਫੈਕਟਰੀ ਆਟੋਮੇਸ਼ਨ ਅਤੇ ਵਾਇਰਿੰਗ ਵਿੱਚ ਲਗਭਗ 5 ਤੋਂ 10 ਦਿਨ ਲੱਗਦੇ ਹਨ।",
    defaultAns: "NSS ਨਾਲ ਸੰਪਰਕ ਕਰਨ ਲਈ ਧੰਨਵਾਦ। ਸਾਡੀ ਟੀਮ ਜਲਦੀ ਹੀ ਤੁਹਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੇਗੀ।"
  },
  bn: { 
    title: "NSS বিশেষজ্ঞ চ্যাট", 
    welcome: "নমস্কার! আজ আমরা আপনার কারখানাকে কীভাবে সাহায্য করতে পারি?", 
    chip1: "ক্রেনের দাম", 
    chip2: "ছাদের সময়", 
    chip3: "অটোমেশন সেটআপ", 
    placeholder: "আপনার প্রশ্ন এখানে লিখুন...", 
    send: "পাঠান", 
    close: "চ্যাট বন্ধ করুন",
    ans1: "আমাদের ক্রেনগুলি ১ টন থেকে ৫০ টন ক্ষমতার হয়ে থাকে।",
    ans2: "ছাদ ও শিট তৈরির কাজ সাধারণত ৭ থেকে ১৪ দিনের মধ্যে শেষ হয়।",
    ans3: "কারখানা অটোমেশন এবং ওয়্যারিংয়ে প্রায় ৫ থেকে ১০ দিন সময় লাগে।",
    defaultAns: "NSS এর সাথে যোগাযোগ করার জন্য ধন্যবাদ। আমাদের দল শীঘ্রই আপনার সাথে যোগাযোগ করবে।"
  },
  or: { 
    title: "NSS ବିଶେଷଜ୍ଞ ଚାଟ୍", 
    welcome: "ନମସ୍କାର! ଆଜି ଆମେ ଆପଣଙ୍କ କାରଖାନାକୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବୁ?", 
    chip1: "କ୍ରେନ୍ ମୂଲ୍ୟ", 
    chip2: "ଛାତ ସମୟ", 
    chip3: "ଅଟୋମେସନ୍ ସେଟଅପ୍", 
    placeholder: "ଆପଣଙ୍କ ପ୍ରଶ୍ନ ଏଠାରେ ଲେଖନ୍ତୁ...", 
    send: "ପଠାନ୍ତୁ", 
    close: "ଚାଟ୍ ବନ୍ଦ କରନ୍ତୁ",
    ans1: "ଆମର କ୍ରେନ୍ଗୁଡ଼ିକ 1 ଟନ୍ ରୁ 50 ଟନ୍ କ୍ଷମତା ବିଶିଷ୍ଟ ଅଟେ।",
    ans2: "ଛାତ ଏବଂ ସିଟ୍ ତିଆରି କାମ ସାଧାରଣତଃ 7 ରୁ 14 ଦିନ ମଧ୍ୟରେ ସମାପ୍ତ ହୁଏ।",
    ans3: "କାରଖାନା ଅଟୋମେସନ୍ ଏବଂ ୱାରିଂ ପାଇଁ ପ୍ରାୟ 5 ରୁ 10 ଦିନ ଲାगे।",
    defaultAns: "NSS ସହିତ ଯୋଗାଯୋଗ କରିଥିବାରୁ ଧନ୍ୟବାଦ। ଆମର ଟିମ୍ ଶୀଘ୍ର ଆପଣଙ୍କ ସହିତ ଯୋଗାଯୋଗ କରିବ।"
  },
  ur: { 
    title: "NSS ماہر چیٹ", 
    welcome: "خوش آمدید! آج ہم آپ کی فیکٹری کی کیا مدد کر سکتے ہیں؟", 
    chip1: "کرین کی قیمت", 
    chip2: "چھت کا وقت", 
    chip3: "آٹومیشن سیٹ اپ", 
    placeholder: "اپنا سوال یہاں لکھیں...", 
    send: "بھیجیں", 
    close: "مینو بند کریں",
    ans1: "ہماری کرینیں 1 ٹن سے 50 ٹن تک کی صلاحیت کی حامل ہوتی ہیں۔",
    ans2: "چھت اور شیٹ بنانے کا کام عام طور پر 7 سے 14 دنوں میں مکمل ہوجاتا ہے۔",
    ans3: "فیکٹری آٹومیشن اور وائرنگ میں تقریباً 5 سے 10 دن لگتے ہیں۔",
    defaultAns: "NSS سے رابطہ کرنے کا شکریہ۔ ہماری ٹیم جلد ہی آپ سے رابطہ کرے گی۔"
  },
  as: { 
    title: "NSS বিশেষজ্ঞ চেট", 
    welcome: "নমস্কাৰ! আজি আমি আপোনাৰ কাৰখানাক কেনেকৈ সহায় কৰিব পাৰোঁ?", 
    chip1: "ক্ৰেনৰ দাম", 
    chip2: "ছাদৰ সময়", 
    chip3: "অটোমেচন", 
    placeholder: "আপোনাৰ প্ৰশ্নটো ইয়াত লিখক...", 
    send: "পঠাওক", 
    close: "চেট বন্ধ কৰক",
    ans1: "আমাৰ ক্ৰেনবোৰ ১ টনৰ পৰা ৫০ টন ক্ষমতাৰ হয়।",
    ans2: "ছাদ আৰু শ্বীট নিৰ্মাণৰ কাম সাধাৰণতে ৭ ৰ পৰা ১৪ দিনৰ ভিতৰত সম্পূৰ্ণ হয়।",
    ans3: "কাৰখানা অটোমেচনৰ বাবে প্ৰায় ৫ ৰ পৰা ১০ দিন সময় লাগে।",
    defaultAns: "NSS ৰ সৈতে যোগাযোগ কৰাৰ বাবে ধন্যবাদ। আমাৰ দলে সোনকালেই আপোনাৰ সৈতে যোগাযোগ কৰিব।"
  },
  bho: { 
    title: "NSS विशेषज्ञ चैट", 
    welcome: "नमस्कार! आज हमनी के राउर फैक्टरी के कइसे मदद कर सकीले?", 
    chip1: "क्रेन के दाम", 
    chip2: "छत के समय", 
    chip3: "ऑटोमेशन सेटअप", 
    placeholder: "अपना सवाल इहाँ लिखीं...", 
    send: "भेजीं", 
    close: "मेनू बंद करीं",
    ans1: "हमनी के क्रेन 1 टन से 50 टन क्षमता के होखेला। दाम वजन अउरी जरूरत के हिसाब से होला।",
    ans2: "छत अउरी शीट बनावे के काम आमतौर पर 7 से 14 दिन में पूरा हो जाला।",
    ans3: "फैक्ट्री ऑटोमेशन अउरी वायरिंग में लगभग 5 से 10 दिन लागेला।",
    defaultAns: "NSS से संपर्क करे खातिर धन्यवाद। हमनी के टीम जल्दीए रउआ से संपर्क कराइ।"
  }
};

export const FloatingChat = ({ isOpen, onClose }) => {
  const [language, setLanguage] = useState(localStorage.getItem('nss_lang') || 'en');
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const handleLangChange = (e) => setLanguage(e.detail);
    window.addEventListener('languageChanged', handleLangChange);
    return () => window.removeEventListener('languageChanged', handleLangChange);
  }, []);

  const t = chatTranslations[language] || chatTranslations['en'];

  // Initialize greeting message on open
  useEffect(() => {
    if (isOpen) {
      setMessages([
        { sender: 'bot', text: t.welcome }
      ]);
    }
  }, [isOpen, language]);

  const handleSend = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsSending(true);

    // Determine auto-response based on query content
    let botReply = t.defaultAns;
    const lowerQ = query.toLowerCase();
    if (lowerQ.includes('price') || lowerQ.includes('cost') || lowerQ.includes('कीमत') || lowerQ.includes('किंमत') || lowerQ.includes('ధర') || lowerQ.includes('விலை') || lowerQ.includes('ಬೆಲೆ') || lowerQ.includes('দাম') || lowerQ.includes('দাম')) {
      botReply = t.ans1;
    } else if (lowerQ.includes('time') || lowerQ.includes('roof') || lowerQ.includes('समय') || lowerQ.includes('वेळ') || lowerQ.includes('సమయం') || lowerQ.includes('நேரம்') || lowerQ.includes('ಸಮಯ') || lowerQ.includes('সময়')) {
      botReply = t.ans2;
    } else if (lowerQ.includes('automation') || lowerQ.includes('panel') || lowerQ.includes('ऑटोमेशन') || lowerQ.includes('ಆಟೊಮೇಷನ್')) {
      botReply = t.ans3;
    }

    // Save interaction record to Firestore
    try {
      await addDoc(collection(db, 'serviceRequests'), {
        category: 'Navbar AI Chat',
        query: query,
        response: botReply,
        timestamp: new Date().toISOString(),
        status: 'Completed'
      });
    } catch (err) {
      console.error(err);
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
      setIsSending(false);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
          className="fixed top-24 right-4 md:right-16 w-80 md:w-96 bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col z-[60] font-sans rounded-sm"
        >
          {/* Chat Header */}
          <div className="bg-[#0035A0] text-white p-4 flex justify-between items-center">
            <h3 className="font-bold text-lg flex items-center">
              <Bot className="mr-2 h-5 w-5" /> {t.title}
            </h3>
            <button onClick={onClose} aria-label={t.close} className="text-white hover:text-gray-200 focus:outline-none">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 flex-1 h-80 overflow-y-auto flex flex-col space-y-3">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex items-start space-x-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.sender === 'bot' && <div className="bg-[#0035A0] text-white p-1.5 rounded-full"><Bot className="h-4 w-4" /></div>}
                <div className={`p-3 rounded-sm text-sm font-semibold max-w-[80%] ${m.sender === 'user' ? 'bg-[#0035A0] text-white' : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600'}`}>
                  {m.text}
                </div>
                {m.sender === 'user' && <div className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white p-1.5 rounded-full"><User className="h-4 w-4" /></div>}
              </div>
            ))}
            {isSending && (
              <div className="flex items-center space-x-2">
                <div className="bg-[#0035A0] text-white p-1.5 rounded-full"><Bot className="h-4 w-4" /></div>
                <div className="bg-white dark:bg-gray-700 text-gray-500 p-2 text-xs font-semibold animate-pulse">...</div>
              </div>
            )}
          </div>

          {/* Pre-filled Inquiry Chips */}
          <div className="p-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-2">
            <button onClick={() => handleSend(t.chip1)} className="bg-gray-100 dark:bg-gray-800 hover:bg-[#0035A0] hover:text-white text-xs font-bold text-gray-700 dark:text-gray-200 py-1 px-3 rounded-full transition">
              {t.chip1}
            </button>
            <button onClick={() => handleSend(t.chip2)} className="bg-gray-100 dark:bg-gray-800 hover:bg-[#0035A0] hover:text-white text-xs font-bold text-gray-700 dark:text-gray-200 py-1 px-3 rounded-full transition">
              {t.chip2}
            </button>
            <button onClick={() => handleSend(t.chip3)} className="bg-gray-100 dark:bg-gray-800 hover:bg-[#0035A0] hover:text-white text-xs font-bold text-gray-700 dark:text-gray-200 py-1 px-3 rounded-full transition">
              {t.chip3}
            </button>
          </div>

          {/* Chat Input Footer */}
          <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex items-center space-x-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.placeholder}
              className="flex-1 p-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white outline-none focus:border-[#0035A0] text-sm font-semibold"
            />
            <button onClick={() => handleSend()} className="bg-[#0035A0] text-white p-2.5 hover:bg-blue-900 transition flex items-center justify-center">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};