import { CFormCheck, CFormInput, CFormSelect, CFormTextarea } from "@coreui/react";
import { faAngleDown, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Radio } from "@mui/material";
import CustomIcon from "components/icons/CustomIcon";
import InputText from "components/inputs/InputText";
import InputTextarea from "components/inputs/InputTextarea";
import P from "components/P";
import Inline from "layouts/container/Inline";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { AuthContext } from "providers/AuthProvider";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Inquiry.module.css"
import NiceModal from "@ebay/nice-modal-react";
import { useTranslation } from "react-i18next";


function Inquiry() {
    const { isMobile } = useContext(BrowserDetectContext);
    const { userName } = useContext(AuthContext);
    const { t } = useTranslation();
    const textareaRef = useRef();
    const radioTrueRef = useRef();
    
    const [text, setText] = useState();
    const [value, setValue] = useState(false);
    const [disabled, setDisabled] = useState(true);


    const onTextChange = (e) => {
        setText(e);
    }

    const InputUploadChange = (e) => {
        
    }

    const onRadioChecked =(e) => {

        if(e.target.id === "radioTrue"){
            setValue(true);
            setDisabled(false);
        }else if(e.target.id === "radioFalse"){
            setValue(false);
            setDisabled(true);
            
        }
    }




    const Layout = (props) => {
        return (
            <HorizontalFlex justifyContent={"flex-start"}>
                <FlexChild height={props.height} width={"25%"} backgroundColor={"#ddd"} padding={"15px"}>
                    <Inline>
                        <P size={"12pt"}>{props.text}</P>
                        {
                            props.required &&
                            <P color={"var(--main-color)"}>&nbsp;*</P>
                        }
                    </Inline>
                </FlexChild>
                <FlexChild padding={"0 0 0 20px"} width={props.width}>
                    {props.children}
                </FlexChild>
            </HorizontalFlex>
        );
    }

    return (
        <div>
            {
                isMobile
                    ?
                    <VerticalFlex backgroundColor={"white"}>
                        <FlexChild height={"40px"} backgroundColor={"var(--main-color)"}>
                            <HorizontalFlex>
                                <FlexChild padding={" 0 0 0 20px"}>
                                    <P color={"white"} size={"var(--font-size-lg)"}><FontAwesomeIcon icon={faAngleLeft} /></P>
                                </FlexChild>
                                <FlexChild justifyContent={"center"}>
                                    <P color={"white"} size={"var(--font-size-lg)"}>고객문의</P>
                                </FlexChild>
                                <FlexChild justifyContent={"flex-end"} padding={"0 20px 5px 0 "}>
                                    <div className={style.iconWrap}>
                                        <CustomIcon name={"shoppingBag"} color={"white"} />
                                    </div>
                                </FlexChild>
                            </HorizontalFlex>

                        </FlexChild>
                        <FlexChild padding={"8px 20px"} height={"44px"}>
                            <Center width={"100%"} textAlign={"left"}>
                                <P weight={"bold"} size={"var(--font-size-lg)"}>1 : 1 문의</P>
                            </Center>
                        </FlexChild>
                        <FlexChild>
                            <div className={style.line}></div>
                        </FlexChild>
                        <FlexChild height={50} padding={"10px 20px"}>
                            <HorizontalFlex>
                                <Center width={"100%"} textAlign={"left"}>
                                    <Inline>
                                        <P color={"var(--font-faint-color)"}>문의 유형을 선택해주세요.</P>
                                    </Inline>
                                </Center>
                                <P><FontAwesomeIcon icon={faAngleDown} /></P>
                            </HorizontalFlex>
                        </FlexChild>
                        <FlexChild>
                            <div className={style.horizontalLine}></div>
                        </FlexChild>
                        <FlexChild height={50} padding={"10px 20px"}>
                            <InputText placeHolder={"주제"} lineText size="sm" />
                        </FlexChild>
                        <FlexChild>
                            <div className={style.horizontalLine}></div>
                        </FlexChild>
                        <FlexChild height={"220px"}>
                            <div className={style.textareaWrap}>
                                <Center width={"100%"}>
                                    <P weight={"bold"} padding={"0 0 5px 5px"} textAlign={"left"}>솔직한 상품 리뷰를 남겨주세요</P>
                                </Center>
                                <InputTextarea placeholder={"문의 내용을 입력해주세요 (1000자 이내)"} rowsLg ref={textareaRef} onChange={onTextChange} value={""} />
                                {text
                                    ?
                                    <p className={style.textLength} size={"8pt"} color={"var(--main-color)"}>{text.length}/1000</p>
                                    :
                                    <p className={style.textLength} size={"8pt"} color={"var(--main-color)"}>0/1000</p>
                                }

                            </div>
                        </FlexChild>
                        <FlexChild>
                            <div className={style.horizontalLine}></div>
                        </FlexChild>
                        <FlexChild height={50} padding={"0 20px"}>
                            <HorizontalFlex>
                                <FlexChild width={"initial"}>
                                    <P weight={"bold"}>이메일로 회신받으시겠습니까?</P>
                                </FlexChild>
                                <FlexChild>
                                    <div className={style.circle}></div>
                                </FlexChild>
                                <FlexChild>
                                    <P>예</P>
                                </FlexChild>
                                <FlexChild>
                                    <div className={style.circle}></div>
                                </FlexChild>
                                <FlexChild width={"initial"}>
                                    <P>아니오</P>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                        <FlexChild>
                            <div className={style.horizontalLine}></div>
                        </FlexChild>
                        <FlexChild height={50} padding={"10px 20px"}>
                            <InputText placeHolder={"회신받을 이메일"} lineText size="sm" />
                        </FlexChild>
                        <FlexChild>
                            <div className={style.horizontalLine}></div>
                        </FlexChild>
                        <FlexChild height={50} padding={"10px 20px"}>
                            <HorizontalFlex>
                                <FlexChild>
                                    <P>첨부파일</P>
                                </FlexChild>
                                <FlexChild>
                                    <P>5</P>
                                </FlexChild>
                            </HorizontalFlex>

                        </FlexChild>
                        <FlexChild>
                            <div className={style.horizontalLine}></div>
                        </FlexChild>
                    </VerticalFlex>
                    :
                    <Container>
                        <Container maxWidth={1200}>
                            <VerticalFlex gap={20}>
                                <FlexChild>
                                    <VerticalFlex>
                                        <FlexChild>
                                            <Center width={"100%"} textAlign={"left"}>
                                                <Inline>
                                                    <P weight={"bold"} size={"16pt"}>{t("singleInquiry")}</P>
                                                    <P size={"7pt"}>{"("}</P>
                                                    <P size={"7pt"} color={"var(--main-color)"}>*</P>
                                                    <P size={"7pt"}> RequiredField {")"}</P>
                                                </Inline>

                                            </Center>
                                            <div className={style.titleLine}></div>
                                        </FlexChild>
                                        <FlexChild>
                                            <Layout required text={t("type")} width={"30%"}>
                                                <CFormSelect>
                                                    <option>{t("type")}</option>
                                                    <option value={"EXCHANGE"}>{t("exchange")}</option>
                                                    <option value={"refund"}>{t("refund")}</option>
                                                    <option value={"ETC"}>{t("etc")}</option>
                                                </CFormSelect>
                                            </Layout>
                                            <div className={style.line}></div>
                                        </FlexChild>
                                        <FlexChild>
                                            <Layout required text={t("title")} width={"70%"}>
                                                <InputText size={"sm"} placeHolder={t("title")} />
                                            </Layout>
                                            <div className={style.line}></div>
                                        </FlexChild>
                                        <FlexChild>
                                            <Layout height={"190px"} required text={t("content")} width={"70%"}>
                                                <InputTextarea rows={"7"} placeholder={t("content")} />
                                            </Layout>
                                            <div className={style.line}></div>
                                        </FlexChild>
                                        <FlexChild>
                                            <Layout text={t("response")} width={"70%"} height={"100%"}>
                                                <HorizontalFlex>
                                                    <FlexChild width={"50%"}>
                                                        <InputText value={disabled ? "" : userName} size={"sm"} placeHolder={userName} disabled={disabled} />
                                                    </FlexChild>
                                                    <FlexChild width={"initial"} padding={"0 0 0 10px"}>
                                                        <P size={"11pt"} color={"#999"}>이메일로 회신{"(선택)"}</P>
                                                    </FlexChild>
                                                    <FlexChild width={"initial"}>
                                                        <CFormCheck checked={value} ref={radioTrueRef} onChange={onRadioChecked} type="radio" name="flexRadioDefault" id="radioTrue" label="예"  />
                                                    </FlexChild>
                                                    <FlexChild width={"initial"}>
                                                        <CFormCheck checked={!value} onChange={onRadioChecked} type="radio" name="flexRadioDefault" id="radioFalse" label="아니오" />
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </Layout>
                                            <div className={style.line}></div>
                                        </FlexChild>
                                        
                                    </VerticalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <VerticalFlex>
                                        <FlexChild>
                                            <Center width={"100%"} textAlign={"left"}>
                                                <Inline>
                                                    <P weight={"bold"} size={"16pt"}>첨부 파일</P>
                                                    <P size={"9pt"}>10M / jpg, jpeg, png, gif, bmp, docx, pdf, txt, avi, mp4, mov</P>
                                                </Inline>
                                            </Center>
                                            <div className={style.titleLine}></div>
                                        </FlexChild>
                                        <FlexChild>
                                            <Layout required text={"첨부1"} width={"50%"}>

                                                <HorizontalFlex>
                                                    <FlexChild>
                                                        <CFormInput onChange={InputUploadChange} type="file" size="sm" id="file2" />
                                                    </FlexChild>
                                                </HorizontalFlex>

                                            </Layout>
                                            <div className={style.line}></div>
                                        </FlexChild>
                                        <FlexChild>
                                            <Layout required text={"첨부2"} width={"50%"}>


                                                <HorizontalFlex>
                                                    <FlexChild>
                                                        <CFormInput type="file" size="sm" id="file2" />
                                                    </FlexChild>
                                                </HorizontalFlex>

                                            </Layout>
                                            <div className={style.line}></div>
                                        </FlexChild>
                                        <FlexChild>
                                            <Layout required text={"첨부3"} width={"50%"}>

                                                <HorizontalFlex>
                                                    <FlexChild>
                                                        <CFormInput type="file" size="sm" id="file2" />
                                                    </FlexChild>
                                                </HorizontalFlex>

                                            </Layout>
                                            <div className={style.line}></div>
                                        </FlexChild>
                                    </VerticalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <Center>
                                        <P size={"14pt"} color={"white"} backgroundColor={"var(--main-color)"} padding={"10px 30px"}>제출하기</P>
                                    </Center>

                                </FlexChild>
                            </VerticalFlex>
                        </Container>
                    </Container>
            }
        </div>
    );

}

export default Inquiry;