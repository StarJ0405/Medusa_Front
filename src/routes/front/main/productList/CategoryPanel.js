import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { requester, medusaRequester } from "App";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { propTypes } from "react-ui-tree/dist/react-ui-tree";
import { clone, getCurrentLanguageCode } from "shared/utils/Utils";
import style from "./CategoryPanel.module.css";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import initialSearchCondition from "InitialData/InitialSearchCondition.json";

function CategoryPanel(props) {
    const { t } = useTranslation();
    const [categories, setCategories] = useState();
    const [allProducts, setAllProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [activeCategoryId, setActiveCategoryId] = useState();
    const [scroll, setScroll] = useState(true);
    const [scrollPosition, setScrollPosition] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // products 배열을 순회하며 title만 추출하여 brands 배열로 저장
        if (allProducts && allProducts.length > 0) {
            const newTitles = allProducts.map(product => product.title);
            setBrands(prevBrands => {
                const allTitles = [...prevBrands, ...newTitles];
                return Array.from(new Set(allTitles));
            });
        }
    }, [allProducts]);

    useEffect(() => {
        console.log("brands 어케저장 : ", brands)
    }, [brands])

    useEffect(() => {

        let data = "";
        medusaRequester.getAllCategories(data, (result) => {
            setCategories(result.product_categories)
        })
        // requester.findAllCategoriesOnlyTitle((result) => {
        //     setCategories(result.data);
        // })
        medusaRequester.getAllProducts(data, (result) => {
            console.log("다 불러와 : ", result)
            setAllProducts(result.products)
        })

        // requester.findAllBrandsOnlyTitle((result) => {
        //     setBrands(result.data);
        // });

        window.addEventListener('scroll', updateScroll);

        return () => {
            window.removeEventListener('scroll', updateScroll);
        }
    }, []);

    const updateScroll = debounce(() => {
        let scrollPosition = window.scrollY || document.documentElement.scrollTop;
        setScrollPosition(scrollPosition);
    }, 0); // 실행 주기(ms)를 조정할 수 있습니다.


    useEffect(() => {
        if (scroll) {
            if (scrollPosition < 30) {
                // setHeaderHeight(80);
                setScroll(false);
            }
        } else {
            if (scrollPosition >= 30) {
                // setHeaderHeight(50);
                setScroll(true);
            }
        }
    }, [scrollPosition]);



    const onCategoryAreaMouseOver = () => {
        setOverlayVisible(true);
    }

    const onCategoryAreaMouseLeave = () => {
        setOverlayVisible(false);
    }

    const onCategoryRowMouseOver = (categoryId) => {
        setActiveCategoryId(categoryId);
    }

    const onCategoryRowMouseLeave = (categoryId) => {

    }
    const onCategoryClick = (category) => {
        navigate(`/productList/category/${category.id}`)
    }

    // const onBrandClick = (brand) => {
    //     let searchCondition = clone(initialSearchCondition);
    //     searchCondition.brands = [brand.id];
    //     navigate(`/productList/search`, {
    //         state: {
    //             productSearchCondition: searchCondition
    //         }
    //     })

    // }

    const onBrandClick = (brand) => {
        let searchCondition = clone(initialSearchCondition);
        searchCondition.brands = [brand];
        navigate(`/productList/search`, {
            state: {
                productSearchCondition: searchCondition
            }
        })

    }

    return (
        <div style={{ position: "fixed", top: "125px", overflowY: "scroll", height: "calc(100vh - 350px)", width: "280px" }}>
            <VerticalFlex width={250} gap={0}>
                <FlexChild>
                    <div className={style.categoryArea} onMouseOver={onCategoryAreaMouseOver} onMouseLeave={onCategoryAreaMouseLeave}>
                        <VerticalFlex>
                            <FlexChild height={40}>
                                <div className={style.categoryHeader}>
                                    <PaddingWrapper padding={"0px 10px"}>
                                        <HorizontalFlex gap={10}>
                                            <FlexChild width={20}>
                                                <Center>
                                                    <FontAwesomeIcon icon={fas["faBars"]} />
                                                </Center>
                                            </FlexChild>
                                            <FlexChild>
                                                <Center width={"100%"} textAlign={"left"}>
                                                    <P>{t("category")}</P>
                                                </Center>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </PaddingWrapper>
                                </div>
                            </FlexChild>
                            <FlexChild>
                                {
                                    categories &&
                                    <VerticalFlex alignItems={"flex-start"}>
                                        {
                                            categories.map((category, index) =>
                                                <FlexChild key={index}>
                                                    <div onClick={() => onCategoryClick(category)} className={style.categoryRow} onMouseOver={() => onCategoryRowMouseOver(category.id)} onMouseLeave={() => onCategoryRowMouseLeave(category.id)}>
                                                        <p>{category.name}</p>
                                                    </div>
                                                    {/* <CategoryRow data={category} /> */}
                                                </FlexChild>
                                            )
                                        }
                                    </VerticalFlex>
                                }
                            </FlexChild>
                        </VerticalFlex>
                        {/* <div className={clsx(style.categoryOverlay, { [style.show]: isOverlayVisible })}>

            </div> */}
                    </div>
                </FlexChild>

                <FlexChild>
                    <div className={style.categoryArea} onMouseOver={onCategoryAreaMouseOver} onMouseLeave={onCategoryAreaMouseLeave}>
                        <VerticalFlex>
                            <FlexChild height={40}>
                                <div className={style.categoryHeader}>
                                    <PaddingWrapper padding={"0px 10px"}>
                                        <HorizontalFlex gap={10}>
                                            <FlexChild width={20}>
                                                <Center>
                                                    <FontAwesomeIcon icon={fas["faBars"]} />
                                                </Center>
                                            </FlexChild>
                                            <FlexChild>
                                                <Center width={"100%"} textAlign={"left"}>
                                                    <P>{t("byBrand")}</P>
                                                </Center>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </PaddingWrapper>
                                </div>
                            </FlexChild>
                            <FlexChild>
                                {
                                    brands && brands.length > 0 &&
                                    <VerticalFlex alignItems={"flex-start"}>
                                        {
                                            brands.map((brand, index) =>
                                                <FlexChild key={index}>
                                                    <div onClick={() => onBrandClick(brand)} className={style.categoryRow} onMouseOver={() => onCategoryRowMouseOver(brand.id)} onMouseLeave={() => onCategoryRowMouseLeave(brand.id)}>
                                                        <p>{brand}</p>
                                                    </div>
                                                    {/* <CategoryRow data={category} /> */}
                                                </FlexChild>
                                            )
                                        }
                                    </VerticalFlex>
                                }
                            </FlexChild>
                        </VerticalFlex>
                        {/* <div className={clsx(style.categoryOverlay, { [style.show]: isOverlayVisible })}>

            </div> */}
                    </div>
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default CategoryPanel;