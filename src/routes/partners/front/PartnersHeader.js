import { Container } from "@mui/material";
import DesktopLanguageSwitcher from "components/countryFlag/DesktopLanguageSwitcher";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext } from "react";
import partnersLogo from "resources/img/partners/partnerslogo.svg";
import style from "./PartnersHeader.module.css"
import PartnersTopbar from "./PartnersTopbar";


function PartnersHeader() {
    const { isMobile } = useContext(BrowserDetectContext);

    const onHomeClick = () => {
        console.log("home");
    }
    return (
        <div>
            {
                isMobile
                    ?
                    <FlexChild height={40} backgroundColor={"white"}>
                        <div className={style.sticky}>
                            <PartnersTopbar />
                        </div>
                    </FlexChild>
                    :
                    <FlexChild height={40}>
                        <Container maxWidth={1200}>
                            <HorizontalFlex gap={35}>
                                <FlexChild width={"max-content"}>
                                        <img src={partnersLogo} onClick={onHomeClick} className={style.logo} />
                                </FlexChild>
                                <FlexChild width={"max-content"}>
                                    <P weight={"bold"}>약관 및 정책</P>
                                </FlexChild>
                                <FlexChild width={"max-content"}>
                                    <P weight={"bold"}>도움말</P>
                                </FlexChild>
                                <FlexChild>
                                    <P weight={"bold"}>공지사항</P>
                                </FlexChild>
                                <FlexChild width={50} height={40}>
                                    <DesktopLanguageSwitcher />
                                </FlexChild>

                            </HorizontalFlex>
                        </Container>
                    </FlexChild>
            }

        </div>
    );
}

export default PartnersHeader;