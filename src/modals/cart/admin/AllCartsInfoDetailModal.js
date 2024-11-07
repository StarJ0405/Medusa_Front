import NiceModal from "@ebay/nice-modal-react";
import FlexChild from "layouts/flex/FlexChild";
import ModalBase from "modals/base/ModalBase";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import style from "./AllCartsInfoDetailModal.module.css";
import VerticalFlex from "layouts/flex/VerticalFlex";
import P from "components/P";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { getCurrentLanguageCode } from "shared/utils/Utils";


const AllCartsInfoDetailModal = NiceModal.create(
    (props) => {
        const { carts, date, total } = props;
        const { t } = useTranslation();
        const [withHeader, withFooter] = [true, true];
        const [width, height] = ["min(95%, 500px)", "initial"];
        const withCloseButton = true;
        const modal = useRef();
        const clickOutsideToClose = true;
        const title = "상세보기";
        const footer = total;
        const buttonText = t("close");
        const inputsSignIn = useRef([]);
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const { isMobile } = useContext(BrowserDetectContext);

        const [data, setData] = useState();

        

        useEffect(() => {
            if (carts) {
                setData(carts);
            }

        }, [carts])

        useEffect(() => {
            console.log(data);
        }, [data])


        return (
            <ModalBase ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText} overflow={"visible"}>
                <div className={style.wrap}>
                    <VerticalFlex gap={15}>
                        <FlexChild>
                            <HorizontalFlex>
                                <FlexChild justifyContent={"center"}>담은 날짜</FlexChild>
                                <FlexChild justifyContent={"center"}>{date && date}</FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                        <FlexChild>
                            <HorizontalFlex>
                                <FlexChild justifyContent={"center"}>
                                    <P weight={"bold"}>상품명</P>
                                </FlexChild>
                                <FlexChild justifyContent={"center"}>
                                    <P weight={"bold"}>수량</P>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                        {
                            data &&
                            data.map((row, index) => {

                                return (
                                    <FlexChild>
                                        <HorizontalFlex>
                                            <FlexChild justifyContent={"center"}>
                                                <P>{row.productName}</P>
                                            </FlexChild>
                                            <FlexChild justifyContent={"center"}>
                                                <P>{row.quantity}</P>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                );
                            })
                        }
                        <FlexChild>
                            <P>총액 : {total}</P>
                        </FlexChild>

                    </VerticalFlex>
                </div>
            </ModalBase>
        );
    }
);

export default AllCartsInfoDetailModal;