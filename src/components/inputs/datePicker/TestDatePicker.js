
import FlexChild from "layouts/flex/FlexChild";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import ReactDatePicker, { CalendarContainer } from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from "date-fns/esm/locale";
import style from "./TestDatePicker.module.css"
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import useAltEffect from "shared/hooks/useAltEffect";
import clsx from "clsx";

const TestDatePicker = forwardRef((props, ref) => {
    const [startDate, setStartDate] = useState(new Date(2023,0,1));
    
    
    const [endDate, setEndDate] = useState(new Date());
    const { type } = props;
    useImperativeHandle(ref, () => ({
        getStartDate() {
            return startDate;
        },
        getEndDate() {
            return endDate;
        },
    }));

    useEffect(() => {
    }, [startDate]);
    useEffect(() => {
    }, [endDate])

    useEffect(() => {
        if (props.startDate) {
            setStartDate(props.startDate);
        }

    }, [props.startDate]);

    useEffect(() => {
        if (props.endDate) {
            setEndDate(props.endDate);
        }
    }, [props.endDate]);

    return (
        <CalendarContainer className={style.container} style={props.style} >
            <HorizontalFlex>
                <ReactDatePicker
                    locale={ko}    // 언어설정 기본값은 영어
                    dateFormat={type ? type === "date" ? "yyyy-MM-dd" : "yyyy-MM-dd HH:mm" : "yyyy-MM-dd"}  // 날짜 형식 설정
                    className={clsx(style.inputDatePicker, {[style.date] : type ? type === "date" ? true : false : true})}    // 클래스 명 지정 css주기 위해
                    // minDate={new Date()}    // 선택할 수 있는 최소 날짜값 지정 
                    closeOnScroll={true}    // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                    placeholderText="날짜 선택"    // placeholder
                    selected={startDate}    // value
                    maxDate={props.maxDate ? props.maxDate : new Date()} // 오늘을 넘기는 날은 선택 불가능
                    monthsShown={1}
                    showTimeInput={type ? type === "date" ? false : true : false}
                    showTimeSelect={type ? type === "date" ? false : true : false}
                    onChange={
                        (date) => {
                            setStartDate(date);
                            props.onChange && props.onChange([false, false, false, false, false]);
                        }

                    }    // 날짜를 선택하였을 때 실행될 함수
                />
                <p>&nbsp;~&nbsp;</p>
                <ReactDatePicker
                    locale={ko}    // 언어설정 기본값은 영어
                    dateFormat={type ? type === "date" ? "yyyy-MM-dd" : "yyyy-MM-dd HH:mm" : "yyyy-MM-dd"}    // 날짜 형식 설정
                    className={clsx(style.inputDatePicker, {[style.date] : type ? type === "date" ? true : false : true})}    // 클래스 명 지정 css주기 위해
                    maxDate={props.maxDate ? props.maxDate : new Date()}
                    // minDate={new Date()}    // 선택할 수 있는 최소 날짜값 지정 
                    closeOnScroll={true}    // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                    placeholderText="날짜 선택"    // placeholder
                    selected={endDate}    // value
                    showTimeInput={type ? type === "date" ? false : true : false}
                    showTimeSelect={type ? type === "date" ? false : true : false}
                    onChange={(date) => {
                        setEndDate(date);
                        props.onChange && props.onChange([false, false, false, false, false]);
                    }

                    }    // 날짜를 선택하였을 때 실행될 함수
                />
            </HorizontalFlex>
            <div className={style.calendar}></div>
            <div className={style.calendar2}></div>

        </CalendarContainer>

    );
});

export default TestDatePicker;