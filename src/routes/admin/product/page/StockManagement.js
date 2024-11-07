import { useParams } from "react-router-dom";
import style from "./StockManagement.module.css";
import { useEffect, useRef, useState } from "react";
import { requester } from "App";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import InputText from "components/inputs/InputText";

import CustomButton from "components/buttons/CustomButton";
import { Checkbox } from "@mui/material";
import SearchBar from "routes/front/header/SearchBar";

function StockManagement() {
    
    const inputs = useRef();
    const searchRef = useRef();
    const [select1, setSelect1] = useState([]);
    const [select2, setSelect2] = useState([]);
    const [productsSelect, setProductsSelect] = useState([]);
    const [product, setProduct] = useState("");
    const [category, setCatetogy] = useState([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    },[])
    useEffect(() => {
        let data = {}
        requester.searchProducts(data,(resullt) => {
            
        })
    },[mounted])

    useEffect(() => {
        category.map((row, index) => {
            row.children.map((item, index) => {
                setProduct(prevProducts => [...prevProducts, item]);
            })
        })
    }, [category])
    useEffect(() => {
        console.log(productsSelect);
    }, [productsSelect])
    const onSelectTypeChange = (e) => {
        if (e.target.value === "brand") {
            setCatetogy([]);
            setProductsSelect([]);
            requester.getAllBrands(result => {

                setCatetogy(result.data);
            })
        } else if (e.target.value === "category") {
            setCatetogy([]);
            setProductsSelect([]);
            requester.getAllCategories(result => {

                setCatetogy(result.data);
            })
        }
    }
    const handleSelect1Change = (e) => {
        const [type, id] = JSON.parse(e.target.value);
        console.log(type);
        console.log(id);
        setSelect1([type, id]);
        if (type === "CATEGORY") {
            setProductsSelect([]);
            console.log("카테고리 찾기")
            let data = { id: id }
            requester.getCategoryProductById(data, result => {
                setProductsSelect(result.data.children);
            })
        } else if (type === "BRAND") {
            setProductsSelect([]);
            console.log("브랜드 찾기")
            let data = { id: id }
            requester.getBrand(data, result => {
                setProductsSelect(result.data.children);
            })
        }
    }
    const handleSelect2Change = (e) => {
        setSelect2(e.target.value)
    }


    return (
        <div className={style.container}>
            <VerticalFlex>
                <FlexChild>
                    <div className={style.label}>
                        <Center width={"100%"} textAlign={"left"}>
                            <P>재고상품 관리 </P>
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
                                        <select className={style.select} onChange={onSelectTypeChange}>
                                            <option>선택하세요</option>
                                            <option value={"category"}>카테고리</option>
                                            <option value={"brand"}>브랜드</option>
                                        </select>
                                    </FlexChild>
                                    <FlexChild>
                                        <select className={style.select} value={JSON.stringify(select1)} disabled={category.length === 0} onChange={handleSelect1Change}>
                                            {
                                                category
                                                &&
                                                <>
                                                    <option>선택하세요</option>
                                                    {
                                                        category.map((item, index) => (
                                                            <option value={JSON.stringify([item.type, item.id])}>{item.titleKr}</option>
                                                        ))
                                                    }
                                                </>

                                            }
                                        </select>
                                    </FlexChild>
                                    <FlexChild>
                                        <select className={style.select} value={select2} onChange={handleSelect2Change} disabled={productsSelect.length === 0}>
                                            {
                                                productsSelect &&
                                                <>
                                                    <option>선택하세요</option>
                                                    {
                                                        productsSelect.map((item, index) => {

                                                            return (
                                                                <option value={item.titleKr}>{item.titleKr}</option>
                                                            );
                                                        })
                                                    }
                                                </>

                                            }
                                        </select>
                                    </FlexChild>
                                    <FlexChild />
                                </HorizontalFlex>
                            </FlexChild>
                            <FlexChild>
                                <HorizontalFlex gap={40}>
                                    <FlexChild width={"15%"}>
                                        <P>검색</P>
                                    </FlexChild>
                                    <FlexChild>
                                        <InputText />
                                    </FlexChild>
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
        </div>
    );
}

export default StockManagement;