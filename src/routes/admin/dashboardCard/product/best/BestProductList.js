import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./BestProductList.module.scss";
import FlexChild from "layouts/flex/FlexChild";
import Inline from "layouts/container/Inline";
import CustomIcon from "components/icons/CustomIcon";
import Center from "layouts/wrapper/Center";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import P from "components/P";
import clsx from "classnames";
import CustomButton from "components/buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { requester } from "App";
import NiceModal from "@ebay/nice-modal-react";
import { useTranslation } from "react-i18next";
import AccordionText from "components/accordion/AccordionText";
import AccordionWrapper from "components/accordion/AccordionWrapper";
import CheckCircle from "components/inputs/checkBox/CheckCircle";
import { toast } from "react-toastify";
import { intersectionSize } from "shared/utils/Utils";

function BestProductList() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [brands, setBrands] = useState();
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        requester.getBestProductsForAdmin((result) => {
            if (result.data) {
                let onlyId = result.data.map((product) => product.productId);
                requester.getAllBrandsForAdmin((result) => {
                    let brandList = result.data;
                    const sorted = brandList.sort((a, b) => {
                        let brandListA = a.children.map((child) => child.id);
                        let brandListB = b.children.map((child) => child.id);
                        let sizeA = intersectionSize(brandListA, onlyId);
                        let sizeB = intersectionSize(brandListB, onlyId);
                        return sizeB - sizeA;
                    });
                    setBrands(sorted);
                });

                setSelectedProducts(onlyId);
            } else {
                setSelectedProducts([]);
            }
        })
    }, [])

    const onSaveClick = () => {
        let data = selectedProducts;
        requester.saveBestProducts(data, (result) => {
            if (result.data) {
                let onlyId = result.data.map((product) => product.productId);
                requester.getAllBrandsForAdmin((result) => {
                    let brandList = result.data;
                    const sorted = brandList.sort((a, b) => {
                        let brandListA = a.children.map((child) => child.id);
                        let brandListB = b.children.map((child) => child.id);
                        let sizeA = intersectionSize(brandListA, onlyId);
                        let sizeB = intersectionSize(brandListB, onlyId);
                        return sizeB - sizeA;
                    });
                    setBrands(sorted);
                });

                setSelectedProducts(onlyId);
            } else {
                setSelectedProducts([]);
            }
            toast.success("저장했습니다", {
                autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
            });
        });
    }

    const ProductRow = (props) => {
        const [isChecked, setChecked] = useState(false);
        const input = useRef();

        const onChange = (e) => {
            if (e.target.checked === true) {
                if (!selectedProducts.includes(props.product.id)) {
                    setSelectedProducts([...selectedProducts, props.product.id]);
                }
            } else {
                const updatedProducts = selectedProducts.filter(
                    (productId) => productId !== props.product.id
                );
                setSelectedProducts(updatedProducts);
            }
        }

        useEffect(() => {
            if (selectedProducts) {
                let filteredLength = selectedProducts.filter((product) => product === props.product.id).length;
                if (filteredLength > 0) {
                    setChecked(true);
                } else {
                    setChecked(false);
                }
            } else {
                setChecked(false);
            }
        }, [selectedProducts]);

        return (
            <HorizontalFlex>
                <FlexChild >
                    <div className={style.wrap}>
                        <label className={style.checkbox} style={{ backgroundColor: props.disabled && "#bbbbbb" }}>
                            <input type={"checkbox"} onChange={onChange} checked={isChecked} />
                            <span ref={input} className={style.checkboxIcon} style={{ width: props.width, height: props.height, cursor: props.disabled ? "default" : "pointer" }} />
                        </label>
                        <span className={style.checkboxText} >
                            <p className={style.checkBoxLabel}>{props.product.title}</p>
                        </span>
                    </div>
                </FlexChild>
                <FlexChild></FlexChild>
            </HorizontalFlex>
        );
    }

    return (
        <div className={style.container}>
            <VerticalFlex gap={10}>
                <FlexChild alignItems={"flex-start"}>
                    <CustomButton text={"저장"} onClick={onSaveClick} />
                </FlexChild>
                <FlexChild>
                    <div className={style.label}>
                        <HorizontalFlex gap={10}>
                            <FlexChild width={"max-content"}>
                                <CustomIcon name={"eventsInProgress"} width={25} />
                            </FlexChild>
                            <FlexChild>
                                <P>베스트 상품 리스트</P>
                            </FlexChild>
                        </HorizontalFlex>
                    </div>
                </FlexChild>
                <FlexChild>
                    <VerticalFlex gap={10}>
                        <FlexChild></FlexChild>
                        {
                            brands && brands.map((brand, index) =>
                                <FlexChild key={index}>
                                    <AccordionWrapper alwaysOpen active={1}>
                                        <AccordionText height={"initial"} header={brand.title} overflowY={"hidden"}>
                                            <VerticalFlex gap={5} alignItems={"flex-start"}>
                                                {
                                                    brand.children && brand.children.map((product, index2) =>
                                                        <FlexChild key={index2} >
                                                            <ProductRow product={product} index={index2} />
                                                        </FlexChild>
                                                    )
                                                }
                                            </VerticalFlex>
                                        </AccordionText>
                                    </AccordionWrapper>
                                </FlexChild>)
                        }
                    </VerticalFlex>
                </FlexChild>

            </VerticalFlex>
        </div>
    );
}

export default BestProductList;