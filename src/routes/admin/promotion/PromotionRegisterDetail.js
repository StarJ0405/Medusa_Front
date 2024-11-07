import { Checkbox } from "antd";
import InputText from "components/inputs/InputText";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { useEffect, useRef, useState } from "react";
import style from "./PromotionRegister.module.css";
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

function PromotionRegisterDetail() {
    const inputs = useRef([]);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [type, setType] = useState();
    const [mixYn, setMixYn] = useState();
    const [brands, setBrands] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const dateRef = useRef();
    const [startDate, setStartDate] = useState();
    const [endDate, setsEndDate] = useState();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 10);

    const brandSelectHeader = [
        // { width: 150, code: "image", text: "썸네일"},
        { width: 300, code: "title", text: "브랜드명" }
    ];

    useEffect(() => {
        requester.getAllBrandsForAdmin((result) => {
            setBrands(result.data);
        });
    }, []);

    const onBrandSearchClick = () => {
        NiceModal.show("checkSelect", { list: brands, title: "브랜드 목록", theader: brandSelectHeader, justifyContent: "flex-start", onSelect: onBrandSelect });
    }

    const onBrandSelect = (brands) => {
        setSelectedBrands(brands);
    }

    const initializationStyle = {
        backgroundColor: "white",
        padding: "7px 20px",
        color: "black",
        border: "1px solid #ddd"
    }

    const onRegClick = () => {
        if (selectedBrands && selectedBrands.length > 0) {
            if (inputs.current[0].getValue().length > 0) {
                let data = {};
                data.title = inputs.current[0].getValue();
                data.promotionBrands = selectedBrands.map((selectedBrand) => ({ brand: selectedBrand }));
                if (type === "Discount") {
                    data.type = type;
                    data.discountRate = inputs.current[1].getValue();
                    data.startDateTime = dateRef.current.getStartDate();
                    data.endDateTime = dateRef.current.getEndDate();
                    console.log(data);
                    requester.createPromotion(data, (result) => {
                        if (result.code === 0) {
                            // setProduct(result.data);
                            navigate("/admin/promotionManagement");
                            
                        }
                    });
                } else if (type === "Gift") {
                    if (mixYn === undefined) {
                        toast.error("교차선택 가능여부를 선택해주세요", {
                            autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                        });
                    } else {
                        data.type = type;
                        data.mixYn = mixYn;
                        data.giftStandard = inputs.current[2].getValue();
                        data.gift = inputs.current[3].getValue();
                        data.startDateTime = dateRef.current.getStartDate();
                        data.endDateTime = dateRef.current.getEndDate();
                        console.log(data);
                        requester.createPromotion(data, (result) => {
                            if (result.code === 0) {
                                // setProduct(result.data);
                                navigate("/admin/promotionManagement");
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
            <FlexChild>
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
            <FlexChild>
                <HorizontalFlex gap={40}>
                    <FlexChild width={"15%"}>
                        <P>기간</P>
                    </FlexChild>
                    <FlexChild width={"initial"}>
                        <TestDatePicker ref={dateRef} startDate={startDate} endDate={endDate} maxDate={maxDate} type={"time"}/>
                    </FlexChild>
                    <FlexChild></FlexChild>
                </HorizontalFlex>
            </FlexChild>
            <FlexChild>
                <CustomButton text={"등록"} onClick={onRegClick} />
            </FlexChild>
        </VerticalFlex>
    );
}

export default PromotionRegisterDetail;