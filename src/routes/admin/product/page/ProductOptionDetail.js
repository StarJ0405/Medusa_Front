import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./ProductOptionDetail.module.css"
import FlexChild from "layouts/flex/FlexChild";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import CustomButton from "components/buttons/CustomButton";
import { useEffect, useRef, useState } from "react";
import InputText from "components/inputs/InputText";
import { Checkbox } from "@mui/material";
import { useParams } from "react-router-dom";
import { requester } from "App";

function ProductOptionDetail() {
    const { id } = useParams();
    const inputs = useRef();
    const [select2, setSelect2] = useState([]);
    const [product, setProduct] = useState("");
    const [category, setCatetogy] = useState([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    },[])
    
    // useEffect(() => {
    //     requester.getCategoryForAdmin(result => {
    //         console.lot(result.data);
    //     })
    // },[mounted])

    useEffect(() => {
        console.log(id);
        if (id) {
            let data = { id: id }
            requester.getProductForAdmin(data, (result) => {

                setProduct(result.data);
            })

        }
        


    }, [id])
    
    useEffect(() => {
        console.log(product);
        setSelect2(product.brandTitleKr);
    }, [product])
    const handleSelect2Change = (e) => {

        setSelect2(e.target.value);
    }

    return (
        <div className={style.container}>
            {
                product &&
                <VerticalFlex>
                    <FlexChild>
                        <div className={style.label}>
                            <Center width={"100%"} textAlign={"left"}>
                                <P>상품옵션 관리 </P>
                            </Center>
                        </div>
                    </FlexChild>
                    <FlexChild>
                        <div className={style.contentWrap}>
                            <VerticalFlex gap={20}>
                                <FlexChild>
                                    <HorizontalFlex gap={40}>
                                        <FlexChild width={"15%"}>
                                            <P>카테고리 설정</P>
                                        </FlexChild>
                                        <FlexChild>
                                            <select className={style.select} value={select2} onChange={handleSelect2Change}>
                                                <option value="브랜드">브랜드</option>
                                                <option value="FEELIN_필린">FEELIN_필린</option>
                                                <option value="심쿵">심쿵</option>
                                                <option value="과일먹구싶오">과일먹구싶오</option>
                                                <option value="없음">없음</option>
                                            </select>
                                        </FlexChild>
                                        <FlexChild />
                                    </HorizontalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <div className={style.line} />
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalFlex gap={40}>
                                        <FlexChild width={"15%"}>
                                            <P>상품명</P>
                                        </FlexChild>
                                        <FlexChild>
                                            <InputText ref={inputs} />
                                        </FlexChild>
                                        <FlexChild width={"30%"}>
                                            <InputText placeHolder={"상품번호 자동 생성"} disabled />
                                        </FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalFlex gap={40}>
                                        <FlexChild width={"15%"} >
                                            <P>요약설명</P>
                                        </FlexChild>
                                        <FlexChild>
                                            <InputText placeHolder={"상품명 밑에 보여지는 문구 입니다."} />
                                        </FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalFlex gap={40}>
                                        <FlexChild width={"15%"} >
                                            <P>판매가</P>
                                        </FlexChild>
                                        <FlexChild>
                                            <InputText placeHolder={"상품명 밑에 보여지는 문구 입니다."} />
                                        </FlexChild>
                                        <FlexChild>
                                            <Checkbox />
                                            <P color={"#bbb"}>소비자가 설정</P>
                                        </FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <div className={style.button}>
                                        <CustomButton text={"저장"} />
                                    </div>
                                </FlexChild>
                            </VerticalFlex>
                        </div>
                    </FlexChild>
                </VerticalFlex>
            }

        </div>
    );
}

export default ProductOptionDetail;