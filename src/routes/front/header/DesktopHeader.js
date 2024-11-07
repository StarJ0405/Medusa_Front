import { faHeart, far, faUser } from "@fortawesome/free-regular-svg-icons";
import { faL, fas, faShoppingBag, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Skeleton } from "antd";
import { requester } from "App";
import clsx from "clsx";
import DesktopLanguageSwitcher from "components/countryFlag/DesktopLanguageSwitcher";
import Dummy from "components/Dummy";
import P from "components/P";
import SkeletonImage from "components/skeleton/SkeletonImage";
import SkeletonText from "components/skeleton/SkeletonText";
import Container from "layouts/container/Container";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import SquareWrapper from "layouts/wrapper/SquareWrapper";
import { debounce } from "lodash";
import { AuthContext } from "providers/AuthProvider";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useNavigate } from "react-router-dom";
import background from "resources/img/header/background.png";
import findByCategory from "resources/img/icons/category.svg";
import findByAll from "resources/img/icons/findByAll.png";
import findByBrand from "resources/img/icons/findByBrand.png";
import WorldvapeLogo from "resources/img/logo/worldvape_logo.png";
import TopBarItem from "routes/main/top/TopBarItem";
import TopBarSubItem from "routes/main/top/TopBarSubItem";
import { getCurrentLanguageCode } from "shared/utils/Utils";
import Cart from "./CartButton";
import style from "./DesktopHeader.module.css";
import SearchBar from "./SearchBar";
import NiceModal from "@ebay/nice-modal-react";
import CustomIcon from "components/icons/CustomIcon";
import MenuBar from "../menuBar/MenuBar";

function DesktopHeader(props) {
  const { isMobile } = useContext(BrowserDetectContext);
  const { userName } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  // const [headerHeight, setHeaderHeight] = useState(80);
  // const [scroll, setScroll] = useState(true);
  // const [scrollPosition, setScrollPosition] = useState(0);

  // useEffect(() => {
  //   window.addEventListener('scroll', updateScroll);

  //   return () => {
  //     window.removeEventListener('scroll', updateScroll);
  //   }
  // }, [])

  // const updateScroll = debounce(() => {
  //   let scrollPosition = window.scrollY || document.documentElement.scrollTop;
  //   setScrollPosition(scrollPosition);
  // }, 30); // 실행 주기(ms)를 조정할 수 있습니다.

  const onLoginClick = () => {
    NiceModal.show("memberSignIn");
  }
  const onSignUpClick = () => {
    NiceModal.show("memberSignTabModal");
  }

  // useEffect(() => {
  //   if (scroll) {
  //     if (scrollPosition < 160) {
  //       setHeaderHeight(80);
  //       setScroll(false);
  //     }
  //   } else {
  //     if (scrollPosition >= 160) {
  //       setHeaderHeight(50);
  //       setScroll(true);
  //     }
  //   }
  // }, [scrollPosition]);

  return (
    <div className={style.container}>
      <VerticalFlex>
        <FlexChild>
          <div className={style.wrap} style={{ backgroundColor: "white", height: "80px" }} >
            {/* <div className={style.wrap} style={{ backgroundColor: "white", height: headerHeight }} > */}
            <div className={style.paddingWrap}>
              {/* <div className={clsx(style.paddingWrap, { [style.scroll]: scroll })}> */}
              <Container maxWidth={1200}>
                <HorizontalFlex gap={20}>
                  <FlexChild width={"initial"} padding={10}>
                    <HorizontalFlex gap={20}>
                      <FlexChild height={"100%"}>
                        <Center>
                          <div className={style.logo}>
                            <Link to="/">
                              <img className={style.logo} src={WorldvapeLogo} />
                              {/* <div style={{color:"white"}}>
                                로고 월드베이프
                              </div> */}
                              {/* <Logo2 fill={"white"} style={{ height: headerHeight * 0.5 }} /> */}
                            </Link>
                          </div>
                        </Center>
                      </FlexChild>
                    </HorizontalFlex>
                  </FlexChild>
                  <FlexChild>
                    <VerticalFlex>
                      <FlexChild></FlexChild>
                      <FlexChild height={40}>
                        <Center width={"100%"}>
                          <SearchBar />
                        </Center>
                      </FlexChild>
                      <FlexChild></FlexChild>
                    </VerticalFlex>
                  </FlexChild>
                  <FlexChild width={380}>
                    <Container height={40}>
                      <Container >
                        <ul className={style.columns}>
                          {/* <li className={style.column}>
                            <DesktopLanguageSwitcher />
                          </li> */}
                          {
                            userName ?
                              <>
                                <TopBarItem icon={faShoppingCart} title={t("cart")} url={"/shopping/cart"} color={"black"} />
                                <TopBarItem icon={faHeart} title={t("wishList")} url={"/wishList"} color={"black"} />
                                <TopBarItem icon={faUser} title={t("account")} color={"black"} url={"/mypage"}>
                                  <TopBarSubItem title={t("orderHistory")} url={"/mypage"} />
                                  <TopBarSubItem title={t("cart")} url={"/shopping/cart"} />
                                  <TopBarSubItem title={t("wishList")} url={"/wishList"} />
                                  {
                                    !userName && <TopBarSubItem login title={t("signIn")} />
                                  }

                                </TopBarItem>
                              </>
                              : <>
                                <TopBarItem title={t("signIn")} color={"black"} onClick={onLoginClick} />
                                <TopBarItem title={t("signUp")} color={"black"} onClick={onSignUpClick} />
                              </>
                          }
                        </ul>
                      </Container>
                    </Container>
                  </FlexChild>
                </HorizontalFlex>
              </Container>
              <MenuBar />
            </div>
            
          </div>
        </FlexChild>
        <FlexChild>
        </FlexChild>
      </VerticalFlex>
    </div >
  );
}

export default DesktopHeader;
