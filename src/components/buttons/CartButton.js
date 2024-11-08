import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./CartButton.module.css";
import NiceModal from "@ebay/nice-modal-react";
import ChatBot from 'react-simple-chatbot';
import clsx from "clsx";
import OutsideClickDetector from "./OutsideClickDetector";
import CustomIcon from "components/icons/CustomIcon";

function CartButton() {
    const { width, isMobile, languageCode } = useContext(BrowserDetectContext);
    const [overlayVisible, setOverlayVisible] = useState(false);

    const onChatButtonClick = () => {
        setOverlayVisible(true);
        // NiceModal.show("chat");
    }

    const onChatCloseClick = () => {
        setOverlayVisible(false);
    }

    return (
        <>
            <div className={style.chatButton} style={{ transform: `translateX(${width / 3}px)` }} onClick={onChatButtonClick}>
                <Center>
                    <VerticalFlex>
                        <FlexChild height={"initial"}>
                            <Center>
                                <CustomIcon name={"cart"} width={20} color={"#b4da5d"} />
                            </Center>
                        </FlexChild>
                        <FlexChild height={"initial"}>
                            <Center>
                                <P size={12} color={"#666"}>CART</P>
                            </Center>
                        </FlexChild>
                    </VerticalFlex>
                </Center>
            </div>
            <OutsideClickDetector onOutsideClick={onChatCloseClick}>
                <div className={clsx(style.overlay, { [style.visible]: overlayVisible })} style={{ transform: `translateX(calc(${width / 3}px - 100% + 50px))` }}>
                    <div className={style.overlayWrap}>
                        <ChatBot
                            steps={[
                                {
                                    id: 'hello-world',
                                    message: 'Hello World!',
                                    end: true,
                                },
                            ]}
                        />
                        <div className={style.overlayCloseButtonArea}>
                            <Center>
                                <a className={style.overlayCloseButton} onClick={onChatCloseClick}>
                                    {' '}&times;{' '}
                                </a>
                            </Center>

                        </div>
                    </div>
                </div>
            </OutsideClickDetector>
        </>

    );
}

export default CartButton;