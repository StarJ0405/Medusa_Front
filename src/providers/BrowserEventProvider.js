import { createContext, useEffect, useState } from "react";
import i18next from "i18next";
import { convertLanguageCode } from "shared/utils/Utils";
import { isMobile as isMobileBrowser } from "react-device-detect";
import { useLocation } from "react-router-dom";

export const BrowserDetectContext = createContext({ isMobile: Boolean, width: Number, languageCode: String, locationHistory: Array, currentNavigationDirection: String, });

function BrowserEventProvider(props) {
    const location = useLocation();
    const [isMobile, setMobile] = useState(isMobileBrowser || window.innerWidth <= 768);
    const [width, setWidth] = useState(window.innerWidth);
    const [languageCode, setLanguageCode] = useState(convertLanguageCode(i18next.language));
    const [locationHistory, setLocationHistory] = useState([location.pathname]);
    const [currentNavigationDirection, setNavigationDirection] = useState(null);

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        i18next.on('languageChanged', (e) => {
            setLanguageCode(convertLanguageCode(e));
        });

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    useEffect(() => {
        if (locationHistory[locationHistory.length - 1] !== location.pathname) {
            // 새로운 경로로 이동
            setLocationHistory(prev => [...prev, location.pathname]);
            setNavigationDirection('FORWARD');
        } else if (locationHistory[locationHistory.length - 2] === location.pathname) {
            // 이전 경로로 돌아감
            setLocationHistory(prev => prev.slice(0, -1));
            setNavigationDirection('BACKWARD');
        }
    }, [location]);

    const handleWindowSizeChange = () => {
        setMobile(isMobileBrowser || window.innerWidth <= 768);
        setWidth(window.innerWidth);
    }

    return (
        <BrowserDetectContext.Provider value={{ isMobile, width, languageCode, locationHistory, currentNavigationDirection }}>
            {props.children}
        </BrowserDetectContext.Provider >
    );
}

export default BrowserEventProvider;