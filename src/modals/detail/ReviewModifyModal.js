import ModalBase from "modals/base/ModalBase";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import NiceModal from "@ebay/nice-modal-react";
import style from "./ReviewModal.module.css"
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

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { CButton, CFormTextarea } from "@coreui/react";
import Inline from "layouts/container/Inline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import InputText from "components/inputs/InputText";
import InputTextarea from "components/inputs/InputTextarea";
import StarRate from "components/star/StarRate";
import Dummy from "components/Dummy";
import initialSearchCondition from "InitialData/InitialSearchCondition.json";
import { clone } from "shared/utils/Utils";

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    // Legend
);

const ReviewModifyModal = NiceModal.create(
    (props, ref) => {
        const { isMobile } = useContext(BrowserDetectContext);
        const modal = useRef();
        const { t } = useTranslation();
        const [withHeader, withFooter] = [false,
            false];
        const [width, height] = [isMobile ? "100%" : "730px", isMobile ? "75vh" : "85%"];
        const withCloseButton = true;
        const clickOutsideToClose = true;
        const title = "문의 사항";
        const { id, content } = props;
        const buttonText = "close";
        const [product, setProduct] = useState();
        const [reviews, setReviews] = useState();
        const [text, setText] = useState();
        const reviewRef = useRef();

        const onReviewClick = () => {
            let reviewContent = reviewRef.current.getValue();

            let reviewData = { productId: id, content: reviewContent, score: 5 }
            requester.createReview(reviewData, (result) => {
                setReviews(result.data);
                
            })
        }

        const onTextChange = (e) => {
            
            setText(e);
        }

        const reviewData = {
            labels: [t("cooling"), t("blow"), t("sweet"), t("fresh"), t("weight")],
            datasets: [
                {
                    data: [5, 4, 3, 2, 3],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            responsive: true,
            maintainAspectRatio: true,
            elements: {
                point: {
                    radius: 3
                },
            },
            scale: {
                ticks: {
                    display: false,
                    min: 0,
                    max: 5,
                    beginAtZero: true,
                    stepSize: 1
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 5,
                    pointLabels: {
                        font: {
                            size: 12
                        }
                    },
                    ticks: {
                        display: false,
                        color: 'transparent'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        color: 'rgb(255, 99, 132)'
                    }
                }
            }
        };

        useEffect(() => {
            if (id) {
                let searchCondition = clone(initialSearchCondition);
                searchCondition.productId = id;
                requester.searchProducts(searchCondition, (result) => {
                    setProduct(result.data[0]);
                });

                let reviewProductId = { productId: id }
                requester.getAllReviews(reviewProductId, (result) => {
                    setReviews(result.data);
                })
            }
        }, [id])

        const btnStyle = {
            backgroundColor: "var(--main-color)",
            borderRadius: "0",
            border: "1px solid var(--main-color)",
            padding: "0",
            height: "30px",
            width: "130px",
            fontSize: "var(--font-size-lg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
        }
        
        return (
            <ModalBase borderRadius={"25px"} ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText}>
                {
                    isMobile
                        ?
                        product &&
                        <div className={style.wrap} style={{ padding: isMobile ? "" : "15px 40px", height: isMobile ? "75vh" : "100%", overflowY: isMobile ? "scroll" : "hidden" }}>
                            <VerticalFlex>
                                <FlexChild padding={"8px 20px"} height={40}>
                                    <Center width={"100%"} textAlign={"left"}>
                                        <P textAlign={"left"} size={"var(--font-size-lg)"} weight={"bold"}>리뷰 작성</P>
                                    </Center>
                                </FlexChild>
                                <FlexChild>
                                    <div className={style.header}></div>
                                </FlexChild>
                                <FlexChild height={120} padding={"8px 0"}>

                                    <HorizontalFlex gap={15} flexStart padding={"0 0 10px 20px"}>
                                        <FlexChild width={"initial"}>
                                            <img width={"100px"} src={product.image} />
                                        </FlexChild>
                                        <FlexChild justifyContent={"flex-start"}>
                                            <VerticalFlex gap={20}>
                                                <FlexChild>
                                                    <Center width={"100%"} textAlign={"left"}>
                                                        <P size={"var(--font-size-sm)"} weight={"bold"}>월드인터네셔널</P>
                                                    </Center>
                                                </FlexChild>
                                                <FlexChild>
                                                    <Center width={"100%"} textAlign={"left"}>
                                                        <P weight={"bold"}>{product.brandTitleKr} 시리즈</P>
                                                        <P weight={"bold"}>{product.titleKr} {"(30ml)"}</P>
                                                    </Center>
                                                </FlexChild>
                                            </VerticalFlex>

                                        </FlexChild>
                                    </HorizontalFlex>
                                    <div className={style.borderBottom}></div>
                                </FlexChild>
                                <FlexChild>
                                    <div className={style.borderBottom}>
                                        <HorizontalFlex padding={"13px 20px"}>
                                            <FlexChild width={"max-content"}>
                                                <P>상품은 어떠셨나요 ? </P>
                                            </FlexChild>
                                            <FlexChild padding={"0 0 0 30px"}>
                                                <StarRate score={5} />
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </div>
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalFlex>
                                        <FlexChild>
                                            <Flex direction={isMobile ? "vertical" : "horizontal"} justifyContent={"center"}>
                                                <FlexChild width={300}>
                                                    <PaddingWrapper padding={20}>
                                                        <Radar width={100} height={100} data={reviewData} options={options} />
                                                    </PaddingWrapper>
                                                </FlexChild>
                                            </Flex>
                                        </FlexChild>
                                    </HorizontalFlex>
                                    <div className={style.borderBottom}></div>
                                </FlexChild>
                                <FlexChild padding={"15px 15px 15px 0"}>
                                    <HorizontalFlex>
                                        <FlexChild padding={"0 15px 0 0"} >
                                            <Center width={"100%"} textAlign={"center"}>
                                                <P padding={"5px"} weight={"bold"} >쿨링감</P>
                                                <P padding={"5px"} weight={"bold"} >무게감</P>
                                                <P padding={"5px"} weight={"bold"} >타격감</P>
                                                <P padding={"5px"} weight={"bold"} >상큼감</P>
                                                <P padding={"5px"} weight={"bold"} >달콤감</P>
                                            </Center>
                                        </FlexChild>
                                        <FlexChild>
                                            <VerticalFlex gap={8}>
                                                <StarRate />
                                                <StarRate />
                                                <StarRate />
                                                <StarRate />
                                                <StarRate />
                                            </VerticalFlex>
                                        </FlexChild>
                                    </HorizontalFlex>
                                    <div className={style.borderBottom}></div>
                                </FlexChild>
                                <FlexChild>
                                    <div className={style.textareaWrap}>
                                        <Center width={"100%"} padding={"0 0 30px 0"}>
                                            <P weight={"bold"} padding={"0 0 5px 5px"} textAlign={"left"}>솔직한 상품 리뷰를 남겨주세요</P>
                                        </Center>
                                        <InputTextarea ref={reviewRef} onChange={onTextChange} value={content ? content : ""} placeHolder={"솔직한 상품 리뷰를 남겨주세요"} />
                                        {text
                                            ?
                                            <p className={style.textLength} size={"8pt"} color={"var(--main-color)"}>{text.length}/1000</p>
                                            :
                                            <p className={style.textLength} size={"8pt"} color={"var(--main-color)"}>0/1000</p>
                                        }

                                    </div>
                                    <div className={style.borderBottom}></div>
                                </FlexChild>
                                <FlexChild padding={"15px 20px 0 20px"}>
                                    <Center width={"100%"} textAlign={"left"}>
                                        <Inline>
                                            <P weight={"bold"} >포토 </P>
                                            <P size={"var(--font-size-sm)"} color={"var(--font-faint-color)"}>사진은 10MB이하의 PNG, GIF, JPG 파일만 등록 가능합니다.</P>
                                        </Inline>
                                    </Center>
                                </FlexChild>
                                <FlexChild padding={"15px 20px"}>
                                    <HorizontalFlex>
                                        <FlexChild>
                                            <div className={style.photoBox}>
                                                <FontAwesomeIcon color={"var(--font-color-disabled)"} size={"xl"} icon={faPlus} />
                                            </div>
                                        </FlexChild>
                                        <FlexChild>
                                            <div className={style.photoBox}>
                                                <FontAwesomeIcon color={"var(--font-color-disabled)"} size={"xl"} icon={faPlus} />
                                            </div>
                                        </FlexChild>
                                        <FlexChild>
                                            <div className={style.photoBox}>
                                                <FontAwesomeIcon color={"var(--font-color-disabled)"} size={"xl"} icon={faPlus} />
                                            </div>
                                        </FlexChild>
                                        <FlexChild>
                                            <div className={style.photoBox}>
                                                <FontAwesomeIcon color={"var(--font-color-disabled)"} size={"xl"} icon={faPlus} />
                                            </div>
                                        </FlexChild>
                                        <FlexChild>
                                            <div className={style.photoBox}>
                                                <FontAwesomeIcon color={"var(--font-color-disabled)"} size={"xl"} icon={faPlus} />
                                            </div>
                                        </FlexChild>

                                    </HorizontalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <div className={style.borderBottom}></div>
                                </FlexChild>
                                <FlexChild padding={"40px 0 0 0"}>
                                    <CButton style={btnStyle} onClick={onReviewClick}>리뷰 등록 하기</CButton>
                                </FlexChild>
                                <FlexChild>
                                    <Dummy height={"100px"} />
                                </FlexChild>
                            </VerticalFlex>
                        </div>
                        :
                        product
                        &&
                        <div className={style.wrap} style={{ padding: isMobile ? "" : "15px 40px", height: isMobile ? "65vh" : "100%", overflowY: isMobile ? "scroll" : "hidden" }}>
                            <VerticalFlex>
                                <FlexChild>
                                    <div className={style.header}>
                                        <P textAlign={"left"} size={"18pt"} weight={"bold"}>리뷰 작성</P>
                                    </div>
                                </FlexChild>
                                <FlexChild >
                                    <div className={style.borderBottom}>
                                        <HorizontalFlex>
                                            <FlexChild width={"25%"}>
                                                <img width={"80%"} src={product.image} />
                                            </FlexChild>
                                            <FlexChild justifyContent={"flex-start"}>
                                                <Center width={"100%"} textAlign={"left"}>
                                                    <P size={"8pt"} weight={"bold"}>월드인터네셔널</P>
                                                    <P weight={"bold"} size={"13pt"}>{product.brandTitleKr}</P>
                                                    <P weight={"bold"} size={"13pt"}>{product.titleKr}</P>
                                                </Center>

                                            </FlexChild>
                                        </HorizontalFlex>
                                    </div>
                                </FlexChild>
                                <FlexChild>
                                    <div className={style.borderBottom}>
                                        <HorizontalFlex padding={"15px"}>
                                            <FlexChild width={"max-content"}>
                                                <P>상품은 어떠셨나요 ? </P>
                                            </FlexChild>
                                            <FlexChild padding={"0 0 0 30px"}>
                                                <StarRate />
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </div>
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalFlex>
                                        <FlexChild>
                                            <HorizontalFlex>
                                                <FlexChild width={"max-content"} padding={"0 15px 0 0"} >
                                                    <Center width={"100%"} textAlign={"left"}>
                                                        <P padding={"5px"} weight={"bold"} size={"11pt"}>쿨링감</P>
                                                        <P padding={"5px"} weight={"bold"} size={"11pt"}>무게감</P>
                                                        <P padding={"5px"} weight={"bold"} size={"11pt"}>타격감</P>
                                                        <P padding={"5px"} weight={"bold"} size={"11pt"}>상큼감</P>
                                                        <P padding={"5px"} weight={"bold"} size={"11pt"}>달콤감</P>
                                                    </Center>
                                                </FlexChild>
                                                <FlexChild>
                                                    <VerticalFlex gap={8}>
                                                        <StarRate score={5} />
                                                        <StarRate score={3} />
                                                        <StarRate score={4} />
                                                        <StarRate score={2} />
                                                        <StarRate score={3} />
                                                    </VerticalFlex>
                                                </FlexChild>
                                            </HorizontalFlex>
                                        </FlexChild>
                                        <FlexChild>
                                            <Flex direction={isMobile ? "vertical" : "horizontal"} justifyContent={"center"}>
                                                <FlexChild width={250}>
                                                    <PaddingWrapper padding={20}>
                                                        <Radar width={100} height={100} data={reviewData} options={options} />
                                                    </PaddingWrapper>
                                                </FlexChild>
                                            </Flex>
                                        </FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <div className={style.textareaWrap}>
                                        <Center width={"100%"}>
                                            <P weight={"bold"} padding={"0 0 5px 5px"} textAlign={"left"}>솔직한 상품 리뷰를 남겨주세요</P>
                                        </Center>
                                        <InputTextarea ref={reviewRef} onChange={onTextChange} value={content ? content : ""} />
                                        {text
                                            ?
                                            <p className={style.textLength} size={"8pt"} color={"var(--main-color)"}>{text.length}/1000</p>
                                            :
                                            <p className={style.textLength} size={"8pt"} color={"var(--main-color)"}>0/1000</p>
                                        }

                                    </div>
                                </FlexChild>
                                <FlexChild padding={"15px 0 0 0"}>
                                    <Center width={"100%"} textAlign={"left"}>
                                        <Inline>
                                            <P size={"16pt"} weight={"bold"}>포토 </P>
                                            <P size={"8pt"} color={"var(--font-color-disabled)"}>사진은 10MB이하의 PNG, GIF, JPG 파일만 등록 가능합니다.</P>
                                        </Inline>
                                    </Center>
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalFlex>
                                        <FlexChild>
                                            <div className={style.photoBox}>
                                                <FontAwesomeIcon color={"var(--font-color-disabled)"} size={"2xl"} icon={faPlus} />
                                            </div>
                                        </FlexChild>
                                        <FlexChild>
                                            <div className={style.photoBox}>
                                                <FontAwesomeIcon color={"var(--font-color-disabled)"} size={"2xl"} icon={faPlus} />
                                            </div>
                                        </FlexChild>
                                        <FlexChild>
                                            <div className={style.photoBox}>
                                                <FontAwesomeIcon color={"var(--font-color-disabled)"} size={"2xl"} icon={faPlus} />
                                            </div>
                                        </FlexChild>
                                        <FlexChild>
                                            <div className={style.photoBox}>
                                                <FontAwesomeIcon color={"var(--font-color-disabled)"} size={"2xl"} icon={faPlus} />
                                            </div>
                                        </FlexChild>
                                        <FlexChild>
                                            <div className={style.photoBox}>
                                                <FontAwesomeIcon color={"var(--font-color-disabled)"} size={"2xl"} icon={faPlus} />
                                            </div>
                                        </FlexChild>

                                    </HorizontalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <div className={style.button}>
                                        <ButtonEclipse onClick={onReviewClick} lineHeight={"42px"} text={"상품 등록 하기"} height={44} backgroundColor={"red"} />
                                    </div>
                                </FlexChild>
                            </VerticalFlex>
                        </div>

                }

            </ModalBase>
        );
    }
);


export default ReviewModifyModal;