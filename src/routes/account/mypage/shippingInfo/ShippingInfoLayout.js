import { CButton } from "@coreui/react";
import { faAngleLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "@mui/material";
import CustomIcon from "components/icons/CustomIcon";
import P from "components/P";
import Inline from "layouts/container/Inline";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { AuthContext } from "providers/AuthProvider";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./ShippingInfoLayout.module.css"
import NiceModal from "@ebay/nice-modal-react";
import MypageContentHeader from "../header/MypageContentHeader";
import { requester } from "App";
import ShippingInfomation from "routes/front/main/shopping/orderSummary/ShippingInfomation";
import ShippingInfoList from "./ShippingInfoList";

function ShippingInfoLayout() {
    const navigate = useNavigate();
    const { isMobile } = useContext(BrowserDetectContext);
    const { userName } = useContext(AuthContext);
    const [shippingInfos, setShippingInfos] = useState([]);
    const onModifyClick = (id) => {
        NiceModal.show("shippingInfoEditModal", { data: shippingInfos[id], onClose: onEditModalClose });
    }

    const onEditModalClose = () => {
        requester.getAllShippingInfos((result) => {
            setShippingInfos(result.data);
        })
    }

    useEffect(() => {
        if (userName) {
            requester.getAllShippingInfos((result) => {
                setShippingInfos(result.data);
                console.log(result.data);

            })
        }
    }, [userName])


    const btnStyle = {
        backgroundColor: "white",
        borderRadius: "3px",
        border: "1px solid var(--main-color)",
        padding: "0",
        height: "30px",
        width: "90px",
        fontSize: "var(--font-size)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--main-color)",
    }

    const modifyBtnStyle = {
        backgroundColor: "white",
        borderRadius: "3px",
        border: "1px solid var(--main-color)",
        padding: "0",
        height: "30px",
        width: "60px",
        fontSize: "var(--font-size)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--main-color)",
    }
    const deleteBtnStyle = {
        backgroundColor: "white",
        borderRadius: "3px",
        border: "1px solid var(--line-color)",
        padding: "0",
        height: "30px",
        width: "60px",
        fontSize: "var(--font-size)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--font-color)",
    }

    const AddToaddressBtnStyle = {
        backgroundColor: "var(--main-color)",
        borderRadius: "0",
        border: "none",
        padding: "0",
        height: "30px",
        width: "130px",
        fontSize: "var(--font-size-lg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
    }

    const deleteSelection = (index) => {

    }

    return (
        <div>
            {
                isMobile
                    ?
                    <VerticalFlex backgroundColor={"white"}>
                        {/* <FlexChild>
                            <VerticalFlex gap={40}>
                                <FlexChild>
                                    <MypageContentHeader />
                                </FlexChild>
                                <FlexChild>
                                    <VerticalFlex>
                                        <FlexChild height={"44px"}>
                                            <HorizontalFlex>
                                                <Center padding={"0 0 0 20px"} width={"100%"} textAlign={"left"} >
                                                    <P size={"var(--font-size-lg)"} weight={"bold"} >배송지등록 및 관리</P>
                                                </Center>
                                            </HorizontalFlex>
                                            <div className={style.topLine}></div>
                                        </FlexChild>
                                        <FlexChild height={50}>
                                            <HorizontalFlex justifyContent={"flex-start"} gap={15}>
                                                <FlexChild width={"initial"} padding={"0 0 0 20px"}>
                                                    <P weight={"bold"} color={"var(--font-color)"} size={"var(--font-size)"}>홍길동</P>
                                                </FlexChild>
                                                <FlexChild>
                                                    <CButton style={btnStyle} variant="outline">기본 배송지</CButton>
                                                </FlexChild>
                                            </HorizontalFlex>
                                            <div className={style.borderBottom}></div>
                                        </FlexChild>
                                        <FlexChild height={50}>
                                            <HorizontalFlex justifyContent={"flex-start"}>
                                                <FlexChild width={"initial"} padding={"0 0 0 20px"}>
                                                    <Center width={"100%"}>
                                                        <P weight={"bold"} color={"var(--font-color)"} size={"var(--font-size)"}>대전광역시 서구 관저중로 95번길 68</P>
                                                    </Center>
                                                </FlexChild>
                                            </HorizontalFlex>
                                            <div className={style.borderBottom}></div>
                                        </FlexChild>
                                        <FlexChild height={50}>
                                            <HorizontalFlex justifyContent={"flex-start"} gap={30}>
                                                <FlexChild width={"initial"} padding={"0 0 0 20px"}>
                                                    <P weight={"bold"} color={"var(--font-color)"} size={"var(--font-size)"}>010-****-1234</P>
                                                </FlexChild>
                                                <FlexChild>
                                                    <HorizontalFlex gap={15} >
                                                        <FlexChild width={"initial"}>
                                                            <CButton style={modifyBtnStyle} variant="outline">수정</CButton>
                                                        </FlexChild>
                                                        <FlexChild >
                                                            <CButton style={deleteBtnStyle} variant="outline">삭제</CButton>
                                                        </FlexChild>
                                                    </HorizontalFlex>
                                                </FlexChild>
                                            </HorizontalFlex>
                                            <div className={style.borderBottom}></div>
                                        </FlexChild>
                                    </VerticalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <VerticalFlex>
                                        <FlexChild height={50}>
                                            <HorizontalFlex >
                                                <FlexChild padding={"0 0 0 20px"}>
                                                    <P weight={"bold"} color={"var(--font-color)"} size={"var(--font-size)"}>홍길동</P>
                                                </FlexChild>
                                                <FlexChild padding={"0 20px 0 0"}>
                                                    <HorizontalFlex>
                                                        <FlexChild justifyContent={"flex-end"}>
                                                            <div className={style.circle}></div>
                                                        </FlexChild>
                                                        <FlexChild width={"initial"} padding={"0 0 0 15px"} justifyContent={"flex-end"}>
                                                            <P color={"var(--font-color)"} size={"var(--font-size)"}>기본 배송지로 설정</P>
                                                        </FlexChild>
                                                    </HorizontalFlex>
                                                </FlexChild>
                                            </HorizontalFlex>
                                            <div className={style.borderBottom}></div>
                                        </FlexChild>
                                        <FlexChild height={50}>
                                            <HorizontalFlex justifyContent={"flex-start"}>
                                                <FlexChild width={"initial"} padding={"0 0 0 20px"}>
                                                    <Center width={"100%"}>
                                                        <P weight={"bold"} color={"var(--font-color)"} size={"var(--font-size)"}>대전광역시 서구 관저중로 95번길 68</P>
                                                    </Center>
                                                </FlexChild>
                                            </HorizontalFlex>
                                            <div className={style.borderBottom}></div>
                                        </FlexChild>
                                        <FlexChild height={50}>
                                            <HorizontalFlex justifyContent={"flex-start"} gap={30}>
                                                <FlexChild width={"initial"} padding={"0 0 0 20px"}>
                                                    <P weight={"bold"} color={"var(--font-color)"} size={"var(--font-size)"}>010-****-1234</P>
                                                </FlexChild>
                                                <FlexChild>
                                                    <HorizontalFlex gap={15} >
                                                        <FlexChild width={"initial"}>
                                                            <CButton style={modifyBtnStyle} variant="outline">수정</CButton>
                                                        </FlexChild>
                                                        <FlexChild >
                                                            <CButton style={deleteBtnStyle} variant="outline">삭제</CButton>
                                                        </FlexChild>
                                                    </HorizontalFlex>
                                                </FlexChild>
                                            </HorizontalFlex>
                                            <div className={style.borderBottom}></div>
                                        </FlexChild>
                                    </VerticalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <CButton onClick={onModifyClick} style={AddToaddressBtnStyle} >배송지 등록</CButton>
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild> */}
                        <FlexChild>
                            <VerticalFlex>
                                <FlexChild>
                                    <ShippingInfoList shippingInfos={shippingInfos} callback={deleteSelection} />
                                </FlexChild>

                            </VerticalFlex>
                        </FlexChild>

                    </VerticalFlex>
                    :
                    <VerticalFlex backgroundColor={"white"}>
                        {/* <FlexChild>
                            <ShippingInfomation />
                        </FlexChild> */}
                        <FlexChild>
                            <VerticalFlex>
                                <FlexChild>
                                    <ShippingInfoList shippingInfos={shippingInfos} callback={deleteSelection} />
                                </FlexChild>

                            </VerticalFlex>
                        </FlexChild>
                    </VerticalFlex>
            }
        </div>
    );
}

export default ShippingInfoLayout;