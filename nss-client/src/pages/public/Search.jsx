import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, ArrowUpRight, Tool, Building, PhoneCall, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const searchTranslations = {
  en: { title: "Search our website", subtitle: "Type what you need to find factory machines and services.", placeholder: "Search for cranes, roofs, automation...", popular: "Popular Searches", c1: "EOT Cranes", c2: "Roof Profile", c3: "Factory Automation", c4: "Knowledge Base", noResults: "No results found for", resultsFor: "Search results for", categories: "Browse Categories", helpTitle: "Can't find what you need?", helpSub: "Our team is ready to help you with your factory needs.", callUs: "Call Us Today", resultDesc1: "Heavy lifting machines from 1 Ton to 50 Ton.", resultDesc2: "High-speed sheet making machines.", resultDesc3: "Smart factory systems and panel wiring.", resultDesc4: "Guides for machine care and safety." },
  hi: { title: "हमारी वेबसाइट खोजें", subtitle: "फैक्ट्री मशीन और सेवा खोजने के लिए यहां लिखें।", placeholder: "क्रेन, छत, ऑटोमेशन खोजें...", popular: "लोकप्रिय खोज", c1: "क्रेन मशीन", c2: "छत मशीन", c3: "फैक्ट्री ऑटोमेशन", c4: "ज्ञान केंद्र", noResults: "कुछ नहीं मिला:", resultsFor: "इसके परिणाम:", categories: "श्रेणियां देखें", helpTitle: "आपको जो चाहिए वह नहीं मिल रहा?", helpSub: "हमारी टीम आपकी फैक्ट्री की जरूरतों के लिए मदद को तैयार है।", callUs: "हमें कॉल करें", resultDesc1: "1 टन से 50 टन तक भारी सामान उठाने वाली मशीनें।", resultDesc2: "तेज गति वाली शीट बनाने की मशीनें।", resultDesc3: "स्मार्ट फैक्ट्री सिस्टम और पैनल वायरिंग।", resultDesc4: "मशीन की देखभाल और सुरक्षा के लिए गाइड।" },
  mr: { title: "आमची वेबसाइट शोधा", subtitle: "फॅक्टरी मशीन आणि सेवा शोधण्यासाठी येथे लिहा.", placeholder: "क्रेन, छत, ऑटोमेशन शोधा...", popular: "लोकप्रिय शोध", c1: "क्रेन मशीन", c2: "छत मशीन", c3: "फॅक्टरी ऑटोमेशन", c4: "ज्ञान केंद्र", noResults: "काहीही सापडले नाही:", resultsFor: "याचे निकाल:", categories: "श्रेणी पहा", helpTitle: "तुम्हाला जे हवे आहे ते मिळत नाही का?", helpSub: "आमची टीम तुमच्या फॅक्टरीच्या गरजांसाठी मदत करण्यास तयार आहे.", callUs: "आम्हाला कॉल करा", resultDesc1: "1 टन ते 50 टन पर्यंत जड वस्तू उचलणाऱ्या मशीन.", resultDesc2: "वेगाने शीट बनवणाऱ्या मशीन.", resultDesc3: "स्मार्ट फॅक्टरी सिस्टम आणि पॅनेल वायरिंग.", resultDesc4: "मशीनची काळजी आणि सुरक्षेसाठी माहिती." },
  te: { title: "మా వెబ్‌సైట్‌లో వెతకండి", subtitle: "ఫ్యాక్టరీ యంత్రాలు మరియు సేవల కోసం ఇక్కడ రాయండి.", placeholder: "క్రేన్, రూఫ్, ఆటోమేషన్ వెతకండి...", popular: "ఎక్కువగా వెతికినవి", c1: "క్రేన్ యంత్రాలు", c2: "రూఫ్ యంత్రాలు", c3: "ఫ్యాక్టరీ ఆటోమేషన్", c4: "జ్ఞాన కేంద్రం", noResults: "ఏమీ దొరకలేదు:", resultsFor: "దీని ఫలితాలు:", categories: "విభాగాలు చూడండి", helpTitle: "మీకు కావాల్సింది దొరకలేదా?", helpSub: "మీ ఫ్యాక్టరీ అవసరాలకు సహాయం చేయడానికి మా బృందం సిద్ధంగా ఉంది.", callUs: "మాకు కాల్ చేయండి", resultDesc1: "1 టన్ను నుండి 50 టన్నుల వరకు బరువు ఎత్తే యంత్రాలు.", resultDesc2: "వేగంగా షీట్ తయారు చేసే యంత్రాలు.", resultDesc3: "స్మార్ట్ ఫ్యాక్టరీ సిస్టమ్స్ మరియు ప్యానెల్ వైరింగ్.", resultDesc4: "యంత్రం సంరక్షణ మరియు భద్రత కోసం గైడ్." },
  ta: { title: "எங்கள் இணையதளத்தில் தேடவும்", subtitle: "தொழிற்சாலை இயந்திரங்கள் மற்றும் சேவைகளைக் கண்டறிய இங்கே எழுதவும்.", placeholder: "கிரேன், கூரை, ஆட்டோமேஷன் தேடவும்...", popular: "பிரபலமான தேடல்கள்", c1: "கிரேன் இயந்திரங்கள்", c2: "கூரை இயந்திரங்கள்", c3: "தொழிற்சாலை ஆட்டோமேஷன்", c4: "அறிவு மையம்", noResults: "எதுவும் கிடைக்கவில்லை:", resultsFor: "இதற்கான முடிவுகள்:", categories: "பிரிவுகளைக் காண்க", helpTitle: "உங்களுக்கு தேவையானது கிடைக்கவில்லையா?", helpSub: "உங்கள் தொழிற்சாலை தேவைகளுக்கு உதவ எங்கள் குழு தயாராக உள்ளது.", callUs: "எங்களை அழைக்கவும்", resultDesc1: "1 டன் முதல் 50 டன் வரை எடை தூக்கும் இயந்திரங்கள்.", resultDesc2: "வேகமாக ஷீட் செய்யும் இயந்திரங்கள்.", resultDesc3: "ஸ்மார்ட் தொழிற்சாலை அமைப்புகள் மற்றும் பேனல் வயரிங்.", resultDesc4: "இயந்திர பராமரிப்பு மற்றும் பாதுகாப்பு வழிகாட்டி." },
  kn: { title: "ನಮ್ಮ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಹುಡುಕಿ", subtitle: "ಕಾರ್ಖಾನೆ ಯಂತ್ರಗಳು ಮತ್ತು ಸೇವೆಗಳನ್ನು ಹುಡುಕಲು ಇಲ್ಲಿ ಬರೆಯಿರಿ.", placeholder: "ಕ್ರೇನ್, ಛಾವಣಿ, ಆಟೊಮೇಷನ್ ಹುಡುಕಿ...", popular: "ಜನಪ್ರಿಯ ಹುಡುಕಾಟಗಳು", c1: "ಕ್ರೇನ್ ಯಂತ್ರಗಳು", c2: "ಛಾವಣಿ ಯಂತ್ರಗಳು", c3: "ಫ್ಯಾಕ್ಟರಿ ಆಟೊಮೇಷನ್", c4: "ಜ್ಞಾನ ಕೇಂದ್ರ", noResults: "ಏನೂ ಸಿಗಲಿಲ್ಲ:", resultsFor: "ಇದರ ಫಲಿತಾಂಶಗಳು:", categories: "ವಿಭಾಗಗಳನ್ನು ನೋಡಿ", helpTitle: "ನಿಮಗೆ ಬೇಕಾದ್ದು ಸಿಗುತ್ತಿಲ್ಲವೇ?", helpSub: "ನಿಮ್ಮ ಕಾರ್ಖಾನೆಯ ಅಗತ್ಯಗಳಿಗಾಗಿ ಸಹಾಯ ಮಾಡಲು ನಮ್ಮ ತಂಡ ಸಿದ್ಧವಾಗಿದೆ.", callUs: "ನಮಗೆ ಕರೆ ಮಾಡಿ", resultDesc1: "1 ಟನ್ ನಿಂದ 50 ಟನ್ ವರೆಗೆ ಭಾರ ಎತ್ತುವ ಯಂತ್ರಗಳು.", resultDesc2: "ವೇಗವಾಗಿ ಶೀಟ್ ಮಾಡುವ ಯಂತ್ರಗಳು.", resultDesc3: "ಸ್ಮಾರ್ಟ್ ಫ್ಯಾಕ್ಟರಿ ಸಿಸ್ಟಮ್ಸ್ ಮತ್ತು ಪ್ಯಾನಲ್ ವೈರಿಂಗ್.", resultDesc4: "ಯಂತ್ರದ ಆರೈಕೆ ಮತ್ತು ಸುರಕ್ಷತೆಗಾಗಿ ಮಾರ್ಗದರ್ಶಿ." },
  ml: { title: "ഞങ്ങളുടെ വെബ്സൈറ്റിൽ തിരയുക", subtitle: "ഫാക്ടറി മെഷീനുകളും സേവനങ്ങളും കണ്ടെത്താൻ ഇവിടെ എഴുതുക.", placeholder: "ക്രെയിൻ, റൂഫ്, ഓട്ടോമേഷൻ തിരയുക...", popular: "കൂടുതൽ തിരഞ്ഞവ", c1: "ക്രെയിൻ മെഷീനുകൾ", c2: "റൂഫ് മെഷീനുകൾ", c3: "ഫാക്ടറി ഓട്ടോമേഷൻ", c4: "വിവര കേന്ദ്രം", noResults: "ഒന്നും കണ്ടെത്തിയില്ല:", resultsFor: "ഇതിനായുള്ള ഫലങ്ങൾ:", categories: "വിഭാഗങ്ങൾ കാണുക", helpTitle: "നിങ്ങൾക്ക് വേണ്ടത് കണ്ടെത്തുന്നില്ലേ?", helpSub: "നിങ്ങളുടെ ഫാക്ടറി ആവശ്യങ്ങൾക്ക് സഹായിക്കാൻ ഞങ്ങളുടെ ടീം തയ്യാറാണ്.", callUs: "ഞങ്ങളെ വിളിക്കുക", resultDesc1: "1 ടൺ മുതൽ 50 ടൺ വരെ ഭാരം ഉയർത്തുന്ന മെഷീനുകൾ.", resultDesc2: "വേഗത്തിൽ ഷീറ്റ് ഉണ്ടാക്കുന്ന മെഷീനുകൾ.", resultDesc3: "സ്മാർട്ട് ഫാക്ടറി സിസ്റ്റങ്ങളും പാനൽ വയറിംഗും.", resultDesc4: "മെഷീൻ സംരക്ഷണത്തിനും സുരക്ഷയ്ക്കുമുള്ള ഗൈഡ്." },
  gu: { title: "અમારી વેબસાઇટ શોધો", subtitle: "ફેક્ટરી મશીનો અને સેવાઓ શોધવા માટે અહીં લખો.", placeholder: "ક્રેન, છત, ઓટોમેશન શોધો...", popular: "લોકપ્રિય શોધ", c1: "ક્રેન મશીનો", c2: "છત મશીનો", c3: "ફેક્ટરી ઓટોમેશન", c4: "જ્ઞાન કેન્દ્ર", noResults: "કંઈ મળ્યું નથી:", resultsFor: "આના પરિણામો:", categories: "શ્રેણીઓ જુઓ", helpTitle: "તમને જે જોઈએ છે તે નથી મળતું?", helpSub: "અમારી ટીમ તમારી ફેક્ટરીની જરૂરિયાતો માટે મદદ કરવા તૈયાર છે.", callUs: "અમને કૉલ કરો", resultDesc1: "1 ટન થી 50 ટન સુધી ભારે સામાન ઉપાડતી મશીનો.", resultDesc2: "ઝડપી ગતિએ શીટ બનાવતી મશીનો.", resultDesc3: "સ્માર્ટ ફેક્ટરી સિસ્ટમ્સ અને પેનલ વાયરિંગ.", resultDesc4: "મશીનની સંભાળ અને સુરક્ષા માટે માર્ગદર્શિકા." },
  pa: { title: "ਸਾਡੀ ਵੈੱਬਸਾਈਟ ਖੋਜੋ", subtitle: "ਫੈਕਟਰੀ ਮਸ਼ੀਨਾਂ ਅਤੇ ਸੇਵਾਵਾਂ ਲੱਭਣ ਲਈ ਇੱਥੇ ਲਿਖੋ.", placeholder: "ਕਰੇਨ, ਛੱਤ, ਆਟੋਮੇਸ਼ਨ ਖੋਜੋ...", popular: "ਪ੍ਰਸਿੱਧ ਖੋਜਾਂ", c1: "ਕਰੇਨ ਮਸ਼ੀਨਾਂ", c2: "ਛੱਤ ਦੀਆਂ ਮਸ਼ੀਨਾਂ", c3: "ਫੈਕਟਰੀ ਆਟੋਮੇਸ਼ਨ", c4: "ਗਿਆਨ ਕੇਂਦਰ", noResults: "ਕੁਝ ਨਹੀਂ ਮਿਲਿਆ:", resultsFor: "ਇਸਦੇ ਨਤੀਜੇ:", categories: "ਸ਼੍ਰੇਣੀਆਂ ਦੇਖੋ", helpTitle: "ਤੁਹਾਨੂੰ ਜੋ ਚਾਹੀਦਾ ਹੈ ਉਹ ਨਹੀਂ ਮਿਲ ਰਿਹਾ?", helpSub: "ਸਾਡੀ ਟੀਮ ਤੁਹਾਡੀ ਫੈਕਟਰੀ ਦੀਆਂ ਲੋੜਾਂ ਲਈ ਮਦਦ ਕਰਨ ਲਈ ਤਿਆਰ ਹੈ.", callUs: "ਸਾਨੂੰ ਕਾਲ ਕਰੋ", resultDesc1: "1 ਟਨ ਤੋਂ 50 ਟਨ ਤੱਕ ਭਾਰਾ ਸਾਮਾਨ ਚੁੱਕਣ ਵਾਲੀਆਂ ਮਸ਼ੀਨਾਂ.", resultDesc2: "ਤੇਜ਼ ਗਤੀ ਨਾਲ ਸ਼ੀਟ ਬਣਾਉਣ ਵਾਲੀਆਂ ਮਸ਼ੀਨਾਂ.", resultDesc3: "ਸਮਾਰਟ ਫੈਕਟਰੀ ਸਿਸਟਮ ਅਤੇ ਪੈਨਲ ਵਾਇਰਿੰਗ.", resultDesc4: "ਮਸ਼ੀਨ ਦੀ ਸੰਭਾਲ ਅਤੇ ਸੁਰੱਖਿਆ ਲਈ ਗਾਈਡ." },
  bn: { title: "আমাদের ওয়েবসাইট খুঁজুন", subtitle: "কারখানার মেশিন এবং পরিষেবাগুলি খুঁজতে এখানে লিখুন।", placeholder: "ক্রেন, ছাদ, অটোমেশন খুঁজুন...", popular: "জনপ্রিয় খোঁজ", c1: "ক্রেন মেশিন", c2: "ছাদের মেশিন", c3: "কারখানা অটোমেশন", c4: "জ্ঞান কেন্দ্র", noResults: "কিছুই পাওয়া যায়নি:", resultsFor: "এর ফলাফল:", categories: "বিভাগ দেখুন", helpTitle: "আপনার যা দরকার তা পাচ্ছেন না?", helpSub: "আমাদের দল আপনার কারখানার প্রয়োজনে সাহায্য করতে প্রস্তুত।", callUs: "আমাদের কল করুন", resultDesc1: "1 টন থেকে 50 টন পর্যন্ত ভারী জিনিস তোলার মেশিন।", resultDesc2: "দ্রুত গতিতে শিট তৈরির মেশিন।", resultDesc3: "স্মার্ট কারখানা সিস্টেম এবং প্যানেল ওয়্যারিং।", resultDesc4: "মেশিনের যত্ন এবং নিরাপত্তার জন্য গাইড।" },
  or: { title: "ଆମର ୱେବସାଇଟ୍ ଖୋଜନ୍ତୁ", subtitle: "କାରଖାନା ମେସିନ୍ ଏବଂ ସେବା ଖୋଜିବାକୁ ଏଠାରେ ଲେଖନ୍ତୁ.", placeholder: "କ୍ରେନ୍, ଛାତ, ଅଟୋମେସନ୍ ଖୋଜନ୍ତୁ...", popular: "ଲୋକପ୍ରିୟ ଖୋଜ", c1: "କ୍ରେନ୍ ମେସିନ୍", c2: "ଛାତ ମେସିନ୍", c3: "କାରଖାନା ଅଟୋମେସନ୍", c4: "ଜ୍ଞାନ କେନ୍ଦ୍ର", noResults: "କିଛି ମିଳିଲା ନାହିଁ:", resultsFor: "ଏହାର ଫଳାଫଳ:", categories: "ବିଭାଗ ଦେଖନ୍ତୁ", helpTitle: "ଆପଣଙ୍କୁ ଯାହା ଦରକାର ତାହା ମିଳୁନାହିଁ କି?", helpSub: "ଆପଣଙ୍କ କାରଖାନା ଆବଶ୍ୟକତା ପାଇଁ ଆମ ଟିମ୍ ସାହାଯ୍ୟ କରିବାକୁ ପ୍ରସ୍ତୁତ.", callUs: "ଆମକୁ କଲ୍ କରନ୍ତୁ", resultDesc1: "1 ଟନ୍ ରୁ 50 ଟନ୍ ପର୍ଯ୍ୟନ୍ତ ଭାରୀ ଜିନିଷ ଉଠାଉଥିବା ମେସିନ୍.", resultDesc2: "ଦ୍ରୁତ ଗତିରେ ସିଟ୍ ତିଆରି କରୁଥିବା ମେସିନ୍.", resultDesc3: "ସ୍ମାର୍ଟ କାରଖାନା ସିଷ୍ଟମ୍ ଏବଂ ପ୍ୟାନେଲ୍ ୱାରିଂ.", resultDesc4: "ମେସିନ୍ ଯତ୍ନ ଏବଂ ସୁରକ୍ଷା ପାଇଁ ଗାଇଡ୍." },
  ur: { title: "ہماری ویب سائٹ تلاش کریں", subtitle: "فیکٹری مشینوں اور خدمات کو تلاش کرنے کے لیے یہاں لکھیں۔", placeholder: "کرین، چھت، آٹومیشن تلاش کریں...", popular: "مقبول تلاشیں", c1: "کرین مشینیں", c2: "چھت کی مشینیں", c3: "فیکٹری آٹومیشن", c4: "معلوماتی مرکز", noResults: "کچھ نہیں ملا:", resultsFor: "اس کے نتائج:", categories: "اقسام دیکھیں", helpTitle: "آپ کو جو چاہیے وہ نہیں مل رہا؟", helpSub: "ہماری ٹیم آپ کی فیکٹری کی ضروریات کے لیے مدد کرنے کو تیار ہے۔", callUs: "ہمیں کال کریں", resultDesc1: "1 ٹن سے 50 ٹن تک بھاری سامان اٹھانے والی مشینیں", resultDesc2: "تیز رفتاری سے شیٹ بنانے والی مشینیں", resultDesc3: "اسمارٹ فیکٹری سسٹم اور پینل وائرنگ", resultDesc4: "مشین کی دیکھ بھال اور حفاظت کے لیے گائیڈ" },
  as: { title: "আমাৰ ৱেবছাইট খোজক", subtitle: "কাৰখানাৰ মেচিন আৰু সেৱা বিচাৰিবলৈ ইয়াত লিখক.", placeholder: "ক্ৰেন, ছাদ, অটোমেচন খোজক...", popular: "জনপ্ৰিয় খোজ", c1: "ক্ৰেন মেচিন", c2: "ছাদৰ মেচিন", c3: "কাৰখানা অটোমেচন", c4: "জ্ঞান কেন্দ্ৰ", noResults: "একো পোৱা নগ'ল:", resultsFor: "ইয়াৰ ফলাফল:", categories: "বিভাগ চাওক", helpTitle: "আপোনাক যি লাগে সেয়া পোৱা নাই নেকি?", helpSub: "আমাৰ দল আপোনাৰ কাৰখানাৰ প্ৰয়োজনীয়তাৰ বাবে সহায় কৰিবলৈ প্ৰস্তুত.", callUs: "আমালৈ কল কৰক", resultDesc1: "1 টনৰ পৰা 50 টনলৈকে গধুৰ বস্তু উঠোৱা মেচিন.", resultDesc2: "দ্ৰুত গতিত শ্বীট বনোৱা মেচিন.", resultDesc3: "স্মাৰ্ট কাৰখানা চিষ্টেম আৰু পেনেল ৱায়াৰিং.", resultDesc4: "মেচিনৰ যত্ন আৰু নিৰাপত্তাৰ বাবে গাইড." },
  bho: { title: "हमनी के वेबसाइट खोजीं", subtitle: "फैक्टरी मशीन अउरी सेवा खोजे खातिर इहाँ लिखीं।", placeholder: "क्रेन, छत, ऑटोमेशन खोजीं...", popular: "लोकप्रिय खोज", c1: "क्रेन मशीन", c2: "छत मशीन", c3: "फैक्टरी ऑटोमेशन", c4: "ज्ञान केंद्र", noResults: "कुछ ना मिलल:", resultsFor: "एकर परिणाम:", categories: "श्रेणी देखीं", helpTitle: "रउआ जवन चाहीं ऊ नइखे मिलत?", helpSub: "हमनी के टीम रउआ फैक्टरी के जरूरत खातिर मदद करे के तइयार बिया।", callUs: "हमनी के कॉल करीं", resultDesc1: "1 टन से 50 टन ले भारी सामान उठावे वाला मशीन।", resultDesc2: "तेज गति से शीट बनावे वाला मशीन।", resultDesc3: "स्मार्ट फैक्टरी सिस्टम अउरी पैनल वायरिंग।", resultDesc4: "मशीन के देखभाल अउरी सुरक्षा खातिर गाइड।" }
};

export const Search = () => {
  const [language, setLanguage] = useState(localStorage.getItem('nss_lang') || 'en');
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleLangChange = (e) => setLanguage(e.detail);
    window.addEventListener('languageChanged', handleLangChange);
    return () => window.removeEventListener('languageChanged', handleLangChange);
  }, []);

  const t = searchTranslations[language] || searchTranslations['en'];

  // Real data index matching the platform's core services
  const siteIndex = [
    { id: 1, title: t.c1, desc: t.resultDesc1, link: "/eot-cranes", icon: <Tool className="h-6 w-6" /> },
    { id: 2, title: t.c2, desc: t.resultDesc2, link: "/roof-profile", icon: <Building className="h-6 w-6" /> },
    { id: 3, title: t.c3, desc: t.resultDesc3, link: "/automation", icon: <Tool className="h-6 w-6" /> },
    { id: 4, title: t.c4, desc: t.resultDesc4, link: "/knowledge", icon: <FileText className="h-6 w-6" /> }
  ];

  const filteredResults = query.trim() === "" ? [] : siteIndex.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full bg-gray-50 min-h-screen font-sans text-gray-900 pb-20">
      
      {/* Section 1: Search Header & Input */}
      <section className="bg-white border-b border-gray-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight"
          >
            {t.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-600 font-semibold mb-10"
          >
            {t.subtitle}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="relative w-full shadow-sm"
          >
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <SearchIcon className="h-8 w-8 text-gray-400" />
            </div>
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.placeholder}
              className="block w-full pl-20 pr-6 py-6 border border-gray-300 bg-white text-xl font-bold text-gray-900 outline-none focus:border-[#0035A0] focus:ring-1 focus:ring-[#0035A0] transition"
            />
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8">
          
          {/* Section 2 & 4: Logic - Results or Categories */}
          {query.trim() !== "" ? (
            <section>
              <h2 className="text-2xl font-black mb-6 text-gray-900 border-b border-gray-200 pb-4">
                {filteredResults.length > 0 ? `${t.resultsFor} "${query}"` : `${t.noResults} "${query}"`}
              </h2>
              
              <div className="flex flex-col space-y-4">
                <AnimatePresence>
                  {filteredResults.map((result) => (
                    <motion.div 
                      key={result.id}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="bg-white border border-gray-200 p-6 hover:border-[#0035A0] hover:shadow-sm transition group"
                    >
                      <Link to={result.link} className="flex items-start">
                        <div className="bg-gray-100 p-3 rounded-sm mr-4 group-hover:bg-[#0035A0] group-hover:text-white transition text-gray-700">
                          {result.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-gray-900 group-hover:text-[#0035A0] transition mb-1">{result.title}</h3>
                          <p className="text-gray-600 font-semibold">{result.desc}</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </section>
          ) : (
            <section>
              <h2 className="text-2xl font-black mb-6 text-gray-900 border-b border-gray-200 pb-4">{t.categories}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {siteIndex.map((cat) => (
                  <Link key={cat.id} to={cat.link} className="bg-white border border-gray-200 p-6 hover:border-[#0035A0] transition group flex flex-col justify-between h-40">
                    <div className="text-gray-700 group-hover:text-[#0035A0] transition mb-4">
                      {cat.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-gray-900 group-hover:text-[#0035A0] transition flex items-center justify-between">
                        {cat.title} <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition" />
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Section 3: Custom Industrial Doodle Artwork */}
          <section className="mt-16 bg-[#0035A0] p-8 md:p-12 relative overflow-hidden flex items-center justify-between">
            <div className="relative z-10 text-white w-full md:w-2/3">
              <h3 className="text-3xl font-black mb-2">Build with precision.</h3>
              <p className="font-semibold opacity-90 text-lg">Engineering solutions designed for speed, safety, and heavy loads.</p>
            </div>
            
            {/* Custom SVG Artwork / Industrial Doodles */}
            <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/4 translate-y-1/4 z-0 pointer-events-none">
              <svg width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2v20M2 12h20M12 6a6 6 0 1 0 0 12 6 6 0 1 0 0-12z"></path>
                <path d="M8 12h8M12 8v8"></path>
              </svg>
            </div>
            <div className="hidden md:block absolute right-32 top-0 opacity-10 transform -translate-y-1/4 z-0 pointer-events-none">
              <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter">
                <rect x="2" y="14" width="20" height="8"></rect>
                <path d="M6 14V4h12v10M10 14V8h4v6"></path>
              </svg>
            </div>
          </section>

        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 flex flex-col space-y-10">
          
          {/* Section 5: Popular Searches */}
          <section>
            <h3 className="text-lg font-black text-gray-900 mb-4 uppercase tracking-wider">{t.popular}</h3>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setQuery(t.c1)} className="bg-white border border-gray-200 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-[#0035A0] hover:text-white transition">
                {t.c1}
              </button>
              <button onClick={() => setQuery(t.c2)} className="bg-white border border-gray-200 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-[#0035A0] hover:text-white transition">
                {t.c2}
              </button>
              <button onClick={() => setQuery(t.c3)} className="bg-white border border-gray-200 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-[#0035A0] hover:text-white transition">
                {t.c3}
              </button>
            </div>
          </section>

          {/* Section 6: Support CTA */}
          <section className="bg-white border border-gray-200 p-8 shadow-sm">
            <div className="bg-gray-100 p-4 inline-block mb-6">
              <PhoneCall className="h-8 w-8 text-[#0035A0]" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">{t.helpTitle}</h3>
            <p className="text-gray-600 font-semibold mb-8">{t.helpSub}</p>
            <a href="tel:+919049994500" className="block w-full text-center bg-[#0035A0] text-white py-4 font-bold text-lg hover:bg-blue-800 transition">
              {t.callUs}
            </a>
          </section>

        </div>
      </div>
    </div>
  );
};