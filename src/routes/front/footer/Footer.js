import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import CircleWrapper from "layouts/wrapper/CircleWrapper";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import { useContext, useEffect, useState } from "react";
import Center from "layouts/wrapper/Center";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import P from "components/P";
import clsx from "classnames";
import style from "./Footer.module.css"
import Dummy from "components/Dummy";
import { requester } from "App";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import CustomIcon from "components/icons/CustomIcon";
import Container from "layouts/container/Container";
import VerticalFlex from "layouts/flex/VerticalFlex";
import img1 from "resources/img/footer/1.png";
import img2 from "resources/img/footer/2.png";
import img3 from "resources/img/footer/3.png";
import img4 from "resources/img/footer/4.png";
import img5 from "resources/img/footer/5.png";
import { ReactComponent as Logo1 } from "resources/img/logo/logo.svg";
import { ReactComponent as Logo2 } from "resources/img/logo/01.svg";
import { ReactComponent as Logo3 } from "resources/img/logo/02.svg";
import { ReactComponent as Logo4 } from "resources/img/logo/03.svg";
import { ReactComponent as Logo5 } from "resources/img/logo/04.svg";
import { ReactComponent as Logo6 } from "resources/img/logo/05.svg";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import { useTranslation } from "react-i18next";
import NiceModal from "@ebay/nice-modal-react";
import Inline from "layouts/container/Inline";
import AccordionWrapper from "components/accordion/AccordionWrapper";
import AccordionText from "components/accordion/AccordionText";

function Footer() {
    const { isMobile } = useContext(BrowserDetectContext);
    const { t } = useTranslation();
    const desktopFooterList = [
        { title: t("termsOfUse"), url: "termsOfUse", orderNo: "" },
        { title: t("privacyPolicy"), url: "privacyPolicy", orderNo: "" },
        { title: t("shippingPolicy"), url: "shippingPolicy", orderNo: "" }
    ];

    const Tab = ({ index, url, icon, text }) => {
        const [active, setActive] = useState(false);
        const color = active ? "var(--main-color)" : "var(--font-color-disabled)";

        return (
            <div >
                <NavLink to={url} style={({ isActive }) => { setActive(isActive); }} >
                    <Center>
                        <CustomIcon name={icon} color={color} width={20} />
                        <Dummy height={5} />
                        <P size={10} color={color} >{text}</P>
                    </Center>
                </NavLink>
            </div>
        );
    }

    const accordionStyle = {
        '--cui-accordion-bg': "white",
        '--cui-accordion-active-color': "var(--font-color)",
        '--cui-accordion-color': "var(--font-color)",
        '--cui-accordion-active-bg': "var(--user-bg-color)",
        '--cui-accordion-btn-focus-border-color': "none",
        '--cui-accordion-btn-focus-box-shadow': "none",
    }

    return (
        <Container>
            {
                isMobile ?
                    <div className={style.fixed}>
                        <HorizontalFlex gap={10}>
                            < FlexChild >
                                <Tab index={0} url={"productList/category/all"} icon={"menu"} text={"모든상품"} />
                            </FlexChild >
                            <FlexChild>
                                <Tab index={1} url={"wishList"} icon={"heart"} text={t("wishList")} />
                            </FlexChild>
                            <FlexChild>
                                <Tab index={2} url={"/"} icon={"home"} text={t("home")} />
                            </FlexChild>
                            <FlexChild>
                                <Tab index={3} url={"/mypage"} icon={"profile"} text={t("mypage")} />
                            </FlexChild>
                            <FlexChild>
                                <Tab index={4} url={"/shopping/cart"} icon={"cart"} text={t("cart")} />
                            </FlexChild>
                        </HorizontalFlex>
                    </div>
                    :
                    <VerticalFlex>
                        <FlexChild height={60} >
                            <div className={style.desktopFooterWrap}>
                                <Container maxWidth={1200}>
                                    <HorizontalFlex gap={20} justifyContent={"center"}>
                                        {
                                            desktopFooterList.map((item, index) =>
                                                <FlexChild key={index} width={150}>
                                                    <Center>
                                                        <div className={style.footerColumn}>
                                                            <Link to={item.url}>
                                                                {item.title}
                                                            </Link>
                                                        </div>
                                                    </Center>
                                                </FlexChild>
                                            )
                                        }
                                    </HorizontalFlex>
                                </Container>
                            </div>
                        </FlexChild>
                        <FlexChild backgroundColor={"#eeeeee"}>
                            <PaddingWrapper padding={20}>
                                <Container maxWidth={1200}>
                                    <HorizontalFlex>
                                        <FlexChild>
                                            <VerticalFlex padding={10}>
                                                <FlexChild>
                                                    <HorizontalFlex justifyContent={"flex-start"}>
                                                        <P>{"주식회사 월드인터네셔널"} | </P>
                                                        <P>(35372)대전광역시 서구 관저동 1114 5층</P>
                                                    </HorizontalFlex>
                                                </FlexChild>
                                                <FlexChild>
                                                    <HorizontalFlex justifyContent={"flex-start"}>
                                                        <P>{t("businessNumber")} </P>
                                                        <P>559-81-02488 | </P>
                                                        <P>{t("ceo")} : 원태범</P>
                                                    </HorizontalFlex>
                                                </FlexChild>
                                                <FlexChild>
                                                    <HorizontalFlex justifyContent={"flex-start"}>
                                                        <P>{t("serviceCenter")} :  </P>
                                                        <P>070-4943-2597 | Fax : 042-489-8759 </P>
                                                    </HorizontalFlex>
                                                </FlexChild>
                                                <FlexChild>
                                                    <HorizontalFlex justifyContent={"flex-start"}>
                                                        <P>{t("email")} :  </P>
                                                        <P>worldvape@gmail.com </P>
                                                    </HorizontalFlex>
                                                </FlexChild>
                                                <FlexChild>
                                                    <HorizontalFlex justifyContent={"flex-start"}>
                                                        <P>{t("mailOrderNumber")} :  </P>
                                                        <P>2022-대전서구-0070 </P>
                                                    </HorizontalFlex>
                                                </FlexChild>
                                            </VerticalFlex>
                                        </FlexChild>
                                        {/* <FlexChild>
                                            <Logo4 fill={"#aaa"} width={200} />
                                        </FlexChild> */}
                                    </HorizontalFlex>
                                </Container>
                            </PaddingWrapper>
                        </FlexChild>
                    </VerticalFlex>
            }
        </Container>
    );
}

export default Footer;



