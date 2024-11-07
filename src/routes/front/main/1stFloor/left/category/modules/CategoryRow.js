import style from "./SubCategory.module.css";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import FlexChild from "layouts/flex/FlexChild";
import VerticalMiddleWrapper from "layouts/wrapper/VerticalMiddleWrapper";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import VerticalFlex from "layouts/flex/VerticalFlex";
import SubCategory from "./SubCategory";
import { ProductType } from "shared/constants/constants";

function CategoryRow(props) {
    const { data } = props;
    
    return (
        <div className={style.subCategory}>
            <VerticalFlex>
                <FlexChild>
                    <HorizontalFlex>
                        <FlexChild>
                            <VerticalMiddleWrapper>
                                <PaddingWrapper padding={"0px 10px"}>
                                    <p className={style.categoryTitle}>{data.titleKr}</p>
                                </PaddingWrapper>
                            </VerticalMiddleWrapper>
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild>
                {
                    data.children.map((category, index) => (
                        category.type === ProductType.PRODUCT ?
                            <FlexChild key={index}>
                                <SubCategory data={category} />
                            </FlexChild>
                            : null
                    ))
                }
            </VerticalFlex>
        </div>
    )
}

export default CategoryRow;