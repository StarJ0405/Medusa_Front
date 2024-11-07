import NiceModal from "@ebay/nice-modal-react";
import FlexChild from "layouts/flex/FlexChild";
import ModalBase from "modals/base/ModalBase";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { requester } from "App";
import VerticalFlex from "layouts/flex/VerticalFlex";
import SimpleTable from "routes/admin/table/SimpleTable";

const CheckSelectModal = NiceModal.create(
    (props) => {
        const { t } = useTranslation();
        const [withHeader, withFooter] = [true, false];
        const [width, height] = ["min(95%, 1200px)", "80vh"];
        const withCloseButton = true;
        const modal = useRef();
        const clickOutsideToClose = true;
        const buttonText = t("close");
        const { isMobile } = useContext(BrowserDetectContext);
        const { theader, title, list, justifyContent } = props;
        console.log(list);
        console.log(theader);

        const ocDataCallback = (selectedItems) => {
            if (props.onSelect) {
                if (list.length === selectedItems.length) {
                    props.onSelect([]);
                } else {
                    props.onSelect(selectedItems);
                }
            }
        }

        useEffect(() => {
            return () => {
                if (props.onClose) {
                    props.onClose();
                }
            }
        }, []);

        return (
            <ModalBase borderRadius={"10px"} headerStyle ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText} >
                <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", overflowY: "scroll", height: "75vh" }}>
                    <VerticalFlex>
                        <FlexChild>
                            {
                                theader && list &&
                                <SimpleTable theader={theader} data={list} callback={ocDataCallback} fileName={title} justifyContent={justifyContent} type={"modal"}/>
                            }
                        </FlexChild>
                    </VerticalFlex>
                </div>
            </ModalBase>
        );
    }
);

export default CheckSelectModal;