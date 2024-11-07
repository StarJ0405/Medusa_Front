import { Checkbox } from "antd";
import InputText from "components/inputs/InputText";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { useEffect, useRef, useState } from "react";
import style from "./ExhibitionRegister.module.css";
import { ToastContainer, toast } from "react-toastify";
import { requester } from "App";
import { validateInput, validateInputs } from "shared/utils/Utils";
import RadioChildren from "components/manager/views/forms/radio/RadioChildren";
import InputPassword from "components/inputs/InputPassword";
import { useTranslation } from "react-i18next";
import { passwordFormat } from "InitialData/regExp";
import CustomButton from "components/buttons/CustomButton";
import RadioGroup from "components/manager/views/forms/radio/RadioGroup";
import NiceModal from "@ebay/nice-modal-react";
import InputNumber from "components/inputs/InputNumber";
import TestDatePicker from "components/inputs/datePicker/TestDatePicker";
import DateChoice from "components/inputs/datePicker/dateChoice/DateChoice";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import QuillEditor from "components/inputs/richEditor/QuillEditor";
import InputImage from "components/inputs/image/InputImage";
import Dummy from "components/Dummy";

function ExhibitionRegisterDetail() {
    const inputs = useRef([]);
    const contents = useRef([]);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [type, setType] = useState();
    const [mixYn, setMixYn] = useState();

    const [products, setProducts] = useState([]);

    const [selectedProducts, setSelectedProducts] = useState([]);
    const dateRef = useRef();
    const [startDate, setStartDate] = useState();
    const [endDate, setsEndDate] = useState();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 10);

    const brandSelectHeader = [
        // { width: 150, code: "image", text: "썸네일"},
        { width: 300, code: "title", text: "브랜드명" }
    ];
    const productSelectHeader = [
        { width: 300, code: "title", text: "상품명" }
    ]

    useEffect(() => {
        // requester.getAllBrandsForAdmin((result) => {
        //     setBrands(result.data);
        // });
        requester.getAllProduct((result) => {
            setProducts(result.data)

        })
    }, []);
    useEffect(() => {
    }, [selectedProducts])


    const onProductSearchClick = () => {
        NiceModal.show("checkSelect", { list: products, title: "상품 목록", theader: productSelectHeader, justifyContent: "flex-start", onSelect: onProductSelect });
    }

    const onProductSelect = (products) => {
        setSelectedProducts(products);
    }

    const initializationStyle = {
        backgroundColor: "white",
        padding: "7px 20px",
        color: "black",
        border: "1px solid #ddd"
    }

    const onRegClick = () => {
        if (selectedProducts && selectedProducts.length > 0) {
            if (inputs.current[0].getValue().length > 0) {


                let data = {};
                if (type === "Discount") {
                    data.exhibitionProducts = selectedProducts.map((selectedProduct) => ({ productId: selectedProduct.id }));
                    data.type = type;
                    data.startDateTime = dateRef.current.getStartDate();
                    data.endDateTime = dateRef.current.getEndDate();
                    data.title = inputs.current[0].getValue();
                    data.discountRate = inputs.current[1].getValue();
                    validateInputs(contents.current).then((result) => {
                        if (result.isValid) {
                            data.image = contents.current[0].getValue();
                            data.content = contents.current[1].getValue();

                            console.log(data);
                            requester.createExhibition(data, (result) => {
                                if (result.code === 0) {
                                    console.log(result.data);
                                    navigate("/admin/exhibition");

                                }
                            });
                        } else {
                            toast.error(`${inputs.current[result.index].getName()} 항목을 확인해주세요`, {
                                autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                            });
                        }
                    });

                } else if (type === "Gift") {
                    if (mixYn === undefined) {
                        toast.error("교차선택 가능여부를 선택해주세요", {
                            autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                        });
                    } else {
                        data.exhibitionProducts = selectedProducts.map((selectedProduct) => ({ productId: selectedProduct.id }));
                        data.type = type;
                        data.mixYn = mixYn;
                        data.startDateTime = dateRef.current.getStartDate();
                        data.endDateTime = dateRef.current.getEndDate();
                        data.title = inputs.current[0].getValue();
                        data.giftStandard = inputs.current[2].getValue();
                        data.gift = inputs.current[3].getValue();
                        
                        validateInputs(contents.current).then((result) => {
                            if (result.isValid) {

                                data.image = contents.current[0].getValue();
                                data.content = contents.current[1].getValue();
                                console.log(data);

                                requester.createExhibition(data, (result) => {
                                    if (result.code === 0) {
                                        console.log(result.data);
                                        navigate("/admin/exhibition");
                                    }
                                });




                            } else {
                                toast.error(`${inputs.current[result.index].getName()} 항목을 확인해주세요`, {
                                    autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                                });
                            }

                        });

                    }
                } else {
                    toast.error("타입을 선택해주세요", {
                        autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                    });
                }
            } else {
                toast.error("제목을 입력해주세요", {
                    autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                });
            }
        } else {
            toast.error("브랜드를 선택해주세요", {
                autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
            });
        }
    }

    return (
        <VerticalFlex gap={20}>
            <FlexChild>
                <HorizontalFlex gap={40}>
                    <FlexChild width={"15%"}>
                        <P>프로모션 제목</P>
                    </FlexChild>
                    <FlexChild>
                        <InputText ref={el => (inputs.current[0] = el)} />
                    </FlexChild>
                </HorizontalFlex>
            </FlexChild>
            <FlexChild>
                <HorizontalFlex gap={40}>
                    <FlexChild width={"15%"}>
                        <P>프로모션 타입</P>
                    </FlexChild>
                    <FlexChild width={300}>
                        <RadioGroup name="example" value={type} onChange={(e) => { setType(e) }}>
                            <RadioChildren value={"Discount"}>할인</RadioChildren>
                            <RadioChildren value={"Gift"}>기프트</RadioChildren>
                        </RadioGroup>
                    </FlexChild>
                    <FlexChild />
                </HorizontalFlex>
            </FlexChild>

            {
                type && type === "Discount" &&
                <FlexChild>
                    <HorizontalFlex gap={40}>
                        <FlexChild width={"15%"}>
                            <P>할인율</P>
                        </FlexChild>
                        <FlexChild width={200}>
                            <InputNumber ref={el => (inputs.current[1] = el)} min={0} max={100} />
                        </FlexChild>
                        <FlexChild />
                    </HorizontalFlex>
                </FlexChild>
            }
            {
                type && type === "Gift" &&
                <FlexChild>
                    <HorizontalFlex gap={40}>
                        <FlexChild width={"15%"}>
                            <P>기프트 기준</P>
                        </FlexChild>
                        <FlexChild width={200}>
                            <InputNumber ref={el => (inputs.current[2] = el)} />
                        </FlexChild>
                        <FlexChild width={"initial"}>
                            <P>+</P>
                        </FlexChild>
                        <FlexChild width={200}>
                            <InputNumber ref={el => (inputs.current[3] = el)} />
                        </FlexChild>
                        <FlexChild />
                    </HorizontalFlex>
                </FlexChild>
            }
            {
                type && type === "Gift" &&
                <FlexChild>
                    <HorizontalFlex gap={40}>
                        <FlexChild width={"15%"}>
                            <P>교차선택</P>
                        </FlexChild>
                        <FlexChild width={300}>
                            <RadioGroup name="example" value={mixYn} onChange={(e) => { setMixYn(e) }}>
                                <RadioChildren value={true}>허용</RadioChildren>
                                <RadioChildren value={false}>불가</RadioChildren>
                            </RadioGroup>
                        </FlexChild>
                        <FlexChild />
                    </HorizontalFlex>
                </FlexChild>
            }
            {/* <FlexChild>
                <HorizontalFlex gap={40}>
                    <FlexChild width={"15%"}>
                        <P>브랜드</P>
                    </FlexChild>
                    <FlexChild>
                        <HorizontalFlex gap={10}>
                            <FlexChild>
                                <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                                    {
                                        selectedBrands && selectedBrands.length > 0
                                            ?
                                            selectedBrands.length > 5 ?
                                                [...selectedBrands.slice(0, 5), { title: "..." }].map((row, index) => (
                                                    <FlexChild key={index} width={"initial"}>
                                                        <div className={style.categoryWrap} >
                                                            <Center width={"100%"} textAlign={"left"}>
                                                                <P>{row.title}</P>
                                                            </Center>
                                                        </div>
                                                    </FlexChild>
                                                ))
                                                :
                                                selectedBrands.map((row, index) => (
                                                    <FlexChild key={index} width={"initial"}>
                                                        <div className={style.categoryWrap} >
                                                            <Center width={"100%"} textAlign={"left"}>
                                                                <P>{row.title}</P>
                                                            </Center>
                                                        </div>
                                                    </FlexChild>
                                                ))
                                            :
                                            <FlexChild width={"initial"}>
                                                <div className={style.categoryWrap} >
                                                    <Center width={"100%"} textAlign={"left"}>
                                                        <P>전체</P>
                                                    </Center>
                                                </div>
                                            </FlexChild>
                                    }
                                </div>
                            </FlexChild>
                            <FlexChild width={"max-content"}>
                                <CustomButton text={"브랜드 선택"} style={initializationStyle} onClick={onBrandSearchClick} />
                            </FlexChild>
                            <FlexChild />
                        </HorizontalFlex>
                    </FlexChild>
                </HorizontalFlex>
            </FlexChild> */}
            <FlexChild>
                <HorizontalFlex gap={40}>
                    <FlexChild width={"15%"}>
                        <P>상품</P>
                    </FlexChild>
                    <FlexChild>
                        <HorizontalFlex gap={10}>
                            <FlexChild>
                                <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                                    {
                                        selectedProducts && selectedProducts.length > 0
                                            ?
                                            selectedProducts.length > 5 ?
                                                [...selectedProducts.slice(0, 5), { title: "..." }].map((row, index) => (
                                                    <FlexChild key={index} width={"initial"}>
                                                        <div className={style.categoryWrap} >
                                                            <Center width={"100%"} textAlign={"left"}>
                                                                <P>{row.title}</P>
                                                            </Center>
                                                        </div>
                                                    </FlexChild>
                                                ))
                                                :
                                                selectedProducts.map((row, index) => (
                                                    <FlexChild key={index} width={"initial"}>
                                                        <div className={style.categoryWrap} >
                                                            <Center width={"100%"} textAlign={"left"}>
                                                                <P>{row.title}</P>
                                                            </Center>
                                                        </div>
                                                    </FlexChild>
                                                ))
                                            :
                                            <FlexChild width={"initial"}>
                                                <div className={style.categoryWrap} >
                                                    <Center width={"100%"} textAlign={"left"}>
                                                        <P>전체</P>
                                                    </Center>
                                                </div>
                                            </FlexChild>
                                    }
                                </div>
                            </FlexChild>
                            <FlexChild width={"max-content"}>
                                <CustomButton text={"상품 선택"} style={initializationStyle} onClick={onProductSearchClick} />
                            </FlexChild>
                            <FlexChild />
                        </HorizontalFlex>
                    </FlexChild>
                </HorizontalFlex>
            </FlexChild>
            <FlexChild>
                <HorizontalFlex gap={40}>
                    <FlexChild width={"15%"}>
                        <P>기간</P>
                    </FlexChild>
                    <FlexChild width={"initial"}>
                        <TestDatePicker ref={dateRef} startDate={startDate} endDate={endDate} maxDate={maxDate} type={"time"} />
                    </FlexChild>
                    <FlexChild></FlexChild>
                </HorizontalFlex>
            </FlexChild>
            <FlexChild>
                <VerticalFlex gap={20}>
                    <FlexChild>
                        <HorizontalFlex gap={40}>
                            <FlexChild width={"15%"}>
                                <P>썸네일</P>
                            </FlexChild>
                            <FlexChild>
                                <VerticalFlex gap={10} flexStart>
                                    <FlexChild>
                                        <InputImage ref={el => (contents.current[0] = el)} name={"상품 라벨"} path={"exhibition/"} labelWidth={0} cropWidth={100} cropHeight={100} value={""} maxSizeMb={1} />
                                        {/* <InputImage ref={el => (inputs.current[4] = el)} name={"상품 라벨"} path={"product/"} labelWidth={0} cropWidth={100} cropHeight={100} value={product && product.image ? product.image : ""} maxSizeMb={1} /> */}
                                    </FlexChild>
                                    <FlexChild borderBottom={"2px solid #e7e7e7"} >
                                        <Dummy height={10} />
                                    </FlexChild>
                                </VerticalFlex>
                            </FlexChild>
                        </HorizontalFlex>
                    </FlexChild>
                    <FlexChild>
                        <div className={style.line} />
                    </FlexChild>
                    <FlexChild height={"100%"}>
                        <HorizontalFlex gap={40}>
                            <FlexChild width={"15%"}>
                                <P>상세페이지</P>
                            </FlexChild>
                            <FlexChild height={"100%"}>
                                <div style={{ maxWidth: "1200px" }}>
                                    <QuillEditor ref={el => (contents.current[1] = el)} name={"상세"} value={""} path={"exhibition/" + "exhibition.id"} preview={true} />
                                </div>
                            </FlexChild>
                        </HorizontalFlex>
                    </FlexChild>
                </VerticalFlex>
            </FlexChild>
            <FlexChild>
                <CustomButton text={"등록"} onClick={onRegClick} />
            </FlexChild>
        </VerticalFlex>
    );
}

export default ExhibitionRegisterDetail;