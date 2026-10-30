import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const serviceTranslations = {
  en: { title: "NSS Factory Services", s1: "Crane Repair", s1d: "Complete checks and repairs for single and double girder cranes.", s2: "Roof Machine Work", s2d: "Roller repair, cutter blade changes, and defect fixing.", s3: "Electric Panel Work", s3d: "Control desk making, sensor wiring, and panel repairs.", s4: "CNC Machine Work", s4d: "Lubrication clearing, axis checks, and electrical fault repairs.", s5: "Factory Safety Check", s5d: "Pre-inspection reports and crane hoist safety coordination.", s6: "Machine Automation", s6d: "Hydraulic and pneumatic mechanical assembly and setup.", knowMore: "Know More" },
  hi: { title: "NSS फैक्ट्री सेवाएं", s1: "क्रेन की मरम्मत", s1d: "सिंगल और डबल गर्डर क्रेन की पूरी जांच और मरम्मत।", s2: "छत की मशीन का काम", s2d: "रोलर की मरम्मत, कटर ब्लेड बदलना और खराबी ठीक करना।", s3: "इलेक्ट्रिक पैनल का काम", s3d: "कंट्रोल डेस्क बनाना, सेंसर वायरिंग और पैनल की मरम्मत।", s4: "सीएनसी मशीन का काम", s4d: "लुब्रिकेशन साफ करना, एक्सिस जांच और बिजली की खराबी ठीक करना।", s5: "फैक्ट्री की सुरक्षा जांच", s5d: "निरीक्षण से पहले की रिपोर्ट और क्रेन होइस्ट सुरक्षा समन्वय।", s6: "मशीन ऑटोमेशन", s6d: "हाइड्रोलिक और न्यूमेटिक मैकेनिकल असेंबली और सेटअप।", knowMore: "और जानें" },
  mr: { title: "NSS फॅक्टरी सेवा", s1: "क्रेन दुरुस्ती", s1d: "सिंगल आणि डबल गर्डर क्रेनची संपूर्ण तपासणी आणि दुरुस्ती.", s2: "छताच्या मशीनचे काम", s2d: "रोलर दुरुस्ती, कटर ब्लेड बदलणे आणि बिघाड दुरुस्त करणे.", s3: "इलेक्ट्रिक पॅनेलचे काम", s3d: "कंट्रोल डेस्क बनवणे, सेन्सर वायरिंग आणि पॅनेल दुरुस्ती.", s4: "सीएनसी मशीनचे काम", s4d: "लुब्रिकेशन साफ करणे, अक्षांची तपासणी आणि विजेचे बिघाड दुरुस्त करणे.", s5: "फॅक्टरी सुरक्षा तपासणी", s5d: "तपासणीपूर्वीचे अहवाल आणि क्रेन होइस्ट सुरक्षा समन्वय.", s6: "मशीन ऑटोमेशन", s6d: "हायड्रॉलिक आणि न्यूमॅटिक मेकॅनिकल असेंब्ली आणि सेटअप.", knowMore: "अधिक जाणून घ्या" },
  te: { title: "NSS ఫ్యాక్టరీ సేవలు", s1: "క్రేన్ మరమ్మత్తు", s1d: "సింగిల్ మరియు డబుల్ గిర్డర్ క్రేన్ల కోసం పూర్తి తనిఖీలు మరియు మరమ్మతులు.", s2: "రూఫ్ యంత్రం పని", s2d: "రోలర్ మరమ్మత్తు, కట్టర్ బ్లేడ్ మార్పులు మరియు లోపాలను సరిచేయడం.", s3: "ఎలక్ట్రిక్ ప్యానెల్ పని", s3d: "కంట్రోల్ డెస్క్ తయారీ, సెన్సార్ వైరింగ్ మరియు ప్యానెల్ మరమ్మతులు.", s4: "సీఎన్‌సీ యంత్రం పని", s4d: "లూబ్రికేషన్ క్లియరింగ్, యాక్సిస్ తనిఖీలు మరియు ఎలక్ట్రికల్ ఫాల్ట్ మరమ్మత్తులు.", s5: "ఫ్యాక్టరీ భద్రతా తనిఖీ", s5d: "ప్రీ-ఇన్స్పెక్షన్ నివేదికలు మరియు క్రేన్ హోయిస్ట్ భద్రతా సమన్వయం.", s6: "యంత్రం ఆటోమేషన్", s6d: "హైడ్రాలిక్ మరియు న్యూమాటిక్ మెకానికల్ అసెంబ్లీ మరియు సెటప్.", knowMore: "మరింత తెలుసుకోండి" },
  ta: { title: "NSS தொழிற்சாலை சேவைகள்", s1: "கிரேன் பழுது", s1d: "ஒற்றை மற்றும் இரட்டை கர்டர் கிரேன்களுக்கான முழுமையான சோதனைகள் மற்றும் பழுதுபார்ப்புகள்.", s2: "கூரையின் இயந்திர வேலை", s2d: "ரோலர் பழுது, கட்டர் பிளேடு மாற்றங்கள் மற்றும் குறைபாடுகளை சரிசெய்தல்.", s3: "மின்சார பேனல் வேலை", s3d: "கட்டுப்பாட்டு மேசை தயாரித்தல், சென்சார் வயரிங் மற்றும் பேனல் பழுது.", s4: "CNC இயந்திர வேலை", s4d: "லூப்ரிகேஷன் கிளியரிங், அச்சு சோதனைகள் மற்றும் மின் பழுதுகள்.", s5: "தொழிற்சாலை பாதுகாப்பு சோதனை", s5d: "முன் ஆய்வு அறிக்கைகள் மற்றும் கிரேன் ஹாய்ஸ்ட் பாதுகாப்பு ஒருங்கிணைப்பு.", s6: "இயந்திர ஆட்டோமேஷன்", s6d: "ஹைட்ராலிக் மற்றும் நியூமேடிக் மெக்கானிக்கல் அசெம்பிளி மற்றும் அமைப்பு.", knowMore: "மேலும் அறிய" },
  kn: { title: "NSS ಕಾರ್ಖಾನೆ ಸೇವೆಗಳು", s1: "ಕ್ರೇನ್ ದುರಸ್ತಿ", s1d: "ಸಿಂಗಲ್ ಮತ್ತು ಡಬಲ್ ಗಿರ್ಡರ್ ಕ್ರೇನ್‌ಗಳಿಗೆ ಸಂಪೂರ್ಣ ತಪಾಸಣೆ ಮತ್ತು ರಿಪೇರಿ.", s2: "ಛಾವಣಿಯ ಯಂತ್ರದ ಕೆಲಸ", s2d: "ರೋಲರ್ ದುರಸ್ತಿ, ಕಟ್ಟರ್ ಬ್ಲೇಡ್ ಬದಲಾವಣೆಗಳು ಮತ್ತು ದೋಷಗಳನ್ನು ಸರಿಪಡಿಸುವುದು.", s3: "ಎಲೆಕ್ಟ್ರಿಕ್ ಪ್ಯಾನಲ್ ಕೆಲಸ", s3d: "ನಿಯಂತ್ರಣ ಡೆಸ್ಕ್ ತಯಾರಿಕೆ, ಸಂವೇದಕ ವೈರಿಂಗ್ ಮತ್ತು ಪ್ಯಾನಲ್ ರಿಪೇರಿ.", s4: "ಸಿಎನ್‌ಸಿ ಯಂತ್ರದ ಕೆಲಸ", s4d: "ಲೂಬ್ರಿಕೇಶನ್ ಕ್ಲಿಯರಿಂಗ್, ಅಕ್ಷದ ತಪಾಸಣೆ ಮತ್ತು ವಿದ್ಯುತ್ ದೋಷಗಳ ದುರಸ್ತಿ.", s5: "ಕಾರ್ಖಾನೆ ಸುರಕ್ಷತಾ ತಪಾಸಣೆ", s5d: "ಪೂರ್ವ-ತಪಾಸಣೆ ವರದಿಗಳು ಮತ್ತು ಕ್ರೇನ್ ಹೋಸ್ಟ್ ಸುರಕ್ಷತಾ ಸಮನ್ವಯ.", s6: "ಯಂತ್ರ ಆಟೊಮೇಷನ್", s6d: "ಹೈಡ್ರಾಲಿಕ್ ಮತ್ತು ನ್ಯೂಮ್ಯಾಟಿಕ್ ಯಾಂತ್ರಿಕ ಜೋಡಣೆ ಮತ್ತು ಸೆಟಪ್.", knowMore: "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ" },
  ml: { title: "NSS ഫാക്ടറി സേവനങ്ങൾ", s1: "ക്രെയിൻ അറ്റകുറ്റപ്പണി", s1d: "സിംഗിൾ, ഡബിൾ ഗിർഡർ ക്രെയിനുകൾക്കായുള്ള പൂർണ്ണ പരിശോധനകളും അറ്റകുറ്റപ്പണികളും.", s2: "റൂഫ് മെഷീൻ ജോലി", s2d: "റോളർ റിപ്പയർ, കട്ടർ ബ്ലേഡ് മാറ്റങ്ങൾ, തകരാറുകൾ പരിഹരിക്കൽ.", s3: "ഇലക്ട്രിക് പാനൽ ജോലി", s3d: "കൺട്രോൾ ഡെസ്ക് നിർമ്മാണം, സെൻസർ വയറിംഗ്, പാനൽ അറ്റകുറ്റപ്പണികൾ.", s4: "CNC മെഷീൻ ജോലി", s4d: "ലൂബ്രിക്കേഷൻ ക്ലിയറിംഗ്, ആക്സിസ് ചെക്കുകൾ, ഇലക്ട്രിക്കൽ ഫോൾട്ട് റിപ്പയറുകൾ.", s5: "ഫാക്ടറി സുരക്ഷാ പരിശോധന", s5d: "പ്രീ-ഇൻസ്പെക്ഷൻ റിപ്പോർട്ടുകളും ക്രെയിൻ ഹോയിസ്റ്റ് സുരക്ഷാ ഏകോപനവും.", s6: "മെഷീൻ ഓട്ടോമേഷൻ", s6d: "ഹൈഡ്രോളിക്, ന്യൂമാറ്റിക് മെക്കാനിക്കൽ അസംബ്ലിയും സജ്ജീകരണവും.", knowMore: "കൂടുതൽ അറിയുക" },
  gu: { title: "NSS ફેક્ટરી સેવાઓ", s1: "ક્રેનનું સમારકામ", s1d: "સિંગલ અને ડબલ ગર્ડર ક્રેન્સ માટે સંપૂર્ણ તપાસ અને સમારકામ.", s2: "છતની મશીનનું કામ", s2d: "રોલર રિપેર, કટર બ્લેડમાં ફેરફાર અને ખામીઓ સુધારવી.", s3: "ઇલેક્ટ્રિક પેનલનું કામ", s3d: "કંટ્રોલ ડેસ્ક બનાવવું, સેન્સર વાયરિંગ અને પેનલ રિપેર.", s4: "CNC મશીનનું કામ", s4d: "લુબ્રિકેશન ક્લિયરિંગ, એક્સિસ ચેક્સ અને ઇલેક્ટ્રિકલ ફોલ્ટ રિપેર.", s5: "ફેક્ટરી સુરક્ષા તપાસ", s5d: "પ્રી-ઇન્સ્પેક્શન રિપોર્ટ્સ અને ક્રેન હોઇસ્ટ સેફ્ટી કોઓર્ડિનેશન.", s6: "મશીન ઓટોમેશન", s6d: "હાઇડ્રોલિક અને ન્યુમેટિક મિકેનિકલ એસેમ્બલી અને સેટઅપ.", knowMore: "વધુ જાણો" },
  pa: { title: "NSS ਫੈਕਟਰੀ ਸੇਵਾਵਾਂ", s1: "ਕਰੇਨ ਦੀ ਮੁਰੰਮਤ", s1d: "ਸਿੰਗਲ ਅਤੇ ਡਬਲ ਗਰਡਰ ਕਰੇਨਾਂ ਲਈ ਪੂਰੀ ਜਾਂਚ ਅਤੇ ਮੁਰੰਮਤ.", s2: "ਛੱਤ ਦੀ ਮਸ਼ੀਨ ਦਾ ਕੰਮ", s2d: "ਰੋਲਰ ਦੀ ਮੁਰੰਮਤ, ਕਟਰ ਬਲੇਡ ਬਦਲਣਾ ਅਤੇ ਖਰਾਬੀ ਠੀਕ ਕਰਨਾ.", s3: "ਇਲੈਕਟ੍ਰਿਕ ਪੈਨਲ ਦਾ ਕੰਮ", s3d: "ਕੰਟਰੋਲ ਡੈਸਕ ਬਣਾਉਣਾ, ਸੈਂਸਰ ਵਾਇਰਿੰਗ ਅਤੇ ਪੈਨਲ ਦੀ ਮੁਰੰਮਤ.", s4: "ਸੀਐਨਸੀ ਮਸ਼ੀਨ ਦਾ ਕੰਮ", s4d: "ਲੁਬਰੀਕੇਸ਼ਨ ਸਾਫ਼ ਕਰਨਾ, ਐਕਸਿਸ ਚੈੱਕ ਅਤੇ ਬਿਜਲੀ ਦੀ ਖਰਾਬੀ ਠੀਕ ਕਰਨਾ.", s5: "ਫੈਕਟਰੀ ਸੁਰੱਖਿਆ ਜਾਂਚ", s5d: "ਪ੍ਰੀ-ਇੰਸਪੈਕਸ਼ਨ ਰਿਪੋਰਟਾਂ ਅਤੇ ਕਰੇਨ ਹੋਇਸਟ ਸੁਰੱਖਿਆ ਤਾਲਮੇਲ.", s6: "ਮਸ਼ੀਨ ਆਟੋਮੇਸ਼ਨ", s6d: "ਹਾਈਡ੍ਰੌਲਿਕ ਅਤੇ ਨਿਊਮੈਟਿਕ ਮਕੈਨੀਕਲ ਅਸੈਂਬਲੀ ਅਤੇ ਸੈੱਟਅੱਪ.", knowMore: "ਹੋਰ ਜਾਣੋ" },
  bn: { title: "NSS কারখানার পরিষেবা", s1: "ক্রেন মেরামত", s1d: "সিঙ্গেল এবং ডাবল গার্ডার ক্রেনগুলির জন্য সম্পূর্ণ পরীক্ষা এবং মেরামত।", s2: "ছাদের মেশিনের কাজ", s2d: "রোলার মেরামত, কাটার ব্লেড পরিবর্তন এবং ত্রুটি সংশোধন।", s3: "ইলেকট্রিক প্যানেলের কাজ", s3d: "কন্ট্রোল ডেস্ক তৈরি, সেন্সর ওয়্যারিং এবং প্যানেল মেরামত।", s4: "সিএনসি মেশিনের কাজ", s4d: "লুব্রিকেশন ক্লিয়ারিং, এক্সিস চেক এবং বৈদ্যুতিক ত্রুটি মেরামত।", s5: "কারখানার নিরাপত্তা পরীক্ষা", s5d: "প্রি-ইন্সপেকশন রিপোর্ট এবং ক্রেন হোইস্ট নিরাপত্তা সমন্বয়।", s6: "মেশিন অটোমেশন", s6d: "হাইড্রোলিক এবং নিউমেটিক মেকানিক্যাল অ্যাসেম্বলি এবং সেটআপ।", knowMore: "আরও জানুন" },
  or: { title: "NSS କାରଖାନା ସେବା", s1: "କ୍ରେନ୍ ମରାମତି", s1d: "ସିଙ୍ଗଲ୍ ଏବଂ ଡବଲ୍ ଗିର୍ଡର୍ କ୍ରେନ୍ ପାଇଁ ସମ୍ପୂର୍ଣ୍ଣ ଯାଞ୍ଚ ଏବଂ ମରାମତି.", s2: "ଛାତ ମେସିନ୍ କାମ", s2d: "ରୋଲର୍ ମରାମତି, କଟର ବ୍ଲେଡ୍ ପରିବର୍ତ୍ତନ ଏବଂ ତ୍ରୁଟି ସୁଧାରିବା.", s3: "ଇଲେକ୍ଟ୍ରିକ୍ ପ୍ୟାନେଲ୍ କାମ", s3d: "କଣ୍ଟ୍ରୋଲ୍ ଡେସ୍କ ତିଆରି, ସେନ୍ସର ୱାରିଂ ଏବଂ ପ୍ୟାନେଲ୍ ମରାମତି.", s4: "ସିଏନସି ମେସିନ୍ କାମ", s4d: "ଲୁବ୍ରିକେସନ୍ କ୍ଲିୟରିଂ, ଆକ୍ସିସ୍ ଯାଞ୍ଚ ଏବଂ ଇଲେକ୍ଟ୍ରିକାଲ୍ ତ୍ରୁଟି ମରାମତି.", s5: "କାରଖାନା ସୁରକ୍ଷା ଯାଞ୍ଚ", s5d: "ପ୍ରି-ଇନ୍ସପେକ୍ସନ୍ ରିପୋର୍ଟ ଏବଂ କ୍ରେନ୍ ହୋଇଷ୍ଟ ସୁରକ୍ଷା ସମନ୍ୱୟ.", s6: "ମେସିନ୍ ଅଟୋମେସନ୍", s6d: "ହାଇଡ୍ରୋଲିକ୍ ଏବଂ ନ୍ୟୁମେଟିକ୍ ମେକାନିକାଲ୍ ଆସେମ୍ବଲି ଏବଂ ସେଟଅପ୍.", knowMore: "ଅଧିକ ଜାଣନ୍ତୁ" },
  ur: { title: "NSS فیکٹری کی خدمات", s1: "کرین کی مرمت", s1d: "سنگل اور ڈبل گرڈر کرینوں کے لیے مکمل چیکنگ اور مرمت۔", s2: "چھت کی مشین کا کام", s2d: "رولر کی مرمت، کٹر بلیڈ کی تبدیلی، اور خرابی دور کرنا۔", s3: "الیکٹرک پینل کا کام", s3d: "کنٹرول ڈیسک بنانا، سینسر وائرنگ، اور پینل کی مرمت۔", s4: "سی این سی مشین کا کام", s4d: "لبریکیشن صاف کرنا، ایکسس چیک کرنا، اور بجلی کی خرابی کی مرمت۔", s5: "فیکٹری کی حفاظتی جانچ", s5d: "پری انسپکشن رپورٹس اور کرین ہوسٹ سیفٹی کوآرڈینیشن۔", s6: "مشین آٹومیشن", s6d: "ہائیڈرولک اور نیومیٹک مکینیکل اسمبلی اور سیٹ اپ۔", knowMore: "مزید جانیں" },
  as: { title: "NSS কাৰখানাৰ সেৱাসমূহ", s1: "ক্ৰেন মেৰামতি", s1d: "ছিংগল আৰু ডাবল গাৰ্ডাৰ ক্ৰেনৰ বাবে সম্পূৰ্ণ পৰীক্ষা আৰু মেৰামতি.", s2: "ছাদৰ মেচিনৰ কাম", s2d: "ৰোলাৰ মেৰামতি, কটাৰ ব্লেড পৰিৱৰ্তন, আৰু বিজুতি মেৰামতি.", s3: "ইলেক্ট্ৰিক পেনেলৰ কাম", s3d: "কণ্ট্ৰল ডেস্ক নিৰ্মাণ, ছেন্সৰ ৱায়াৰিং, আৰু পেনেল মেৰামতি.", s4: "চিএনচি মেচিনৰ কাম", s4d: "লুব্ৰিকেচন ক্লিয়াৰিং, এক্সিছ পৰীক্ষা, আৰু বৈদ্যুতিক বিজুতি মেৰামতি.", s5: "কাৰখানাৰ নিৰাপত্তা পৰীক্ষা", s5d: "প্ৰি-ইন্সপেকচন ৰিপৰ্ট আৰু ক্ৰেন হোইষ্ট নিৰাপত্তা সমন্বয়.", s6: "মেচিন অটোমেচন", s6d: "হাইড্ৰলিক আৰু নিউমেটিক মেকানিকেল এছেম্বলি আৰু ছেটআপ.", knowMore: "অধিক জানক" },
  bho: { title: "NSS फैक्टरी सेवा", s1: "क्रेन के मरम्मत", s1d: "सिंगल अउरी डबल गर्डर क्रेन खातिर पूरा जांच अउरी मरम्मत।", s2: "छत के मशीन के काम", s2d: "रोलर के मरम्मत, कटर ब्लेड बदले के काम, अउरी खराबी ठीक कइल।", s3: "इलेक्ट्रिक पैनल के काम", s3d: "कंट्रोल डेस्क बनावल, सेंसर वायरिंग, अउरी पैनल के मरम्मत।", s4: "सीएनसी मशीन के काम", s4d: "लुब्रिकेशन साफ कइल, एक्सिस जांच, अउरी बिजली के खराबी ठीक कइल।", s5: "फैक्टरी के सुरक्षा जांच", s5d: "निरीक्षण से पहिले के रिपोर्ट अउरी क्रेन होइस्ट सुरक्षा समन्वय।", s6: "मशीन ऑटोमेशन", s6d: "हाइड्रोलिक अउरी न्यूमेटिक मैकेनिकल असेंबली अउरी सेटअप।", knowMore: "अउरी जानीं" }
};

export const Services = () => {
  const [language, setLanguage] = useState(localStorage.getItem('nss_lang') || 'en');

  useEffect(() => {
    const handleLangChange = (e) => setLanguage(e.detail);
    window.addEventListener('languageChanged', handleLangChange);
    return () => window.removeEventListener('languageChanged', handleLangChange);
  }, []);

  const t = serviceTranslations[language] || serviceTranslations['en'];

  return (
    <div className="w-full bg-white font-sans text-gray-900 pb-16 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 border-b border-gray-200 pb-6">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tight leading-tight">
            {t.title}
          </h1>
        </div>

        {/* Stacked Cards for Mobile, 3 Columns for Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-gray-50 border border-gray-200 p-6 flex flex-col justify-between items-start shadow-sm transition-shadow hover:shadow-md">
            <div>
              <h3 className="font-bold text-2xl text-gray-900 mb-3">{t.s1}</h3>
              <p className="text-base text-gray-700 leading-relaxed">{t.s1d}</p>
            </div>
            <Link to="/contact" className="text-[#0035A0] font-bold inline-flex items-center mt-6 hover:underline text-lg">
              {t.knowMore} <ArrowUpRight className="ml-1 h-6 w-6 stroke-[3]" />
            </Link>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 flex flex-col justify-between items-start shadow-sm transition-shadow hover:shadow-md">
            <div>
              <h3 className="font-bold text-2xl text-gray-900 mb-3">{t.s2}</h3>
              <p className="text-base text-gray-700 leading-relaxed">{t.s2d}</p>
            </div>
            <Link to="/contact" className="text-[#0035A0] font-bold inline-flex items-center mt-6 hover:underline text-lg">
              {t.knowMore} <ArrowUpRight className="ml-1 h-6 w-6 stroke-[3]" />
            </Link>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 flex flex-col justify-between items-start shadow-sm transition-shadow hover:shadow-md">
            <div>
              <h3 className="font-bold text-2xl text-gray-900 mb-3">{t.s3}</h3>
              <p className="text-base text-gray-700 leading-relaxed">{t.s3d}</p>
            </div>
            <Link to="/contact" className="text-[#0035A0] font-bold inline-flex items-center mt-6 hover:underline text-lg">
              {t.knowMore} <ArrowUpRight className="ml-1 h-6 w-6 stroke-[3]" />
            </Link>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 flex flex-col justify-between items-start shadow-sm transition-shadow hover:shadow-md">
            <div>
              <h3 className="font-bold text-2xl text-gray-900 mb-3">{t.s4}</h3>
              <p className="text-base text-gray-700 leading-relaxed">{t.s4d}</p>
            </div>
            <Link to="/contact" className="text-[#0035A0] font-bold inline-flex items-center mt-6 hover:underline text-lg">
              {t.knowMore} <ArrowUpRight className="ml-1 h-6 w-6 stroke-[3]" />
            </Link>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 flex flex-col justify-between items-start shadow-sm transition-shadow hover:shadow-md">
            <div>
              <h3 className="font-bold text-2xl text-gray-900 mb-3">{t.s5}</h3>
              <p className="text-base text-gray-700 leading-relaxed">{t.s5d}</p>
            </div>
            <Link to="/contact" className="text-[#0035A0] font-bold inline-flex items-center mt-6 hover:underline text-lg">
              {t.knowMore} <ArrowUpRight className="ml-1 h-6 w-6 stroke-[3]" />
            </Link>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 flex flex-col justify-between items-start shadow-sm transition-shadow hover:shadow-md">
            <div>
              <h3 className="font-bold text-2xl text-gray-900 mb-3">{t.s6}</h3>
              <p className="text-base text-gray-700 leading-relaxed">{t.s6d}</p>
            </div>
            <Link to="/contact" className="text-[#0035A0] font-bold inline-flex items-center mt-6 hover:underline text-lg">
              {t.knowMore} <ArrowUpRight className="ml-1 h-6 w-6 stroke-[3]" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};