import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./NeedToBeManagedProduct.module.css";
import FlexChild from "layouts/flex/FlexChild";
import P from "components/P";
import { useEffect, useState } from "react";
import { requester } from "App";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import Center from "layouts/wrapper/Center";
import CustomIcon from "components/icons/CustomIcon";
import Inline from "layouts/container/Inline";
import { useNavigate } from "react-router-dom";

function NeedToBeManagedProduct() {
    const navigate = useNavigate();
    const [dummyData, setDummyData] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            requester.getProductsRequiringCare((result) => {
                console.log(result.data)
                setDummyData(result.data);
            })
        }
    }, [mounted])


    const DummyProduct = (props) => {
        const { data } = props;
        return (
            <div className={style.dummyWrap} onClick={() => onGoToLinkClick("needToManagement")}>
                <VerticalFlex gap={10}>
                    <FlexChild>
                        <img style={{ width: "100%" }} src={data && data.image} />
                    </FlexChild>
                    <FlexChild>
                        <P>{data.brandTitleKr}</P>
                        <P>{data.titleKr}</P>
                    </FlexChild>
                    <FlexChild>
                        <Inline>
                            <P color={"var(--main-color)"}> {data.lastOrderDate} 일</P>
                        </Inline>
                    </FlexChild>
                </VerticalFlex>
            </div>

        );
    }

    const onGoToLinkClick = (value) => {
        navigate(`/admin/product/${value}`)
    }

    return (
        <div className={style.wrap}>
            <VerticalFlex gap={15}>
                <FlexChild>
                    <div className={style.label}>
                        <HorizontalFlex padding={"0 10px"}>
                            <FlexChild>
                                <HorizontalFlex gap={5}>
                                    <FlexChild width={50} >
                                        <Center width={"100%"}>
                                            <CustomIcon name={"outOfStock"} width={20} />
                                        </Center>
                                    </FlexChild>
                                    <FlexChild>
                                        <Center width={"100%"} textAlign={"left"}>
                                            <P color={"white"} weight={"bold"}>관리 필요 상품</P>
                                        </Center>
                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                            <FlexChild width={"max-content"}>
                                <VerticalFlex>
                                    <FlexChild>
                                        <P cursor onClick={() => onGoToLinkClick("NeedToManagement")} size={"14pt"} color={"white"}>{">"}</P>
                                    </FlexChild>
                                </VerticalFlex>
                            </FlexChild>
                        </HorizontalFlex>
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.productArea}>
                        <HorizontalFlex >
                            {
                                dummyData &&
                                    dummyData.length > 3
                                    ?
                                    dummyData.slice(0, 3).map((data, index) => (
                                        <FlexChild key={index}>
                                            <FlexChild >
                                                <DummyProduct data={data} type={"취소"} />
                                            </FlexChild>
                                            <FlexChild width={"max-content"} >
                                                <div className={style.line} />
                                            </FlexChild>
                                        </FlexChild>
                                    ))
                                    :
                                    dummyData &&
                                    dummyData.map((data, index) => (
                                        <FlexChild key={index}>
                                            <FlexChild >
                                                <DummyProduct data={data} type={"취소"} />
                                            </FlexChild>
                                            <FlexChild width={"max-content"} >
                                                <div className={style.line} />
                                            </FlexChild>
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

export default NeedToBeManagedProduct;