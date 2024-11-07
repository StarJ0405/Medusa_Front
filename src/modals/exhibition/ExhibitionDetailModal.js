import ModalBase from "modals/base/ModalBase";
import style from "./ExhibitionDetailModal.module.css"
import NiceModal from "@ebay/nice-modal-react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import P from "components/P";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import { useEffect } from "react";
import { requester } from "App";
import { useState } from "react";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import RangeSlider from "components/inputs/rangeSlider/RangeSlider";
import Center from "layouts/wrapper/Center";
import initialSearchCondition from "InitialData/InitialSearchCondition.json";
import Inline from "layouts/container/Inline";
import QuillViewer from "components/inputs/richEditor/QuillViewer";
import QuillEditor from "components/inputs/richEditor/QuillEditor";
import { decode } from "shared/utils/Utils";

const ExhibitionDetailModal = NiceModal.create(
    (props, ref) => {
        const modal = useRef();
        const { t } = useTranslation();
        const [withHeader, withFooter] = [true, false];
        const [width, height] = [props.width || "70%", props.height || "85vh"];
        const withCloseButton = true;
        const clickOutsideToClose = true;
        const { data } = props;
        const title = "기회전 상세";
        const buttonText = "close";
        const [decodeContent, setDecodeContent] = useState();

        useEffect(() => {
            console.log(data);
            let loadedHtml = decode(data.content);
            setDecodeContent(loadedHtml);
        }, [data])

        const formatDateTime = (dateStr) => {
            let dateObj = new Date(dateStr);

            let year = dateObj.getFullYear();
            let month = String(dateObj.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해야 합니다.
            let day = String(dateObj.getDate()).padStart(2, '0');
            let hours = String(dateObj.getHours()).padStart(2, '0');
            let minutes = String(dateObj.getMinutes()).padStart(2, '0');

            return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
        }




        return (
            <ModalBase ref={modal} width={width} maxWidth={props.maxWidth} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText}>
                <PaddingWrapper padding={30}>
                    <div style={{ height: "70vh", overflowY: "scroll" }}>
                        <VerticalFlex gap={20}>
                            <FlexChild>
                                <HorizontalFlex gap={20}>
                                    <FlexChild width={"10%"}>
                                        <P weight={"bold"}>기획전 타입</P>
                                    </FlexChild>
                                    <FlexChild>
                                        <div className={style.label} style={{
                                            backgroundColor: data.type === "Gift" ? "#e84518" : "#5471e6"
                                        }}>
                                            <P size={15}>{data.type === "Discount" ? "할인율 적용" : data.type === "Gift" ? "사은품 증점" : ""}&nbsp;{"("}{data.type}{")"}</P>
                                        </div>

                                    </FlexChild>
                                </HorizontalFlex>

                            </FlexChild>
                            <FlexChild>
                                <HorizontalFlex gap={20}>
                                    <FlexChild width={"10%"}>
                                        <P weight={"bold"}>제목</P>
                                    </FlexChild>
                                    <FlexChild>
                                        <P size={15}>{data.title}</P>
                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                            <FlexChild>
                                <HorizontalFlex gap={20}>
                                    <FlexChild width={"10%"}>
                                        <P weight={"bold"}>기간</P>
                                    </FlexChild>
                                    <FlexChild>
                                        {/* <Inline> */}
                                        <P size={15}>{formatDateTime(data.startDateTime)}</P>
                                        <P>    ~    </P>
                                        <P size={15}>{formatDateTime(data.endDateTime)}</P>
                                        {/* </Inline> */}
                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                            <FlexChild>
                                <HorizontalFlex gap={20}>
                                    <FlexChild width={"10%"}>
                                        <P weight={"bold"}>이벤트 내용</P>
                                    </FlexChild>
                                    <FlexChild>
                                        {
                                            data.type === "Discount"
                                                ?
                                                <Inline>
                                                    <P size={18} color={"var(--main-color)"} weight={"bold"}>{data.discountRate}  % </P>
                                                    <P weight={"bold"}>할인</P>
                                                </Inline>
                                                :
                                                data.type === "Gift"
                                                    ?
                                                    <Inline>
                                                        <P color={"var(--main-color)"} size={18} weight={"bold"}>{data.giftStandard} </P>
                                                        <P weight={"bold"} size={13}>개 구입시</P>
                                                        <P color={"var(--main-color)"} size={18} weight={"bold"}> + {data.gift} </P>
                                                        <P weight={"bold"} size={13}>증정</P>
                                                    </Inline>
                                                    : ""
                                        }
                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                            <FlexChild>
                                <HorizontalFlex gap={20} flexStart>
                                    <FlexChild width={"10%"}>
                                        <P weight={"bold"}>이벤트 상품</P>
                                    </FlexChild>
                                    <FlexChild>
                                        <VerticalFlex flexStart>
                                            {
                                                data.exhibitionProducts.map((row, index) => {
                                                    return (
                                                        <FlexChild>
                                                            <Inline>
                                                                <P size={15}>{row.productBrandTitle} </P>
                                                                <P size={15}>{row.productTitle}</P>
                                                            </Inline>
                                                        </FlexChild>

                                                    );
                                                })
                                            }
                                        </VerticalFlex>
                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                            <FlexChild>
                                <VerticalFlex flexStart>
                                    <FlexChild>
                                        <P weight={"bold"}>상세</P>
                                    </FlexChild>
                                    <FlexChild>
                                        <QuillViewer value={decodeContent && decodeContent} />
                                    </FlexChild>
                                </VerticalFlex>
                            </FlexChild>
                        </VerticalFlex>
                    </div>
                </PaddingWrapper>
            </ModalBase>
        );
    }
);


export default ExhibitionDetailModal;