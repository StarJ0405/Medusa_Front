import { Versions } from "@stomp/stompjs";
import style from "./OutOfStock.module.css";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import P from "components/P";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import Center from "layouts/wrapper/Center";
import CustomIcon from "components/icons/CustomIcon";
import { useEffect, useState } from "react";
import { requester } from "App";
import Inline from "layouts/container/Inline";
import { useNavigate } from "react-router-dom";

function OutOfStock() {
    const navigate = useNavigate();
    const [dummyData, setDummyData] = useState("");
    const [mounted, setMounted] = useState(false);

    const [almostOutOfStock, setAlmostOutOfStock] = useState();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            requester.getAlmostOutOfStock((result) => {
                console.log(result.data);
                setAlmostOutOfStock(result.data);
            })
        }
    }, [mounted])

    const DummyProduct = (props) => {
        const { data } = props;
        console.log(data);
        return (
            <div className={style.dummyWrap} onClick={() => onGoToLinkClick("outOfStock")}>
                <VerticalFlex gap={10}>
                    <FlexChild>
                        <img style={{width:"100%"}} src={data && data.image} />
                    </FlexChild>
                    <FlexChild>
                        <P>{data.brandTitle}</P>
                        <P>{data.title}</P>
                    </FlexChild>
                    <FlexChild>
                        <Inline>
                            <P color={"var(--main-color)"}> {data.quantity}개</P>
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
                                            <P color={"white"} weight={"bold"}>품절 임박 상품</P>
                                        </Center>
                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                            <FlexChild width={"max-content"}>
                                <VerticalFlex>
                                    <FlexChild>
                                        <P cursor onClick={() => onGoToLinkClick("outOfStock")} size={"14pt"} color={"white"}>{">"}</P>
                                    </FlexChild>
                                </VerticalFlex>
                            </FlexChild>
                        </HorizontalFlex>
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.productArea}>
                        <HorizontalFlex gap={10}>
                            {
                                almostOutOfStock &&
                                    almostOutOfStock.length > 3 ?
                                    almostOutOfStock.slice(0, 3).map((data, index) => (
                                        <FlexChild key={index}>
                                            <FlexChild>
                                                <DummyProduct type={"취소"} data={data} />
                                            </FlexChild>
                                            <FlexChild width={"max-content"} >
                                                <div className={style.line} />
                                            </FlexChild>
                                        </FlexChild>
                                    ))
                                    :
                                    almostOutOfStock &&
                                    almostOutOfStock.map((data, index) => (
                                        <FlexChild key={index}>
                                            <FlexChild>
                                                <DummyProduct type={"취소"} data={data} />
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

export default OutOfStock;