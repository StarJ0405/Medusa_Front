import P from "components/P";
import Container from "layouts/container/Container";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import TopBg from "resources/img/partnersBg.png"
import style from "./PartnersHome.module.css"
import ButtonEclipse from "components/buttons/ButtonEclipse";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import Center from "layouts/wrapper/Center";
import guide1 from "resources/img/partners/guide1.png"
import guide2 from "resources/img/partners/guide2.png"
import guide3 from "resources/img/partners/guide3.png"
import cash from "resources/img/partners/cash.svg"
import partnersUser from "resources/img/partners/partnersUser.svg"
import partnersImg1 from "resources/img/partners/partnersImg1.svg"
import rightImg from "resources/img/partners/right.svg"
import Inline from "layouts/container/Inline";
import star from "resources/img/partners/star.svg";
import partnersLogo from "resources/img/partners/partnerslogo.svg";
import DesktopLanguageSwitcher from "components/countryFlag/DesktopLanguageSwitcher";
import { useTranslation } from "react-i18next";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext } from "react";
import down from "resources/img/partners/down.png";
import footerLogo from "resources/img/partners/footerPartnersLogo.png";
import PartnersTopbar from "./PartnersTopbar";
import clsx from "classnames";



function PartnersHome() {
    const { t } = useTranslation();
    const { isMobile } = useContext(BrowserDetectContext);

    const onHomeClick = () => {
        console.log("home");
    }

    return (

        <div className={style.container}>
            {
                isMobile
                    ?
                    <VerticalFlex>
                        <FlexChild height={40} backgroundColor={"white"}>
                            <div className={clsx({ [style.sticky]: isMobile }, style.header)}>
                                <PartnersTopbar />
                            </div>
                        </FlexChild>
                        <FlexChild>
                            <div className={style.bgWrap}>
                                <VerticalFlex gap={15}>
                                    <FlexChild>
                                        <P size={"14pt"} color={"white"}>수익을 창출하는 새로운 수단</P>
                                        <P size={"28pt"} color={"white"}>한핑 파트너스</P>
                                    </FlexChild>
                                    <FlexChild>
                                        <div className={style.buttonWrap}>
                                            <img src={star} className={style.mobileStar1} />
                                            <ButtonEclipse borderRadius={"20px"} border={"1px solid white"} height={28} text={"회원가입"} />
                                            <img src={star} className={style.mobileStar2} />
                                        </div>
                                    </FlexChild>
                                </VerticalFlex>
                            </div>
                        </FlexChild>
                        <FlexChild backgroundColor={"#eee"}>
                            <FlexChild padding={"60px 0 0 0 "}>
                                <Center>
                                    <Inline width={"100%"}>
                                        <P size={"16pt"} weight={"bold"}>한핑 파트너스만의</P>
                                        <P size={"16pt"} weight={"bold"} color={"var(--main-color)"}>&nbsp;3POINT</P>
                                    </Inline>
                                </Center>

                            </FlexChild>
                            <Container maxWidth={750}>
                                <VerticalFlex padding={45}>

                                    <FlexChild>
                                        <VerticalFlex gap={30}>
                                            <FlexChild >
                                                <div className={style.pointBox}>
                                                    <VerticalFlex gap={60}>
                                                        <FlexChild padding={"30px 0 0 0"}>
                                                            <img src={partnersUser} />
                                                        </FlexChild>
                                                        <FlexChild >
                                                            <VerticalFlex gap={20}>
                                                                <FlexChild>
                                                                    <P weight={"bold"} size={"14pt"}>쉬운 회원가입</P>
                                                                </FlexChild>
                                                                <FlexChild>
                                                                    <P color={"var(--font-faint-color)"} size={"10pt"}>한핑고고 회원이라면 누구나</P>
                                                                    <P color={"var(--font-faint-color)"} size={"10pt"}>쉽게 가입 하세요!</P>
                                                                    <P color={"var(--font-faint-color)"} size={"10pt"}>간편한 정산과 편리한 리포트 기능까지!</P>
                                                                </FlexChild>
                                                            </VerticalFlex>
                                                        </FlexChild>
                                                    </VerticalFlex>
                                                </div>
                                            </FlexChild>
                                            <FlexChild >
                                                <div className={style.pointBox}>
                                                    <VerticalFlex gap={60}>
                                                        <FlexChild padding={"30px 0 0 0"}>
                                                            <img src={partnersImg1} />
                                                        </FlexChild>
                                                        <FlexChild>
                                                            <VerticalFlex gap={20}>
                                                                <FlexChild>
                                                                    <P weight={"bold"} size={"14pt"}>다양한 상품과 광고</P>
                                                                </FlexChild>
                                                                <FlexChild>
                                                                    <P color={"var(--font-faint-color)"} size={"10pt"}>한핑고고의 다양한 상품을</P>
                                                                    <P color={"var(--font-faint-color)"} size={"10pt"}>광고해보세요!</P>
                                                                    <P color={"var(--font-faint-color)"} size={"10pt"}>간단하게 광고를 제작할 수 있습니다.</P>
                                                                </FlexChild>
                                                            </VerticalFlex>
                                                        </FlexChild>
                                                    </VerticalFlex>
                                                </div>
                                            </FlexChild>
                                            <FlexChild>
                                                <div className={style.pointBox}>
                                                    <VerticalFlex gap={55}>
                                                        <FlexChild padding={"30px 0 0 0"}>
                                                            <img src={cash} />
                                                        </FlexChild>
                                                        <FlexChild>
                                                            <VerticalFlex gap={20}>
                                                                <FlexChild>
                                                                    <P weight={"bold"} size={"14pt"}>높은 수익률</P>
                                                                </FlexChild>
                                                                <FlexChild>
                                                                    <P color={"var(--font-faint-color)"} size={"10pt"}>타사대비 높은 커미션으로</P>
                                                                    <P color={"var(--font-faint-color)"} size={"10pt"}>더 많은 수익을 가져가세요!</P>
                                                                </FlexChild>
                                                            </VerticalFlex>

                                                        </FlexChild>
                                                    </VerticalFlex>
                                                </div>
                                            </FlexChild>
                                        </VerticalFlex>
                                    </FlexChild>
                                </VerticalFlex>
                            </Container>
                        </FlexChild>
                        <FlexChild backgroundColor={"white"}>
                            <Container maxWidth={1200}>
                                <VerticalFlex gap={50}>
                                    <FlexChild padding={"30px 0 0 0"}>
                                        <P weight={"bold"} color={"black"} size={"18pt"}>어떻게 활용하나요?</P>
                                    </FlexChild>
                                    <FlexChild>
                                        <VerticalFlex gap={20}>
                                            <FlexChild>
                                                <VerticalFlex gap={30}>
                                                    <FlexChild>
                                                        <img src={guide1} />
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P size={"11pt"} weight={"bold"}>나의 사이트 혹은 다른 사이트에</P>
                                                        <P size={"11pt"} weight={"bold"}>한핑 파트너스의 광고를 올려주세요</P>
                                                    </FlexChild>
                                                </VerticalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <img src={down} />
                                            </FlexChild>
                                            <FlexChild>
                                                <VerticalFlex gap={30}>
                                                    <FlexChild>
                                                        <img src={guide2} />
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P size={"11pt"} weight={"bold"}>방문자가 광고를 클릭하고</P>
                                                        <P size={"11pt"} weight={"bold"}>한핑고고에서 상품을 구매합니다.</P>
                                                    </FlexChild>
                                                </VerticalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <img src={down} />
                                            </FlexChild>
                                            <FlexChild>

                                                <VerticalFlex gap={30}>
                                                    <FlexChild>
                                                        <img src={guide3} />
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P size={"11pt"} weight={"bold"}>방문자가 구매한 금액의</P>
                                                        <P size={"11pt"} weight={"bold"}>N%를 수익으로 지급받습니다.</P>
                                                    </FlexChild>
                                                </VerticalFlex>
                                            </FlexChild>

                                            <FlexChild >
                                                <div className={style.mobileFooterWrap}>
                                                    <VerticalFlex gap={30}>
                                                        <FlexChild>
                                                            <div className={style.bottomButton}>
                                                                <ButtonEclipse fontWeight={"bold"} fontSize={"14pt"} color={"#e74558"} backgroundColor={"white"} borderRadius={"20px"} border={"1px solid white"} height={38} text={"한핑 파트너스 시작하기"} />
                                                            </div>
                                                        </FlexChild>
                                                        <FlexChild>
                                                            <Container maxWidth={1200}>
                                                                <VerticalFlex gap={30} >
                                                                    <FlexChild>
                                                                        <img src={footerLogo} className={style.footerLogo} />
                                                                    </FlexChild>
                                                                    <FlexChild >
                                                                        <VerticalFlex >
                                                                            <FlexChild >
                                                                                <HorizontalFlex justifyContent={"center"}>
                                                                                    <P>{t("businessNumber")} </P>
                                                                                    <P>559-81-02488 | </P>
                                                                                    <P>{t("ceo")} : 최보미</P>
                                                                                </HorizontalFlex>
                                                                            </FlexChild>
                                                                            <FlexChild>
                                                                                <HorizontalFlex justifyContent={"center"}>
                                                                                    <P>{t("mino")} | </P>
                                                                                    <P>(35372)대전광역시 서구 관저동 1114 5층</P>
                                                                                </HorizontalFlex>
                                                                            </FlexChild>
                                                                        </VerticalFlex>
                                                                    </FlexChild>
                                                                    <FlexChild>
                                                                        <VerticalFlex>
                                                                            <FlexChild>
                                                                                <HorizontalFlex justifyContent={"center"}>
                                                                                    <P>{t("serviceCenter")} :  </P>
                                                                                    <P>070-4943-2597 | Fax : 042-489-8759 </P>
                                                                                </HorizontalFlex>
                                                                            </FlexChild>
                                                                            <FlexChild>
                                                                                <HorizontalFlex justifyContent={"center"}>
                                                                                    <P>{t("mailOrderNumber")} :  </P>
                                                                                    <P>2022-대전서구-0070 </P>
                                                                                </HorizontalFlex>
                                                                            </FlexChild>
                                                                            <FlexChild>
                                                                                <HorizontalFlex justifyContent={"center"}>
                                                                                    <P>{t("email")} :  </P>
                                                                                    <P>04minomino@gmail.com </P>
                                                                                </HorizontalFlex>
                                                                            </FlexChild>
                                                                        </VerticalFlex>
                                                                    </FlexChild>
                                                                </VerticalFlex>
                                                            </Container>
                                                        </FlexChild>
                                                    </VerticalFlex>
                                                </div>
                                            </FlexChild>
                                        </VerticalFlex>
                                    </FlexChild>
                                </VerticalFlex>
                            </Container>
                        </FlexChild>
                    </VerticalFlex>
                    :
                    <div className={style.wrap}>
                        <VerticalFlex>
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
                            <FlexChild>
                                <div className={style.bgWrap}>
                                    <VerticalFlex gap={15}>
                                        <FlexChild>
                                            <P size={"14pt"} color={"white"}>수익을 창출하는 새로운 수단</P>
                                            <P size={"28pt"} color={"white"}>한핑 파트너스</P>
                                        </FlexChild>
                                        <FlexChild>
                                            <div className={style.buttonWrap}>
                                                <img src={star} className={style.star1} />
                                                <ButtonEclipse borderRadius={"20px"} border={"1px solid white"} height={28} text={"회원가입"} />
                                                <img src={star} className={style.star2} />
                                            </div>
                                        </FlexChild>
                                    </VerticalFlex>
                                </div>
                            </FlexChild>

                            <FlexChild backgroundColor={"#eee"}>
                                <FlexChild padding={"60px 0 0 0 "}>
                                    <Center>
                                        <Inline width={"100%"}>
                                            <P size={"16pt"} weight={"bold"}>한핑 파트너스만의</P>
                                            <P size={"16pt"} weight={"bold"} color={"var(--main-color)"}>&nbsp;3POINT</P>
                                        </Inline>
                                    </Center>

                                </FlexChild>
                                <Container maxWidth={750}>
                                    <VerticalFlex padding={45}>

                                        <FlexChild>
                                            <HorizontalFlex>
                                                <FlexChild width={"32%"}>
                                                    <div className={style.pointBox}>
                                                        <VerticalFlex gap={60}>
                                                            <FlexChild padding={"30px 0 0 0"}>
                                                                <img src={partnersUser} />
                                                            </FlexChild>
                                                            <FlexChild >
                                                                <VerticalFlex gap={20}>
                                                                    <FlexChild>
                                                                        <P weight={"bold"} size={"14pt"}>쉬운 회원가입</P>
                                                                    </FlexChild>
                                                                    <FlexChild>
                                                                        <P color={"var(--font-faint-color)"} size={"8pt"}>한핑고고 회원이라면 누구나</P>
                                                                        <P color={"var(--font-faint-color)"} size={"8pt"}>쉽게 가입 하세요!</P>
                                                                        <P color={"var(--font-faint-color)"} size={"8pt"}>간편한 정산과 편리한 리포트 기능까지!</P>
                                                                    </FlexChild>
                                                                </VerticalFlex>
                                                            </FlexChild>
                                                        </VerticalFlex>
                                                    </div>
                                                </FlexChild>
                                                <FlexChild width={"32%"}>
                                                    <div className={style.pointBox}>
                                                        <VerticalFlex gap={60}>
                                                            <FlexChild padding={"30px 0 0 0"}>
                                                                <img src={partnersImg1} />
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <VerticalFlex gap={20}>
                                                                    <FlexChild>
                                                                        <P weight={"bold"} size={"14pt"}>다양한 상품과 광고</P>
                                                                    </FlexChild>
                                                                    <FlexChild>
                                                                        <P color={"var(--font-faint-color)"} size={"8pt"}>한핑고고의 다양한 상품을</P>
                                                                        <P color={"var(--font-faint-color)"} size={"8pt"}>광고해보세요!</P>
                                                                        <P color={"var(--font-faint-color)"} size={"8pt"}>간단하게 광고를 제작할 수 있습니다.</P>
                                                                    </FlexChild>
                                                                </VerticalFlex>
                                                            </FlexChild>
                                                        </VerticalFlex>
                                                    </div>
                                                </FlexChild>
                                                <FlexChild width={"32%"}>
                                                    <div className={style.pointBox}>
                                                        <VerticalFlex gap={55}>
                                                            <FlexChild padding={"30px 0 0 0"}>
                                                                <img src={cash} />
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <VerticalFlex gap={20}>
                                                                    <FlexChild>
                                                                        <P weight={"bold"} size={"14pt"}>높은 수익률</P>
                                                                    </FlexChild>
                                                                    <FlexChild>
                                                                        <P color={"var(--font-faint-color)"} size={"8pt"}>타사대비 높은 커미션으로</P>
                                                                        <P color={"var(--font-faint-color)"} size={"8pt"}>더 많은 수익을 가져가세요!</P>
                                                                    </FlexChild>
                                                                </VerticalFlex>

                                                            </FlexChild>
                                                        </VerticalFlex>
                                                    </div>
                                                </FlexChild>
                                            </HorizontalFlex>
                                        </FlexChild>
                                    </VerticalFlex>
                                </Container>
                            </FlexChild>

                            <FlexChild backgroundColor={"white"}>
                                <Container maxWidth={1200}>
                                    <VerticalFlex gap={50} padding={45}>
                                        <FlexChild>
                                            <P weight={"bold"} color={"black"} size={"18pt"}>어떻게 활용하나요?</P>
                                        </FlexChild>
                                        <FlexChild>
                                            <VerticalFlex gap={20}>
                                                <FlexChild>
                                                    <HorizontalFlex>
                                                        <FlexChild width={"32%"} justifyContent={"center"} >

                                                            <img src={guide1} />

                                                        </FlexChild>
                                                        <FlexChild width={"32%"} justifyContent={"center"} >
                                                            <img src={guide2} />
                                                        </FlexChild>
                                                        <FlexChild width={"32%"} justifyContent={"center"} >
                                                            <img src={guide3} />
                                                        </FlexChild>
                                                    </HorizontalFlex>
                                                </FlexChild>
                                                <FlexChild>
                                                    <HorizontalFlex>
                                                        <FlexChild>
                                                            <VerticalFlex>
                                                                <FlexChild>
                                                                    <P size={"9pt"} weight={"bold"}>나의 사이트 혹은 다른 사이트에</P>
                                                                    <P size={"9pt"} weight={"bold"}>한핑 파트너스의 광고를 올려주세요</P>
                                                                </FlexChild>
                                                            </VerticalFlex>
                                                        </FlexChild>
                                                        <FlexChild width={20}>
                                                            <img src={rightImg} />
                                                        </FlexChild>
                                                        <FlexChild>
                                                            <VerticalFlex>
                                                                <FlexChild>
                                                                    <P size={"9pt"} weight={"bold"}>방문자가 광고를 클릭하고</P>
                                                                    <P size={"9pt"} weight={"bold"}>한핑고고에서 상품을 구매합니다.</P>
                                                                </FlexChild>
                                                            </VerticalFlex>
                                                        </FlexChild>
                                                        <FlexChild width={20}>
                                                            <img src={rightImg} />
                                                        </FlexChild>
                                                        <FlexChild>
                                                            <VerticalFlex>
                                                                <FlexChild>
                                                                    <P size={"9pt"} weight={"bold"}>방문자가 구매한 금액의</P>
                                                                    <P size={"9pt"} weight={"bold"}>N%를 수익으로 지급받습니다.</P>
                                                                </FlexChild>
                                                            </VerticalFlex>
                                                        </FlexChild>
                                                    </HorizontalFlex>

                                                </FlexChild>
                                            </VerticalFlex>
                                        </FlexChild>
                                    </VerticalFlex>
                                </Container>
                            </FlexChild>

                            <FlexChild >
                                <div className={style.footerWrap}>
                                    <VerticalFlex gap={30}>

                                        <FlexChild>
                                            <div className={style.bottomButton}>
                                                <ButtonEclipse fontWeight={"bold"} fontSize={"14pt"} color={"#e74558"} backgroundColor={"white"} borderRadius={"20px"} border={"1px solid white"} height={38} text={"한핑 파트너스 시작하기"} />
                                            </div>
                                        </FlexChild>
                                        <FlexChild>
                                            <Container maxWidth={1200}>
                                                <HorizontalFlex>
                                                    <FlexChild justifyContent={"center"}>
                                                        <img src={footerLogo} className={style.footerLogo} />
                                                    </FlexChild>
                                                    <FlexChild >
                                                        <VerticalFlex padding={10} >
                                                            <FlexChild>
                                                                <HorizontalFlex justifyContent={"flex-start"}>
                                                                    <P>{t("businessNumber")} </P>
                                                                    <P>559-81-02488 | </P>
                                                                    <P>{t("ceo")} : 최보미</P>
                                                                </HorizontalFlex>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <HorizontalFlex justifyContent={"flex-start"}>
                                                                    <P>{t("mino")} | </P>
                                                                    <P>(35372)대전광역시 서구 관저동 1114 5층</P>
                                                                </HorizontalFlex>
                                                            </FlexChild>


                                                        </VerticalFlex>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <VerticalFlex>
                                                            <FlexChild>
                                                                <HorizontalFlex justifyContent={"flex-start"}>
                                                                    <P>{t("serviceCenter")} :  </P>
                                                                    <P>070-4943-2597 | Fax : 042-489-8759 </P>
                                                                </HorizontalFlex>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <HorizontalFlex justifyContent={"flex-start"}>
                                                                    <P>{t("mailOrderNumber")} :  </P>
                                                                    <P>2022-대전서구-0070 </P>
                                                                </HorizontalFlex>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <HorizontalFlex justifyContent={"flex-start"}>
                                                                    <P>{t("email")} :  </P>
                                                                    <P>04minomino@gmail.com </P>
                                                                </HorizontalFlex>
                                                            </FlexChild>
                                                        </VerticalFlex>
                                                    </FlexChild>


                                                </HorizontalFlex>
                                            </Container>
                                        </FlexChild>
                                    </VerticalFlex>
                                </div>
                            </FlexChild>

                        </VerticalFlex>
                    </div>
            }


        </div >
    );
}

export default PartnersHome;
