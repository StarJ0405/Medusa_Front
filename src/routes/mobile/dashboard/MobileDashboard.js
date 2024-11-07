import { faAngleDown, faAngleUp, faExclamation, faMobileScreen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import TabView from "layouts/view/TabView";
import TabViewChild from "layouts/view/TabViewChild";
import Center from "layouts/wrapper/Center";
import { useEffect } from "react";
import { useState } from "react";
import DashboardAdBanner from "routes/admin/dashboard/banner/DashboardAdBanner";
import DashboardBanner from "routes/admin/dashboard/banner/DashboardBanner";
import DashboardClaim from "routes/admin/dashboard/etc/DashboardClaim";
import DashboardNotice from "routes/admin/dashboard/etc/DashboardNotice";
import DashboardOrderDelivery from "routes/admin/dashboard/etc/DashboardOrderDelivery";
import DashboardProduct from "routes/admin/dashboard/etc/DashboardProduct";
import DashboardReview from "routes/admin/dashboard/etc/DashboardReview";
import DashboardSalesDelay from "routes/admin/dashboard/etc/DashboardSalesDelay";
import DashboardSellerLevel from "routes/admin/dashboard/etc/DashboardSellerLevel";
import DashboardStoreMember from "routes/admin/dashboard/etc/DashboardStoreMember";
import DashboardTerms from "routes/admin/dashboard/etc/DashboardTerms";
import style from "./MobileDashboard.module.css"
import clsx from "classnames"
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";

function MobileDashboard(props) {

    const [time, setTime] = useState("00:00");
    const [lawActive, setlawActive] = useState(false);
    const [infoActive, setInfoActive] = useState(false);

    const unfoldClick = () => {
        setlawActive(!lawActive);
    }

    const infoClick = () => {
        setInfoActive(!infoActive);
    }

    const pcVersionClick = () => {
        
        
    }

    const onClickTop = () => {
        window.scrollTo({ top: 0 });
    }



    useEffect(() => {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        setTime(`${hours}:${minutes}`)

    }, [])

    return (
        <div className={style.wrap}>
            <VerticalFlex>

                <FlexChild backgroundColor={"#ffffff"}>
                    <div>
                        <p className={style.notice}>[일반] 스마트스토어 카테고리 상품 리스트, 신규 기능 안내 (9/27 화요일) 2022.09.27.</p>
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.border}>

                        <P color={"white"} backgroundColor={"#00C73C"} size={"20px"} textAlign={"center"} padding={"10px 0"} border={"1px solid #00ae34"}>상품등록</P>

                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.border}>
                        <DashboardOrderDelivery time={time} />
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.border}>
                        <DashboardClaim time={time} />
                    </div>

                </FlexChild>
                <FlexChild>
                    <div className={style.border}>
                        <DashboardBanner />
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.border}>
                        <DashboardBanner />
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.border}>
                        <div className={style.background}>
                            <VerticalFlex backgroundColor={"#ffffff"}>
                                <FlexChild padding={"15px 25px"} borderBottom={"1px solid #ddd"}>
                                    <HorizontalFlex>
                                        <FlexChild>
                                            <P weight={"bold"} size={"18px"}>미답변 문의</P>
                                        </FlexChild>
                                        <FlexChild justifyContent={"flex-end"}>
                                            <P color={"#bbb"} size={"13px"}>최근 {time}</P>
                                        </FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalFlex>
                                        <FlexChild>
                                            <div className={style.inquiry}>
                                                <Center>
                                                    <TabView >
                                                        <TabViewChild tabName={"상품문의"}>

                                                        </TabViewChild>
                                                        <TabViewChild tabName={"고객문의"}>

                                                        </TabViewChild>
                                                        <TabViewChild tabName={"톡톡문의"}>

                                                        </TabViewChild>
                                                    </TabView>
                                                </Center>
                                            </div>
                                        </FlexChild>

                                    </HorizontalFlex>
                                </FlexChild>
                                <FlexChild>

                                </FlexChild>

                            </VerticalFlex>
                        </div>
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.border}>
                        <DashboardNotice time={time} />
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.border}>
                        <DashboardSalesDelay time={time} />
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.border}>
                        <DashboardStoreMember time={time} />
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.border}>
                        <DashboardProduct time={time} />
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.border}>
                        <DashboardReview time={time} />
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.border}>
                        <DashboardSellerLevel time={time} />
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.border}>
                        <DashboardAdBanner />
                    </div>
                </FlexChild>
                <FlexChild>
                    <div>
                        <VerticalFlex>
                            <FlexChild backgroundColor={"#fafafa"} padding={"10px 15px"} borderBottom={"1px solid #ddd"}>
                                <HorizontalFlex>
                                    <FlexChild>
                                        <P size={"14px"} weight={"bold"}>법적고지</P>

                                    </FlexChild>
                                    <FlexChild justifyContent="flex-end">
                                        <p onClick={unfoldClick} className={style.unfoldTitle}>펼쳐보기 </p>
                                        <FontAwesomeIcon icon={faAngleDown} size={"sm"} color={"#ddd"} />
                                    </FlexChild>

                                </HorizontalFlex>
                            </FlexChild>
                            <FlexChild>
                                <div className={clsx(style.unfold, { [style.active]: lawActive })}>
                                    <p className={clsx(style.text, style.color)}>
                                        네이버㈜는 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 상품, 상품정보, 거래에 관한 의무와 책임은 판매자에게 있습니다.
                                    </p>
                                    <p className={clsx(style.text, style.color)}>
                                        또한 판매자와 구매자간의 직거래에 대하여 당사는 관여하지 않기 때문에 거래에 대해서는 책임을 지지 않습니다.
                                    </p>
                                </div>
                            </FlexChild>
                        </VerticalFlex>
                    </div>
                </FlexChild>
                <FlexChild padding={5}>
                    <div onClick={onClickTop} className={style.top}>
                        <p>TOP <FontAwesomeIcon icon={faAngleUp} /></p>
                    </div>
                </FlexChild>
                <FlexChild>

                    <VerticalFlex>
                        <FlexChild padding={"10px 0 5px 0"} height={"max-content"}>
                            <p onClick={infoClick} className={clsx(style.textTitle, style.color)}>네이버(주) 사업자정보 {infoActive ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}</p>
                        </FlexChild>
                        <FlexChild>
                            <div className={clsx(style.infoWrap, { [style.infoActive]: infoActive })}>
                                <VerticalFlex padding={"15px 50px"} backgroundColor={"#E2E6EA"}>
                                    <FlexChild padding={"5px 0"}>
                                        <HorizontalFlex>
                                            <FlexChild width={"max-content"} >
                                                <p className={style.infoTitle}>대표이사 </p>
                                            </FlexChild>
                                            <FlexChild>
                                                <p className={style.info}>홍길동</p>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild padding={"5px 0"}>
                                        <HorizontalFlex>
                                            <FlexChild width={"max-content"} padding={"0 20px 0 0"}>
                                                <p className={style.infoTitle}>주소 </p>
                                            </FlexChild>
                                            <FlexChild>
                                                <p className={style.info}>대전 서구 관저동 1114</p>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild padding={"5px 0"}>
                                        <HorizontalFlex>
                                            <FlexChild width={"max-content"} padding={"0 20px 0 0"}>
                                                <p className={style.infoTitle}>전화 </p>
                                            </FlexChild>
                                            <FlexChild>
                                                <p className={clsx(style.info, style.call)}><FontAwesomeIcon icon={faMobileScreen} /> 전화상담 (전화 전 클릭)</p>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild padding={"5px 0"}>
                                        <HorizontalFlex>
                                            <FlexChild width={"max-content"} padding={"0 20px 0 0"}>
                                                <p className={style.infoTitle}>사업자등록번호 </p>
                                            </FlexChild>
                                            <FlexChild>
                                                <p className={style.info}>220-12-12121</p>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild padding={"5px 0"}>
                                        <HorizontalFlex>
                                            <FlexChild width={"max-content"}>
                                                <p className={style.infoTitle}>통신판매업신고번호 </p>
                                            </FlexChild>
                                            <FlexChild>
                                                <p className={style.info}>제1234-대전서구-1234호</p>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                </VerticalFlex>
                            </div>
                        </FlexChild>

                        <FlexChild height={"max-content"} padding={"10px"}>
                            <HorizontalFlex>
                                <FlexChild justifyContent={"flex-end"} padding={"0 10px"}>
                                    <p className={clsx(style.text, style.color, style.line)}>이용약관</p>
                                </FlexChild>
                                <FlexChild width={"max-content"} padding={"0 10px"}>
                                    <p className={clsx(style.text, style.color, style.line, style.bold)}>개인정보처리방침</p>
                                </FlexChild>
                                <FlexChild padding={"0 10px"} width={"max-content"}>
                                    <p className={clsx(style.text, style.color, style.line)}>고객센터</p>
                                </FlexChild>
                                <FlexChild padding={"0 10px"}>
                                    <p className={clsx(style.text, style.color)}><FontAwesomeIcon icon={faCommentDots} /> 톡톡상담</p>
                                </FlexChild>
                            </HorizontalFlex>

                        </FlexChild>
                        <FlexChild padding={"0 0 20px 0"}>
                            <p className={clsx(style.text)}>© NAVER Corp</p>
                        </FlexChild>
                    </VerticalFlex>

                </FlexChild>
                
                <FlexChild>
                    <div className={style.pcVersion} onClick={pcVersionClick}>
                        <p>PC 버전으로 보기 {">"}</p>
                    </div>

                </FlexChild>

            </VerticalFlex>
        </div>
    );
}

export default MobileDashboard;