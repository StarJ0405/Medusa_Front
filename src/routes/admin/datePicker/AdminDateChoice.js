import FlexChild from "layouts/flex/FlexChild";
import style from "./AdminDateChoice.module.css";
import DateChoice from "components/inputs/datePicker/dateChoice/DateChoice";
import VerticalFlex from "layouts/flex/VerticalFlex";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import P from "components/P";
import Center from "layouts/wrapper/Center";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { forwardRef, useContext, useImperativeHandle, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import TestDatePicker from "components/inputs/datePicker/TestDatePicker";
import clsx from "classnames";
import AdminDatePicker from "./AdminDatePicker";
import InputText from "components/inputs/InputText";
import CustomButton from "components/buttons/CustomButton";


const AdminDateChoice = forwardRef((props, ref) => {
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
        if(props.callback){
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
        padding : "7px 20px",
        border: "1px solid #ddd"
    }
    const initializationStyle = {
        backgroundColor: "white",
        padding : "7px 20px",
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
                                            <P size={15} weight={"bold"}>{props.dateTitle}</P>
                                        </Center>
                                    </div>
                                </FlexChild>
                                {/* <FlexChild width={"max-content"}>
                                    <select className={style.select} onChange={onSelectDateChange} value={selectedDate}>
                                        <option value={"paymentDate"}>결제일</option>
                                        <option value={"orderDate"}>주문일</option>
                                    </select>
                                </FlexChild> */}
                                <FlexChild width={"20%"}>
                                    <AdminDatePicker ref={dateRef} startDate={startDate} endDate={endDate} onChange={onChange} />
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalFlex gap={10}>
                                        <FlexChild width={"max-content"}>
                                            <p onClick={on7dayClick} className={clsx(style.selectButton, { [style.active]: active[0] })}>
                                                {t("7days")}
                                            </p>
                                        </FlexChild>
                                        <FlexChild width={"max-content"}><p onClick={onOneMonthClick} className={clsx(style.selectButton, { [style.active]: active[1] })}>{t("1month")}</p></FlexChild>
                                        <FlexChild width={"max-content"}><p onClick={onThreeMonthClick} className={clsx(style.selectButton, { [style.active]: active[2] })}>{t("3month")}</p></FlexChild>
                                        <FlexChild width={"max-content"}><p onClick={onSixMonthClick} className={clsx(style.selectButton, { [style.active]: active[3] })}>{t("6month")}</p></FlexChild>
                                        <FlexChild><p onClick={onOneYearClick} className={clsx(style.selectButton, { [style.active]: active[4] })}>{t("1year")}</p></FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                        {/* <FlexChild>
                            <HorizontalFlex gap={10}>
                                <FlexChild width={"10%"} backgroundColor={"var(--admin-table-bg-color)"}>
                                    <div className={style.titleWrap}>
                                        <Center>
                                            <P size={15} weight={"bold"}>검색조건</P>
                                        </Center>
                                    </div>
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalFlex gap={10}>
                                        <FlexChild width={"max-content"}>
                                            <select className={style.select} onChange={onSelectSearchChange} value={selectedSearch}>
                                                <option  value={"orderNumber"}>주문번호</option>
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
                        </FlexChild> */}
                    </VerticalFlex>
                </FlexChild>
                {/* <FlexChild backgroundColor={"#f5f6fb"} padding={"15px 0"}>
                    <HorizontalFlex gap={20}>
                        <FlexChild justifyContent={"flex-end"}>
                            <CustomButton text={"조건검색"} style={searchStyle} onClick={searchClick} />
                        </FlexChild>
                        <FlexChild>
                            <CustomButton text={"초기화"} style={initializationStyle} onClick={onInitializationClick} />
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild> */}
            </VerticalFlex>


        </div>
    );
});


export default AdminDateChoice;