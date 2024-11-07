import P from "components/P";
import Container from "layouts/container/Container";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import Center from "layouts/wrapper/Center";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import style from "./MenuBar.module.css";
import clsx from "classnames";
import { useTranslation } from "react-i18next";
import { requester, medusaRequester } from "App";
import initialSearchCondition from "InitialData/InitialSearchCondition.json";
import { BrowserDetectContext } from "providers/BrowserEventProvider";

function MenuBar(props) {
    const { t } = useTranslation();
    const [categories, setCategories] = useState();
    const { isMobile } = useContext(BrowserDetectContext);
    const navigate = useNavigate();

    // useEffect(() => {
    //     requester.findAllCategoriesOnlyTitle((result) => {
    //         setCategories(result.data);
    //     });
    // }, []);

    useEffect(() => {
        let data = "";
        medusaRequester.getAllCategories(data, (result) => {
            setCategories(result.product_categories)
        })
    }, []);

    const Tab = ({ text, url }) => {
        return (
            <Center>
                {/* <div className={style.menu} onClick={onClick}>
                    {text}
                </div> */}
                <NavLink to={url} className={({ isActive }) => clsx(style.menu, { [style.active]: isActive }, { [style.mobile]: isMobile })} >
                    {text}
                </NavLink >
            </Center>
        );
    }

    return (
        <div className={clsx(style.container, { [style.mobile]: isMobile })}>
            <Container maxWidth={1200}>
                <HorizontalFlex padding={"0px 10px"}>
                    {
                        !isMobile &&
                        <FlexChild></FlexChild>
                    }
                    <FlexChild width={isMobile && "initial"}>
                        <Tab text={t("allProducts")} url={"/productList/category/all"} />
                    </FlexChild>
                    {
                        categories && categories.map((category, index) =>
                            <FlexChild key={index} width={isMobile && "initial"}>
                                <Tab text={category.name} url={`/productList/category/${category.id}`} />
                            </FlexChild>
                        )
                    }
                    {/* <FlexChild width={isMobile && "initial"}>
                        <Tab text={t("byBrand")} url={"/productList/brand"} />
                    </FlexChild> */}
                    {/* <FlexChild>
                        <Tab text={t("series")} url={"productList/series"} />
                    </FlexChild> */}
                    {/* <FlexChild>
                        <Tab text={t("newProduct")} url={"productList/newProduct"} />
                    </FlexChild>
                    <FlexChild>
                        <Tab text={t("best")} url={"productList/bestProduct"} />
                    </FlexChild>
                    <FlexChild>
                        <Tab text={t("series")} url={"productList/series"} />
                    </FlexChild>
                    <FlexChild>
                        <Tab text={t("byBrand")} url={"productList/brand"} />
                    </FlexChild>
                    <FlexChild>
                        <Tab text={t("category")} url={"productList/category/50f86d59-4f77-42b2-be3f-041214d33df7"} />
                    </FlexChild> */}
                    {
                        !isMobile &&
                        <FlexChild></FlexChild>
                    }
                </HorizontalFlex>
            </Container>
        </div>
    );
}

export default MenuBar;