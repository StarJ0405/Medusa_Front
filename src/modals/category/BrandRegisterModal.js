
import NiceModal from "@ebay/nice-modal-react";
import FlexChild from "layouts/flex/FlexChild";
import ModalBase from "modals/base/ModalBase";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import style from "./CategoryRegisterModal.module.css";
import { requester } from "App";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import CustomIcon from "components/icons/CustomIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "components/buttons/CustomButton";
import { largeCategory, middleCateogy } from "InitialData/category/categoryData.js"
import NavTabs from "components/manager/NavTabs";
import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import NavTabChild from "components/manager/NavTabChild";
import InputText from "components/inputs/InputText";
import InputFile from "components/inputs/InputFile";
import { CategorySpecType } from "shared/constants/constants";
import { clone, validateInputs } from "shared/utils/Utils";
import UploadImage from "components/inputs/upload/UploadImage";


const BrandRegisterModal = NiceModal.create(
    (props) => {
        const { t } = useTranslation();
        const [withHeader, withFooter] = [true, false];
        const [width, height] = ["min(95%, 1200px)", "80vh"];
        const withCloseButton = true;
        const modal = useRef();
        const clickOutsideToClose = true;
        const title = "브랜드 등록";
        const buttonText = t("close");
        const { isMobile } = useContext(BrowserDetectContext);
        const inputs = useRef([]);
        const image = useRef();

        useEffect(() => {

        }, [])

        const btnStyle = {
            backgroundColor: "#5471e6",
            padding: "10px 40px",
            color: "white"
        }
        const onRegisterButtonClick = () => {
            // let list = addCategoryList;
            // if (props.callback) {
            //     props.callback(list);


            // }
            modal.current.close();
        }

        const Button = ({ text, onClick }) => {
            return (
                <CButton color={"primary"} onClick={onClick} active={true} >
                    {text}
                </CButton>
            );
        }

        const onCloseClick = () => {
            modal.current.close();
        }

        const onSaveClick = () => {
            let data = { title: "", image: "" };


            validateInputs(inputs.current).then((result) => {
                if (result.isValid) {
                    data.title = inputs.current[0].getValue();
                    data.image = inputs.current[1].getValue();
                    requester.createBrand(data, (result) => {
                        if (result.code === 0) {
                            props.onChange && props.onChange();
                            modal.current.close();
                        }
                    });
                }
            });
        }


        const onDeleteClick = (brand) => {
            let data;
            if (brand) {
                data = clone(brand);
            } else {
                // data = clone(selectedCategory);
            }

            requester.removeBrand(data, (result) => {
                props.onChange && props.onChange();
            });
        }

        return (
            <ModalBase borderRadius={"10px"} headerStyle ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText} >
                <div className={style.wrap}>
                    <div className={style.detailContainer}>
                        <VerticalFlex flexStart={true} gap={30}>
                            <FlexChild>
                                <InputText ref={el => (inputs.current[0] = el)} label={"브랜드명"} labelWidth={140} placeHolder={"브랜드명"} />
                            </FlexChild>
                            <FlexChild>
                                <UploadImage ref={el => (inputs.current[1] = el)} name={"브랜드 라벨"} label={t("mainImage")} path={"product/" + "product.id"} value={"product.image"} />
                            </FlexChild>
                        </VerticalFlex>
                    </div>

                    <CustomButton onClick={onSaveClick} text={"등록완료"} style={btnStyle} />

                </div>
            </ModalBase>
        );
    }
);

export default BrandRegisterModal;