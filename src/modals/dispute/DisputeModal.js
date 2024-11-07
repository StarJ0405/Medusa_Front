import ModalBase from "modals/base/ModalBase";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import NiceModal from "@ebay/nice-modal-react";
import style from "./DisputeModal.module.css"
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import P from "components/P";
import Center from "layouts/wrapper/Center";
import { requester } from "App";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { CButton, CFormSelect, CFormTextarea } from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import initialSearchCondition from "InitialData/InitialSearchCondition.json";
import { addCommas, clone } from "shared/utils/Utils";

const DisputeModal = NiceModal.create(
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
        const [product, setProduct] = useState();
        const { t } = useTranslation();

        const onNextDisputeModalClick = () => {
            modal.current.close();
            NiceModal.show("nextDispute", { id: id });
        }

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
                    <div className={style.wrap}>
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
                                    <FlexChild >
                                        <HorizontalFlex>
                                            <FlexChild width={"max-content"}>
                                                <img src={product.image} width={"120px"} />
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
                                            <FlexChild>
                                                <VerticalFlex>
                                                    <HorizontalFlex justifyContent={"flex-start"}>
                                                        <FlexChild padding={"0 0 0 40px"} height={"65px"} width={"25%"} backgroundColor={"#eee"}>
                                                            <P>{t("반품사유")}</P>
                                                        </FlexChild>
                                                        <FlexChild width={"140px"} justifyContent={"flex-start"} padding={"10px"}>

                                                            <CFormSelect
                                                                size="sm"
                                                                options={[
                                                                    '사유',
                                                                    { label: '단순변심', value: '1' },
                                                                    { label: '불량', value: '2' },
                                                                    { label: '상태이상', value: '3' },
                                                                    { label: '기타', value: '4' }
                                                                ]}
                                                            />

                                                        </FlexChild>
                                                    </HorizontalFlex>
                                                </VerticalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <VerticalFlex>
                                                    <HorizontalFlex alignItems={"flex-start"}>
                                                        <FlexChild padding={"0 0 0 40px"} height={"100px"} backgroundColor={"#eee"} width={"25%"} alignItems={"flex-start"}>
                                                            <P>{t("사유작성")}</P>
                                                        </FlexChild>
                                                        <FlexChild padding={"10px 10px 0 10px"}>
                                                            <CFormTextarea rows={"3"} placeholder={"상세 반품 사유를 입력해주세요."} />
                                                        </FlexChild>
                                                    </HorizontalFlex>
                                                </VerticalFlex>
                                            </FlexChild>
                                        </div>
                                    </FlexChild>
                                    <FlexChild>
                                        <div className={style.borderBottom}>
                                            <Center width={"100%"} textAlign={"left"}>
                                                <P size={"18pt"} weight={"bold"}>환불예정금액</P>
                                            </Center>
                                        </div>
                                    </FlexChild>
                                    <FlexChild padding={"15px"}>
                                        <HorizontalFlex>
                                            <FlexChild width={"173px"}>
                                                <Center>
                                                    <P weight={"bold"} color={"#999"}>금액 합계</P>
                                                    <P size={"18pt"} weight={"bold"} color={"var(--main-color)"}>{addCommas(product.price)}&#8361;</P>
                                                </Center>
                                            </FlexChild>
                                            <FlexChild width={"max-content"} padding={"0 30px 0 0"}>
                                                <Center>
                                                    <div className={style.heightBorder}></div>
                                                </Center>
                                            </FlexChild>
                                            <FlexChild>
                                                <VerticalFlex>
                                                    <FlexChild>
                                                        <HorizontalFlex>
                                                            <P color={"#999"}>상품합계</P>
                                                            <P weight={"bold"}>{addCommas(product.price)} &#8361;</P>
                                                        </HorizontalFlex>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <HorizontalFlex>
                                                            <P color={"#999"}>배송비</P>
                                                            <P weight={"bold"}>0 &#8361;</P>
                                                        </HorizontalFlex>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <HorizontalFlex>
                                                            <P color={"#999"}>주문할인</P>
                                                            <P weight={"bold"}>0 &#8361;</P>
                                                        </HorizontalFlex>
                                                    </FlexChild>
                                                </VerticalFlex>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild padding={"15px"}>
                                        <HorizontalFlex>
                                            <FlexChild width={"173px"}>
                                                <Center>
                                                    <P weight={"bold"} color={"#999"}>차감내역</P>
                                                    <P size={"18pt"} weight={"bold"} color={"var(--main-color)"}>30&#8361;</P>
                                                </Center>
                                            </FlexChild>
                                            <FlexChild width={"max-content"} padding={"0 30px 0 0"}>
                                                <Center>
                                                    <div className={style.heightBorder}></div>
                                                </Center>
                                            </FlexChild>
                                            <FlexChild>
                                                <VerticalFlex>
                                                    <FlexChild>
                                                        <HorizontalFlex>
                                                            <P color={"#999"}>배송비</P>
                                                            <P weight={"bold"}>0 &#8361;</P>
                                                        </HorizontalFlex>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <HorizontalFlex>
                                                            <P color={"#999"}>할인변동</P>
                                                            <P weight={"bold"}>0 &#8361;</P>
                                                        </HorizontalFlex>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <HorizontalFlex>
                                                            <P size={"11pt"} color={"#999"}>취소/반품비용</P>
                                                            <P weight={"bold"}>30 &#8361;</P>
                                                        </HorizontalFlex>
                                                    </FlexChild>
                                                </VerticalFlex>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild padding={"15px"} backgroundColor={"#eee"}>
                                        <HorizontalFlex>
                                            <FlexChild width={"173px"}>
                                                <Center>
                                                    <P color={"var(--main-color)"}>환불 예정금액</P>
                                                    <P size={"18pt"} weight={"bold"} color={"var(--main-color)"}>{addCommas(product.price - 30)}&#8361;</P>
                                                </Center>
                                            </FlexChild>
                                            <FlexChild width={"max-content"} padding={"0 30px 0 0"}>
                                                <Center>
                                                    <div className={style.heightBorder}></div>
                                                </Center>
                                            </FlexChild>
                                            <FlexChild>
                                                <VerticalFlex>
                                                    <FlexChild>
                                                        <HorizontalFlex>
                                                            <P color={"#999"}>계좌 환불</P>
                                                            <P weight={"bold"}>100 &#8361;</P>
                                                        </HorizontalFlex>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <HorizontalFlex>
                                                            <P color={"#999"}>포인트 환불</P>
                                                            <P weight={"bold"}>70 &#8361;</P>
                                                        </HorizontalFlex>
                                                    </FlexChild>
                                                </VerticalFlex>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild>
                                        <div className={style.button}>
                                            <ButtonEclipse onClick={onNextDisputeModalClick} fontSize={"16pt"} lineHeight={"42px"} text={"다음단계"} height={44} backgroundColor={"white"} color={"red"} border={"1px solid red"} />
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
                                    <FlexChild >
                                        <HorizontalFlex>
                                            <FlexChild width={"max-content"}>
                                                <img src={product.image} width={"120px"} />
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
                                            <FlexChild>
                                                <VerticalFlex>
                                                    <HorizontalFlex justifyContent={"flex-start"}>
                                                        <FlexChild padding={"0 0 0 40px"} height={"65px"} width={"25%"} backgroundColor={"#eee"}>
                                                            <P>{t("반품사유")}</P>
                                                        </FlexChild>
                                                        <FlexChild width={"140px"} justifyContent={"flex-start"} padding={"10px"}>

                                                            <CFormSelect
                                                                size="sm"
                                                                options={[
                                                                    '사유',
                                                                    { label: '단순변심', value: '1' },
                                                                    { label: '불량', value: '2' },
                                                                    { label: '상태이상', value: '3' },
                                                                    { label: '기타', value: '4' }
                                                                ]}
                                                            />

                                                        </FlexChild>
                                                    </HorizontalFlex>
                                                </VerticalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <VerticalFlex>
                                                    <HorizontalFlex alignItems={"flex-start"}>
                                                        <FlexChild padding={"0 0 0 40px"} height={"100px"} backgroundColor={"#eee"} width={"25%"} alignItems={"flex-start"}>
                                                            <P>{t("사유작성")}</P>
                                                        </FlexChild>
                                                        <FlexChild padding={"10px 10px 0 10px"}>
                                                            <CFormTextarea rows={"3"} placeholder={"상세 반품 사유를 입력해주세요."} />
                                                        </FlexChild>
                                                    </HorizontalFlex>
                                                </VerticalFlex>
                                            </FlexChild>
                                        </div>
                                    </FlexChild>
                                    <FlexChild>
                                        <div className={style.borderBottom}>
                                            <Center width={"100%"} textAlign={"left"}>
                                                <P size={"18pt"} weight={"bold"}>환불예정금액</P>
                                            </Center>
                                        </div>
                                    </FlexChild>
                                    <FlexChild backgroundColor={"#eee"} padding={"15px"}>
                                        <HorizontalFlex>
                                            <FlexChild width={"180px"}>
                                                <Center>
                                                    <P weight={"bold"} color={"#999"}>금액 합계</P>
                                                    <P size={"18pt"} weight={"bold"} color={"var(--main-color)"}>{addCommas(product.price)}&#8361;</P>
                                                </Center>
                                            </FlexChild>
                                            <FlexChild width={"max-content"} padding={"0 30px 0 15px"}>
                                                <Center>
                                                    <div className={style.heightBorder}></div>
                                                </Center>
                                            </FlexChild>
                                            <FlexChild>
                                                <Center>
                                                    <P weight={"bold"} color={"#999"}>차감내역</P>
                                                    <P size={"18pt"} weight={"bold"} color={"var(--main-color)"}>30&#8361;</P>
                                                </Center>
                                            </FlexChild>
                                            <FlexChild width={"max-content"} padding={"0 30px 0 45px"}>
                                                <Center>
                                                    <div className={style.heightBorder}></div>
                                                </Center>
                                            </FlexChild>
                                            <FlexChild>
                                                <Center>
                                                    <P color={"var(--main-color)"}>환불 예정금액</P>
                                                    <P size={"18pt"} weight={"bold"} color={"var(--main-color)"}>{addCommas(product.price - 30)}&#8361;</P>
                                                </Center>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild>
                                        <HorizontalFlex>
                                            <FlexChild width={"180px"} padding={"15px"}>
                                                <VerticalFlex>
                                                    <FlexChild>
                                                        <HorizontalFlex>
                                                            <P color={"#999"}>상품합계</P>
                                                            <P weight={"bold"}>{addCommas(product.price)} &#8361;</P>
                                                        </HorizontalFlex>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <HorizontalFlex>
                                                            <P color={"#999"}>배송비</P>
                                                            <P weight={"bold"}>0 &#8361;</P>
                                                        </HorizontalFlex>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <HorizontalFlex>
                                                            <P color={"#999"}>주문할인</P>
                                                            <P weight={"bold"}>0 &#8361;</P>
                                                        </HorizontalFlex>
                                                    </FlexChild>
                                                </VerticalFlex>
                                            </FlexChild>
                                            <FlexChild width={"max-content"} padding={"0 30px"}>
                                                <Center>
                                                    <div className={style.heightBorder}></div>
                                                </Center>
                                            </FlexChild>
                                            <FlexChild>
                                                <VerticalFlex>
                                                    <FlexChild>
                                                        <HorizontalFlex>
                                                            <P color={"#999"}>배송비</P>
                                                            <P weight={"bold"}>0 &#8361;</P>
                                                        </HorizontalFlex>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <HorizontalFlex>
                                                            <P color={"#999"}>할인변동</P>
                                                            <P weight={"bold"}>0 &#8361;</P>
                                                        </HorizontalFlex>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <HorizontalFlex>
                                                            <P color={"#999"}>취소/반품비용</P>
                                                            <P weight={"bold"}>30 &#8361;</P>
                                                        </HorizontalFlex>
                                                    </FlexChild>
                                                </VerticalFlex>
                                            </FlexChild>
                                            <FlexChild width={"max-content"} padding={"0 30px"}>
                                                <Center>
                                                    <div className={style.heightBorder}></div>
                                                </Center>
                                            </FlexChild>
                                            <FlexChild>
                                                <VerticalFlex>
                                                    <FlexChild>
                                                        <HorizontalFlex>
                                                            <P color={"#999"}>계좌 환불</P>
                                                            <P weight={"bold"}>100 &#8361;</P>
                                                        </HorizontalFlex>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <HorizontalFlex>
                                                            <P color={"#999"}>포인트 환불</P>
                                                            <P weight={"bold"}>70 &#8361;</P>
                                                        </HorizontalFlex>
                                                    </FlexChild>
                                                </VerticalFlex>
                                            </FlexChild>

                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild>
                                        <div className={style.button}>
                                            <ButtonEclipse onClick={onNextDisputeModalClick} fontSize={"16pt"} lineHeight={"42px"} text={"다음단계"} height={44} backgroundColor={"white"} color={"red"} border={"1px solid red"} />
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


export default DisputeModal;