import { useContext } from "react";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import MobileHeader from "routes/mobile/home/layout/MobileHeader";
import DesktopHeader from "routes/front/header/DesktopHeader";

function Header() {
    const { isMobile } = useContext(BrowserDetectContext);
    
    return (
        <>
            {
                isMobile ? <MobileHeader /> : <DesktopHeader />
            }
        </>
    );
}

export default Header;