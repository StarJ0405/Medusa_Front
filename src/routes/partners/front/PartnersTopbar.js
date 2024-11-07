import { Container } from "@mui/material";
import DesktopLanguageSwitcher from "components/countryFlag/DesktopLanguageSwitcher";
import FlexChild from "layouts/flex/FlexChild";
import { useTranslation } from "react-i18next";
import TopBarItem from "routes/main/top/TopBarItem";
import TopBarSubItem from "routes/main/top/TopBarSubItem";
import style from "./PartnersTopbar.module.css";
import partnersLogo from "resources/img/partners/partnerslogo.svg";
import HorizontalFlex from "layouts/flex/HorizontalFlex";


function PartnersTopbar() {
    const { t } = useTranslation();
    return (
        <Container height={30} backgroundColor={"#fafafa"}>
            <Container maxWidth={1200} >
                <HorizontalFlex>
                    <div className={style.logoWrap}>
                        <img src={partnersLogo} className={style.logo} />
                    </div>
                    <ul className={style.columns}>
                        <TopBarItem title={t("menu")} url={""} >
                            <TopBarSubItem title={t("약관및정책")} url={""} />
                            <TopBarSubItem title={t("도움말")} url={""} />
                            <TopBarSubItem title={t("공지사항")} url={""} />
                        </TopBarItem>
                        <li className={style.column}>
                            <DesktopLanguageSwitcher />
                        </li>
                    </ul>
                </HorizontalFlex>
            </Container>
        </Container>
    );
}

export default PartnersTopbar;