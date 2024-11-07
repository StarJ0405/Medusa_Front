import { CButton, CFormSelect, CFormTextarea } from "@coreui/react";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextArea from "antd/lib/input/TextArea";
import CustomIcon from "components/icons/CustomIcon";
import CheckCircle from "components/inputs/checkBox/CheckCircle";
import InputPassword from "components/inputs/InputPassword";
import InputText from "components/inputs/InputText";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./ShippingAddress.module.css"
import NiceModal from "@ebay/nice-modal-react";

function ShippingAddress() {
    const { isMobile } = useContext(BrowserDetectContext);
    const navigate = useNavigate();

    const onCancelClick = () => {
        navigate("/mypage", { replace: true })
    }
    const onClick = () => {
        NiceModal.show("address");
    }
    const btnStyle = {
        backgroundColor: "white",
        borderRadius: "0",
        borderColor: "var(--line-color-lg)",
        padding: "0",
        height: "30px",
        width: "80px",
        fontSize: "var(--font-size-lg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--font-faint-color)",

    }
    const modifyBtnStyle = {
        backgroundColor: "var(--main-color)",
        borderRadius: "0",
        border: "none",
        padding: "0",
        height: "30px",
        width: "80px",
        fontSize: "var(--font-size-lg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
    }

    return (


        <div>
            {
                isMobile
                    ?
                    <VerticalFlex backgroundColor={"white"} gap={40}>
                        <FlexChild>
                            <VerticalFlex>
                                <FlexChild height={"40px"} backgroundColor={"var(--main-color)"}>
                                    <HorizontalFlex>
                                        <FlexChild padding={" 0 0 0 20px"} width={"initial"}>
                                            <P color={"white"} size={"16pt"}><FontAwesomeIcon icon={faAngleLeft} /></P>
                                        </FlexChild>
                                        <FlexChild justifyContent={"center"}>
                                            <P color={"white"} size={"var(--font-size-lg)"}>배송지등록 및 관리</P>
                                        </FlexChild>
                                        <FlexChild width={"initial"} justifyContent={"flex-end"} padding={"0 20px 5px 0 "}>
                                            <div className={style.iconWrap}>
                                                <CustomIcon name={"shoppingBag"} color={"white"} />
                                            </div>
                                        </FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                                <FlexChild height={"44px"}>
                                    <HorizontalFlex>
                                        <Center padding={"0 0 0 20px"} width={"100%"} textAlign={"left"} >
                                            <P size={"var(--font-size-lg)"} weight={"bold"} >배송지등록</P>
                                        </Center>
                                    </HorizontalFlex>
                                    <div className={style.topLine}></div>
                                </FlexChild>
                                <FlexChild height={50}>
                                    <HorizontalFlex padding={"0 0 0 20px"}>
                                        <FlexChild >
                                            <InputText lineText placeHolder={"수령인"} />
                                        </FlexChild>
                                        <FlexChild>
                                            <HorizontalFlex justifyContent={"flex-end"}>
                                                <FlexChild width={"initial"}>
                                                    <CheckCircle />
                                                </FlexChild>
                                                <FlexChild width={"initial"} justifyContent={"flex-end"} padding={"0 20px 0 0"}>
                                                    <P weight={"bold"} color={"var(--font-color)"} size={"var(--font-size)"}>기본 배송지 설정</P>
                                                </FlexChild>
                                            </HorizontalFlex>
                                        </FlexChild>
                                    </HorizontalFlex>
                                    <div className={style.line}></div>
                                </FlexChild>
                                <FlexChild height={50}>
                                    <HorizontalFlex padding={"0 0 0 20px"}>
                                        <FlexChild >
                                            <InputText lineText placeHolder={"연락처"} />
                                        </FlexChild>
                                    </HorizontalFlex>
                                    <div className={style.line}></div>
                                </FlexChild>
                                <FlexChild height={50}>
                                    <HorizontalFlex padding={"0 0 0 20px"}>
                                        <FlexChild>
                                            
                                                <div onClick={onClick} className={style.pointEvent}>
                                                    <InputText lineText placeHolder={"우편번호"} />
                                                </div>
                                            
                                        </FlexChild>
                                    </HorizontalFlex>
                                    <div className={style.line}></div>
                                </FlexChild>
                                <FlexChild height={50}>
                                    <HorizontalFlex padding={"0 0 0 20px"}>
                                        <FlexChild >
                                            <InputText lineText placeHolder={"주소"} />
                                        </FlexChild>
                                    </HorizontalFlex>
                                    <div className={style.line}></div>
                                </FlexChild>
                                <FlexChild height={50}>
                                    <HorizontalFlex padding={"0 0 0 20px"}>
                                        <FlexChild >
                                            <InputText lineText placeHolder={"상세주소"} />
                                        </FlexChild>
                                    </HorizontalFlex>
                                    <div className={style.line}></div>
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild>

                        <FlexChild>
                            <HorizontalFlex gap={20}>
                                <FlexChild justifyContent={"flex-end"}>
                                    <CButton style={modifyBtnStyle} shape="rounded-0" >수정</CButton>
                                </FlexChild>
                                <FlexChild>
                                    <CButton style={btnStyle} variant="outline" onClick={onCancelClick} >취소</CButton>
                                    {/* <P  backgroundColor={"#707070"} padding={"3px 20px"} size={"16pt"} color={"white"}></P> */}
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                    </VerticalFlex>
                    :
                    <VerticalFlex backgroundColor={"white"} padding={" 0 0 0 25px"}>
                        <FlexChild padding={"20px 0 0 0"}>
                            <Center width={"100%"} textAlign={"left"}>
                                <P size={"16pt"} weight={"bold"} padding={"5px"}>배송지등록</P>
                            </Center>
                        </FlexChild>
                        <FlexChild>
                            <div className={style.horizontalLine}></div>
                        </FlexChild>
                        <FlexChild>
                            <HorizontalFlex gap={30}>
                                <FlexChild width={"15%"} padding={"15px"} backgroundColor={"#ddd"}>
                                    <P weight={"bold"}>배송지명</P>
                                </FlexChild>
                                <FlexChild width={"30%"}>
                                    <HorizontalFlex>
                                        <P color={"var(--main-color)"} padding={"0 10px 0 0"}>*</P>
                                        <InputText size="sm" placeHolder={"최대10자"} />
                                    </HorizontalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <CheckCircle />
                                    <P>기본 배송지 설정</P>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                        <FlexChild>
                            <HorizontalFlex justifyContent={"flex-start"} gap={30}>
                                <FlexChild width={"15%"} padding={"15px"} backgroundColor={"#ddd"}>
                                    <P weight={"bold"}>받는분</P>
                                </FlexChild>
                                <FlexChild width={"30%"}>
                                    <HorizontalFlex>
                                        <P color={"var(--main-color)"} padding={"0 10px 0 0"}>*</P>
                                        <InputText size="sm" placeHolder={"최대10자"} />
                                    </HorizontalFlex>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                        <FlexChild>
                            <HorizontalFlex gap={30}>
                                <FlexChild width={"15%"} padding={"15px"} backgroundColor={"#ddd"}>
                                    <P weight={"bold"}>연락처</P>
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalFlex justifyContent={"flex-start"} gap={10}>
                                        <P color={"var(--main-color)"}>*</P>
                                        <FlexChild width={"15%"}>
                                            <CFormSelect size="sm">
                                                <option>선택</option>
                                                <option>010</option>
                                                <option>011</option>
                                                <option>012</option>
                                                <option>013</option>
                                            </CFormSelect>
                                        </FlexChild>
                                        <FlexChild width={"initial"}>
                                            <P>-</P>
                                        </FlexChild>
                                        <FlexChild width={"15%"}>
                                            <InputText size="sm" />
                                        </FlexChild>
                                        <FlexChild width={"initial"}>
                                            <P>-</P>
                                        </FlexChild>
                                        <FlexChild width={"15%"}>
                                            <InputText size="sm" />
                                        </FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                        <FlexChild>
                            <HorizontalFlex gap={30}>
                                <FlexChild width={"15%"} height={"230px"} padding={"15px"} backgroundColor={"#ddd"}>
                                    <P weight={"bold"}>주소</P>
                                </FlexChild>
                                <FlexChild>
                                    <VerticalFlex flexStart gap={10}>
                                        <FlexChild>
                                            <HorizontalFlex justifyContent={"flex-start"} gap={10}>
                                                <P color={"var(--main-color)"}>*</P>
                                                <FlexChild width={"15%"}>
                                                    <CFormSelect size="sm" disabled />
                                                </FlexChild>
                                                <FlexChild width={"15%"}>
                                                    <CFormSelect size="sm" disabled />
                                                </FlexChild>
                                                <FlexChild width={"15%"}>
                                                    <CFormSelect disabled size="sm" />
                                                </FlexChild>
                                            </HorizontalFlex>
                                        </FlexChild>
                                        <FlexChild padding={"0 0 0 15px"} justifyContent={"flex-start"} width={"65%"}>
                                            <CFormTextarea placeholder="상세주소를 입력하세요." disabled rows="4" />
                                        </FlexChild>
                                        <FlexChild width={"65%"} padding={"0 0 0 15px"}>
                                            <InputText size="sm" />
                                        </FlexChild>
                                    </VerticalFlex>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                        <FlexChild>
                            <VerticalFlex flexStart padding={"15px"}>
                                <FlexChild>
                                    <P size={"16pt"} color={"#707070"} >개인정보수집·이용안내</P>
                                    <P size={"10pt"} color={"#707070"}>· 개인정보 수집 목적 : 상품구매 시 배송처리</P>
                                    <P size={"10pt"} color={"#707070"}>· 개인정보 수집 항목 : 배송지명 , 수령인정보 {"("}받는분 , 연락처, 주소{")"}</P>
                                    <P size={"10pt"} color={"#707070"}>· 보유 및 이용기간 : 정보삭제 또는 회원 탈퇴 시까지</P>
                                    <P size={"10pt"} color={"#707070"}>· 확인 버튼을 누르지 않을 경우 배송지 정보가 저장되지 않습니다.</P>
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild>
                        <FlexChild padding={"50px 0"}>
                            <HorizontalFlex gap={20}>
                                <FlexChild justifyContent={"flex-end"}>
                                    <P cursor size={"16pt"} padding={"5px 50px"} color={"white"} backgroundColor={"var(--main-color)"}>확인</P>
                                </FlexChild>
                                <FlexChild>
                                    <P onClick={onCancelClick} cursor size={"16pt"} padding={"5px 50px"} color={"white"} backgroundColor={"#707070"}>취소</P>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                    </VerticalFlex>
            }
        </div>
    );
}

export default ShippingAddress;