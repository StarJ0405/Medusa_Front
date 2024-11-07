import style from "./EditorPreviewModal.module.css";
import NiceModal from "@ebay/nice-modal-react";
import ModalBase from "modals/base/ModalBase";

import { useTranslation } from "react-i18next";
import { useRef } from "react";
import QuillViewer from "components/inputs/richEditor/QuillViewer";

const EditorPreviewModal = NiceModal.create(
    (props, ref) => {
        const { t } = useTranslation();
        const [withHeader, withFooter] = [true, false];
        const [width, height] = ["min(100%, 800px)", "min(100%, 800px)"];
        const withCloseButton = false;
        const clickOutsideToClose = true;
        const buttonText = t("close");
        const title = t("preview");
        const modal = useRef();

        const { html } = props;

        return (
            <ModalBase ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText} >
                <div className={style.viewer}>
                    <QuillViewer value={html} />
                </div>
            </ModalBase>
        );
    }
);

export default EditorPreviewModal;