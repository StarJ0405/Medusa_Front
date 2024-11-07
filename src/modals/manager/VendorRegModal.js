import NiceModal from "@ebay/nice-modal-react";
import ModalBase from "modals/base/ModalBase";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import style from "./VendorRegModal.module.css";
import VendorRegisterDetail from "routes/vendor/VendorRegisterDetail";

const VendorRegModal = NiceModal.create(
    (props) => {
        const { t } = useTranslation();
        const [withHeader, withFooter] = [true, false];
        const [width, height] = ["min(95%, 1200px)", "80vh"];
        const withCloseButton = true;
        const modal = useRef();
        const clickOutsideToClose = true;
        const title = "입점사 등록";
        const buttonText = t("close");
        const { isMobile } = useContext(BrowserDetectContext);
       
        return (
            <ModalBase borderRadius={"10px"} headerStyle ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText} >
                <div className={style.wrap}>
                    <div className={style.detailContainer}>
                        <VendorRegisterDetail/>
                    </div>
                </div>
            </ModalBase>
        );
    }
);

export default VendorRegModal;