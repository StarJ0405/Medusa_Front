
import FlexChild from "layouts/flex/FlexChild";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import ReactDatePicker, { CalendarContainer } from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from "date-fns/esm/locale";
import style from "./AdminDatePicker.module.css"
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import useAltEffect from "shared/hooks/useAltEffect";
import CustomIcon from "components/icons/CustomIcon";
import 'react-datepicker/dist/react-datepicker.css';

const AdminDatePicker = forwardRef((props, ref) => {

    const [startDate, setStartDate] = useState(new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate()));
    const [endDate, setEndDate] = useState(new Date());



    useImperativeHandle(ref, () => ({
        getStartDate() {
            return startDate;
        },
        getEndDate() {
            return endDate;
        },
    }));

    useEffect(() => {
        console.log(startDate);
    }, [startDate]);
    useEffect(() => {
        console.log(endDate);
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

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        props.onChange([false, false, false, false, false]);
    };




    return (

        <CalendarContainer className={style.container} style={props.style} >

            <ReactDatePicker

                locale={ko}    // 언어설정 기본값은 영어
                dateFormat="yyyy-MM-dd"    // 날짜 형식 설정
                className={style.inputDatePicker}    // 클래스 명 지정 css주기 위해
                // minDate={new Date()}    // 선택할 수 있는 최소 날짜값 지정 
                closeOnScroll={true}    // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                placeholderText="날짜 선택"    // placeholder
                selected={startDate}    // value
                startDate={startDate}
                endDate={endDate}
                maxDate={new Date()} // 오늘을 넘기는 날은 선택 불가능
                selectsRange
                onChange={onChange}    // 날짜를 선택하였을 때 실행될 함수
            />
            {/* <p>&nbsp;~&nbsp;</p>
                <ReactDatePicker
                    locale={ko}    // 언어설정 기본값은 영어
                    dateFormat="yyyy-MM-dd"    // 날짜 형식 설정
                    className={style.inputDatePicker}    // 클래스 명 지정 css주기 위해
                    maxDate={new Date()}
                    // minDate={new Date()}    // 선택할 수 있는 최소 날짜값 지정 
                    closeOnScroll={true}    // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                    placeholderText="날짜 선택"    // placeholder
                    selected={endDate}    // value
                    onChange={(date) => {
                            setEndDate(date);
                            props.onChange([false, false, false, false, false]);
                        }

                    }    // 날짜를 선택하였을 때 실행될 함수
                /> */}
                <div className={style.icon}>
                    <CustomIcon name={"calendar"} width={20}/>
                </div>
        </CalendarContainer>

    );
});

export default AdminDatePicker;