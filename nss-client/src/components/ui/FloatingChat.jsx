import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const chatTranslations = {
  en: { welcome: "Welcome to NSS", help: "How can we assist you today?", enter: "Enter chat", email: "Email Address", message: "Your Message", send: "Send", success: "Message sent." },
  hi: { welcome: "NSS में आपका स्वागत है", help: "हम आज आपकी कैसे मदद कर सकते हैं?", enter: "चैट शुरू करें", email: "ईमेल", message: "आपका संदेश", send: "भेजें", success: "संदेश भेज दिया गया।" },
  mr: { welcome: "NSS मध्ये आपले स्वागत आहे", help: "आम्ही आज तुमची कशी मदत करू शकतो?", enter: "चॅट सुरू करा", email: "ईमेल", message: "तुमचा संदेश", send: "पाठवा", success: "संदेश पाठवला." },
  te: { welcome: "NSS కు స్వాగతం", help: "మేము ఈ రోజు మీకు ఎలా సహాయం చేయగలము?", enter: "చాట్ ప్రారంభించండి", email: "ఇమెయిల్", message: "మీ సందేశం", send: "పంపండి", success: "సందేశం పంపబడింది." },
  ta: { welcome: "NSS க்கு வருக", help: "இன்று நாங்கள் உங்களுக்கு எப்படி உதவ முடியும்?", enter: "அரட்டையைத் தொடங்கு", email: "மின்னஞ்சல்", message: "உங்கள் செய்தி", send: "அனுப்பு", success: "செய்தி அனுப்பப்பட்டது." },
  kn: { welcome: "NSS ಗೆ ಸುಸ್ವಾಗತ", help: "ಇಂದು ನಾವು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?", enter: "ಚಾಟ್ ಪ್ರಾರಂಭಿಸಿ", email: "ಇಮೇಲ್", message: "ನಿಮ್ಮ ಸಂದೇಶ", send: "ಕಳುಹಿಸಿ", success: "ಸಂದೇಶ ಕಳುಹಿಸಲಾಗಿದೆ." },
  ml: { welcome: "NSS ലേക്ക് സ്വാഗതം", help: "ഇന്ന് നിങ്ങളെ എങ്ങനെ സഹായിക്കാനാകും?", enter: "ചാറ്റ് ആരംഭിക്കുക", email: "ഇമെയിൽ", message: "നിങ്ങളുടെ സന്ദേശം", send: "അയയ്ക്കുക", success: "സന്ദേശം അയച്ചു." },
  gu: { welcome: "NSS માં તમારું સ્વાગત છે", help: "આજે અમે તમારી કેવી રીતે મદદ કરી શકીએ?", enter: "ચેટ શરૂ કરો", email: "ઈમેલ", message: "તમારો સંદેશ", send: "મોકલો", success: "સંદેશ મોકલાઈ ગયો." },
  pa: { welcome: "NSS ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ", help: "ਅੱਜ ਅਸੀਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੇ ਹਾਂ?", enter: "ਚੈਟ ਸ਼ੁਰੂ ਕਰੋ", email: "ਈਮੇਲ", message: "ਤੁਹਾਡਾ ਸੁਨੇਹਾ", send: "ਭੇਜੋ", success: "ਸੁਨੇਹਾ ਭੇਜ ਦਿੱਤਾ ਗਿਆ." },
  bn: { welcome: "NSS এ স্বাগতম", help: "আজ আমরা আপনাকে কীভাবে সাহায্য করতে পারি?", enter: "চ্যাট শুরু করুন", email: "ইমেইল", message: "আপনার বার্তা", send: "পাঠান", success: "বার্তা পাঠানো হয়েছে।" },
  or: { welcome: "NSS କୁ ସ୍ୱାଗତ", help: "ଆଜି ଆମେ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବୁ?", enter: "ଚାଟ୍ ଆରମ୍ଭ କରନ୍ତୁ", email: "ଇମେଲ୍", message: "ଆପଣଙ୍କ ବାର୍ତ୍ତା", send: "ପଠାନ୍ତୁ", success: "ବାର୍ତ୍ତା ପଠାଗଲା." },
  ur: { welcome: "NSS میں خوش آمدید", help: "آج ہم آپ کی کیسے مدد کر سکتے ہیں؟", enter: "چیٹ شروع کریں", email: "ای میل", message: "آپ کا پیغام", send: "بھیجیں", success: "پیغام بھیج دیا گیا۔" },
  as: { welcome: "NSS লৈ স্বাগতম", help: "আজি আমি আপোনাক কেনেকৈ সহায় কৰিব পাৰোঁ?", enter: "চেট আৰম্ভ কৰক", email: "ইমেইল", message: "আপোনাৰ বাৰ্তা", send: "পঠাওক", success: "বাৰ্তা পঠোৱা হ'ল." },
  bho: { welcome: "NSS में राउर स्वागत बा", help: "आज हमनी के राउर कइसे मदद कर सकीले?", enter: "चैट शुरू करीं", email: "ईमेल", message: "राउर संदेस", send: "भेजीं", success: "संदेस भेज दिहल गइल।" }
};

export const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem('nss_lang') || 'en');
  const [formState, setFormState] = useState({ email: '', message: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const handleLangChange = (e) => setLanguage(e.detail);
    window.addEventListener('languageChanged', handleLangChange);
    return () => window.removeEventListener('languageChanged', handleLangChange);
  }, []);

  const t = chatTranslations[language] || chatTranslations['en'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'serviceRequests'), {
        category: 'Live Chat',
        ...formState,
        timestamp: new Date().toISOString(),
        status: 'Submitted'
      });
      setFormState({ email: '', message: '' });
      setStatus(t.success);
      setTimeout(() => {
        setStatus('');
        setIsOpen(false);
        setIsChatActive(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setStatus("Error saving record.");
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setIsChatActive(false);
      setStatus('');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-80 bg-white shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
          >
            {/* Chat Header */}
            <div className="bg-[#0035A0] text-white p-4 flex justify-between items-center">
              <h3 className="font-black text-lg">{t.welcome}</h3>
              <button onClick={toggleChat} className="text-white hover:text-gray-200 focus:outline-none">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-6 bg-gray-50 flex-1">
              {!isChatActive ? (
                <div className="flex flex-col items-start space-y-6">
                  <p className="text-gray-900 font-bold text-lg leading-relaxed">
                    {t.help}
                  </p>
                  <button 
                    onClick={() => setIsChatActive(true)}
                    className="w-full bg-[#0035A0] text-white font-black py-3 hover:bg-blue-900 transition flex items-center justify-center"
                  >
                    {t.enter}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                  <div>
                    <label className="block text-xs font-bold mb-1 text-gray-900">{t.email}</label>
                    <input 
                      type="email" 
                      required 
                      value={formState.email} 
                      onChange={(e) => setFormState({...formState, email: e.target.value})} 
                      className="w-full p-2 border border-gray-300 outline-none focus:border-[#0035A0] text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 text-gray-900">{t.message}</label>
                    <textarea 
                      required 
                      rows="3" 
                      value={formState.message} 
                      onChange={(e) => setFormState({...formState, message: e.target.value})} 
                      className="w-full p-2 border border-gray-300 outline-none focus:border-[#0035A0] text-sm"
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full bg-[#0035A0] text-white font-black py-3 hover:bg-blue-900 transition flex items-center justify-center mt-2 text-sm">
                    {t.send} <Send className="ml-2 h-4 w-4" />
                  </button>
                  {status && <p className="text-green-700 font-bold text-xs mt-2 text-center">{status}</p>}
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bubble Button */}
      <button
        onClick={toggleChat}
        className="w-16 h-16 bg-[#0035A0] text-white rounded-full shadow-xl flex items-center justify-center hover:bg-blue-900 transition focus:outline-none"
      >
        {isOpen ? <X className="h-8 w-8" /> : <MessageCircle className="h-8 w-8" />}
      </button>
    </div>
  );
};