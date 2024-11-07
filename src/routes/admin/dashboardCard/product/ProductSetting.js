import P from "components/P";
import CustomIcon from "components/icons/CustomIcon";
import Inline from "layouts/container/Inline";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./ProductSetting.module.css";

function ProductSetting() {
    const status = [
        {
            text: "상품등록",
            
            icon: <CustomIcon name={"question"} color={"var(--main-color)"} width={40} />,
            line: true,

        },
        {
            text: "상품관리",
            
            icon: <CustomIcon name={"question"} color={"var(--main-color)"} width={40} />,
            line: true
        },
        {
            text: "카테고리 관리",
            
            icon: <CustomIcon name={"question"} color={"var(--main-color)"} width={40} />,
            line: true
        },
        {
            text: "메인상품 관리",
            
            icon: <CustomIcon name={"question"} color={"var(--main-color)"} width={40} />,
            line: true
        },
        {
            text: "상품옵션 관리",
            
            icon: <CustomIcon name={"question"} color={"var(--main-color)"} width={40} />,
            line: true
        },
        {
            text: "재고관리",
            
            icon: <CustomIcon name={"question"} color={"var(--main-color)"} width={40} />
        }

    ]

    return (
        <div className={style.wrap}>
            <HorizontalFlex>
                {
                    status &&
                    status.map((data, index) => (

                        <FlexChild key={index} justifyContent={"center"} >
                            <HorizontalFlex>
                                <FlexChild>
                                    <VerticalFlex gap={10}>
                                        <FlexChild>
                                            <P>{data.icon}</P>
                                        </FlexChild>
                                        <FlexChild>
                                            <P weight={"bold"}>{data.text}</P>
                                        </FlexChild>
                                    </VerticalFlex>
                                </FlexChild>
                                {
                                    data.line &&
                                    <FlexChild width={"max-content"}>
                                        <div className={style.line} />
                                    </FlexChild>
                                }
                            </HorizontalFlex>
                        </FlexChild>


                    ))
                }
            </HorizontalFlex>
        </div>
    );
}

export default ProductSetting;