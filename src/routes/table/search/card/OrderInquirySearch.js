import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import style from "./OrderInquirySearch.module.css";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useTranslation } from "react-i18next";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import CustomButton from "components/buttons/CustomButton";
import AdminDateChoice from "routes/admin/datePicker/AdminDateChoice";
import InputText from "components/inputs/InputText";
import TestDatePicker from "components/inputs/datePicker/TestDatePicker";
import { requester } from "App";
import { useParams } from "react-router-dom";
import DateChoice2 from "components/inputs/datePicker/dateChoice/DateChoice2";

const OrderInquirySearch = forwardRef((props, ref) => {
    const { isMobile } = useContext(BrowserDetectContext);
    const { t } = useTranslation();
    const today = new Date();
    const dateRef = useRef();
    const inputs = useRef([]);
    const defaultData = new Date(2023,0,1)
    const date = new Date();
    
    const koreaTimeDiff = 9 * 60; // 한국은 UTC+9
    const koreaTime = new Date(date.getTime() + (koreaTimeDiff) * 60000);
    const defaultKoreaTime = new Date(defaultData.getTime() + (koreaTimeDiff) * 60000);
    const [startDate, setStartDate] = useState(defaultKoreaTime);
    const [endDate, setsEndDate] = useState(koreaTime);
    const [selectedSearch, setSelectedSearch] = useState();
    const maxDate = new Date();
    const { id } = useParams();
    maxDate.setFullYear(maxDate.getFullYear() + 10);

    useEffect(() => {
        setSelectedSearch(id);
    }, [])

    useEffect(() => {
        setSelectedSearch(id);
    }, [id])

    const onSearchClick = () => {
        let data = {};
        let startDateStr = dateRef.current.getStartDate().toISOString().slice(0, 19).replace('T', ' ');
        let endDateStr = dateRef.current.getEndDate().toISOString().slice(0, 19).replace('T', ' ');
        data.startDate = startDateStr;
        data.endDate = endDateStr;
        data.purchaseOrderId = inputs.current[0].getValue();
        data.userName = inputs.current[1].getValue();
        data.name = inputs.current[2].getValue();
        if (selectedSearch === "All") {
            data.status = null
        } else {
            data.status = selectedSearch;
            console.log(selectedSearch);
        }

        props.callback && props.callback(data);
    }

    const onSelectSearchChange = (e) => {
        setSelectedSearch(e.target.value);
    }
    const onInitializationClick = () => {
        inputs.current.map((input) => {
            input.setValue("");
        });;
        setStartDate(new Date());
        setsEndDate(new Date());
        setSelectedSearch("All");
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
                    <HorizontalFlex gap={10}>
                        <FlexChild width={"10%"} backgroundColor={"var(--admin-table-bg-color)"}>
                            <div className={style.titleWrap}>
                                <Center>
                                    <P size={15} weight={"bold"}>기간</P>
                                </Center>
                            </div>
                        </FlexChild>
                        <FlexChild>
                            <HorizontalFlex gap={10}>
                                <FlexChild width={"max-content"}>
                                    {/* <TestDatePicker ref={dateRef} startDate={startDate} endDate={endDate} maxDate={maxDate} /> */}
                                    <DateChoice2 ref={dateRef} startDate={startDate} endDate={endDate} maxDate={maxDate} />
                                </FlexChild>
                                <FlexChild />
                            </HorizontalFlex>
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild>
                <FlexChild>
                    <HorizontalFlex gap={10} justifyContent={"flex-start"}>
                        <FlexChild width={"10%"} backgroundColor={"var(--admin-table-bg-color)"}>
                            <div className={style.titleWrap}>
                                <Center>
                                    <P size={15} weight={"bold"}>주문번호</P>
                                </Center>
                            </div>
                        </FlexChild>
                        <FlexChild width={300}>
                            <InputText ref={el => inputs.current[0] = el} />
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild>
                <FlexChild>
                    <HorizontalFlex gap={10} justifyContent={"flex-start"}>
                        <FlexChild width={"10%"} backgroundColor={"var(--admin-table-bg-color)"}>
                            <div className={style.titleWrap}>
                                <Center>
                                    <P size={15} weight={"bold"}>구매자 아이디</P>
                                </Center>
                            </div>
                        </FlexChild>
                        <FlexChild width={300}>
                            <InputText ref={el => inputs.current[1] = el} />
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild>
                <FlexChild>
                    <HorizontalFlex gap={10} justifyContent={"flex-start"}>
                        <FlexChild width={"10%"} backgroundColor={"var(--admin-table-bg-color)"}>
                            <div className={style.titleWrap}>
                                <Center>
                                    <P size={15} weight={"bold"}>구매자 성명</P>
                                </Center>
                            </div>
                        </FlexChild>
                        <FlexChild width={300}>
                            <InputText ref={el => inputs.current[2] = el} />
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild>
                <FlexChild>
                    <HorizontalFlex gap={10}>
                        <FlexChild width={"10%"} backgroundColor={"var(--admin-table-bg-color)"}>
                            <div className={style.titleWrap}>
                                <Center>
                                    <P size={15} weight={"bold"}>주문서 상태</P>
                                </Center>
                            </div>
                        </FlexChild>
                        <FlexChild>
                            <HorizontalFlex gap={10}>
                                <FlexChild width={"max-content"}>
                                    <select className={style.select} onChange={onSelectSearchChange} value={selectedSearch} disabled={id === ":id" ? false : true}>
                                        <option value={"All"}>전체</option>
                                        <option value={"WaitingForPayment"}>결제대기</option>
                                        <option value={"PreparingShipment"}>배송준비중</option>
                                        <option value={"ReadyForShipment"}>배송대기</option>
                                        <option value={"Shipping"}>배송중</option>
                                        <option value={"DeliveryCompleted"}>배송완료</option>
                                        <option value={"CancelRequest"}>취소요청</option>
                                        <option value={"Canceled"}>취소완료</option>
                                        <option value={"ExchangeRequest"}>교환요청</option>
                                        <option value={"ExchangeCompleted"}>교환완료</option>
                                        <option value={"ReturnRequest"}>반품요청</option>
                                        <option value={"ReturnCompleted"}>반품완료</option>
                                        <option value={"RefundRequest"}>환불요청</option>
                                        <option value={"RefundCompleted"}>환불완료</option>
                                    </select>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild>
                <FlexChild backgroundColor={"#f5f6fb"} padding={"15px 0"}>
                    <HorizontalFlex gap={20}>
                        <FlexChild justifyContent={"flex-end"}>
                            <CustomButton text={"조건검색"} style={searchStyle} onClick={onSearchClick} />
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

export default OrderInquirySearch;