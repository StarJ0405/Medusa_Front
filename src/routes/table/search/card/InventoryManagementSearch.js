import AdminDatePicker from "routes/admin/datePicker/AdminDatePicker";
import style from "./InventoryManagementSearch.module.css"
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import CustomButton from "components/buttons/CustomButton";
import { forwardRef, useContext, useImperativeHandle, useRef, useState } from "react";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useTranslation } from "react-i18next";
import InputText from "components/inputs/InputText";
import AdminDateChoice from "routes/admin/datePicker/AdminDateChoice";
import CheckBox from "components/inputs/checkBox/CheckBox";
import CheckBoxRow from "components/inputs/checkBox/CheckBoxRow";
import CheckCircle from "components/inputs/checkBox/CheckCircle";
import { Radio, RadioGroup } from "@mui/material";

const InventoryManagementSearch = forwardRef((props, ref) => {
    const { isMobile } = useContext(BrowserDetectContext);
    const { t } = useTranslation();
    const today = new Date();
    // const newDay = new Date();
    const dateRef = useRef();
    const inputRef = useRef();
    // newDay.setDate(today.getDate() - 7);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setsEndDate] = useState(new Date());
    const [active, setActive] = useState([false, false, false, false, false]);
    const [selectedDate, setSelectedDate] = useState("paymentDate");
    const [selectedSearch, setSelectedSearch] = useState("orderNumber");



    useImperativeHandle(ref, () => ({
        getStartDate() {
            return startDate;
        },
        getEndDate() {
            return endDate;
        }
    }));

    const onLookUpClick = () => {
        const resultStartDate = dateRef.current ? dateRef.current.getStartDate() : null;
        const resultEndDate = dateRef.current ? dateRef.current.getEndDate() : null;

        if (props.lookUp) {
            console.log(resultStartDate, resultEndDate);
            props.lookUp(resultStartDate, resultEndDate, active);
        }
    }

    const on7dayClick = () => {
        const today = new Date();
        const newDay = new Date();
        setStartDate(newDay.setDate(today.getDate() - 7));
        setsEndDate(today);
        setActive([true, false, false, false, false]);
    };

    const onOneMonthClick = () => {
        const today = new Date();
        const newDay = new Date();
        setStartDate(newDay.setDate(today.getDate() - 30));
        setsEndDate(today);
        setActive([false, true, false, false, false]);
    };

    const onThreeMonthClick = () => {
        const today = new Date();
        const newDay = new Date();
        setStartDate(newDay.setDate(today.getDate() - 90));
        setsEndDate(today);
        setActive([false, false, true, false, false]);
    };

    const onSixMonthClick = () => {
        const today = new Date();
        const newDay = new Date();
        setStartDate(newDay.setDate(today.getDate() - 180));
        setsEndDate(today);
        setActive([false, false, false, true, false]);
    };

    const onOneYearClick = () => {
        const today = new Date();
        const newDay = new Date();
        setStartDate(newDay.setDate(today.getDate() - 365));
        setsEndDate(today);
        setActive([false, false, false, false, true]);
    };
    // const datePickerClick = (active) => {
    //     setActive(active);
    // }
    const onChange = (value) => {
        setActive(value);
    }
    const searchClick = () => {
        if (props.callback) {
            props.callback(startDate, endDate, selectedDate, selectedSearch, inputRef.current.getValue());
        }
    }
    const onSelectDateChange = (e) => {
        console.log(e.target.value);
        setSelectedDate(e.target.value);

    }
    const onSelectSearchChange = (e) => {
        console.log(e.target.value);
        setSelectedSearch(e.target.value);
    }
    const onInitializationClick = () => {
        console.log("sdfsdffds");
        inputRef.current.setValue("");
        setStartDate(new Date());
        setsEndDate(new Date());
        setActive([false, false, false, false, false]);
        setSelectedDate("paymentDate");
        setSelectedSearch("orderNumber");

    }

    const searchStyle = {
        backgroundColor: "var(--admin-main-color)",
        padding: "7px 20px",
        border: "1px solid #ddd"
    }
    const initializationStyle = {
        backgroundColor: "white",
        padding: "7px 20px",
        color: "black",
        border: "1px solid #ddd"

    }
    return (
        <div className={style.container}>
            <VerticalFlex>
                <FlexChild>
                    <VerticalFlex>
                        <FlexChild>
                            <HorizontalFlex gap={10}>
                                <FlexChild width={"10%"} backgroundColor={"var(--admin-table-bg-color)"}>
                                    <div className={style.titleWrap}>
                                        <Center>
                                            <P size={15} weight={"bold"}>검색분류</P>
                                        </Center>
                                    </div>
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalFlex gap={10}>
                                        <FlexChild width={"max-content"}>
                                            <select className={style.select} onChange={onSelectSearchChange} value={selectedSearch}>
                                                <option value={"orderNumber"}>주문번호</option>
                                                <option value={"userName"}>주문자</option>
                                                <option value={"productName"}>상품명</option>
                                                <option value={"purchaseAmount"}>구매금액</option>
                                                <option value={"paymentMethod"}>결제수단</option>
                                                <option value={"paymentStatus"}>결제상태</option>
                                                <option value={"orderStatus"}>배송 상태</option>
                                            </select>
                                        </FlexChild>
                                        <FlexChild>
                                            <InputText ref={inputRef} />
                                        </FlexChild>
                                        <FlexChild />
                                    </HorizontalFlex>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                        <FlexChild>
                            <HorizontalFlex gap={10}>
                                <FlexChild width={"10%"} backgroundColor={"var(--admin-table-bg-color)"}>
                                    <div className={style.titleWrap}>
                                        <Center>
                                            <P size={15} weight={"bold"}>상품분류</P>
                                        </Center>
                                    </div>
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalFlex gap={30}>
                                        <FlexChild width={"max-content"}>
                                            <CheckCircle />
                                            <P>전체 상품분류 보기</P>
                                        </FlexChild>
                                        <FlexChild width={"max-content"}>
                                            <select className={style.select}>
                                                <option value={"orderNumber"}>대분류</option>
                                            </select>
                                        </FlexChild>
                                        <FlexChild width={"max-content"}>
                                            <select className={style.select}>
                                                <option value={"orderNumber"}>중분류</option>
                                            </select>
                                        </FlexChild>
                                        <FlexChild width={"max-content"}>
                                            <select className={style.select}>
                                                <option value={"orderNumber"}>소분류</option>
                                            </select>
                                        </FlexChild>
                                        <FlexChild>
                                            <CheckCircle />
                                            <P>분류 미등록상품 검색</P>
                                        </FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                        <FlexChild>
                            <AdminDateChoice dateTitle={"상품 등록일"} />
                        </FlexChild>
                    </VerticalFlex>
                </FlexChild>
                <FlexChild>
                    <HorizontalFlex>
                        <FlexChild width={"10%"} backgroundColor={"var(--admin-table-bg-color)"}>
                            <div className={style.titleWrap}>
                                <Center>
                                    <P size={15} weight={"bold"}>진열상태</P>
                                </Center>
                            </div>
                        </FlexChild>
                        <FlexChild>
                            <RadioGroup>
                                <HorizontalFlex>
                                    <FlexChild width={"max-content"}>
                                        <Radio name="productDisplay" value="all" />
                                        <P size={15} color={"#aaa"}>전체</P>
                                    </FlexChild>
                                    <FlexChild width={"max-content"}>
                                        <Radio name="productDisplay" value="displayed" />
                                        <P size={15} color={"#aaa"}>진열</P>
                                    </FlexChild>
                                    <FlexChild>
                                        <Radio name="productDisplay" value="notDisplayed" />
                                        <P size={15} color={"#aaa"}>미진열</P>
                                    </FlexChild>
                                </HorizontalFlex>
                            </RadioGroup>
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild>
                <FlexChild backgroundColor={"#f5f6fb"} padding={"15px 0"}>
                    <HorizontalFlex gap={20}>
                        <FlexChild justifyContent={"flex-end"}>
                            <CustomButton text={"조건검색"} style={searchStyle} onClick={searchClick} />
                        </FlexChild>
                        <FlexChild>
                            <CustomButton text={"초기화"} style={initializationStyle} onClick={onInitializationClick} />
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild>

            </VerticalFlex>


        </div>
    );
});


export default InventoryManagementSearch;