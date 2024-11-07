
import NiceModal from "@ebay/nice-modal-react";
import P from "components/P";
import Inline from "layouts/container/Inline";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import ModalBase from "modals/base/ModalBase";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { createRef, useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import style from "./SelectedProductModal.module.css";
import { decode } from "shared/utils/Utils";
import QuillViewer from "components/inputs/richEditor/QuillViewer";




const SelectedProductModal = NiceModal.create(
    (props) => {
        const { t } = useTranslation();
        const { isMobile } = useContext(BrowserDetectContext);
        const { data } = props;
        const inputs = useRef([]);
        const [withHeader, withFooter] = [true, false];
        const [width, height] = ["min(95%, 1200px)", "80vh"];
        const withCloseButton = true;
        const clickOutsideToClose = true;
        const modal = useRef();

        const [decodeContent, setDecodeContent] = useState();

        useEffect(() => {
            console.log(data);
            let loadedHtml = decode(data.content);
            setDecodeContent(loadedHtml);
        }, [data])





        return (
            <ModalBase borderRadius={"10px"} headerStyle ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose}>
                <PaddingWrapper padding={30}>
                    <div style={{ height: "70vh", overflowY: "scroll" }}>
                        <VerticalFlex gap={20}>
                            <FlexChild>
                                <HorizontalFlex gap={20}>
                                    <FlexChild width={"10%"}>
                                        <P weight={"bold"}>프로모션 타입</P>
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
                                        <P weight={"bold"}>상품</P>
                                    </FlexChild>
                                    <FlexChild>
                                        <VerticalFlex flexStart>
                                            {
                                                data &&
                                                data.newProducts &&
                                                data.newProducts.map(() => (
                                                    <FlexChild>
                                                        <P>상품</P>
                                                    </FlexChild>
                                                ))
                                            }
                                            {
                                                data.restockProducts &&
                                                data.restockProducts.map((row, index) => {
                                                    return (
                                                        <P>상품</P>
                                                    );
                                                })

                                            }
                                            {
                                                data.bestProducts &&
                                                data.bestProducts.map((row, index) => {
                                                    return (
                                                        <P>상품</P>
                                                    );
                                                })

                                            }
                                        </VerticalFlex>


                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                            <FlexChild>
                                <HorizontalFlex gap={20}>
                                    <FlexChild width={"10%"}>
                                        <P weight={"bold"}>썸네일</P>
                                    </FlexChild>
                                    <FlexChild>
                                        <img src={data.image} />
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

export default SelectedProductModal;