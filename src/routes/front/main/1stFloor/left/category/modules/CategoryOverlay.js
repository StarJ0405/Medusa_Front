import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import style from "../DesktopCategory.module.css";
import VerticalFlex from "layouts/flex/VerticalFlex";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import FlexChild from "layouts/flex/FlexChild";
import { requester } from "App";
import useAltEffect from "shared/hooks/useAltEffect";
import { useState } from "react";
import { getUniqColumns, getSpreadArray, normalizeArrayHeight, getGroupedList, getMultipleGroupedList, rpad, clone, deepFind } from "shared/utils/Utils";
import SpeedMeter from "shared/utils/SpeedMeter";
import CategoryOverlayItemGroup from "./CategoryOverlayItemGroup";
import clsx from "classnames";
import { ProductType } from "shared/constants/constants";

function CategoryOverlay(props) {
    const [products, setProducts] = useState(props.data.children);
    const [itemsGroupedByHashTag, setItemsGroupedByHashTag] = useState();
    const [hashTags, setHashTags] = useState();
    const [brands, setBrands] = useState();
    const [normalizedList, setNormalizedList] = useState();
    const [mouseOverBrand, setMouseOverBrand] = useState();
    const [isVisible, setVisible] = useState(false);

    const onMouseOverItem = (brandId) => {
        setMouseOverBrand(brandId);
    }

    useAltEffect(() => {

    }, []);

    useAltEffect(() => {
        if (products && products.length > 0) {

            let productList = deepFind(products, "type", ProductType.PRODUCT);
            let spreadProductList = getSpreadArray(productList, "hashTagKr", "#", "미분류");
            // setHashTags(getUniqColumns(productList, "hashTagKr", "#"));
            const groupedByHashTag = getGroupedList(spreadProductList, "hashTagKr", "children");

            // let groupedByBrand = getMultipleGroupedList(productList, "brand", ["brand", "brandImage"], null);
            
            // groupedByBrand = rpad(groupedByBrand, 2);
            let rpaddedBrands = rpad(products, 2);
            setBrands(rpaddedBrands);

            setItemsGroupedByHashTag(groupedByHashTag);

            groupedByHashTag.sort((before, current) => {
                let beforeLength = before.children.length;
                let currentLength = current.children.length;
                if (beforeLength > currentLength) return -1;
                if (beforeLength === currentLength) return 0;
                if (beforeLength < currentLength) return 1;
            });

            setNormalizedList(normalizeArrayHeight(groupedByHashTag, 3));
        }
    }, [products]);

    useAltEffect(() => {
        if (normalizedList && normalizedList[0].length > 0) {
            setVisible(true);
        }
    }, [normalizedList]);


    return (
        <div className={clsx(style.overlay, { [style.active]: isVisible })}>
            {isVisible ? (
                <PaddingWrapper padding={"10px 20px 15px 15px"}>
                    <HorizontalFlex flexStart={true}>
                        <FlexChild>
                            <VerticalFlex>
                                <FlexChild>
                                    <div className={style.itemGroupArea}>
                                        <HorizontalFlex flexStart={true}>
                                            {
                                                normalizedList.map((list, index) =>
                                                    <FlexChild key={index}>
                                                        <VerticalFlex>
                                                            <FlexChild>
                                                                {
                                                                    // list.map((group, index) =>
                                                                    //     <CategoryOverlayItemGroup key={index} brands={brands} data={group} callback={onMouseOverItem} />
                                                                    // )
                                                                }
                                                            </FlexChild>
                                                        </VerticalFlex>
                                                    </FlexChild>)
                                            }
                                        </HorizontalFlex>
                                    </div>
                                </FlexChild>
                                {/* <FlexChild height={90} stickBottom={true}>
                                    <ThemeItemWrap />
                                </FlexChild> */}
                            </VerticalFlex>
                        </FlexChild>
                        <FlexChild width={210}>
                            <div className={style.brandIconArea}>
                                {
                                    brands ?
                                        brands.map((brand, index) =>
                                            <div key={index} className={style.brandIcon}>
                                                <img className={clsx(style.brandIconImage, { [style.active]: brand.id && brand.id === mouseOverBrand })} src={brand.image}/>
                                            </div>
                                        )
                                        : null
                                }
                            </div>
                        </FlexChild>
                    </HorizontalFlex>
                </PaddingWrapper>
            ) : null}
        </div>
    );
}

export default CategoryOverlay;
