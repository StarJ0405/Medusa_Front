import { CButton, CFormSelect } from "@coreui/react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import TestDatePicker from "../TestDatePicker";
import style from "./DateChoice2.module.css";
import clsx from "classnames";
import { requester } from "App";
import Center from "layouts/wrapper/Center";
import VerticalFlex from "layouts/flex/VerticalFlex";
import DatePicker from "../DatePicker";



const DateChoice2 = forwardRef((props, ref) => {
    const { isMobile } = useContext(BrowserDetectContext);
    const { t } = useTranslation();
    const today = new Date();
    // const newDay = new Date();
    const dateRef = useRef();
    // newDay.setDate(today.getDate() - 7);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setsEndDate] = useState(new Date()); // Set to the current date and time
    const [active, setActive] = useState([false, false, false, false, false, false])



    useEffect(() => {
        if (props.startDate) {
            setStartDate(props.startDate);
        }

    }, [props.startDate]);

    useEffect(() => {
        if (props.endDate) {
            setsEndDate(props.endDate);
        }
    }, [props.endDate]);





    useImperativeHandle(ref, () => ({
        getStartDate() {
            return startDate;
        },
        getEndDate() {
            return endDate;
        }
    }));


    const getKSTDate = () => {
        const now = new Date();
        const koreaTimeOffset = 9 * 60; // 한국은 UTC+9
        const kstDate = new Date(now.getTime() + koreaTimeOffset * 60000);

        return kstDate;
    }

    const formatDateToKSTString = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const toKSTDate = (date) => {
        const koreaTimeDiff = 9 * 60; // 한국은 UTC+9
        return new Date(date.getTime() + koreaTimeDiff * 60000);
    };


    const setDayStart = (date) => {
        date = toKSTDate(date);
        date.setHours(0, 0, 0, 0);
        return date;
    };

    const setDayEnd = (date) => {
        date = toKSTDate(date);
        date.setHours(23, 59, 59, 999);
        return date;
    };

    const onTodayClick = () => {
        const todayStart = setDayStart(new Date());
        const todayEnd = setDayEnd(new Date());
        setStartDate(todayStart);
        setsEndDate(todayEnd);
        setActive([true, false, false, false, false, false]);
    };

    const on7dayClick = () => {
        const newDay = setDayStart(new Date());
        newDay.setDate(newDay.getDate() - 7);
        const todayEnd = setDayEnd(new Date());
        setStartDate(newDay);
        setsEndDate(todayEnd);
        setActive([false, true, false, false, false, false]);
    };

    const onOneMonthClick = () => {
        const newDay = setDayStart(new Date());
        newDay.setDate(newDay.getDate() - 30);
        const todayEnd = setDayEnd(new Date());
        setStartDate(newDay);
        setsEndDate(todayEnd);
        setActive([false, false, true, false, false, false]);
    };

    const onThreeMonthClick = () => {
        const newDay = setDayStart(new Date());
        newDay.setDate(newDay.getDate() - 90);
        const todayEnd = setDayEnd(new Date());
        setStartDate(newDay);
        setsEndDate(todayEnd);
        setActive([false, false, false, true, false, false]);
    };

    const onSixMonthClick = () => {
        const newDay = setDayStart(new Date());
        newDay.setDate(newDay.getDate() - 180);
        const todayEnd = setDayEnd(new Date());
        setStartDate(newDay);
        setsEndDate(todayEnd);
        setActive([false, false, false, false, true, false]);
    };

    const onOneYearClick = () => {
        const newDay = setDayStart(new Date());
        newDay.setDate(newDay.getDate() - 365);
        const todayEnd = setDayEnd(new Date());
        setStartDate(newDay);
        setsEndDate(todayEnd);
        setActive([false, false, false, false, false, true]);
    };
    // const datePickerClick = (active) => {
    //     setActive(active);
    // }

    const btnStyle = {
        backgroundColor: "var(--main-color)",
        border: "0",
        width: "100%",
        height: "38px",
    }
    const onChange = (value) => {
        // setStartDate()
        setActive(value);
    }
    return (
        <FlexChild>
            {
                isMobile
                    ?
                    <div className={style.mobileHeaderWrap} >
                        <VerticalFlex gap={10}>
                            <FlexChild padding={"10px 0 0 0"}>
                                <HorizontalFlex>
                                    <FlexChild>
                                        <p onClick={on7dayClick} className={clsx(style.selectButton, { [style.active]: active[1] })}>
                                            {t("7days")}
                                        </p>
                                    </FlexChild>
                                    <FlexChild ><p onClick={onOneMonthClick} className={clsx(style.selectButton, { [style.active]: active[2] })}>{t("1month")}</p></FlexChild>
                                    <FlexChild ><p onClick={onThreeMonthClick} className={clsx(style.selectButton, { [style.active]: active[3] })}>{t("3month")}</p></FlexChild>
                                    <FlexChild ><p onClick={onSixMonthClick} className={clsx(style.selectButton, { [style.active]: active[4] })}>{t("6month")}</p></FlexChild>
                                    <FlexChild><p onClick={onOneYearClick} className={clsx(style.selectButton, { [style.active]: active[5] })}>{t("1year")}</p></FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                            <FlexChild>
                                <HorizontalFlex justifyContent={"center"}>
                                    <FlexChild width={"initial"}>
                                        <DatePicker ref={dateRef} startDate={startDate} endDate={endDate} onChange={onChange} />
                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                            {/* <FlexChild padding={"10px"}>
                                <HorizontalFlex justifyContent={"flex-end"}>
                                    <CButton onClick={onLookUpClick} style={btnStyle} shape="rounded-0"><FontAwesomeIcon icon={faSearch} />&nbsp;{t("lookUp")}</CButton>
                                </HorizontalFlex>
                            </FlexChild> */}
                        </VerticalFlex>
                    </div>
                    :
                    <div className={style.headerWrap} style={{ paddingLeft: "15px" }}>
                        <HorizontalFlex gap={5}>
                            <FlexChild><p onClick={onTodayClick} className={clsx(style.selectButton, { [style.active]: active[0] })}>{t("오늘")}</p></FlexChild>
                            <FlexChild><p onClick={on7dayClick} className={clsx(style.selectButton, { [style.active]: active[1] })}>{t("7days")}</p></FlexChild>
                            <FlexChild ><p onClick={onOneMonthClick} className={clsx(style.selectButton, { [style.active]: active[2] })}>{t("1month")}</p></FlexChild>
                            <FlexChild ><p onClick={onThreeMonthClick} className={clsx(style.selectButton, { [style.active]: active[3] })}>{t("3month")}</p></FlexChild>
                            <FlexChild ><p onClick={onSixMonthClick} className={clsx(style.selectButton, { [style.active]: active[4] })}>{t("6month")}</p></FlexChild>
                            <FlexChild><p onClick={onOneYearClick} className={clsx(style.selectButton, { [style.active]: active[5] })}>{t("1year")}</p></FlexChild>
                            <FlexChild padding={"10px"}>
                                <DatePicker ref={dateRef} startDate={startDate} endDate={endDate} onChange={onChange} />
                            </FlexChild>
                            {/* <FlexChild width={"10%"} padding={" 0 0 0 10px"}>
                                <CButton onClick={onLookUpClick} style={btnStyle} size="sm" className={style.button} shape="rounded-0"><FontAwesomeIcon icon={faSearch} />&nbsp;{t("lookUp")}</CButton>
                            </FlexChild> */}
                        </HorizontalFlex>
                    </div>
            }
        </FlexChild>
    );
});


export default DateChoice2;