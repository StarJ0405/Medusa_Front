
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


const CategoryRegisterModal = NiceModal.create(
    (props) => {
        const { t } = useTranslation();
        const [withHeader, withFooter] = [true, false];
        const [width, height] = ["min(95%, 1200px)", "80vh"];
        const withCloseButton = true;
        const modal = useRef();
        const clickOutsideToClose = true;
        const title = "카테고리 등록";
        const buttonText = t("close");
        const { isMobile } = useContext(BrowserDetectContext);
        const [specs, setSpecs] = useState([]);
        const inputs = useRef([]);
        const specRefs = useRef([]);

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
            let data = {title : ""};
            let newSpecs = clone(specs);
            newSpecs.map((spec, index) => {
                let specRefRow = specRefs.current[index];
                let specRefCols = specRefRow.getRefs();
                let code = specRefCols[0].getValue();
                let descriptionKr = specRefCols[1].getValue();
                let descriptionCn = specRefCols[2].getValue();
                let unit = specRefCols[3].getValue();
                spec.code = code;
                spec.descriptionKr = descriptionKr;
                spec.descriptionCn = descriptionCn;
                spec.unit = unit;
            });
            data.categorySpecs = newSpecs;
    
            validateInputs(inputs.current).then((result) => {
                if (result.isValid) {
                    data.title = inputs.current[0].getValue();
                    requester.saveCategory(data, (result) => {
                        if (result.code === 0) {
                            props.onChange && props.onChange();
                            modal.current.close();
                        }
                    });
                }
            });
        }
    
        const onAddSpecClick = () => {
            let index = specs.length;
            let spec = {
                index: index,
                id: null,
                type: null,
                code: null,
                descriptionKr: null,
                descriptionCn: null,
                valueNumber: null,
                valueText: null,
                valueFloat: null,
                unit: null
            }
    
            setSpecs((before) => {
                let oldSpecs = clone(before);
                let newSpecs = oldSpecs.map((spec, index) => {
                    let specRefRow = specRefs.current[index];
                    let specRefCols = specRefRow.getRefs();
                    let code = specRefCols[0].getValue();
                    let descriptionKr = specRefCols[1].getValue();
                    let descriptionCn = specRefCols[2].getValue();
                    let unit = specRefCols[3].getValue();
                    spec.code = code;
                    spec.descriptionKr = descriptionKr;
                    spec.descriptionCn = descriptionCn;
                    spec.unit = unit;
                    return spec;
                });
    
                return [...newSpecs, spec];
            });
        }
    
        const onDeleteClick = (category) => {
            let data;
            if (category) {
                data = clone(category);
            } else {
                // data = clone(selectedCategory);
            }
    
            requester.deleteCategory(data, (result) => {
                props.onChange && props.onChange();
            });
        }
    
        const onSpecTypeSelect = (selectedType, index) => {
            let oldSpecs = clone(specs);
            let newSpecs = oldSpecs.map((oldSpec, oldSpecIndex) => {
                if (oldSpecIndex === index) {
                    oldSpec.type = selectedType;
                }
                return oldSpec;
            });
    
            setSpecs(newSpecs);
        }
    
        const Spec = forwardRef((props, ref) => {
            const { data, index } = props;
            const specRef = useRef([]);
            useImperativeHandle(ref, () => ({
                getRefs() {
                    return specRef.current;
                }
            }));
    
            return (
                <CTableRow>
                    <CTableDataCell>
                        <CDropdown>
                            <CDropdownToggle color="secondary">{data && data.type ? data.type : t("categorySpecType")}</CDropdownToggle>
                            <CDropdownMenu>
                                {Object.keys(CategorySpecType).map((type, specTypeIndex) =>
                                    <CDropdownItem key={specTypeIndex} onClick={() => onSpecTypeSelect(type, index)}>{type}</CDropdownItem>
                                )}
                            </CDropdownMenu>
                        </CDropdown>
                    </CTableDataCell>
                    <CTableDataCell>
                        <InputText ref={el => (specRef.current[0] = el)} value={data.code} />
                    </CTableDataCell>
                    <CTableDataCell>
                        <InputText ref={el => (specRef.current[1] = el)} value={data.descriptionKr} />
                    </CTableDataCell>
                    <CTableDataCell>
                        <InputText ref={el => (specRef.current[2] = el)} value={data.descriptionCn} />
                    </CTableDataCell>
                    <CTableDataCell>
                        <InputText ref={el => (specRef.current[3] = el)} value={data.unit} />
                    </CTableDataCell>
                </CTableRow>
            );
        });


        return (
            <ModalBase borderRadius={"10px"} headerStyle ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText} >
                <div className={style.wrap}>
                    <div className={style.detailContainer}>

                        <NavTabs buttonVisible={true} buttons={[<Button text={t("save")} onClick={onSaveClick} />, <Button text={t("delete")} onClick={onDeleteClick} />, <Button text={t("close")} onClick={onCloseClick} />]}>
                            <NavTabChild title={t("basicInfo")}>
                                <VerticalFlex flexStart={true} gap={30}>
                                    <FlexChild>
                                        <InputText ref={el => (inputs.current[0] = el)} label={"카테고리명(한글)"} labelWidth={140} placeHolder={"카테고리명(한글)"}  />
                                    </FlexChild>
                                </VerticalFlex>
                            </NavTabChild>
                            <NavTabChild title={t("spec")}>
                                <VerticalFlex gap={20}>
                                    <FlexChild>
                                        <Button text={t("addSpec")} onClick={onAddSpecClick} />
                                    </FlexChild>
                                    <FlexChild>
                                        {
                                            specs.length > 0 &&
                                            <CTable striped hover bordered align="middle" responsive={true}>
                                                <CTableHead align={"center"}>
                                                    <CTableRow>
                                                        <CTableHeaderCell scope="col">{t("categorySpecType")}</CTableHeaderCell>
                                                        <CTableHeaderCell scope="col">{t("specCode")}</CTableHeaderCell>
                                                        <CTableHeaderCell scope="col">{`${t("specDescription")} (${t("korean")})`}</CTableHeaderCell>
                                                        <CTableHeaderCell scope="col">{`${t("specDescription")} (${t("chinese")})`}</CTableHeaderCell>
                                                        <CTableHeaderCell scope="col">{t("unit")}</CTableHeaderCell>
                                                    </CTableRow>
                                                </CTableHead>
                                                <CTableBody>
                                                    {specs.map((spec, index) =>
                                                        <Spec ref={el => (specRefs.current[index] = el)} data={spec} key={index} index={index} />
                                                    )}
                                                </CTableBody>
                                            </CTable>
                                        }
                                    </FlexChild>
                                </VerticalFlex>
                            </NavTabChild>
                        
                        </NavTabs>
                    </div>
                    {/* <FlexChild>
                            <CustomButton onClick={onRegisterButtonClick} text={"등록완료"} style={btnStyle} />
                        </FlexChild> */}


                </div>
            </ModalBase>
        );
    }
);

export default CategoryRegisterModal;