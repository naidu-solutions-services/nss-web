import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, CheckSquare, Users, Handshake, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const homeTranslations = {
  en: { hero: "One-stop provider from design to installation for Factory Machines and Services.", legacy: "A legacy of good work", years: "31+", yearsText: "Years of Trust", factories: "6,000+", factoriesText: "Active Factories", machines: "100,000+", machinesText: "Machines Fixed", values: "Our values", val1: "Good Work", val2: "Team Work", val3: "True Partners", solutions: "Solutions", sol1: "Crane Services", sol2: "Roof Machines", sol3: "Factory Automation", vers: "Greatness through versatility", versSub: "We serve customers in all types of factory work.", explore: "Explore more", projects: "Projects", viewAll: "View all projects", updates: "Latest updates", readAll: "Read all news", reportTitle: "Report Machine Fault", fName: "Factory Name", fPhone: "Phone Number", fIssue: "What is the problem?", submit: "Send Report", success: "Report sent successfully." },
  hi: { hero: "फैक्ट्री मशीनों और सेवाओं के लिए डिजाइन से लगाने तक का पूरा समाधान।", legacy: "अच्छे काम की पहचान", years: "31+", yearsText: "भरोसे के साल", factories: "6,000+", factoriesText: "चालू कारखाने", machines: "100,000+", machinesText: "ठीक की गई मशीनें", values: "हमारे विचार", val1: "अच्छा काम", val2: "टीम का काम", val3: "सच्चे साथी", solutions: "सेवाएं", sol1: "क्रेन का काम", sol2: "छत की मशीनें", sol3: "फैक्ट्री ऑटोमेशन", vers: "हर काम में माहिर", versSub: "हम हर तरह के फैक्ट्री काम में ग्राहकों की मदद करते हैं।", explore: "और जानें", projects: "हमारे काम", viewAll: "सब काम देखें", updates: "नई खबर", readAll: "सब खबर पढ़ें", reportTitle: "मशीन की खराबी बताएं", fName: "फैक्ट्री का नाम", fPhone: "फोन नंबर", fIssue: "क्या समस्या है?", submit: "रिपोर्ट भेजें", success: "रिपोर्ट भेज दी गई।" },
  mr: { hero: "फॅक्टरी मशीन आणि सेवांसाठी डिझाइनपासून फिटिंगपर्यंत संपूर्ण काम.", legacy: "चांगल्या कामाची ओळख", years: "31+", yearsText: "विश्वासाची वर्षे", factories: "6,000+", factoriesText: "चालू कारखाने", machines: "100,000+", machinesText: "दुरुस्त मशीन", values: "आमचे विचार", val1: "चांगले काम", val2: "टीम वर्क", val3: "खरे साथीदार", solutions: "सेवा", sol1: "क्रेन काम", sol2: "छताच्या मशीन", sol3: "फॅक्टरी ऑटोमेशन", vers: "प्रत्येक कामात हुशार", versSub: "आम्ही सर्व प्रकारच्या फॅक्टरी कामात ग्राहकांना मदत करतो.", explore: "अधिक जाणून घ्या", projects: "आमचे काम", viewAll: "सर्व कामे पहा", updates: "नवीन माहिती", readAll: "सर्व बातम्या वाचा", reportTitle: "मशीन बिघाड सांगा", fName: "फॅक्टरीचे नाव", fPhone: "फोन नंबर", fIssue: "काय अडचण आहे?", submit: "माहिती पाठवा", success: "माहिती पाठवली." },
  te: { hero: "ఫ్యాక్టరీ యంత్రాలు మరియు సేవల కోసం డిజైన్ నుండి ఫిట్టింగ్ వరకు పూర్తి పని.", legacy: "మంచి పని గుర్తింపు", years: "31+", yearsText: "నమ్మకం సంవత్సరాలు", factories: "6,000+", factoriesText: "నడుస్తున్న ఫ్యాక్టరీలు", machines: "100,000+", machinesText: "బాగుచేసిన యంత్రాలు", values: "మా ఆలోచనలు", val1: "మంచి పని", val2: "కలిసి పనిచేయడం", val3: "నిజమైన స్నేహితులు", solutions: "సేవలు", sol1: "క్రేన్ పని", sol2: "రూఫ్ యంత్రాలు", sol3: "ఫ్యాక్టరీ ఆటోమేషన్", vers: "అన్ని పనులలో నేర్పు", versSub: "మేము అన్ని రకాల ఫ్యాక్టరీ పనులలో సహాయం చేస్తాము.", explore: "మరింత తెలుసుకోండి", projects: "మా పనులు", viewAll: "అన్ని పనులు చూడండి", updates: "కొత్త వార్తలు", readAll: "వార్తలు చదవండి", reportTitle: "యంత్రం లోపం చెప్పండి", fName: "ఫ్యాక్టరీ పేరు", fPhone: "ఫోన్ నంబర్", fIssue: "సమస్య ఏమిటి?", submit: "పంపండి", success: "పంపబడింది." },
  ta: { hero: "தொழிற்சாலை இயந்திரங்கள் மற்றும் சேவைகளுக்கான முழுமையான தீர்வு.", legacy: "நல்ல வேலையின் அடையாளம்", years: "31+", yearsText: "நம்பிக்கை ஆண்டுகள்", factories: "6,000+", factoriesText: "இயங்கும் தொழிற்சாலைகள்", machines: "100,000+", machinesText: "சரிசெய்யப்பட்ட இயந்திரங்கள்", values: "எங்கள் எண்ணங்கள்", val1: "நல்ல வேலை", val2: "குழு வேலை", val3: "உண்மையான நண்பர்கள்", solutions: "சேவைகள்", sol1: "கிரேன் வேலை", sol2: "கூரையின் இயந்திரங்கள்", sol3: "தொழிற்சாலை ஆட்டோமேஷன்", vers: "அனைத்து வேலைகளிலும் சிறப்பு", versSub: "அனைத்து வகையான தொழிற்சாலை பணிகளிலும் நாங்கள் உதவுகிறோம்.", explore: "மேலும் அறிய", projects: "எங்கள் பணிகள்", viewAll: "அனைத்து பணிகளையும் காண்க", updates: "புதிய செய்தி", readAll: "அனைத்து செய்திகளையும் படிக்கவும்", reportTitle: "இயந்திர பழுதை தெரிவிக்கவும்", fName: "தொழிற்சாலை பெயர்", fPhone: "போன் எண்", fIssue: "என்ன பிரச்சனை?", submit: "அனுப்பு", success: "அனுப்பப்பட்டது." },
  kn: { hero: "ಕಾರ್ಖಾನೆ ಯಂತ್ರಗಳು ಮತ್ತು ಸೇವೆಗಳಿಗೆ ಸಂಪೂರ್ಣ ಪರಿಹಾರ.", legacy: "ಒಳ್ಳೆಯ ಕೆಲಸದ ಗುರುತು", years: "31+", yearsText: "ನಂಬಿಕೆಯ ವರ್ಷಗಳು", factories: "6,000+", factoriesText: "ಚಾಲನೆಯಲ್ಲಿರುವ ಕಾರ್ಖಾನೆಗಳು", machines: "100,000+", machinesText: "ದುರಸ್ತಿ ಮಾಡಿದ ಯಂತ್ರಗಳು", values: "ನಮ್ಮ ಆಲೋಚನೆಗಳು", val1: "ಒಳ್ಳೆಯ ಕೆಲಸ", val2: "ತಂಡದ ಕೆಲಸ", val3: "ನಿಜವಾದ ಸ್ನೇಹಿತರು", solutions: "ಸೇವೆಗಳು", sol1: "ಕ್ರೇನ್ ಕೆಲಸ", sol2: "ಛಾವಣಿಯ ಯಂತ್ರಗಳು", sol3: "ಫ್ಯಾಕ್ಟರಿ ಆಟೊಮೇಷನ್", vers: "ಎಲ್ಲಾ ಕೆಲಸಗಳಲ್ಲಿ ಪರಿಣತಿ", versSub: "ನಾವು ಎಲ್ಲಾ ರೀತಿಯ ಕಾರ್ಖಾನೆ ಕೆಲಸಗಳಲ್ಲಿ ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.", explore: "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ", projects: "ನಮ್ಮ ಕೆಲಸಗಳು", viewAll: "ಎಲ್ಲಾ ಕೆಲಸಗಳನ್ನು ನೋಡಿ", updates: "ಹೊಸ ಸುದ್ದಿ", readAll: "ಎಲ್ಲಾ ಸುದ್ದಿ ಓದಿ", reportTitle: "ಯಂತ್ರದ ದೋಷವನ್ನು ತಿಳಿಸಿ", fName: "ಕಾರ್ಖಾನೆಯ ಹೆಸರು", fPhone: "ಫೋನ್ ಸಂಖ್ಯೆ", fIssue: "ಸಮಸ್ಯೆ ಏನು?", submit: "ಕಳುಹಿಸಿ", success: "ಕಳುಹಿಸಲಾಗಿದೆ." },
  ml: { hero: "ഫാക്ടറി മെഷീനുകൾക്കും സേവനങ്ങൾക്കുമുള്ള പൂർണ്ണ പരിഹാരം.", legacy: "നല്ല ജോലിയുടെ അടയാളം", years: "31+", yearsText: "വിശ്വാസത്തിന്റെ വർഷങ്ങൾ", factories: "6,000+", factoriesText: "പ്രവർത്തിക്കുന്ന ഫാക്ടറികൾ", machines: "100,000+", machinesText: "ശരിയാക്കിയ മെഷീനുകൾ", values: "ഞങ്ങളുടെ ചിന്തകൾ", val1: "നല്ല ജോലി", val2: "ടീം വർക്ക്", val3: "യഥാർത്ഥ പങ്കാളികൾ", solutions: "സേവനങ്ങൾ", sol1: "ക്രെയിൻ ജോലി", sol2: "റൂഫ് മെഷീനുകൾ", sol3: "ഫാക്ടറി ഓട്ടോമേഷൻ", vers: "എല്ലാ ജോലികളിലും മിടുക്ക്", versSub: "എല്ലാത്തരം ഫാക്ടറി ജോലികളിലും ഞങ്ങൾ സഹായിക്കുന്നു.", explore: "കൂടുതൽ അറിയുക", projects: "ഞങ്ങളുടെ ജോലികൾ", viewAll: "എല്ലാ ജോലികളും കാണുക", updates: "പുതിയ വാർത്തകൾ", readAll: "എല്ലാ വാർത്തകളും വായിക്കുക", reportTitle: "മെഷീൻ തകരാർ അറിയിക്കുക", fName: "ഫാക്ടറിയുടെ പേര്", fPhone: "ഫോൺ നമ്പർ", fIssue: "എന്താണ് പ്രശ്നം?", submit: "അയയ്ക്കുക", success: "അയച്ചു." },
  gu: { hero: "ફેક્ટરી મશીનો અને સેવાઓ માટે સંપૂર્ણ ઉકેલ.", legacy: "સારા કામની ઓળખ", years: "31+", yearsText: "વિશ્વાસના વર્ષો", factories: "6,000+", factoriesText: "ચાલુ ફેક્ટરીઓ", machines: "100,000+", machinesText: "રિપેર કરેલ મશીનો", values: "અમારા વિચારો", val1: "સારું કામ", val2: "ટીમ વર્ક", val3: "સાચા સાથી", solutions: "સેવાઓ", sol1: "ક્રેનનું કામ", sol2: "છતની મશીનો", sol3: "ફેક્ટરી ઓટોમેશન", vers: "દરેક કામમાં નિપુણતા", versSub: "અમે તમામ પ્રકારના ફેક્ટરી કામમાં મદદ કરીએ છીએ.", explore: "વધુ જાણો", projects: "અમારા કામ", viewAll: "બધા કામ જુઓ", updates: "નવા સમાચાર", readAll: "બધા સમાચાર વાંચો", reportTitle: "મશીનની ખરાબી જણાવો", fName: "ફેક્ટરીનું નામ", fPhone: "ફોન નંબર", fIssue: "શું સમસ્યા છે?", submit: "મોકલો", success: "મોકલાઈ ગયું." },
  pa: { hero: "ਫੈਕਟਰੀ ਮਸ਼ੀਨਾਂ ਅਤੇ ਸੇਵਾਵਾਂ ਲਈ ਪੂਰਾ ਹੱਲ.", legacy: "ਚੰਗੇ ਕੰਮ ਦੀ ਪਛਾਣ", years: "31+", yearsText: "ਵਿਸ਼ਵਾਸ ਦੇ ਸਾਲ", factories: "6,000+", factoriesText: "ਚਾਲੂ ਫੈਕਟਰੀਆਂ", machines: "100,000+", machinesText: "ਠੀਕ ਕੀਤੀਆਂ ਮਸ਼ੀਨਾਂ", values: "ਸਾਡੇ ਵਿਚਾਰ", val1: "ਚੰਗਾ ਕੰਮ", val2: "ਟੀਮ ਵਰਕ", val3: "ਸੱਚੇ ਸਾਥੀ", solutions: "ਸੇਵਾਵਾਂ", sol1: "ਕਰੇਨ ਦਾ ਕੰਮ", sol2: "ਛੱਤ ਦੀਆਂ ਮਸ਼ੀਨਾਂ", sol3: "ਫੈਕਟਰੀ ਆਟੋਮੇਸ਼ਨ", vers: "ਹਰ ਕੰਮ ਵਿੱਚ ਮਾਹਰ", versSub: "ਅਸੀਂ ਹਰ ਤਰ੍ਹਾਂ ਦੇ ਫੈਕਟਰੀ ਕੰਮ ਵਿੱਚ ਮਦਦ ਕਰਦੇ ਹਾਂ.", explore: "ਹੋਰ ਜਾਣੋ", projects: "ਸਾਡੇ ਕੰਮ", viewAll: "ਸਾਰੇ ਕੰਮ ਦੇਖੋ", updates: "ਨਵੀਂ ਖ਼ਬਰ", readAll: "ਸਾਰੀਆਂ ਖ਼ਬਰਾਂ ਪੜ੍ਹੋ", reportTitle: "ਮਸ਼ੀਨ ਦੀ ਖਰਾਬੀ ਦੱਸੋ", fName: "ਫੈਕਟਰੀ ਦਾ ਨਾਂ", fPhone: "ਫੋਨ ਨੰਬਰ", fIssue: "ਕੀ ਸਮੱਸਿਆ ਹੈ?", submit: "ਭੇਜੋ", success: "ਭੇਜ ਦਿੱਤਾ ਗਿਆ." },
  bn: { hero: "কারখানার মেশিন এবং পরিষেবার জন্য সম্পূর্ণ সমাধান।", legacy: "ভালো কাজের পরিচয়", years: "31+", yearsText: "বিশ্বাসের বছর", factories: "6,000+", factoriesText: "চলমান কারখানা", machines: "100,000+", machinesText: "মেরামত করা মেশিন", values: "আমাদের চিন্তা", val1: "ভালো কাজ", val2: "টিম ওয়ার্ক", val3: "সত্যিকারের সঙ্গী", solutions: "পরিষেবা", sol1: "ক্রেনের কাজ", sol2: "ছাদের মেশিন", sol3: "কারখানা অটোমেশন", vers: "সব কাজে পারদর্শী", versSub: "আমরা সব ধরনের কারখানার কাজে সাহায্য করি।", explore: "আরও জানুন", projects: "আমাদের কাজ", viewAll: "সব কাজ দেখুন", updates: "নতুন খবর", readAll: "সব খবর পড়ুন", reportTitle: "মেশিনের সমস্যা জানান", fName: "কারখানার নাম", fPhone: "ফোন নম্বর", fIssue: "সমস্যা কী?", submit: "পাঠান", success: "পাঠানো হয়েছে।" },
  or: { hero: "କାରଖାନା ମେସିନ୍ ଏବଂ ସେବା ପାଇଁ ସମ୍ପୂର୍ଣ୍ଣ ସମାଧାନ.", legacy: "ଭଲ କାମର ପରିଚୟ", years: "31+", yearsText: "ବିଶ୍ୱାସର ବର୍ଷ", factories: "6,000+", factoriesText: "ଚାଲୁଥିବା କାରଖାନା", machines: "100,000+", machinesText: "ସଜଡା ଯାଇଥିବା ମେସିନ୍", values: "ଆମର ବିଚାର", val1: "ଭଲ କାମ", val2: "ଟିମ୍ ୱାର୍କ", val3: "ପ୍ରକୃତ ସାଥୀ", solutions: "ସେବା", sol1: "କ୍ରେନ୍ କାମ", sol2: "ଛାତ ମେସିନ୍", sol3: "କାରଖାନା ଅଟୋମେସନ୍", vers: "ସବୁ କାମରେ ପାରଙ୍ଗମ", versSub: "ଆମେ ସବୁ ପ୍ରକାର କାରଖାନା କାମରେ ସାହାଯ୍ୟ କରୁ.", explore: "ଅଧିକ ଜାଣନ୍ତୁ", projects: "ଆମର କାମ", viewAll: "ସବୁ କାମ ଦେଖନ୍ତୁ", updates: "ନୂଆ ଖବର", readAll: "ସବୁ ଖବର ପଢନ୍ତୁ", reportTitle: "ମେସିନ୍ ଖରାପ ଜଣାନ୍ତୁ", fName: "କାରଖାନା ନାମ", fPhone: "ଫୋନ୍ ନମ୍ବର", fIssue: "ସମସ୍ୟା କଣ?", submit: "ପଠାନ୍ତୁ", success: "ପଠାଗଲା." },
  ur: { hero: "فیکٹری مشینوں اور خدمات کے لیے مکمل حل۔", legacy: "اچھے کام کی پہچان", years: "31+", yearsText: "اعتماد کے سال", factories: "6,000+", factoriesText: "چلتی فیکٹریاں", machines: "100,000+", machinesText: "ٹھیک کی گئی مشینیں", values: "ہمارے خیالات", val1: "اچھا کام", val2: "ٹیم ورک", val3: "سچے ساتھی", solutions: "خدمات", sol1: "کرین کا کام", sol2: "چھت کی مشینیں", sol3: "فیکٹری آٹومیشن", vers: "ہر کام میں ماہر", versSub: "ہم ہر طرح کے فیکٹری کے کام میں مدد کرتے ہیں۔", explore: "مزید جانیں", projects: "ہمارے کام", viewAll: "تمام کام دیکھیں", updates: "نئی خبریں", readAll: "تمام خبریں پڑھیں", reportTitle: "مشین کی خرابی بتائیں", fName: "فیکٹری کا نام", fPhone: "فون نمبر", fIssue: "کیا مسئلہ ہے؟", submit: "بھیجیں", success: "بھیج دیا گیا۔" },
  as: { hero: "কাৰখানাৰ মেচিন আৰু সেৱাৰ বাবে সম্পূৰ্ণ সমাধান.", legacy: "ভাল কামৰ পৰিচয়", years: "31+", yearsText: "বিশ্বাসৰ বছৰ", factories: "6,000+", factoriesText: "চলি থকা কাৰখানা", machines: "100,000+", machinesText: "মেৰামতি কৰা মেচিন", values: "আমাৰ বিচাৰ", val1: "ভাল কাম", val2: "টিম ৱৰ্ক", val3: "প্ৰকৃত সংগী", solutions: "সেৱাসমূহ", sol1: "ক্ৰেনৰ কাম", sol2: "ছাদৰ মেচিন", sol3: "কাৰখানা অটোমেচন", vers: "সকলো কামতে পাৰ্গত", versSub: "আমি সকলো ধৰণৰ কাৰখানাৰ কামত সহায় কৰোঁ.", explore: "অধিক জানক", projects: "আমাৰ কাম", viewAll: "সকলো কাম চাওক", updates: "নতুন খবৰ", readAll: "সকলো খবৰ পঢ়ক", reportTitle: "মেচিনৰ বিজুতি জনাওক", fName: "কাৰখানাৰ নাম", fPhone: "ফোন নম্বৰ", fIssue: "সমস্যা কি?", submit: "পঠাওক", success: "পঠোৱা হ'ল." },
  bho: { hero: "फैक्टरी मशीन अउरी सेवा खातिर पूरा समाधान।", legacy: "बढ़िया काम के पहचान", years: "31+", yearsText: "भरोसा के साल", factories: "6,000+", factoriesText: "चालू कारखाना", machines: "100,000+", machinesText: "ठीक कइल मशीन", values: "हमनी के बिचार", val1: "बढ़िया काम", val2: "टीम के काम", val3: "सच्चा साथी", solutions: "सेवा", sol1: "क्रेन के काम", sol2: "छत के मशीन", sol3: "फैक्टरी ऑटोमेशन", vers: "सब काम में माहिर", versSub: "हमनी के हर तरह के फैक्टरी काम में मदद करीले।", explore: "अउरी जानीं", projects: "हमनी के काम", viewAll: "सब काम देखीं", updates: "नया खबर", readAll: "सब खबर पढ़ीं", reportTitle: "मशीन के खराबी बताईं", fName: "फैक्टरी के नाम", fPhone: "फोन नंबर", fIssue: "का दिक्कत बा?", submit: "भेजीं", success: "भेज दिहल गइल।" }
};

const slideImages = [
  "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=2000"
];

export const Home = () => {
  const [language, setLanguage] = useState(localStorage.getItem('nss_lang') || 'en');
  const [formState, setFormState] = useState({ name: '', phone: '', issue: '' });
  const [status, setStatus] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleLangChange = (e) => setLanguage(e.detail);
    window.addEventListener('languageChanged', handleLangChange);
    return () => window.removeEventListener('languageChanged', handleLangChange);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slideImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length);

  const t = homeTranslations[language] || homeTranslations['en'];

  const handleIncidentReport = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'serviceRequests'), {
        ...formState,
        timestamp: new Date().toISOString(),
        status: 'Submitted'
      });
      setFormState({ name: '', phone: '', issue: '' });
      setStatus(t.success);
      setTimeout(() => setStatus(''), 4000);
    } catch (err) {
      console.error(err);
      setStatus("Error saving record.");
    }
  };

  return (
    <div className="w-full bg-gray-50 overflow-hidden font-sans text-gray-900">
      
      {/* Desktop Hero Section: Image Slider */}
      <section className="hidden md:flex relative w-full h-[60vh] bg-[#0035A0] items-center px-12 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentSlide}
            src={slideImages[currentSlide]}
            alt="Factory Infrastructure"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
        <div className="relative z-20 w-full max-w-7xl mx-auto flex justify-between items-center">
          <button onClick={prevSlide} className="bg-white/20 p-2 hover:bg-white/40 transition z-30"><ChevronLeft className="text-white h-8 w-8" /></button>
          <div className="flex-1 px-12">
            <motion.h1 
              key={t.hero}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-white text-5xl font-bold leading-tight max-w-3xl"
            >
              {t.hero}
            </motion.h1>
          </div>
          <button onClick={nextSlide} className="bg-white/20 p-2 hover:bg-white/40 transition z-30"><ChevronRight className="text-white h-8 w-8" /></button>
        </div>
      </section>

      {/* Mobile Hero Section */}
      <section className="md:hidden flex flex-col pt-8 bg-white">
        <div className="px-4 mb-6">
          <h1 className="text-[32px] leading-tight font-bold text-gray-900">{t.hero}</h1>
        </div>
        <div className="w-full h-64 bg-[#0035A0] flex items-center justify-center relative overflow-hidden">
           <img src={slideImages[currentSlide]} alt="Factory Work" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply" />
           <div className="absolute inset-0 bg-black opacity-20"></div>
           <div className="absolute inset-y-0 right-4 flex items-center z-20">
             <button onClick={nextSlide} className="bg-white/30 p-2 rounded-sm"><ChevronRight className="text-white h-6 w-6" /></button>
           </div>
        </div>
      </section>

      {/* Legacy & Stats Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex justify-between items-start gap-12">
            <div className="w-1/3">
              <h2 className="text-4xl font-bold mb-6">{t.legacy}</h2>
              <Link to="/about" className="text-[#0035A0] font-bold flex items-center hover:underline">
                {t.explore} <ArrowUpRight className="ml-1 h-5 w-5" />
              </Link>
            </div>
            <div className="w-2/3 grid grid-cols-2 gap-10 border-l border-gray-200 pl-12">
               <div>
                 <h3 className="text-6xl font-bold text-[#0035A0] mb-2">{t.years}</h3>
                 <p className="text-gray-600 font-semibold">{t.yearsText}</p>
               </div>
               <div>
                 <h3 className="text-6xl font-bold text-[#0035A0] mb-2">{t.factories}</h3>
                 <p className="text-gray-600 font-semibold">{t.factoriesText}</p>
               </div>
               <div className="col-span-2">
                 <h3 className="text-6xl font-bold text-[#0035A0] mb-2">{t.machines}</h3>
                 <p className="text-gray-600 font-semibold">{t.machinesText}</p>
               </div>
            </div>
          </div>

          <div className="md:hidden flex flex-col">
            <h2 className="text-3xl font-bold mb-8">{t.legacy}</h2>
            <div className="w-full h-48 bg-gray-200 mb-8 overflow-hidden relative flex items-center">
              <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800" alt="Legacy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#0035A0] opacity-40"></div>
              <div className="absolute bottom-2 w-full flex justify-center space-x-2">
                <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                <div className="h-2 w-2 bg-white rounded-full"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8">
               <div className="border-b border-gray-200 pb-6">
                 <h3 className="text-5xl font-bold text-[#0035A0] mb-1">{t.years}</h3>
                 <p className="text-gray-600 font-semibold text-lg">{t.yearsText}</p>
               </div>
               <div className="border-b border-gray-200 pb-6">
                 <h3 className="text-5xl font-bold text-[#0035A0] mb-1">{t.factories}</h3>
                 <p className="text-gray-600 font-semibold text-lg">{t.factoriesText}</p>
               </div>
               <div>
                 <h3 className="text-5xl font-bold text-[#0035A0] mb-1">{t.machines}</h3>
                 <p className="text-gray-600 font-semibold text-lg">{t.machinesText}</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
             <h2 className="text-3xl md:text-4xl font-bold">{t.values}</h2>
             <Link to="/about" className="hidden md:flex text-[#0035A0] font-bold items-center hover:underline">
                {t.explore} <ArrowUpRight className="ml-1 h-5 w-5" />
             </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-white p-6 border border-gray-200 flex flex-col items-start shadow-sm hover:shadow-md transition">
                <div className="w-20 h-20 bg-[#0035A0] rounded-sm flex items-center justify-center mb-6">
                  <CheckSquare className="text-white h-10 w-10" />
                </div>
                <h4 className="text-xl font-bold">{t.val1}</h4>
             </div>
             <div className="bg-white p-6 border border-gray-200 flex flex-col items-start shadow-sm hover:shadow-md transition">
                <div className="w-20 h-20 bg-[#0035A0] rounded-sm flex items-center justify-center mb-6">
                  <Users className="text-white h-10 w-10" />
                </div>
                <h4 className="text-xl font-bold">{t.val2}</h4>
             </div>
             <div className="bg-white p-6 border border-gray-200 flex flex-col items-start shadow-sm hover:shadow-md transition">
                <div className="w-20 h-20 bg-[#0035A0] rounded-sm flex items-center justify-center mb-6">
                  <Handshake className="text-white h-10 w-10" />
                </div>
                <h4 className="text-xl font-bold">{t.val3}</h4>
             </div>
          </div>
          <Link to="/about" className="md:hidden mt-6 text-[#0035A0] font-bold flex items-center hover:underline">
             {t.explore} <ArrowUpRight className="ml-1 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Versatility & Solutions Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="mb-12">
             <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.vers}</h2>
             <p className="text-gray-600 text-lg md:text-xl max-w-2xl">{t.versSub}</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative h-96 bg-gray-200 border border-gray-200 overflow-hidden group">
                 <img src="https://www.technomaxme.com/wp-content/uploads/2021/11/eot-crane.webp?auto=format&fit=crop&q=80&w=800" alt={t.sol1} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                 <div className="absolute inset-0 bg-[#0035A0] opacity-20"></div>
                 <div className="absolute bottom-0 left-0 right-0 bg-white p-6">
                    <h4 className="text-lg font-bold mb-4">{t.sol1}</h4>
                    <Link to="/eot-cranes" className="text-[#0035A0] font-bold flex items-center hover:underline text-sm">
                       {t.explore} <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Link>
                 </div>
              </div>
              <div className="relative h-96 bg-gray-200 border border-gray-200 overflow-hidden group">
                 <img src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSvIazJJC5epTGTe8DX1-XiEBjXbIlJbSS4Gw2jF0ceUlA0GlcwvbhIo4m64wAFAPf5pTErg9Y7dFDxseLraEvOw0xukV7jJJ7SuydK4wGb&usqp=CAc?auto=format&fit=crop&q=80&w=800" alt={t.sol2} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                 <div className="absolute inset-0 bg-[#0035A0] opacity-20"></div>
                 <div className="absolute bottom-0 left-0 right-0 bg-white p-6">
                    <h4 className="text-lg font-bold mb-4">{t.sol2}</h4>
                    <Link to="/roof-profile" className="text-[#0035A0] font-bold flex items-center hover:underline text-sm">
                       {t.explore} <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Link>
                 </div>
              </div>
              <div className="relative h-96 bg-gray-200 border border-gray-200 overflow-hidden group">
                 <img src="https://www.analog.com/en/_/media/project/analogweb/analogweb/solutions-overview/industry-overview-images/industrial-automation.jpg?rev=fdfa1709bb424bc2b3ea10b7825abcd9&sc_lang=en&la=en&h=498&w=2560&hash=7BD8254A3F5A7B67680CE596A2BDBB08?auto=format&fit=crop&q=80&w=800" alt={t.sol3} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                 <div className="absolute inset-0 bg-[#0035A0] opacity-20"></div>
                 <div className="absolute bottom-0 left-0 right-0 bg-white p-6">
                    <h4 className="text-lg font-bold mb-4">{t.sol3}</h4>
                    <Link to="/automation" className="text-[#0035A0] font-bold flex items-center hover:underline text-sm">
                       {t.explore} <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Link>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-center mb-8">
             <h2 className="text-3xl md:text-4xl font-bold">{t.projects}</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-72 bg-gray-200 border border-gray-200 relative p-6 flex flex-col justify-end group overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800" alt="Project 1" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0035A0]/80 to-transparent"></div>
                 <h4 className="relative z-10 text-xl font-bold bg-white p-4 w-3/4">{t.sol1}</h4>
              </div>
              <div className="h-72 bg-gray-200 border border-gray-200 relative p-6 flex flex-col justify-end group overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1513828742140-ccaa28f3eda0?auto=format&fit=crop&q=80&w=800" alt="Project 2" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0035A0]/80 to-transparent"></div>
                 <h4 className="relative z-10 text-xl font-bold bg-white p-4 w-3/4">{t.sol3}</h4>
              </div>
           </div>
           
           <div className="mt-8 text-center md:text-left">
              <Link to="/projects" className="text-[#0035A0] font-bold inline-flex items-center hover:underline">
                 {t.viewAll} <ArrowUpRight className="ml-1 h-5 w-5" />
              </Link>
           </div>
        </div>
      </section>

      {/* Latest Updates & Quick Incident Report Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
           
           {/* Updates List */}
           <div>
             <div className="flex justify-between items-center mb-8">
               <h2 className="text-3xl font-bold">{t.updates}</h2>
               <Link to="/knowledge" className="text-[#0035A0] font-bold hidden md:flex items-center hover:underline text-sm">
                  {t.readAll} <ArrowUpRight className="ml-1 h-4 w-4" />
               </Link>
             </div>
             
             <div className="flex flex-col space-y-6">
                <div className="border-b border-gray-200 pb-4">
                   <p className="text-sm text-gray-500 mb-2">Company News - 17/10/2026</p>
                   <h4 className="text-lg font-bold hover:text-[#0035A0] cursor-pointer uppercase">NSS Marks Key Factory Safety Milestones at Pune Forum 2026</h4>
                </div>
                <div className="border-b border-gray-200 pb-4">
                   <p className="text-sm text-gray-500 mb-2">Service Updates - 25/09/2026</p>
                   <h4 className="text-lg font-bold hover:text-[#0035A0] cursor-pointer uppercase">From Breakdown to Success: Fast EOT Crane Recovery in Bhosari</h4>
                </div>
             </div>
           </div>

           {/* Quick Incident Form */}
           <div className="bg-gray-50 p-8 border border-gray-200">
             <h3 className="text-2xl font-bold mb-6 flex items-center text-[#0035A0]">
                <AlertCircle className="h-6 w-6 mr-2" /> {t.reportTitle}
             </h3>
             <form onSubmit={handleIncidentReport} className="flex flex-col space-y-4">
                <div>
                   <label className="block text-sm font-bold mb-2">{t.fName}</label>
                   <input type="text" required value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} className="w-full p-3 border border-gray-300 outline-none focus:border-[#0035A0]" />
                </div>
                <div>
                   <label className="block text-sm font-bold mb-2">{t.fPhone}</label>
                   <input type="tel" required value={formState.phone} onChange={(e) => setFormState({...formState, phone: e.target.value})} className="w-full p-3 border border-gray-300 outline-none focus:border-[#0035A0]" />
                </div>
                <div>
                   <label className="block text-sm font-bold mb-2">{t.fIssue}</label>
                   <textarea required rows="3" value={formState.issue} onChange={(e) => setFormState({...formState, issue: e.target.value})} className="w-full p-3 border border-gray-300 outline-none focus:border-[#0035A0]"></textarea>
                </div>
                <button type="submit" className="bg-[#0035A0] text-white font-bold py-3 hover:bg-blue-800 transition text-lg mt-2 flex justify-center items-center">
                   {t.submit}
                </button>
                {status && <p className="text-green-700 font-bold text-sm mt-2 text-center">{status}</p>}
             </form>
           </div>
        </div>
      </section>
    </div>
  );
};