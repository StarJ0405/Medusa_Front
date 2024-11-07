import ModalBase from "modals/base/ModalBase";
import style from "./Filter.module.css"
import NiceModal from "@ebay/nice-modal-react";
import { useRef } from "react";
import TabView from "layouts/view/TabView";
import TabViewChild from "layouts/view/TabViewChild";
import { useTranslation } from "react-i18next";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import P from "components/P";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import { useEffect } from "react";
import { requester } from "App";
import { useState } from "react";
import OptionButton from "./option/OptionButton";

import HorizontalFlex from "layouts/flex/HorizontalFlex";
import RangeSlider from "components/inputs/rangeSlider/RangeSlider";
import { clone, isEqual } from "shared/utils/Utils";
import Center from "layouts/wrapper/Center";
import initialSearchCondition from "InitialData/InitialSearchCondition.json";

const Filter = NiceModal.create(
    (props, ref) => {
        const currentSearchCondition = props.searchCondition ? props.searchCondition : initialSearchCondition;
        const modal = useRef();
        const { t } = useTranslation();
        const [withHeader, withFooter] = [true, false];
        const [width, height] = [props.width || "100%", props.height || "initial"];
        const withCloseButton = true;
        const clickOutsideToClose = true;
        const title = "필터";
        const buttonText = "close";
        const [brands, setBrands] = useState();
        const [categories, setCategories] = useState();
        const [promotions, setPromotions] = useState();
        const [filterData, setFilterData] = useState();
        const [price, setPrice] = useState(currentSearchCondition.price);
        const [selectedCategories, setSelectedCategories] = useState(currentSearchCondition.categories);
        const [selectedBrands, setSelectedBrands] = useState(currentSearchCondition.brands);
        const [selectedPromotions, setSelectedPromotions] = useState(currentSearchCondition.promotions)
        const [cooling, setCooling] = useState(currentSearchCondition.cooling);
        const [weight, setWeight] = useState(currentSearchCondition.weight);
        const [blow, setBlow] = useState(currentSearchCondition.blow);
        const [fresh, setFresh] = useState(currentSearchCondition.fresh);
        const [sweet, setSweet] = useState(currentSearchCondition.sweet);
        const { currentList } = props;
        const filterDataRef = useRef();

        useEffect(() => {
            let groupedByCategoryId = [];
            let groupedByCategory = [];
            let groupedByBrandId = [];
            let groupedByBrand = [];
            let categoryCount = 0;
            let brandCount = 0;
            // JSON 배열을 순회하면서 categoryId를 기준으로 그룹화
            currentList.forEach((item) => {
                let categoryId = item.categoryId;
                let categoryTitle = item.categoryTitle;
                let brandId = item.brandId;
                let brandTitle = item.brandTitle;
                // categoryId를 키로 가지는 그룹이 없으면 새로운 배열을 만들어 할당
                if (!groupedByCategoryId[categoryId]) {
                    groupedByCategoryId[categoryId] = {
                        categoryId
                    };

                    groupedByCategory[categoryCount] = {
                        id: categoryId,
                        title: categoryTitle
                    };
                    categoryCount++;
                }

                if (!groupedByBrandId[brandId]) {
                    groupedByBrandId[brandId] = {
                        brandId
                    };

                    groupedByBrand[brandCount] = {
                        id: brandId,
                        title: brandTitle
                    };
                    brandCount++;
                }
            });

            groupedByCategory = groupedByCategory.sort((a, b) => a.title.localeCompare(b.title));
            groupedByBrand = groupedByBrand.sort((a, b) => a.title.localeCompare(b.title));
            setCategories(groupedByCategory);
            setBrands(groupedByBrand);

            return () => {
                props.onClose && props.onClose(filterDataRef.current);
            }
        }, [])

        const callbackCategory = (categoryId, isSelected) => {
            if (isSelected) {
                if (!selectedCategories.includes(categoryId)) {
                    setSelectedCategories((before) => [...before, categoryId]);
                }
            }
            else {
                setSelectedCategories((before) => before.filter((row) => row !== categoryId));
            }
        }
        const callbackBrand = (brandId, isSelected) => {
            if (isSelected) {
                if (!selectedBrands.includes(brandId)) {
                    setSelectedBrands((before) => [...before, brandId]);
                }
            }
            else {
                setSelectedBrands((before) => before.filter((row) => row !== brandId));
            }
        }

        const callbackPromotion = (promotionId, isSelected) => {
            // if (isSelected) {
            //     setSelectedPromotions((before) => [...before, promotionId]);
            // }
            // else {
            //     setSelectedPromotions((before) => before.filter((row) => row !== promotionId));
            // }
        }

        const callbackPrice = (value) => {
            setPrice(value);
        }

        useEffect(() => {
            let newData = {
                categories: selectedCategories,
                brands: selectedBrands,
                price: price
            };

            setFilterData(newData);

        }, [selectedCategories, selectedBrands, price]);

        useEffect(() => {
            if (filterData) {
                filterDataRef.current = filterData;
            }
        }, [filterData]);

        return (
            <ModalBase ref={modal} width={width} maxWidth={props.maxWidth} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText}>
                <PaddingWrapper padding={10}>
                    <VerticalFlex height={"initial"} gap={5}>
                        <FlexChild padding={"5px 10px"}>
                            <VerticalFlex>
                                <FlexChild>
                                    <Center width={"100%"}>
                                        <P textAlign={"left"} size={16} weight={"bold"}>가격</P>
                                    </Center>
                                </FlexChild>
                                <FlexChild height={"max-content"} padding={10}>
                                    <RangeSlider callback={callbackPrice} multi defaultValue={[0, 30000]} min={0} max={30000} step={100} />
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild>
                        <FlexChild padding={"5px 10px"}>
                            <VerticalFlex>
                                <FlexChild>
                                    <Center width={"100%"}>
                                        <P textAlign={"left"} size={16} weight={"bold"}>{"프로모션"}</P>
                                    </Center>
                                </FlexChild>
                                <FlexChild padding={10}>
                                    <div className={style.buttonList}>
                                        <OptionButton callback={callbackPromotion} data={{ title: "할인" }} />
                                        <OptionButton callback={callbackPromotion} data={{ title: "기프트" }} />
                                    </div>
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild>
                        <FlexChild padding={"5px 10px"}>
                            <VerticalFlex>
                                <FlexChild>
                                    <Center width={"100%"}>
                                        <P textAlign={"left"} size={16} weight={"bold"}>{t("byBrand")}</P>
                                    </Center>
                                </FlexChild>
                                <FlexChild padding={10}>
                                    <div className={style.buttonList}>
                                        {
                                            brands && brands.map((brand, index) =>
                                                <OptionButton callback={callbackBrand} data={brand} key={index} />
                                            )
                                        }
                                    </div>
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild>
                        <FlexChild padding={"5px 10px"}>
                            <VerticalFlex>
                                <FlexChild>
                                    <Center width={"100%"}>
                                        <P textAlign={"left"} size={16} weight={"bold"}>{t("category")}</P>
                                    </Center>
                                </FlexChild>
                                <FlexChild padding={10}>
                                    <div className={style.buttonList}>
                                        {
                                            categories && categories.map((data, index) =>
                                                <OptionButton callback={callbackCategory} data={data} key={index} />
                                            )
                                        }
                                    </div>
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild>
                        {/* <FlexChild padding={"5px 10px"}>
                            <VerticalFlex>
                                <FlexChild>
                                    <Center width={"100%"}>
                                        <P textAlign={"left"} size={16} weight={"bold"}>특성</P>
                                    </Center>
                                </FlexChild>
                                <FlexChild padding={"5px 10px"}>
                                    <HorizontalFlex>
                                        <FlexChild width={"fit-content"}>
                                            <P size={14}>{t("cooling")}</P>
                                        </FlexChild>
                                        <FlexChild>
                                            <RangeSlider callback={callbackCooling} defaultValue={[0, 5]} step={1} dots text={t("cooling")} />
                                        </FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                                <FlexChild padding={"5px 10px"}>
                                    <HorizontalFlex>
                                        <FlexChild width={"fit-content"}>
                                            <P size={14}>{t("weight")}</P>
                                        </FlexChild>
                                        <FlexChild>
                                            <RangeSlider callback={callbackWeight} defaultValue={[0, 5]} step={1} dots text={t("weight")} />
                                        </FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                                <FlexChild padding={"5px 10px"}>
                                    <HorizontalFlex>
                                        <FlexChild width={"fit-content"}>
                                            <P size={14}>{t("blow")}</P>
                                        </FlexChild>
                                        <FlexChild>
                                            <RangeSlider callback={callbackBlow} defaultValue={[0, 5]} step={1} dots text={t("blow")} />
                                        </FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                                <FlexChild padding={"5px 10px"}>
                                    <HorizontalFlex>
                                        <FlexChild width={"fit-content"}>
                                            <P size={14}>{t("fresh")}</P>
                                        </FlexChild>
                                        <FlexChild>
                                            <RangeSlider callback={callbackFresh} defaultValue={[0, 5]} step={1} dots text={t("fresh")} />
                                        </FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                                <FlexChild padding={"5px 10px"}>
                                    <HorizontalFlex>
                                        <FlexChild width={"fit-content"}>
                                            <P size={14}>{t("sweet")}</P>
                                        </FlexChild>
                                        <FlexChild>
                                            <RangeSlider callback={callbackSweet} defaultValue={[0, 5]} step={1} dots text={t("sweet")} />
                                        </FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild> */}
                    </VerticalFlex>
                </PaddingWrapper>
            </ModalBase>
        );
    }
);


export default Filter;