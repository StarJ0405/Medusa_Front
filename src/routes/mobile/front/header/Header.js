import { useContext } from "react";
import MobileHeader from "routes/mobile/home/layout/MobileHeader";
import DesktopHeader from "routes/front/header/DesktopHeader";
import { BrowserDetectContext } from "providers/BrowserEventProvider";

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