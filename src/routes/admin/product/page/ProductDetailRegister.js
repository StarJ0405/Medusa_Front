import { useEffect, useRef, useState } from "react";
import style from "./ProductDetailRegister.module.css";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import InputText from "components/inputs/InputText";
import { Checkbox } from "antd";
import CustomButton from "components/buttons/CustomButton";
import { requester } from "App";
import QuillEditor from "components/inputs/richEditor/QuillEditor";

function ProductDetailRegister() {
    const inputs = useRef();
    const [product, setProduct] = useState("");
    const [mounted, setMounted] = useState(false);
    

    useEffect(() => {
        setMounted(true);
    }, [])

    useEffect(() => {
        let data = { id: "56269b29-da55-4c40-a0e7-8f06d3e360ad" }
        requester.getProductForAdmin(data, (result) => {

            setProduct(result.data);
        })

    }, [mounted])

    const Box = (props) => {
        return (
            <div className={style.boxContainer}>
                {
                    props.image
                        ?
                        <img src={props.image} width={"100px"} />
                        :
                        <P size={28}>+</P>
                }
            </div>
        );
    }

    return (
        <div className={style.container}>
            <VerticalFlex>
                <FlexChild>
                    <div className={style.label}>
                        <Center width={"100%"} textAlign={"left"}>
                            <P>SETP 3. 상품 상세등록 </P>
                        </Center>
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.contentWrap}>
                        <VerticalFlex gap={20}>
                            <FlexChild>
                                <HorizontalFlex gap={40}>
                                    <FlexChild width={"15%"}>
                                        <P>썸네일 등록</P>
                                    </FlexChild>
                                    <FlexChild width={"max-content"}>
                                        <div className={style.addBtn}>
                                            <P>등록하기</P>
                                        </div>
                                    </FlexChild>
                                    <FlexChild>
                                        <P color={"#bbb"}>* 작업사이즈: 300px x 300px, 최대 10장까지 등록 가능합니다.</P>
                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                            <FlexChild>
                                <HorizontalFlex gap={40}>
                                    <FlexChild width={"15%"}>

                                    </FlexChild>
                                    <FlexChild>
                                        <HorizontalFlex gap={15}>
                                            <FlexChild width={"max-content"}>
                                                <Box image={product && product.image} />
                                            </FlexChild>
                                            <FlexChild width={"max-content"}>
                                                <Box />
                                            </FlexChild>
                                            <FlexChild width={"max-content"}>
                                                <Box />
                                            </FlexChild>
                                            <FlexChild>
                                                <Box />
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                            <FlexChild>
                                <div className={style.line} />
                            </FlexChild>
                            <FlexChild height={"100%"}>
                                <HorizontalFlex gap={40} flexStart>
                                    <FlexChild width={"15%"}>
                                        <P>상세페이지</P>
                                    </FlexChild>
                                    <FlexChild height={"100%"}>..
                                        <QuillEditor />
                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                            <FlexChild>
                                <HorizontalFlex gap={15}>
                                    <FlexChild justifyContent={"flex-end"}>
                                        <P cursor border={"1px solid #eee"} padding={"5px 35px"}>임시저장</P>
                                    </FlexChild>
                                    <FlexChild>
                                        <P cursor color={"white"} padding={"5px 35px"} backgroundColor={"#5471e6"}>상품등록</P>
                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                        </VerticalFlex>
                    </div>
                </FlexChild>
            </VerticalFlex>

        </div>
    );
}

export default ProductDetailRegister;