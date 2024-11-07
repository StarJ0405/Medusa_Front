import Container from "layouts/container/Container";
import style from "./TopBar.module.css";
import TopBarItem from "./TopBarItem";
import { useTranslation } from "react-i18next";
import TopBarSubItem from "./TopBarSubItem";
import { faMobileScreen } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import flag_korea from "resources/img/flag_korea.png";
import flag_china from "resources/img/flag_china.png";
import DesktopLanguageSwitcher from "components/countryFlag/DesktopLanguageSwitcher";
import { AuthContext } from "providers/AuthProvider";
import { useContext } from "react";

function TopBar() {
  const { userName } = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <Container height={40} backgroundColor={"#fafafa"}>
      <Container maxWidth={1200} >
        <ul className={style.columns}>
          <li className={style.column}>
            <DesktopLanguageSwitcher />
          </li>

          {/* <TopBarItem title={t("vendorMenu")} >
            <TopBarSubItem title={t("vendorSignUp")} url={"/vendorRegister"} />
            <TopBarSubItem title={t("vendorSignIn")} url={"/vendorSignIn"} />
          </TopBarItem> */}
          <TopBarItem icon={faHeart} title={t("wishList")} url={"/wishlist"} />
          <TopBarItem icon={faUser} title={t("account")}>
            
            <TopBarSubItem title={t("orderHistory")} url={"/mypage"} />
            {/* <TopBarSubItem title={t("message")} url={"/user/message"} /> */}
            <TopBarSubItem title={t("wishList")} url={"/wishlist"} />
            {/* {
              !userName && <TopBarSubItem title={t("signIn")} />
            } */}
            
            {/* <TopBarSubItem title={t("FAQ")} url={"/faq"} /> */}
            {/* <TopBarSubItem title={t("inquiry")} url={"/singleInquiry"} /> */}
            {/* <TopBarSubItem title={t("공지사항")} url={"/notice"} /> */}
          </TopBarItem>
        </ul>
      </Container>
    </Container>
  );
}

export default TopBar;
