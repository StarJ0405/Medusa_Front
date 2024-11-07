import { useModal } from "@ebay/nice-modal-react";
import style from "./OverlayMenu.module.css";
import { useEffect, useState, forwardRef, useImperativeHandle, useCallback } from "react";
import ModalBaseHeader from "./ModalBaseHeader";
import ModalBaseMain from "./ModalBaseMain";
import ModalBaseFooter from "./ModalBaseFooter";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import useAltEffect from "shared/hooks/useAltEffect";
import NiceModal from "@ebay/nice-modal-react";
import OverlayMenuBaseHeader from "./OverlayMenuBaseHeader";
import OverlayMenuBaseMain from "./OverlayMenuBaseMain";

const OverlayMenuBase = forwardRef((props, ref) => {
    const modal = useModal();
    const { padding } = props;
    const [mouseDownElement, setMouseDownElement] = useState('');
    const [mouseUpElement, setMouseUpElement] = useState('');
    const maskHeight = "100vh";
    // const maskHeight = document.documentElement.offsetHeight;

    const preventOverlayScroll = () => {
        document.body.style.cssText = `overflow-y: hidden;`;
    }

    const restoreOverlayScroll = () => {
        document.body.style.cssText = `overflow-y: unset;`;
    }

    const modalClose = () => {
        if (mouseDownElement === mouseUpElement) {
            modal.remove();
        }
    }

    const onClickOutside = (e) => {
        if (props.clickOutsideToClose) {
            modalClose();
        }
    }
    const insideClickPropagation = (e) => {
        e.stopPropagation();
    }

    const onMouseDown = (e) => {
        setMouseDownElement(e.target);
    }

    const onMouseUp = (e) => {
        setMouseUpElement(e.target);
    }

    useImperativeHandle(ref, () => ({
        close() {
            modalClose();
        }
    }));

    useEffect(() => {
        // preventOverlayScroll();
        // return () => {
        //     restoreOverlayScroll();
        // };
    }, []);

    return (
        <div className={style.mask} style={{ height: maskHeight }} onClick={onClickOutside} onMouseUp={onMouseUp} onMouseDown={onMouseDown}>
            <div className={style.wrap}>
                <div className={style.modal} style={{ width: props.width, height: props.height }} onClick={insideClickPropagation} onMouseUp={onMouseUp} onMouseDown={onMouseDown}>
                    <VerticalFlex>
                        {props.withHeader ?
                            <FlexChild height={80}>
                                <OverlayMenuBaseHeader backgroundColor={props.backgroundColor} title={props.title} modalClose={modalClose} />
                            </FlexChild>
                            : null}
                        <FlexChild>
                            <OverlayMenuBaseMain modalClose={modalClose} padding={padding}>
                                {props.children}
                            </OverlayMenuBaseMain>
                        </FlexChild>

                    </VerticalFlex>
                </div>
            </div>
        </div>
    );
});

export default OverlayMenuBase;