import { useModal } from "@ebay/nice-modal-react";
import style from "./ModalBase.module.css"
import { useEffect, useState, forwardRef, useImperativeHandle, useCallback, useRef } from "react";
import ModalBaseHeader from "./ModalBaseHeader";
import ModalBaseMain from "./ModalBaseMain";
import ModalBaseFooter from "./ModalBaseFooter";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import useAltEffect from "shared/hooks/useAltEffect";
import NiceModal from "@ebay/nice-modal-react";
import $ from "jquery";
import clsx from "classnames";

const ModalBase = forwardRef((props, ref) => {
    const modal = useModal();
    const modalContentRef = useRef();
    const [maskHeight, setMaskHeight] = useState(Math.max(window.innerHeight, document.documentElement.offsetHeight));
    const { padding, borderRadius } = props;
    const [isClosing, setIsClosing] = useState(false);


    useEffect(() => {
        // preventOverlayScroll();
        window.addEventListener('resize', handleWindowSizeChange);

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
            // if ($(`.${style.mask}`).length === 0) {
            //     restoreOverlayScroll();
            // }
        }
    }, []);

    const handleWindowSizeChange = () => {
        setMaskHeight(Math.max(window.innerHeight, document.documentElement.offsetHeight));
    }

    const preventOverlayScroll = () => {
        document.body.style.cssText = `overflow-y: hidden;`;
    }

    const restoreOverlayScroll = () => {
        document.body.style.cssText = `overflow-y: scroll;`;
    }

    const modalClose = () => {
        
        if (props.slideUp) {
            setIsClosing(true);

            // 애니메이션 종료 후 처리
            const modalElement = modalContentRef.current;
            const handleAnimationEnd = () => {
                modalElement.removeEventListener('animationend', handleAnimationEnd);
                // 여기서 모달을 닫는 로직을 수행
                // 예: props.onClose() 호출 또는 상태 업데이트
                modal.remove();
            };

            modalElement.addEventListener('animationend', handleAnimationEnd);
        }else{
            modal.remove();
        }

    }

    const onClickOutside = (e) => {
        if (props.clickOutsideToClose && !isClosing) {
            modalClose();
        }
    }
    const insideClickPropagation = (e) => {
        e.stopPropagation();
    }

    const keyFunction = useCallback((event) => {
        if (event.keyCode === 27) {
            modalClose();
        } else {
            if (props.onKeyPress) {
                props.onKeyPress(event);
            }
        }
    }, []);
    const customHeaderStyle = {
        backgroundColor: "#5471e6",
        color: "white"
    }

    useEffect(() => {
        document.addEventListener("keydown", keyFunction);
        return () => {
            document.removeEventListener("keydown", keyFunction);
        };
    }, [keyFunction]);

    useImperativeHandle(ref, () => ({
        close() {
            modalClose();
        }
    }));

    return (
        <div className={style.mask} style={{ height: maskHeight }} onClick={onClickOutside}>
            <div className={style.wrap} style={{ borderRadius: borderRadius }}>
                <div ref={modalContentRef} className={clsx((props.slideUp ? style.slideUpModal : style.modal),{ [style.modalSlideDown]: isClosing })} style={{ width: props.width, maxWidth: props.maxWidth, height: props.height, padding: props.padding, borderRadius: props.borderRadius, backgroundColor: props.backgroundColor, overflow: props.overflow }} onClick={insideClickPropagation}>
                    <VerticalFlex height={"100%"}>
                        {props.withHeader ?
                            <FlexChild height={50}>
                                {
                                    props.headerRender ?
                                        <div className={style.header}>
                                            {props.headerRender}
                                        </div>
                                        : <ModalBaseHeader headerStyle={props.headerStyle && customHeaderStyle} title={props.title} modalClose={modalClose} />
                                }

                            </FlexChild>
                            : null}
                        <FlexChild height={"100%"}>
                            <ModalBaseMain withCloseButton={props.withHeader || props.withFooter ? false : props.withCloseButton} modalClose={modalClose} padding={padding}>
                                {props.children}
                            </ModalBaseMain>
                        </FlexChild>

                        {props.withFooter ?
                            < FlexChild height={50}>
                                {
                                    props.footerRender ?
                                        <div className={style.footer}>
                                            {props.footerRender}
                                        </div>
                                        :
                                        <ModalBaseFooter buttonText={props.buttonText} modalClose={modalClose} />
                                }
                            </FlexChild>
                            : null}
                    </VerticalFlex>
                </div>
            </div>

        </div >
    );
});

export default ModalBase;