import ModalBase from "modals/base/ModalBase";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import NiceModal from "@ebay/nice-modal-react";
import style from "./NextDisputeModal.module.css"
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import P from "components/P";
import Center from "layouts/wrapper/Center";
import { useNavigate } from "react-router-dom";
import { requester } from "App";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import Flex from "layouts/flex/Flex";
import { Radar } from "react-chartjs-2";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { CButton, CFormSelect, CFormTextarea } from "@coreui/react";
import Inline from "layouts/container/Inline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import { useSelector } from "react-redux";
import CheckCircle from "components/inputs/checkBox/CheckCircle";
import InputText from "components/inputs/InputText";
import initialSearchCondition from "InitialData/InitialSearchCondition.json";
import { addCommas, clone } from "shared/utils/Utils";

const NextDisputeModal = NiceModal.create(
    (props, ref) => {
        const { isMobile } = useContext(BrowserDetectContext);
        const modal = useRef();
        const [withHeader, withFooter] = [false,
            false];
        const [width, height] = [isMobile ? "100%" : "730px", "65vh"];
        const withCloseButton = true;
        const clickOutsideToClose = true;
        const title = "문의 사항";
        const { id } = props;
        const buttonText = "close";

        const onDisputeCompleteClick = () => {
            modal.current.close();
        }

        const [product, setProduct] = useState();

        const { t } = useTranslation();

        useEffect(() => {
            if (id) {
                let searchCondition = clone(initialSearchCondition);
                searchCondition.productId = id;
                requester.searchProducts(searchCondition, (result) => {
                    setProduct(result.data[0]);
                });
            }
        }, [])

        return (
            <ModalBase ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText}>
                {product &&
                    <div className={style.wrap} style={{ padding: isMobile ? "10px" : "" }}>
                        {
                            isMobile
                                ?
                                <VerticalFlex>
                                    <FlexChild>
                                        <div className={style.progressIndicator}>
                                            <div className={style.circleLeft}>01</div>
                                            <p style={{ fontSize: isMobile ? "10pt" : "" }} className={style.textLeft}>반품신청</p>
                                            <div className={style.line}></div>
                                            <div className={style.circleRight}>02</div>
                                            <p style={{ fontSize: isMobile ? "10pt" : "" }} className={style.textRight}>수거정보입력</p>
                                        </div>
                                    </FlexChild>
                                    <FlexChild padding={"10px 0 0 0"}>
                                        <div className={style.header}>
                                            <P textAlign={"left"} size={"18pt"} weight={"bold"}>반품신청</P>
                                        </div>
                                    </FlexChild>
                                    <FlexChild padding={"15px"}>
                                        <HorizontalFlex>
                                            <FlexChild width={"max-content"}>
                                                <img src={product.image} width={"100px"} />
                                            </FlexChild>
                                            <FlexChild padding={"0 0 0 10px"}>
                                                <Center width={"100%"} textAlign={"left"}>
                                                    <P size={"10pt"} color={"#999"}>{product.brandTitleKr}</P>
                                                    <P padding={"0 0 20px 0"}>{product.titleKr}</P>
                                                    <P weight={"bold"} color={"var(--main-color)"}>{addCommas(product.price)}&#8361;</P>
                                                </Center>
                                            </FlexChild>
                                            <FlexChild justifyContent={"flex-end"}>
                                                <FontAwesomeIcon icon={faAngleRight} />
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild >
                                        <div className={style.border}>
                                            <HorizontalFlex>
                                                <FlexChild width={"max-content"} padding={"0 10px 0 0"}>
                                                    <P padding={"15px"} backgroundColor={"#eee"} weight={"bold"}>상품발송여부</P>
                                                </FlexChild>
                                                <FlexChild>
                                                    <HorizontalFlex>
                                                        <FlexChild width={"initial"}>
                                                            <CheckCircle />
                                                        </FlexChild>
                                                        <FlexChild width={"initial"}>
                                                            <Center width={"100%"}>
                                                                <P padding={"0 10px 0 0 "} weight={"bold"}>발송</P>
                                                            </Center>
                                                        </FlexChild>
                                                        <FlexChild width={"initial"}>
                                                            <CheckCircle />
                                                        </FlexChild>
                                                        <FlexChild>
                                                            <Inline>
                                                                <P weight={"bold"}>미발송</P>
                                                                <P color={"#999"} size={"10pt"}>{"("}상품을 가지고 있는 경우{")"}</P>
                                                            </Inline>
                                                        </FlexChild>
                                                    </HorizontalFlex>
                                                </FlexChild>
                                            </HorizontalFlex>
                                        </div>
                                    </FlexChild>
                                    <FlexChild>
                                        <div className={style.borderBottom}>
                                            <Center width={"100%"} textAlign={"left"}>
                                                <P size={"18pt"} weight={"bold"}>반품상품 수거정보</P>
                                            </Center>
                                        </div>
                                    </FlexChild>
                                    <FlexChild>
                                        <HorizontalFlex justifyContent={"flex-start"}>
                                            <FlexChild width={"20%"} padding={"15px"} backgroundColor={"#ddd"}>
                                                <P weight={"bold"}>택배사</P>
                                            </FlexChild>

                                            <FlexChild width={"200px"} padding={"15px 15px 0 15px"}>
                                                <CFormSelect size={"sm"} aria-label="Default select example">

                                                    <option value="1">로젠택배</option>
                                                </CFormSelect>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild>
                                        <HorizontalFlex justifyContent={"flex-start"}>
                                            <FlexChild width={"20%"} padding={"15px"} backgroundColor={"#ddd"}>
                                                <P weight={"bold"}>신청자명</P>
                                            </FlexChild>

                                            <FlexChild width={"200px"} padding={"15px 15px 0 15px"}>
                                                <InputText />
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild>
                                        <HorizontalFlex justifyContent={"flex-start"}>
                                            <FlexChild width={"20%"} padding={"15px"} backgroundColor={"#ddd"}>
                                                <P weight={"bold"}>연락처</P>
                                            </FlexChild>

                                            <FlexChild width={"280px"} padding={"15px 15px 0 15px"}>
                                                <HorizontalFlex gap={5}>
                                                    <CFormSelect aria-label="Default select example">

                                                        <option value="1">010</option>
                                                        <option value="1">011</option>
                                                        <option value="1">018</option>
                                                        <option value="1">019</option>
                                                    </CFormSelect>
                                                    <InputText />
                                                    <InputText />
                                                </HorizontalFlex>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild>
                                        <HorizontalFlex justifyContent={"flex-start"}>
                                            <FlexChild width={"20%"} padding={"15px"} backgroundColor={"#ddd"}>
                                                <P weight={"bold"}>주소</P>
                                            </FlexChild>

                                            <FlexChild width={"350px"} padding={"15px 15px 0 15px"}>
                                                <HorizontalFlex gap={10}>
                                                    <FlexChild>
                                                        <InputText />
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <p className={style.zipButton}>우편번호</p>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild>
                                        <VerticalFlex>
                                            <FlexChild >
                                                <HorizontalFlex justifyContent={"flex-start"}>
                                                    <FlexChild width={"20%"} height={"50px"} padding={"15px 15px 0 15px"} backgroundColor={"#ddd"}>

                                                    </FlexChild>
                                                    <FlexChild padding={"5px 15px"} height={"max-content"}>
                                                        <InputText />
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex justifyContent={"flex-start"}>
                                                    <FlexChild width={"20%"} height={"50px"} padding={"15px 15px 0 15px"} backgroundColor={"#ddd"}>
                                                    </FlexChild>
                                                    <FlexChild padding={"5px 15px"} height={"max-content"}>
                                                        <InputText />
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex justifyContent={"flex-start"}>
                                                    <FlexChild width={"20%"} height={"50px"} padding={"15px 15px 0 15px"} backgroundColor={"#ddd"}>
                                                    </FlexChild>
                                                    <FlexChild padding={"5px 15px"}>
                                                        <InputText placeHolder={"상세주소 입력"} />
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                        </VerticalFlex>

                                    </FlexChild>

                                    <FlexChild>
                                        <div className={style.button}>
                                            <ButtonEclipse onClick={onDisputeCompleteClick} fontSize={"18pt"} lineHeight={"42px"} text={"반품신청완료"} height={44} backgroundColor={"white"} color={"red"} border={"1px solid red"} />
                                        </div>
                                    </FlexChild>
                                </VerticalFlex>
                                :
                                <VerticalFlex>
                                    <FlexChild>
                                        <div className={style.progressIndicator}>
                                            <div className={style.circleLeft}>01</div>
                                            <p style={{ fontSize: isMobile ? "11pt" : "" }} className={style.textLeft}>반품신청</p>
                                            <div className={style.line}></div>
                                            <div className={style.circleRight}>02</div>
                                            <p style={{ fontSize: isMobile ? "11pt" : "" }} className={style.textRight}>수거정보입력</p>
                                        </div>
                                    </FlexChild>
                                    <FlexChild padding={"10px 0 0 0"}>
                                        <div className={style.header}>
                                            <P textAlign={"left"} size={"18pt"} weight={"bold"}>반품신청</P>
                                        </div>
                                    </FlexChild>
                                    <FlexChild padding={"15px"}>
                                        <HorizontalFlex>
                                            <FlexChild width={"max-content"}>
                                                <img src={product.image} width={"100px"} />
                                            </FlexChild>
                                            <FlexChild padding={"0 0 0 10px"}>
                                                <Center width={"100%"} textAlign={"left"}>
                                                    <P size={"10pt"} color={"#999"}>{product.brandTitleKr}</P>
                                                    <P padding={"0 0 20px 0"}>{product.titleKr}</P>
                                                    <P weight={"bold"} color={"var(--main-color)"}>{addCommas(product.price)}&#8361;</P>
                                                </Center>
                                            </FlexChild>
                                            <FlexChild justifyContent={"flex-end"}>
                                                <FontAwesomeIcon icon={faAngleRight} />
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild >
                                        <div className={style.border}>
                                            <HorizontalFlex>
                                                <FlexChild width={"max-content"} padding={"0 30px 0 0"}>
                                                    <P padding={"15px"} backgroundColor={"#eee"} weight={"bold"}>상품발송여부</P>
                                                </FlexChild>
                                                <FlexChild>
                                                    <CheckCircle />

                                                    <P padding={"0 60px 0 0 "} weight={"bold"}>발송</P>


                                                    <CheckCircle />
                                                    <Inline>
                                                        <P weight={"bold"}>미발송</P>
                                                        <P color={"#999"} size={"10pt"}>{"("}상품을 가지고 있는 경우{")"}</P>
                                                    </Inline>

                                                </FlexChild>
                                            </HorizontalFlex>
                                        </div>
                                    </FlexChild>
                                    <FlexChild>
                                        <div className={style.borderBottom}>
                                            <Center width={"100%"} textAlign={"left"}>
                                                <P size={"18pt"} weight={"bold"}>반품상품 수거정보</P>
                                            </Center>
                                        </div>
                                    </FlexChild>
                                    <FlexChild>
                                        <HorizontalFlex justifyContent={"flex-start"}>
                                            <FlexChild width={"20%"} padding={"15px"} backgroundColor={"#ddd"}>
                                                <P weight={"bold"}>택배사</P>
                                            </FlexChild>

                                            <FlexChild width={"200px"} padding={"15px 15px 0 15px"}>
                                                <CFormSelect size={"sm"} aria-label="Default select example">

                                                    <option value="1">로젠택배</option>
                                                </CFormSelect>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild>
                                        <HorizontalFlex justifyContent={"flex-start"}>
                                            <FlexChild width={"20%"} padding={"15px"} backgroundColor={"#ddd"}>
                                                <P weight={"bold"}>신청자명</P>
                                            </FlexChild>

                                            <FlexChild width={"200px"} padding={"15px 15px 0 15px"}>
                                                <InputText />
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild>
                                        <HorizontalFlex justifyContent={"flex-start"}>
                                            <FlexChild width={"20%"} padding={"15px"} backgroundColor={"#ddd"}>
                                                <P weight={"bold"}>연락처</P>
                                            </FlexChild>

                                            <FlexChild width={"400px"} padding={"15px 15px 0 15px"}>
                                                <HorizontalFlex gap={5}>
                                                    <CFormSelect aria-label="Default select example">

                                                        <option value="1">010</option>
                                                        <option value="1">011</option>
                                                        <option value="1">018</option>
                                                        <option value="1">019</option>
                                                    </CFormSelect>
                                                    <InputText />
                                                    <InputText />
                                                </HorizontalFlex>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild>
                                        <HorizontalFlex justifyContent={"flex-start"}>
                                            <FlexChild width={"20%"} padding={"15px"} backgroundColor={"#ddd"}>
                                                <P weight={"bold"}>주소</P>
                                            </FlexChild>

                                            <FlexChild width={"350px"} padding={"15px 15px 0 15px"}>
                                                <HorizontalFlex gap={10}>
                                                    <FlexChild>
                                                        <InputText />
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <p className={style.zipButton}>우편번호</p>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild>
                                        <VerticalFlex>
                                            <FlexChild >
                                                <HorizontalFlex justifyContent={"flex-start"}>
                                                    <FlexChild width={"20%"} height={"50px"} padding={"15px 15px 0 15px"} backgroundColor={"#ddd"}>

                                                    </FlexChild>
                                                    <FlexChild padding={"5px 15px"} height={"max-content"}>
                                                        <InputText />
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex justifyContent={"flex-start"}>
                                                    <FlexChild width={"20%"} height={"50px"} padding={"15px 15px 0 15px"} backgroundColor={"#ddd"}>
                                                    </FlexChild>
                                                    <FlexChild padding={"5px 15px"} height={"max-content"}>
                                                        <InputText />
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex justifyContent={"flex-start"}>
                                                    <FlexChild width={"20%"} height={"50px"} padding={"15px 15px 0 15px"} backgroundColor={"#ddd"}>
                                                    </FlexChild>
                                                    <FlexChild padding={"5px 15px"}>
                                                        <InputText placeHolder={"상세주소 입력"} />
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                        </VerticalFlex>

                                    </FlexChild>

                                    <FlexChild>
                                        <div className={style.button}>
                                            <ButtonEclipse onClick={onDisputeCompleteClick} fontSize={"18pt"} lineHeight={"42px"} text={"반품신청완료"} height={44} backgroundColor={"white"} color={"red"} border={"1px solid red"} />
                                        </div>
                                    </FlexChild>
                                </VerticalFlex>
                        }
                    </div>
                }

            </ModalBase>
        );
    }
);


export default NextDisputeModal;