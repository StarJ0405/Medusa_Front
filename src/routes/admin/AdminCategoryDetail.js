import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import { Button } from "antd";
import { requester } from "App";
import InputFile from "components/inputs/InputFile";
import InputText from "components/inputs/InputText";
import NavTabChild from "components/manager/NavTabChild";
import NavTabs from "components/manager/NavTabs";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CategorySpecType } from "shared/constants/constants";
import { clone, validateInputs } from "shared/utils/Utils";
import style from "./AdminCategoryLayout.module.css";
import NiceModal from "@ebay/nice-modal-react";

function AdminCategoryDetail(props) {
    const { selectedCategory, visible } = props;
    const { t } = useTranslation();
    const [specs, setSpecs] = useState([]);
    const inputs = useRef([]);
    const specRefs = useRef([]);

    useEffect(() => {
        console.log(selectedCategory);
    },[])

    useEffect(() => {
        if (selectedCategory) {
            setSpecs(selectedCategory.categorySpecs);
        }
        
        // if (selectedCategory) {
        //     let data = { id: selectedCategory.id };
        //     requester.getCategory(data, (result) => {
        //         setSpecs(result.data.categorySpecs);
        //     });
        // }
    }, [selectedCategory]);

    const onCloseClick = () => {
        props.onClose && props.onClose();
    }

    const onSaveClick = () => {
        let data = clone(selectedCategory);
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
                data.titleKr = inputs.current[0].getValue();
                data.titleCn = inputs.current[1].getValue();
                data.icon = inputs.current[2].getValue();
                requester.saveCategory(data, (result) => {
                    if (result.code === 0) {
                        props.onChange && props.onChange();
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

    const onProductClick = (product) => {
        NiceModal.show("productManagerModal", {product : product});
    }

    const onDeleteClick = (category) => {
        let data;
        if (category) {
            data = clone(category);
        } else {
            data = clone(selectedCategory);
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

    const Button = ({ text, onClick }) => {
        return (
            <CButton color={"primary"} onClick={onClick} active={true} >
                {text}
            </CButton>
        );
    }

    return (
        <div className={style.detailContainer}>
            {selectedCategory ?
                <NavTabs buttonVisible={visible} buttons={[<Button text={t("save")} onClick={onSaveClick} />, <Button text={t("delete")} onClick={onDeleteClick} />, <Button text={t("close")} onClick={onCloseClick} />]}>
                    <NavTabChild title={t("basicInfo")}>
                        <VerticalFlex flexStart={true} gap={30}>
                            <FlexChild>
                                <InputText ref={el => (inputs.current[0] = el)} label={"카테고리명(한글)"} labelWidth={140} placeHolder={"카테고리명(한글)"} value={selectedCategory.titleKr} />
                            </FlexChild>
                            <FlexChild >
                                <InputText ref={el => (inputs.current[1] = el)} label={"카테고리명(중문)"} labelWidth={140} placeHolder={"카테고리명(중문)"} value={selectedCategory.titleCn} />
                            </FlexChild>
                            <FlexChild>
                                <InputFile ref={el => (inputs.current[2] = el)} path={"category/" + selectedCategory.id} label={t("icon")} value={selectedCategory.icon} />
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
                    <NavTabChild title={t("manageProduct")}>
                        {
                            selectedCategory.children &&
                            <CTable striped hover bordered align="middle" >
                                <CTableHead align={"center"}>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">{t("productName")}</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">{t("price")}</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">{t("quantity")}</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">{t("hashTag")}</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody >
                                    {
                                        selectedCategory.children.map((child, index) =>
                                            <CTableRow key={index}>
                                                <CTableDataCell>
                                                    <div className={style.productTitleArea} onClick={() => onProductClick(child)}>
                                                        {`${child.brandTitleKr} ${child.titleKr}`}
                                                    </div>
                                                </CTableDataCell>
                                                <CTableDataCell>{child.price}</CTableDataCell>
                                                <CTableDataCell>{child.quantity}</CTableDataCell>
                                                <CTableDataCell>{child.hashTagKr}</CTableDataCell>
                                            </CTableRow>
                                        )}
                                </CTableBody>
                            </CTable>
                        }
                        {/* <VerticalFlex flexStart={true} border={"10px solid black"} gap={30}>
                            <FlexChild>
                                <InputText ref={el => (inputs.current[0] = el)} label={"카테고리명(한글)"} labelWidth={140} placeHolder={"카테고리명(한글)"} value={selectedCategory.titleKr} />
                            </FlexChild>
                            <FlexChild >
                                <InputText ref={el => (inputs.current[1] = el)} label={"카테고리명(중문)"} labelWidth={140} placeHolder={"카테고리명(중문)"} value={selectedCategory.titleCn} />
                            </FlexChild>
                            <FlexChild>
                                <InputFile ref={el => (inputs.current[2] = el)} path={"category/" + selectedCategory.id} label={t("icon")} value={selectedCategory.icon} />
                            </FlexChild>
                        </VerticalFlex> */}
                    </NavTabChild>
                </NavTabs>
                : <p>loading</p>}
        </div>
    );
}

export default AdminCategoryDetail;