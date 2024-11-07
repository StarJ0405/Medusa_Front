import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./ProductManagement.module.css";
import FlexChild from "layouts/flex/FlexChild";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import CustomIcon from "components/icons/CustomIcon";
import Inline from "layouts/container/Inline";


function ProductManagement() {
    const total = [
        {
            text: "품절임박",
            count: "2"
        },
        {
            text: "관리필요",
            count: "5"
        },
        {
            text: "인기상품",
            count: "13"
        }
    ]

    const onClick = (e) => {
        console.log("click");
    }
    return (
        <div className={style.wrap}>
            <VerticalFlex gap={5}>
                <FlexChild>
                    <div className={style.label}>
                        <HorizontalFlex padding={"0 10px"}>
                            <FlexChild>
                                <HorizontalFlex gap={5}>
                                    <FlexChild width={"max-content"}>
                                        <CustomIcon name={"productManagement"} color={"white"} width={20} />
                                    </FlexChild>
                                    <FlexChild>

                                        <Center width={"100%"} textAlign={"left"}>
                                            <P color={"white"} weight={"bold"}>상품관리</P>
                                        </Center>

                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild>

                        </HorizontalFlex>
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.boxWrap}>
                        <HorizontalFlex gap={10}>
                            {
                                total &&
                                total.slice(0, 3).map((data, index) => (
                                    <FlexChild key={index}>
                                        <div className={style.boxArea}>
                                            <VerticalFlex gap={5}>
                                                <FlexChild>
                                                    <Center>
                                                        <P onClick={onClick}>{data.text}</P>

                                                    </Center>
                                                </FlexChild>
                                                <FlexChild>
                                                    <Center>
                                                        <Inline>
                                                            <P size={"14pt"} weight={"bold"} color={"#5471e6"}>{data.count}</P>
                                                            <P> 건</P>
                                                        </Inline>
                                                    </Center>
                                                </FlexChild>
                                            </VerticalFlex>
                                        </div>
                                    </FlexChild>
                                ))
                            }
                        </HorizontalFlex>
                    </div>

                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default ProductManagement;