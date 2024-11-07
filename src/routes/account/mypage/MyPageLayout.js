import { faAngleRight, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import P from "components/P";
import Container from "layouts/container/Container";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./MyPageLayout.module.css"
import coupon from "resources/img/icons/coupon.png"
import point from "resources/img/icons/point.png"
import listData from "InitialData/accounts/listData.json"
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect, useState } from "react";
import Center from "layouts/wrapper/Center";
import NiceModal from "@ebay/nice-modal-react";
import { AuthContext } from "providers/AuthProvider";
import { requester } from "App";
import { useTranslation } from "react-i18next";
import MypageContentHeader from "./header/MypageContentHeader";

function MyPageLayout() {
    const { isMobile } = useContext(BrowserDetectContext);
    const { userName } = useContext(AuthContext);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [value, setValue] = useState();

    const onClick = () => {
        navigate("/mypage");
    }
    const onCouponClick = () => {
        navigate("coupon");
    }
    const onPoingClick = () => {
        navigate("point");
    }

    const SideMenu = ({ data }) => {
        const [active, setActive] = useState(false);
        const color = active ? "var(--main-color)" : "black";

        return (
            <NavLink to={data.to ? data.to : ""} style={({ isActive }) => { setActive(isActive); }} replace={true}>
                <P size={"10pt"} padding={"0 0 5px 0"} color={color}>
                    {t(data.row)}
                </P>
            </NavLink>
        );
    }

    return (
        <Container maxWidth={1200}>
            {
                isMobile
                    ?
                    <div className={style.mobile}>
                        <VerticalFlex>
                            <FlexChild>
                                <Outlet />
                            </FlexChild>
                        </VerticalFlex>
                    </div>
                    :
                    <VerticalFlex margin={"20px 0 0 0"}>
                        <FlexChild alignItems={"flex-start"}>
                            <HorizontalFlex alignItems={"flex-start"}>
                                <FlexChild width={"15%"}>
                                    <div onClick={onClick} className={style.title}>
                                        <P size={"var(--font-size-lg)"}>MY&nbsp;PAGE</P>
                                    </div>
                                </FlexChild>
                                <FlexChild justifyContent={"flex-start"}>
                                    <div className={style.header}>
                                        <HorizontalFlex>
                                            <FlexChild padding={"0 0 0 15px"}>
                                                <div>
                                                    <P size={"11pt"} color={"var(--main-color)"} weight={"bold"}>WELCOME <FontAwesomeIcon icon={faAngleRight} /></P>
                                                    <div className={style.userWelcome}>
                                                        <P weight={"bold"} color={"var(--main-color)"}>{userName}&nbsp;</P>
                                                        <P weight={"bold"}>{t("hello")}</P>
                                                    </div>
                                                </div>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex gap={50} justifyContent={"flex-end"}>
                                                    <FlexChild width={"max-content"} padding={"10px 0 0 0"}>
                                                        <div className={style.couponWrap} onClick={onCouponClick}>
                                                            <VerticalFlex height={"max-content"} alignItems={"flex-start"} gap={5}>
                                                                <FlexChild>
                                                                    <img src={coupon} className={style.couponImg} />
                                                                    <P color={"var(--font-faint-color)"} padding={"2px 0 0 0 "} size={"10pt"}>{t("coupon")}</P>
                                                                </FlexChild>
                                                                <FlexChild justifyContent={"flex-end"}>
                                                                    {/* <P weight={"bold"} size={"14pt"} color={"var(--main-color)"}>{value ? value.couponCount : 0}</P> */}
                                                                    <P weight={"bold"} size={"14pt"} color={"var(--main-color)"}>0</P>
                                                                </FlexChild>
                                                            </VerticalFlex>
                                                        </div>
                                                    </FlexChild>
                                                    <FlexChild width={"max-content"} padding={"10px 10px 0 0"}>
                                                        <div className={style.pointWrap} onClick={onPoingClick}>
                                                            <VerticalFlex gap={5}>
                                                                <FlexChild>
                                                                    <img src={point} className={style.pointImg} />
                                                                    <P color={"var(--font-faint-color)"} size={"10pt"}>{t("point")}</P>
                                                                </FlexChild>
                                                                <FlexChild>
                                                                    {/* <P weight={"bold"} size={"14pt"} color={"var(--main-color)"}>{value ? value.point : 0}</P> */}
                                                                    <P weight={"bold"} size={"14pt"} color={"var(--main-color)"}>0</P>
                                                                </FlexChild>
                                                            </VerticalFlex>
                                                        </div>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </div>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                        <FlexChild>
                            <HorizontalFlex alignItems={"flex-start"}>
                                <FlexChild width={"15%"}>
                                    <div className={style.wrap}>
                                        <VerticalFlex flexStart>
                                            {listData && listData.map((data, index) => (
                                                <FlexChild key={index}>
                                                    <div className={style.padding}>
                                                        <P padding={"0 0 10px 0"} color={"black"} weight={"bold"} size={"10pt"}>{t(data.title)}</P>
                                                        {
                                                            data.blocks && data.blocks.map((block, index) => (
                                                                <div key={index}>
                                                                    {
                                                                        block.contents && block.contents.map((row, index) => (
                                                                            <SideMenu key={index} data={row} />
                                                                        ))
                                                                    }
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </FlexChild>
                                            ))
                                            }
                                        </VerticalFlex>
                                    </div>
                                </FlexChild>
                                <FlexChild height={"100%"}>
                                    <MypageContentHeader>
                                        <Outlet />
                                    </MypageContentHeader>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                    </VerticalFlex>
            }

        </Container>
    );
}

export default MyPageLayout;