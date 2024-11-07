import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "@mui/material";
import AccordionText from "components/accordion/AccordionText";
import AccordionWrapper from "components/accordion/AccordionWrapper";
import CustomIcon from "components/icons/CustomIcon";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Faq.module.css"





function Faq() {
    const { isMobile } = useContext(BrowserDetectContext);


    const accordionStyle = {
        '--cui-accordion-bg': "white",
        '--cui-accordion-active-color': "var(--font-color)",
        '--cui-accordion-border-color': "none",
        '--cui-accordion-color': "var(--font-color)",
        '--cui-accordion-active-bg': "white",
        '--cui-accordion-btn-focus-border-color': "none",
        '--cui-accordion-btn-focus-box-shadow': "none",
        borderBottom: "1px solid var(--line-color)",
        

    }
    const accordionBodyStyle = {
        backgroundColor: "var(--user-bg-color)"
    }
    const Question = (props) => {

        return (
            <>
                <AccordionWrapper style={accordionStyle}>
                    <AccordionText style={accordionBodyStyle} header={props.header} height={props.height}>
                        {props.children}
                    </AccordionText>
                </AccordionWrapper>
                
            </>
        );
    }

    const Content = (props) => {
        return (
            <VerticalFlex flexStart padding={"25px"} backgroundColor={"var(--user-bg-color)"} gap={20}>
                <FlexChild>
                    <P weight={"bold"} size={"10pt"}>다음 반품 패키지에 대해서는 환불을 제공하지 않습니다.</P>
                    <P weight={"bold"} size={"10pt"}>- 잘못된 주소로 배송된 패키지  </P>
                    <P weight={"bold"} size={"10pt"}>- 수취인이  찾지 못한 소포 </P>
                    <P weight={"bold"} size={"10pt"}>- 불충분한 정보로 인한 배송 실패{"(예: 수취인 이름, 주소 불분명)"}</P>
                    <P weight={"bold"} size={"10pt"}>- 수취인 부재로 인한 배송 실패</P>
                    <P weight={"bold"} size={"10pt"}>- 배송업체의 관세 안내는 수취인에게 발송될 수도 있고 발송되지 않을 수도 있으며,</P>
                    <P weight={"bold"} size={"10pt"}>따라서 통지를 받지 못했다고 해서 반품된 소포에 대한 환불을 받을 수 있는 사유로 볼 수 없습니다.</P>
                    <P weight={"bold"} size={"10pt"}>- 추적 업데이트를 지속적으로 진행해 주시고, 통관이 지연될 경우, 가능한 한 빨리 현지 세관에 연락하여 소포를 청구하십시오.</P>
                </FlexChild>
                <FlexChild>
                    <P weight={"bold"} size={"10pt"}>우편번호를 다시 확인하는 방법:</P>
                    <P weight={"bold"} size={"10pt"}>미국: https://www.naver.com</P>
                    <P weight={"bold"} size={"10pt"}>캐나다: https://www.google.co.kr</P>
                </FlexChild>
            </VerticalFlex>
        );
    }
    return (
        <>
            {
                isMobile
                    ?
                    <VerticalFlex backgroundColor={"white"}>
                        <FlexChild height={"40px"} backgroundColor={"var(--main-color)"}>
                            <HorizontalFlex>
                                <FlexChild padding={" 0 0 0 20px"}>
                                    <P color={"white"} size={"16pt"}><FontAwesomeIcon icon={faAngleLeft} /></P>
                                </FlexChild>
                                <FlexChild justifyContent={"center"}>
                                    <P color={"white"} size={"16pt"}>계정관리</P>
                                </FlexChild>
                                <FlexChild justifyContent={"flex-end"} padding={"0 20px 5px 0 "}>
                                    <div className={style.iconWrap}>
                                        <CustomIcon name={"shoppingBag"} color={"white"} />
                                    </div>
                                </FlexChild>
                            </HorizontalFlex>

                        </FlexChild>
                        <FlexChild height={44} padding={"8px 20px"}>
                            <Center width={"100%"} textAlign={"left"}>
                                <P weight={"bold"} size={"var(--font-size-lg)"}>자주 묻는 질문</P>
                            </Center>
                        </FlexChild >
                        <FlexChild>
                            <div className={style.titleLine}></div>
                        </FlexChild>
                        <FlexChild>
                            <Question header={"Q. 주소를 변경할 수 있습니까 ?"} height={150} >
                                <P>안돼!</P>
                            </Question>
                        </FlexChild>
                        <FlexChild>
                            <Question header={"Q. 물건이 파손되어 배송되었습니다"} height={150} >
                                <P>안돼!</P>
                            </Question>
                        </FlexChild>
                        <FlexChild>
                            <Question header={"Q. 반품된 패키지를 환불받을 수 있나요?"} height={"100%"}>
                                <Content />
                            </Question>
                        </FlexChild>
                        <FlexChild>
                            <Question header={"Q. 결제 금액이 환불 금액과 다릅니다"} height={150} >
                                <P>그냥 살아 ! </P>
                            </Question>
                        </FlexChild>
                    </VerticalFlex >
                    :
                    <VerticalFlex gap={5}>
                        <FlexChild>
                            <P weight={"bold"} size={"18pt"}>자주 묻는 질문</P>
                            <div className={style.titleLine}></div>
                        </FlexChild>
                        <FlexChild>
                            <Question header={"Q. 주소를 변경할 수 있습니까 ?"} height={150} >
                                <P>안돼!</P>
                            </Question>
                        </FlexChild>
                        <FlexChild>
                            <Question header={"Q. 물건이 파손되어 배송되었습니다"} height={150} >
                                <P>안돼!</P>
                            </Question>
                        </FlexChild>
                        <FlexChild>
                            <Question header={"Q. 반품된 패키지를 환불받을 수 있나요?"} height={"100%"}>
                                <Content />
                            </Question>
                        </FlexChild>
                        <FlexChild>
                            <Question header={"Q. 결제 금액이 환불 금액과 다릅니다"} height={150} >
                                <P>그냥 살아 ! </P>
                            </Question>
                        </FlexChild>
                    </VerticalFlex>
            }
        </>

    );
}

export default Faq;