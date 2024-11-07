import { CButton, CFormSelect } from "@coreui/react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import TestDatePicker from "../TestDatePicker";
import style from "./DateChoice.module.css";
import clsx from "classnames";
import { requester } from "App";
import Center from "layouts/wrapper/Center";
import VerticalFlex from "layouts/flex/VerticalFlex";



const DateChoice = forwardRef((props, ref) => {
    const { isMobile } = useContext(BrowserDetectContext);
    const { t } = useTranslation();
    const today = new Date();
    // const newDay = new Date();
    const dateRef = useRef();
    // newDay.setDate(today.getDate() - 7);
    const [startDate, setStartDate] = useState(() => {
        const start = new Date();
        start.setHours(0, 0, 0, 0); // Set to the start of the day (00:00:00.000)
        return start;
    });
    
    const [endDate, setsEndDate] = useState(new Date()); // Set to the current date and time
    const [active, setActive] = useState([false, false, false, false, false])



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

    const btnStyle = {
        backgroundColor: "var(--main-color)",
        border: "0",
        width: "100%",
        height: "38px",
    }
    const onChange = (value) => {
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
                                        <p onClick={on7dayClick} className={clsx(style.selectButton, { [style.active]: active[0] })}>
                                            {t("7days")}
                                        </p>
                                    </FlexChild>
                                    <FlexChild ><p onClick={onOneMonthClick} className={clsx(style.selectButton, { [style.active]: active[1] })}>{t("1month")}</p></FlexChild>
                                    <FlexChild ><p onClick={onThreeMonthClick} className={clsx(style.selectButton, { [style.active]: active[2] })}>{t("3month")}</p></FlexChild>
                                    <FlexChild ><p onClick={onSixMonthClick} className={clsx(style.selectButton, { [style.active]: active[3] })}>{t("6month")}</p></FlexChild>
                                    <FlexChild><p onClick={onOneYearClick} className={clsx(style.selectButton, { [style.active]: active[4] })}>{t("1year")}</p></FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                            <FlexChild>
                                <HorizontalFlex justifyContent={"center"}>
                                    <FlexChild width={"initial"}>
                                        <TestDatePicker ref={dateRef} startDate={startDate} endDate={endDate} onChange={onChange} />
                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                            <FlexChild padding={"10px"}>
                                <HorizontalFlex justifyContent={"flex-end"}>
                                    <CButton onClick={onLookUpClick} style={btnStyle} shape="rounded-0"><FontAwesomeIcon icon={faSearch} />&nbsp;{t("lookUp")}</CButton>
                                </HorizontalFlex>
                            </FlexChild>
                        </VerticalFlex>
                    </div>
                    :
                    <div className={style.headerWrap} style={{ paddingLeft: "15px" }}>
                        <HorizontalFlex gap={5}>
                            <FlexChild><p onClick={on7dayClick} className={clsx(style.selectButton, { [style.active]: active[0] })}>{t("7days")}</p></FlexChild>
                            <FlexChild ><p onClick={onOneMonthClick} className={clsx(style.selectButton, { [style.active]: active[1] })}>{t("1month")}</p></FlexChild>
                            <FlexChild ><p onClick={onThreeMonthClick} className={clsx(style.selectButton, { [style.active]: active[2] })}>{t("3month")}</p></FlexChild>
                            <FlexChild ><p onClick={onSixMonthClick} className={clsx(style.selectButton, { [style.active]: active[3] })}>{t("6month")}</p></FlexChild>
                            <FlexChild><p onClick={onOneYearClick} className={clsx(style.selectButton, { [style.active]: active[4] })}>{t("1year")}</p></FlexChild>
                            <FlexChild padding={"10px"}>
                                <TestDatePicker ref={dateRef} startDate={startDate} endDate={endDate} onChange={onChange} />
                            </FlexChild>
                            <FlexChild width={"10%"} padding={" 0 0 0 10px"}>
                                <CButton onClick={onLookUpClick} style={btnStyle} size="sm" className={style.button} shape="rounded-0"><FontAwesomeIcon icon={faSearch} />&nbsp;{t("lookUp")}</CButton>
                            </FlexChild>
                        </HorizontalFlex>
                    </div>
            }
        </FlexChild>
    );
});


export default DateChoice;