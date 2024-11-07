
import NiceModal from "@ebay/nice-modal-react";
import FlexChild from "layouts/flex/FlexChild";
import ModalBase from "modals/base/ModalBase";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import style from "./ChatModal.module.css";
import VerticalFlex from "layouts/flex/VerticalFlex";
import P from "components/P";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { getCurrentLanguageCode } from "shared/utils/Utils";
import CreateReadChat from "routes/front/CreateReadChat";
import ChatBot from 'react-simple-chatbot';

const ChatModal = NiceModal.create(
    (props) => {
        const { t } = useTranslation();
        const [withHeader, withFooter] = [true, true];
        const [width, height] = [350, 520];
        const withCloseButton = true;
        const modal = useRef();
        const clickOutsideToClose = true;
        const title = "채팅";
        const buttonText = t("close");
        const { isMobile } = useContext(BrowserDetectContext);

        return (
            <ModalBase ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText} overflow={"scroll"}>
                <div className={style.wrap}>
                    {/* <CreateReadChat /> */}
                    <ChatBot
                        steps={[
                            {
                                id: 'hello-world',
                                message: 'Hello World!',
                                end: true,
                            },
                        ]}
                    />
                </div>
            </ModalBase>
        );
    }
);

export default ChatModal;