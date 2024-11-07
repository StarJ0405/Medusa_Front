import NiceModal from "@ebay/nice-modal-react";
import FlexChild from "layouts/flex/FlexChild";
import ModalBase from "modals/base/ModalBase";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { requester } from "App";
import VerticalFlex from "layouts/flex/VerticalFlex";
import SimpleTable from "routes/admin/table/SimpleTable";

const VendorSelectModal = NiceModal.create(
    (props) => {
        const { t } = useTranslation();
        const [withHeader, withFooter] = [true, false];
        const [width, height] = ["min(95%, 1200px)", "80vh"];
        const withCloseButton = true;
        const modal = useRef();
        const clickOutsideToClose = true;
        const title = "입점사 선택";
        const buttonText = t("close");
        const { isMobile } = useContext(BrowserDetectContext);
        const [vendors, setVendors] = useState();

        const theader = [
            { width: 150, code: "businessName", text: "상호", justifyContent: "center", weight: "bold" },
            { width: 150, code: "userName", text: "아이디", justifyContent: "flex-start", weight: "bold" },
            { width: 100, code: "businessNo", text: "사업자번호", justifyContent: "flex-start", weight: "bold" },
            { width: 100, code: "name", text: "담당자명", justifyContent: "center", weight: "bold" },
            { width: 100, code: "mobileNo", text: "연락처", justifyContent: "center", weight: "bold" },
            { width: 70, code: "confirmYn", text: "승인여부", justifyContent: "flex-start", weight: "bold" },
            { width: 70, code: "useYn", text: "사용여부", justifyContent: "center", weight: "bold" },
            { width: 100, code: "createDateTime", text: "등록일시", justifyContent: "flex-start", weight: "bold" }
        ]

        const ocDataCallback = (selectedVendors) => {
            if (props.onSelect) {
                if (vendors.length === selectedVendors.length) {
                    props.onSelect([]);
                } else {
                    props.onSelect(selectedVendors);
                }
            }
        }

        useEffect(() => {
            requester.getAllVendors((result) => {
                setVendors(result.data);
            });

            return () => {
                if (props.onClose) {
                    props.onClose();
                }
            }
        }, []);

        return (
            <ModalBase borderRadius={"10px"} headerStyle ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText} >
                <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                    <VerticalFlex>
                        <FlexChild>
                            <SimpleTable theader={theader} data={vendors} callback={ocDataCallback} fileName={"입점사 목록"} />
                        </FlexChild>
                    </VerticalFlex>
                </div>
            </ModalBase>
        );
    }
);

export default VendorSelectModal;