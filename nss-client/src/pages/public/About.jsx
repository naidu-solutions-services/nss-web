import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const aboutTranslations = {
  en: { 
    bannerTitle: "One-stop provider from design and fabrication to installation for Pre-engineered Buildings and Structural Steel",
    bannerLoc: "Mega complex of factories at Pune, Maharashtra",
    dedicationTitle: "Dedication to every customer's success",
    execTitle: "Executive Committee members",
    bioLink: "View the full bio",
    f1Name: "Chandrashekhar Laxmannaidu Ammisetty",
    f1Role: "Founder & Chairman",
    f1Desc: "Leading the vision to bring revolutionary pre-engineered building technology and industrial solutions to the region.",
    f2Name: "Akshit Chandrashekhar Ammisetty",
    f2Role: "Co-Founder & Director",
    f2Desc: "Driving operational excellence and customer satisfaction with a firm belief in efficient teamwork and project delivery.",
    f3Name: "Arun Chandrashekhar Ammisetty",
    f3Role: "Co-Founder",
    f3Desc: "Overseeing technical infrastructure, digital innovation, and advanced automation engineering for all factory systems."
  },
  hi: { 
    bannerTitle: "डिजाइन से लेकर लगाने तक प्री-इंजीनियर्ड बिल्डिंग और स्टील के लिए एक मात्र समाधान",
    bannerLoc: "पुणे, महाराष्ट्र में कारखानों का बड़ा परिसर",
    dedicationTitle: "हर ग्राहक की सफलता के लिए समर्पित",
    execTitle: "कार्यकारी समिति के सदस्य",
    bioLink: "पूरी जानकारी देखें",
    f1Name: "चंद्रशेखर लक्ष्मणनायडू अम्मीसेट्टी",
    f1Role: "संस्थापक और अध्यक्ष",
    f1Desc: "क्षेत्र में नई बिल्डिंग तकनीक और औद्योगिक समाधान लाने का नेतृत्व कर रहे हैं।",
    f2Name: "अक्षित चंद्रशेखर अम्मीसेट्टी",
    f2Role: "सह-संस्थापक और निदेशक",
    f2Desc: "बेहतर काम और टीम वर्क के जरिए ग्राहकों को खुश रखने पर जोर देते हैं।",
    f3Name: "अरुण चंद्रशेखर अम्मीसेट्टी",
    f3Role: "सह-संस्थापक",
    f3Desc: "तकनीकी काम, डिजिटल तकनीक और फैक्ट्री सिस्टम की देखरेख करते हैं।"
  },
  mr: { 
    bannerTitle: "डिझाइनपासून ते बसवण्यापर्यंत प्री-इंजिनिअर्ड बिल्डिंग आणि स्टीलसाठी एकमेव उपाय",
    bannerLoc: "पुणे, महाराष्ट्र येथील कारखान्यांचा मोठा परिसर",
    dedicationTitle: "प्रत्येक ग्राहकाच्या यशासाठी समर्पित",
    execTitle: "कार्यकारी समितीचे सदस्य",
    bioLink: "पूर्ण माहिती पहा",
    f1Name: "चंद्रशेखर लक्ष्मणनायडू अम्मीसेट्टी",
    f1Role: "संस्थापक आणि अध्यक्ष",
    f1Desc: "नवीन तंत्रज्ञान आणि औद्योगिक उपाय आणण्यासाठी नेतृत्व करत आहेत.",
    f2Name: "अक्षित चंद्रशेखर अम्मीसेट्टी",
    f2Role: "सह-संस्थापक आणि संचालक",
    f2Desc: "उत्तम काम आणि टीम वर्कच्या माध्यमातून ग्राहकांना समाधान देण्यावर भर.",
    f3Name: "अरुण चंद्रशेखर अम्मीसेट्टी",
    f3Role: "सह-संस्थापक",
    f3Desc: "तांत्रिक काम, डिजिटल तंत्रज्ञान आणि फॅक्टरी सिस्टमची जबाबदारी."
  },
  te: { 
    bannerTitle: "డిజైన్ నుండి ఏర్పాటు వరకు ప్రీ-ఇంజనీర్డ్ బిల్డింగ్ మరియు స్టీల్ కోసం ఒకే వేదిక",
    bannerLoc: "పూణే, మహారాష్ట్రలో ఫ్యాక్టరీల పెద్ద సముదాయం",
    dedicationTitle: "ప్రతి కస్టమర్ విజయానికి అంకితం",
    execTitle: "కార్యనిర్వాహక కమిటీ సభ్యులు",
    bioLink: "పూర్తి వివరాలు చూడండి",
    f1Name: "చంద్రశేఖర్ లక్ష్మణ్నాయుడు అమ్మిశెట్టి",
    f1Role: "స్థాపకుడు మరియు ఛైర్మన్",
    f1Desc: "కొత్త టెక్నాలజీ మరియు పారిశ్రామిక పరిష్కారాలను తీసుకురావడంలో ముందున్నారు.",
    f2Name: "అక్షిత్ చంద్రశేఖర్ అమ్మిశెట్టి",
    f2Role: "సహ-స్థాపకుడు మరియు డైరెక్టర్",
    f2Desc: "మంచి పనితీరు మరియు కస్టమర్ సంతృప్తి కోసం కృషి చేస్తున్నారు.",
    f3Name: "అరుణ్ చంద్రశేఖర్ అమ్మిశెట్టి",
    f3Role: "సహ-స్థాపకుడు",
    f3Desc: "సాంకేతిక పనులు మరియు డిజిటల్ టెక్నాలజీని పర్యవేక్షిస్తారు."
  },
  ta: { 
    bannerTitle: "வடிவமைப்பு முதல் அமைப்பது வரை ப்ரீ-இன்ஜினியர்டு கட்டிடங்களுக்கான ஒரே இடம்",
    bannerLoc: "புனே, மகாராஷ்டிராவில் உள்ள தொழிற்சாலைகளின் பெரிய வளாகம்",
    dedicationTitle: "ஒவ்வொரு வாடிக்கையாளரின் வெற்றிக்கும் அர்ப்பணிப்பு",
    execTitle: "நிர்வாகக் குழு உறுப்பினர்கள்",
    bioLink: "முழு விவரங்களைப் பார்க்கவும்",
    f1Name: "சந்திரசேகர் லட்சுமண்நாயுடு அம்மிசெட்டி",
    f1Role: "நிறுவனர் மற்றும் தலைவர்",
    f1Desc: "புதிய தொழில்நுட்பம் மற்றும் தொழில்துறை தீர்வுகளைக் கொண்டு வருவதில் முன்னணியில் உள்ளார்.",
    f2Name: "அக்ஷித் சந்திரசேகர் அம்மிசெட்டி",
    f2Role: "இணை நிறுவனர் மற்றும் இயக்குனர்",
    f2Desc: "சிறந்த பணி மற்றும் வாடிக்கையாளர் திருப்திக்காக உழைக்கிறார்.",
    f3Name: "அருண் சந்திரசேகர் அம்மிசெட்டி",
    f3Role: "இணை நிறுவனர்",
    f3Desc: "தொழில்நுட்பம் மற்றும் டிஜிட்டல் வேலைகளை கண்காணிக்கிறார்."
  },
  kn: { 
    bannerTitle: "ವಿನ್ಯಾಸದಿಂದ ಸ್ಥಾಪನೆಯವರೆಗೆ ಪ್ರಿ-ಎಂಜಿನಿಯರ್ಡ್ ಕಟ್ಟಡಗಳಿಗೆ ಒಂದೇ ಪರಿಹಾರ",
    bannerLoc: "ಪುಣೆ, ಮಹಾರಾಷ್ಟ್ರದಲ್ಲಿ ಕಾರ್ಖಾನೆಗಳ ದೊಡ್ಡ ಸಂಕೀರ್ಣ",
    dedicationTitle: "ಪ್ರತಿ ಗ್ರಾಹಕರ ಯಶಸ್ಸಿಗೆ ಸಮರ್ಪಣೆ",
    execTitle: "ಕಾರ್ಯಕಾರಿ ಸಮಿತಿಯ ಸದಸ್ಯರು",
    bioLink: "ಸಂಪೂರ್ಣ ಮಾಹಿತಿ ನೋಡಿ",
    f1Name: "ಚಂದ್ರಶೇಖರ್ ಲಕ್ಷ್ಮಣ್ನಾಯ್ಡು ಅಮ್ಮಿಸೆಟ್ಟಿ",
    f1Role: "ಸ್ಥಾಪಕ ಮತ್ತು ಅಧ್ಯಕ್ಷ",
    f1Desc: "ಹೊಸ ತಂತ್ರಜ್ಞಾನ ಮತ್ತು ಕೈಗಾರಿಕಾ ಪರಿಹಾರಗಳನ್ನು ತರಲು ಮುನ್ನಡೆಸುತ್ತಿದ್ದಾರೆ.",
    f2Name: "ಅಕ್ಷಿತ್ ಚಂದ್ರಶೇಖರ್ ಅಮ್ಮಿಸೆಟ್ಟಿ",
    f2Role: "ಸಹ-ಸ್ಥಾಪಕ ಮತ್ತು ನಿರ್ದೇಶಕ",
    f2Desc: "ಉತ್ತಮ ಕೆಲಸ ಮತ್ತು ಗ್ರಾಹಕರ ತೃಪ್ತಿಗಾಗಿ ಶ್ರಮಿಸುತ್ತಿದ್ದಾರೆ.",
    f3Name: "ಅರುಣ್ ಚಂದ್ರಶೇಖರ್ ಅಮ್ಮಿಸೆಟ್ಟಿ",
    f3Role: "ಸಹ-ಸ್ಥಾಪಕ",
    f3Desc: "ತಾಂತ್ರಿಕ ಕೆಲಸ ಮತ್ತು ಡಿಜಿಟಲ್ ತಂತ್ರಜ್ಞಾನವನ್ನು ನೋಡಿಕೊಳ್ಳುತ್ತಾರೆ."
  },
  ml: { 
    bannerTitle: "രൂപകൽപ്പന മുതൽ നിർമ്മാണം വരെ പ്രീ-എഞ്ചിനീയർ ചെയ്ത കെട്ടിടങ്ങൾക്കുള്ള ഒറ്റ ഇടം",
    bannerLoc: "മഹാരാഷ്ട്രയിലെ പൂനെയിലുള്ള ഫാക്ടറികളുടെ വലിയ സമുച്ചയം",
    dedicationTitle: "ഓരോ ഉപഭോക്താവിന്റെയും വിജയത്തിനായി സമർപ്പിക്കുന്നു",
    execTitle: "എക്സിക്യൂട്ടീവ് കമ്മിറ്റി അംഗങ്ങൾ",
    bioLink: "പൂർണ്ണ വിവരങ്ങൾ കാണുക",
    f1Name: "ചന്ദ്രശേഖർ ലക്ഷ്മൺനായിഡു അമ്മിസെട്ടി",
    f1Role: "സ്ഥാപകൻ & ചെയർമാൻ",
    f1Desc: "പുതിയ സാങ്കേതികവിദ്യയും വ്യവസായ പരിഹാരങ്ങളും കൊണ്ടുവരാൻ നേതൃത്വം നൽകുന്നു.",
    f2Name: "അക്ഷിത് ചന്ദ്രശേഖർ അമ്മിസെട്ടി",
    f2Role: "സഹസ്ഥാപകൻ & ഡയറക്ടർ",
    f2Desc: "മികച്ച പ്രവർത്തനത്തിലൂടെ ഉപഭോക്താക്കളെ തൃപ്തിപ്പെടുത്താൻ ശ്രമിക്കുന്നു.",
    f3Name: "അരുൺ ചന്ദ്രശേഖർ അമ്മിസെട്ടി",
    f3Role: "സഹസ്ഥാപകൻ",
    f3Desc: "സാങ്കേതിക കാര്യങ്ങളും ഡിജിറ്റൽ സാങ്കേതികവിദ്യയും നോക്കിനടത്തുന്നു."
  },
  gu: { 
    bannerTitle: "ડિઝાઇનથી લઈને ઇન્સ્ટોલેશન સુધી પ્રી-એન્જિનિયર્ડ બિલ્ડિંગ્સ માટે એકમાત્ર ઉકેલ",
    bannerLoc: "પુણે, મહારાષ્ટ્રમાં ફેક્ટરીઓનું મોટું સંકુલ",
    dedicationTitle: "દરેક ગ્રાહકની સફળતા માટે સમર્પિત",
    execTitle: "કારોબારી સમિતિના સભ્યો",
    bioLink: "સંપૂર્ણ માહિતી જુઓ",
    f1Name: "ચંદ્રશેખર લક્ષ્મણનાયડુ અમ્મીસેટ્ટી",
    f1Role: "સ્થાપક અને અધ્યક્ષ",
    f1Desc: "નવી તકનીક અને ઔદ્યોગિક ઉકેલો લાવવા માટે નેતૃત્વ કરી રહ્યા છે.",
    f2Name: "અક્ષિત ચંદ્રશેખર અમ્મીસેટ્ટી",
    f2Role: "સહ-સ્થાપક અને ડિરેક્ટર",
    f2Desc: "સારા કામ અને ગ્રાહકના સંતોષ માટે પ્રયત્નશીલ છે.",
    f3Name: "અરુણ ચંદ્રશેખર અમ્મીસેટ્ટી",
    f3Role: "સહ-સ્થાપક",
    f3Desc: "તકનીકી કામ અને ડિજિટલ ટેકનોલોજીની દેખરેખ રાખે છે."
  },
  pa: { 
    bannerTitle: "ਡਿਜ਼ਾਈਨ ਤੋਂ ਲੈ ਕੇ ਲਗਾਉਣ ਤੱਕ ਪ੍ਰੀ-ਇੰਜੀਨੀਅਰਡ ਬਿਲਡਿੰਗਾਂ ਲਈ ਇੱਕੋ ਹੱਲ",
    bannerLoc: "ਪੁਣੇ, ਮਹਾਰਾਸ਼ਟਰ ਵਿੱਚ ਫੈਕਟਰੀਆਂ ਦਾ ਵੱਡਾ ਕੰਪਲੈਕਸ",
    dedicationTitle: "ਹਰ ਗਾਹਕ ਦੀ ਸਫਲਤਾ ਲਈ ਸਮਰਪਿਤ",
    execTitle: "ਕਾਰਜਕਾਰੀ ਕਮੇਟੀ ਦੇ ਮੈਂਬਰ",
    bioLink: "ਪੂਰੀ ਜਾਣਕਾਰੀ ਦੇਖੋ",
    f1Name: "ਚੰਦਰਸ਼ੇਖਰ ਲਕਸ਼ਮਣਨਾਇਡੂ ਅੰਮੀਸੈੱਟੀ",
    f1Role: "ਸੰਸਥਾਪਕ ਅਤੇ ਚੇਅਰਮੈਨ",
    f1Desc: "ਨਵੀਂ ਤਕਨੀਕ ਅਤੇ ਸਨਅਤੀ ਹੱਲ ਲਿਆਉਣ ਲਈ ਅਗਵਾਈ ਕਰ ਰਹੇ ਹਨ।",
    f2Name: "ਅਕਸ਼ਿਤ ਚੰਦਰਸ਼ੇਖਰ ਅੰਮੀਸੈੱਟੀ",
    f2Role: "ਸਹਿ-ਸੰਸਥਾਪਕ ਅਤੇ ਡਾਇਰੈਕਟਰ",
    f2Desc: "ਵਧੀਆ ਕੰਮ ਅਤੇ ਟੀਮ ਵਰਕ ਰਾਹੀਂ ਗਾਹਕਾਂ ਨੂੰ ਸੰਤੁਸ਼ਟ ਕਰਨ 'ਤੇ ਜ਼ੋਰ ਦਿੰਦੇ ਹਨ।",
    f3Name: "ਅਰੁਣ ਚੰਦਰਸ਼ੇਖਰ ਅੰਮੀਸੈੱਟੀ",
    f3Role: "ਸਹਿ-ਸੰਸਥਾਪਕ",
    f3Desc: "ਤਕਨੀਕੀ ਕੰਮ ਅਤੇ ਡਿਜੀਟਲ ਤਕਨਾਲੋਜੀ ਦੀ ਦੇਖਭਾਲ ਕਰਦੇ ਹਨ।"
  },
  bn: { 
    bannerTitle: "ডিজাইন থেকে ইনস্টলেশন পর্যন্ত প্রি-ইঞ্জিনিয়ার্ড বিল্ডিংয়ের জন্য একমাত্র সমাধান",
    bannerLoc: "পুনে, মহারাষ্ট্রে কারখানার বড় কমপ্লেক্স",
    dedicationTitle: "প্রতিটি গ্রাহকের সাফল্যের জন্য নিবেদিত",
    execTitle: "কার্যনির্বাহী কমিটির সদস্য",
    bioLink: "সম্পূর্ণ তথ্য দেখুন",
    f1Name: "চন্দ্রশেখর লক্ষ্মণনাইডু আম্মিসেট্টি",
    f1Role: "প্রতিষ্ঠাতা ও চেয়ারম্যান",
    f1Desc: "নতুন প্রযুক্তি এবং শিল্প সমাধান আনার ক্ষেত্রে নেতৃত্ব দিচ্ছেন।",
    f2Name: "অক্ষিত চন্দ্রশেখর আম্মিসেট্টি",
    f2Role: "সহ-প্রতিষ্ঠাতা ও পরিচালক",
    f2Desc: "ভাল কাজ এবং টিমওয়ার্কের মাধ্যমে গ্রাহকদের সন্তুষ্ট করার চেষ্টা করেন।",
    f3Name: "অরুণ চন্দ্রশেখর আম্মিসেট্টি",
    f3Role: "সহ-প্রতিষ্ঠাতা",
    f3Desc: "প্রযুক্তিগত কাজ এবং ডিজিটাল প্রযুক্তির তদারকি করেন।"
  },
  or: { 
    bannerTitle: "ଡିଜାଇନ୍ ରୁ ଇନଷ୍ଟଲେସନ୍ ପର୍ଯ୍ୟନ୍ତ ପ୍ରି-ଇଞ୍ଜିନିୟର୍ଡ୍ ବିଲ୍ଡିଂ ପାଇଁ ଏକମାତ୍ର ସମାଧାନ",
    bannerLoc: "ପୁନେ, ମହାରାଷ୍ଟ୍ରରେ କାରଖାନା ଗୁଡିକର ବଡ କମ୍ପ୍ଲେକ୍ସ",
    dedicationTitle: "ପ୍ରତ୍ୟେକ ଗ୍ରାହକଙ୍କ ସଫଳତା ପାଇଁ ସମର୍ପିତ",
    execTitle: "କାର୍ଯ୍ୟନିର୍ବାହୀ କମିଟି ସଦସ୍ୟ",
    bioLink: "ସମ୍ପୂର୍ଣ୍ଣ ବିବରଣୀ ଦେଖନ୍ତୁ",
    f1Name: "ଚନ୍ଦ୍ରଶେଖର ଲକ୍ଷ୍ମଣନାଇଡୁ ଆମ୍ମିସେଟ୍ଟି",
    f1Role: "ପ୍ରତିଷ୍ଠାତା ଏବଂ ଅଧ୍ୟକ୍ଷ",
    f1Desc: "ନୂତନ ଜ୍ଞାନକୌଶଳ ଏବଂ ଶିଳ୍ପ ସମାଧାନ ଆଣିବାରେ ନେତୃତ୍ୱ ନେଉଛନ୍ତି.",
    f2Name: "ଅକ୍ଷିତ ଚନ୍ଦ୍ରଶେଖର ଆମ୍ମିସେଟ୍ଟି",
    f2Role: "ସହ-ପ୍ରତିଷ୍ଠାତା ଏବଂ ନିର୍ଦ୍ଦେଶକ",
    f2Desc: "ଭଲ କାମ ଏବଂ ଟିମ୍ ୱାର୍କ ମାଧ୍ୟମରେ ଗ୍ରାହକଙ୍କୁ ସନ୍ତୁଷ୍ଟ କରିବାକୁ ଚେଷ୍ଟା କରୁଛନ୍ତି.",
    f3Name: "ଅରୁଣ ଚନ୍ଦ୍ରଶେଖର ଆମ୍ମିସେଟ୍ଟି",
    f3Role: "ସହ-ପ୍ରତିଷ୍ଠାତା",
    f3Desc: "ବୈଷୟିକ କାର୍ଯ୍ୟ ଏବଂ ଡିଜିଟାଲ୍ ଟେକ୍ନୋଲୋଜିର ତଦାରଖ କରନ୍ତି."
  },
  ur: { 
    bannerTitle: "ڈیزائن سے لے کر لگانے تک پری انجینئرڈ بلڈنگز کے لیے واحد حل",
    bannerLoc: "پونے، مہاراشٹر میں فیکٹریوں کا بڑا کمپلیکس",
    dedicationTitle: "ہر گاہک کی کامیابی کے لیے وقف",
    execTitle: "ایگزیکٹو کمیٹی کے ممبران",
    bioLink: "پوری معلومات دیکھیں",
    f1Name: "چندر شیکھر لکشمن نائیڈو امیسیٹی",
    f1Role: "بانی اور چیئرمین",
    f1Desc: "نئی ٹیکنالوجی اور صنعتی حل لانے میں قیادت کر رہے ہیں۔",
    f2Name: "اکشت چندر شیکھر امیسیٹی",
    f2Role: "شریک بانی اور ڈائریکٹر",
    f2Desc: "اچھے کام اور ٹیم ورک کے ذریعے گاہکوں کو مطمئن کرنے کی کوشش کرتے ہیں۔",
    f3Name: "ارون چندر شیکھر امیسیٹی",
    f3Role: "شریک بانی",
    f3Desc: "تکنیکی کام اور ڈیجیٹل ٹیکنالوجی کی نگرانی کرتے ہیں۔"
  },
  as: { 
    bannerTitle: "ডিজাইনৰ পৰা ইনষ্টলেচনলৈকে প্ৰি-ইঞ্জিনিয়াৰ্ড বিল্ডিংৰ বাবে একমাত্ৰ সমাধান",
    bannerLoc: "পুনে, মহাৰাষ্ট্ৰত কাৰখানাৰ ডাঙৰ কমপ্লেক্স",
    dedicationTitle: "প্ৰতিগৰাকী গ্ৰাহকৰ সফলতাৰ বাবে উৎসৰ্গিত",
    execTitle: "কাৰ্যবাহী সমিতিৰ সদস্যসকল",
    bioLink: "সম্পূৰ্ণ বিৱৰণ চাওক",
    f1Name: "চন্দ্ৰশেখৰ লক্ষ্মণনাইডু আম্মিসেট্টি",
    f1Role: "প্ৰতিষ্ঠাপক আৰু অধ্যক্ষ",
    f1Desc: "নতুন প্ৰযুক্তি আৰু ঔদ্যোগিক সমাধান অনাৰ ক্ষেত্ৰত নেতৃত্ব দিছে.",
    f2Name: "অক্ষিত চন্দ্ৰশেখৰ আম্মিসেট্টি",
    f2Role: "সহ-প্ৰতিষ্ঠাপক আৰু সঞ্চালক",
    f2Desc: "ভাল কাম আৰু টিমৱৰ্কৰ জৰিয়তে গ্ৰাহকক সন্তুষ্ট কৰিবলৈ চেষ্টা কৰে.",
    f3Name: "অৰুণ চন্দ্ৰশেখৰ আম্মিসেট্টি",
    f3Role: "সহ-প্ৰতিষ্ঠাপক",
    f3Desc: "কাৰিকৰী কাম আৰু ডিজিটেল প্ৰযুক্তিৰ তদাৰক কৰে."
  },
  bho: { 
    bannerTitle: "डिजाइन से लेके लगावे तक प्री-इंजीनियर्ड बिल्डिंग खातिर एके गो समाधान",
    bannerLoc: "पुणे, महाराष्ट्र में कारखाना के बड़हन परिसर",
    dedicationTitle: "हर ग्राहक के सफलता खातिर समर्पित",
    execTitle: "कार्यकारी समिति के सदस्य",
    bioLink: "पूरा जानकारी देखीं",
    f1Name: "चंद्रशेखर लक्ष्मणनायडू अम्मीसेट्टी",
    f1Role: "संस्थापक अउरी अध्यक्ष",
    f1Desc: "नया तकनीक अउरी औद्योगिक समाधान लावे में अगुवाई कर रहल बानी।",
    f2Name: "अक्षित चंद्रशेखर अम्मीसेट्टी",
    f2Role: "सह-संस्थापक अउरी निदेशक",
    f2Desc: "बढ़िया काम अउरी टीम वर्क से ग्राहक के खुश राखे पर जोर देवेले।",
    f3Name: "अरुण चंद्रशेखर अम्मीसेट्टी",
    f3Role: "सह-संस्थापक",
    f3Desc: "तकनीकी काम अउरी डिजिटल तकनीक के देखरेख करेले।"
  }
};

export const About = () => {
  const [language, setLanguage] = useState(localStorage.getItem('nss_lang') || 'en');

  useEffect(() => {
    const handleLangChange = (e) => setLanguage(e.detail);
    window.addEventListener('languageChanged', handleLangChange);
    return () => window.removeEventListener('languageChanged', handleLangChange);
  }, []);

  const t = aboutTranslations[language] || aboutTranslations['en'];

  return (
    <div className="w-full bg-white font-sans text-gray-900 overflow-hidden">
      
      {/* 1. Panoramic Banner Section */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight max-w-4xl">
            {t.bannerTitle}
          </h1>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative w-full h-[50vh] bg-gray-200 overflow-hidden"
        >
          <img 
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2000" 
            alt="Factory Complex" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <h2 className="absolute bottom-6 right-6 text-white text-xl md:text-3xl font-bold max-w-lg text-right">
            {t.bannerLoc}
          </h2>
        </motion.div>
      </section>

      {/* 2. Client Logo Grid Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 max-w-2xl mx-auto leading-tight">
              {t.dedicationTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center opacity-70">
            <svg viewBox="0 0 100 40" className="h-10 fill-current text-gray-800"><path d="M10,20 A10,10 0 1,1 30,20 A10,10 0 1,1 10,20 M15,20 h10 M20,15 v10 M40,15 h15 M40,20 h10 M40,25 h15 M65,15 v10 M75,15 h10 v10 M90,15 h10 v10"/></svg>
            <svg viewBox="0 0 100 40" className="h-10 fill-current text-blue-800"><rect x="10" y="10" width="20" height="20" /><path d="M40,15 l10,10 l10,-10 M70,15 v10 h15" stroke="currentColor" strokeWidth="3" fill="none"/></svg>
            <svg viewBox="0 0 100 40" className="h-10 fill-current text-green-800"><circle cx="20" cy="20" r="10" /><path d="M40,15 h10 v10 M60,15 h15 v5 h-15 M85,15 l10,10 M95,15 l-10,10" stroke="currentColor" strokeWidth="3" fill="none"/></svg>
            <svg viewBox="0 0 100 40" className="h-10 fill-current text-red-800"><polygon points="20,10 30,30 10,30" /><path d="M40,15 h15 M45,15 v10 M65,15 h15 M70,15 v10 M90,25 a5,5 0 1,1 0,-10 a5,5 0 1,1 0,10" stroke="currentColor" strokeWidth="3" fill="none"/></svg>
            <svg viewBox="0 0 100 40" className="h-10 fill-current text-gray-900"><path d="M10,15 h15 v10 M35,15 l5,10 l5,-10 M55,15 h15 M60,15 v10 M80,25 a5,5 0 1,1 0,-10 a5,5 0 1,1 0,10" stroke="currentColor" strokeWidth="3" fill="none"/></svg>
            <svg viewBox="0 0 100 40" className="h-10 fill-current text-[#0035A0]"><rect x="10" y="10" width="20" height="20" rx="5" /><path d="M40,15 l5,10 l5,-10 M60,15 h15 M65,15 v10 M85,15 v10 M85,20 h10" stroke="currentColor" strokeWidth="3" fill="none"/></svg>
            <svg viewBox="0 0 100 40" className="h-10 fill-current text-indigo-900"><path d="M10,15 h15 v10 M10,20 h10 M35,15 h15 v5 h-15 v5 h15 M60,15 v10 h15 M85,15 v10 M85,15 l10,10 M95,15 l-10,10" stroke="currentColor" strokeWidth="3" fill="none"/></svg>
            <svg viewBox="0 0 100 40" className="h-10 fill-current text-gray-700"><circle cx="20" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="3"/><path d="M40,15 h10 v10 M60,15 h15 v5 h-15 M85,15 l10,10 M95,15 l-10,10" stroke="currentColor" strokeWidth="3" fill="none"/></svg>
          </div>
        </div>
      </section>

      {/* 3. Executive Committee Biography Grid */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 border-b border-gray-200 pb-6"
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              {t.execTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Founder 1: Chandrashekhar Laxmannaidu Ammisetty */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <div className="w-full h-80 bg-gray-100 overflow-hidden mb-6">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" alt="Chandrashekhar Laxmannaidu Ammisetty" className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500" />
              </div>
              <h3 className="text-2xl font-black text-[#0035A0] mb-1 uppercase tracking-tight">{t.f1Name}</h3>
              <p className="text-lg text-gray-900 font-bold mb-4">{t.f1Role}</p>
              <p className="text-base text-gray-600 font-medium mb-6 flex-grow">{t.f1Desc}</p>
              <button className="text-[#0035A0] font-bold inline-flex items-center hover:underline mt-auto">
                {t.bioLink} <ArrowUpRight className="ml-1 h-5 w-5 stroke-[3]" />
              </button>
            </motion.div>

            {/* Founder 2: Akshit Chandrashekhar Ammisetty */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col"
            >
              <div className="w-full h-80 bg-gray-100 overflow-hidden mb-6">
                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" alt="Akshit Chandrashekhar Ammisetty" className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500" />
              </div>
              <h3 className="text-2xl font-black text-[#0035A0] mb-1 uppercase tracking-tight">{t.f2Name}</h3>
              <p className="text-lg text-gray-900 font-bold mb-4">{t.f2Role}</p>
              <p className="text-base text-gray-600 font-medium mb-6 flex-grow">{t.f2Desc}</p>
              <button className="text-[#0035A0] font-bold inline-flex items-center hover:underline mt-auto">
                {t.bioLink} <ArrowUpRight className="ml-1 h-5 w-5 stroke-[3]" />
              </button>
            </motion.div>

            {/* Founder 3: Arun Chandrashekhar Ammisetty */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col"
            >
              <div className="w-full h-80 bg-gray-100 overflow-hidden mb-6">
                <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800" alt="Arun Chandrashekhar Ammisetty" className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500" />
              </div>
              <h3 className="text-2xl font-black text-[#0035A0] mb-1 uppercase tracking-tight">{t.f3Name}</h3>
              <p className="text-lg text-gray-900 font-bold mb-4">{t.f3Role}</p>
              <p className="text-base text-gray-600 font-medium mb-4">{t.f3Desc}</p>
              
              {/* AnyAstro Techno Solutions Link */}
              <a 
                href="https://rebrand.ly/aatns" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-3 mb-6 p-3 bg-gray-50 border border-gray-200 hover:border-[#0035A0] transition group mt-auto"
              >
                <div className="w-8 h-8 bg-[#0035A0] rounded-sm flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M12 2L1 21h22L12 2zm0 3.5l7 13.5H5l7-13.5z"/></svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-bold uppercase">CTO & Lead Developer</span>
                  <span className="text-sm font-black text-gray-900 group-hover:text-[#0035A0] transition">AnyAstro Techno Solutions</span>
                </div>
              </a>

              <button className="text-[#0035A0] font-bold inline-flex items-center hover:underline">
                {t.bioLink} <ArrowUpRight className="ml-1 h-5 w-5 stroke-[3]" />
              </button>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
};