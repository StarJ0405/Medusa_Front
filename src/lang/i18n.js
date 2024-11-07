import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import langCn from "lang/lang.cn";
import langKo from "lang/lang.ko";
 
const resource =  {
    'zh-CN': {
        translation: langCn
    },
    'ko-KR': {
        translation: langKo
    }
};
 
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: resource,
        // 초기 설정 언어
        //lng: 'ko-KR',
        // lng: 'zh-CN',
        fallbackLng: {
            'zh-CN':['zh-CN'],
            default:['ko-KR']
        },
        // debug: true,
        defaultNS: 'translation',
        ns: 'translation',
        keySeparator: false,
        interpolation: {
            escapeValue: false
        },
        react: {
            useSuspense: false
        }
    })
 
export default i18n;