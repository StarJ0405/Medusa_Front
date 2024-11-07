import style from "./MemoModal.module.css"
import NiceModal from "@ebay/nice-modal-react";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import ModalBase from "modals/base/ModalBase";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import InputText from "components/inputs/InputText";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import { useState } from "react";
import { requester } from "App";
import { useEffect } from "react";
import useAltEffect from "shared/hooks/useAltEffect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faCommentDots } from "@fortawesome/free-regular-svg-icons";
import P from "components/P";
import Center from "layouts/wrapper/Center";


const MemoModal = NiceModal.create(
    (props, ref) => {
        const modal = useRef();

        const { t } = useTranslation();
        const [withHeader, withFooter] = [true, false];
        const [width, height] = ["10%", "10%"];
        const withCloseButton = true;
        const clickOutsideToClose = true;
        const title = "MEMO";
        const buttonText = "close";

        const { content } = props;





        return (
            <ModalBase ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText} borderRadius={0}>
                <div className={style.wrap}>
                    <Center>
                        <P>{content && content}</P>
                    </Center>
                </div>
            </ModalBase>
        );
    }

)

export default MemoModal;