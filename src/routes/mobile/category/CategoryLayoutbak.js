import style from "./CategoryLayout.module.css";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { NavLink, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BrowserDetectContext, requester } from "App";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import clsx from "classnames";

import SkeletonText from "components/skeleton/SkeletonText";
import MobileSearchBar from "components/MobileSearchBar";

function CategoryLayoutBak() {
    const {isMobile} = useContext(BrowserDetectContext);
    const [categories, setCategories] = useState();
    const [isCategoryLoading, setCategoryLoading] = useState(true);

    useEffect(() => {
        requester.getAllCategories((result) => {
            setCategories(result.data);
            setCategoryLoading(false);
        })
    }, []);

    const Category = ({ data, skeleton }) => {
        const [active, setActive] = useState(false);
        const color = active ? "var(--main-color)" : "black";
        const url = skeleton ? "" : data.id;

        return (
            <div className={clsx(style.category, { [style.active]: active })}>
                {
                    skeleton ?
                        <PaddingWrapper padding={10}>
                            <Center>
                                <SkeletonText size={14} />
                            </Center>
                        </PaddingWrapper>
                        :
                        <NavLink to={url} style={({ isActive }) => { setActive(isActive); }} replace>
                            <PaddingWrapper padding={10}>
                                <Center>
                                    <P size={"min(3vw, 20px)"} color={color} >{data.titleKr}</P>
                                </Center>
                            </PaddingWrapper>
                        </NavLink>
                }
            </div>
        );
    }

    const Skeleton = () => {
        const skeletons = Array.from({ length: 8 });

        return (
            <VerticalFlex>
                {skeletons.map((skeleton, index) =>
                    <FlexChild key={index} height={"initial"}>
                        <Category skeleton />
                    </FlexChild>
                )}
            </VerticalFlex>
        );
    }

    return (
        <div className={style.container}>
            <VerticalFlex gap={10}>
                {isMobile &&
                    <FlexChild height={35}>
                        <div className={style.mobileSearchBar}>
                            <MobileSearchBar />
                        </div>
                    </FlexChild>
                }
                <FlexChild>
                    <HorizontalFlex alignItems={"flex-start"}>
                        <FlexChild width={"initial"}>
                            {isCategoryLoading ? <Skeleton />
                                : <VerticalFlex>
                                    <FlexChild height={"initial"}>
                                        <Category data={{ id: "recommend", titleKr: "추천상품" }} />
                                    </FlexChild>
                                    {categories.map((category, index) =>
                                        <FlexChild key={index} height={"initial"}>
                                            <Category data={category} />
                                        </FlexChild>
                                    )}
                                </VerticalFlex>
                            }
                        </FlexChild>
                        <FlexChild>
                            <Outlet />
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default CategoryLayoutBak;
